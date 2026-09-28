import { User } from '../../models/user.model';
import { AppError } from '../../middleware/error.middleware';
import { RegisterInput, LoginInput } from './auth.validation';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError('Email already in use', 409);
  }

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash: data.password, // will be hashed by mongoose pre-save hook
    persona: data.persona,
  });

  const payload = { userId: user._id.toString(), role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const userObject = user.toObject();
  delete (userObject as any).passwordHash;

  return { user: userObject, accessToken, refreshToken };
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({ email: data.email }).select('+passwordHash');
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  // Update last active
  user.lastActiveDate = new Date();
  await user.save({ validateBeforeSave: false });

  const payload = { userId: user._id.toString(), role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const userObject = user.toObject();
  delete (userObject as any).passwordHash;

  return { user: userObject, accessToken, refreshToken };
};
