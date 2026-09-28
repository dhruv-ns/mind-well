import { Post, Comment } from '../../models/community.model';
import { User } from '../../models/user.model';
import { AppError } from '../../middleware/error.middleware';

export const createPost = async (userId: string, content: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  const post = await Post.create({
    authorId: userId,
    personaTag: user.persona,
    content,
  });

  return post;
};

export const getPosts = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  // We fetch posts, but we do NOT populate authorId to keep it anonymous.
  // We use aggregate to join comments count if needed, or simply fetch posts and we'll do comments count separately.
  // For simplicity, we just fetch posts and return likes count
  const posts = await Post.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        personaTag: 1,
        content: 1,
        likesCount: { $size: { $ifNull: ['$likes', []] } },
        createdAt: 1,
      }
    }
  ]);

  return posts;
};

export const toggleLike = async (userId: string, postId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new AppError('Post not found', 404);

  const hasLiked = post.likes.includes(userId as any);

  if (hasLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId as any);
  }

  await post.save();
  return { liked: !hasLiked, likesCount: post.likes.length };
};

export const createComment = async (userId: string, postId: string, content: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  const post = await Post.findById(postId);
  if (!post) throw new AppError('Post not found', 404);

  const comment = await Comment.create({
    postId,
    authorId: userId,
    personaTag: user.persona,
    content,
  });

  return comment;
};

export const getComments = async (postId: string) => {
  const comments = await Comment.find({ postId })
    .select('-authorId') // Ensure authorId is excluded
    .sort({ createdAt: 1 });
  
  return comments;
};
