import { Request, Response, NextFunction } from 'express';
import * as communityService from './community.service';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await communityService.createPost(req.user._id as string, req.body.content);
    // Remove authorId before sending to client
    const safePost = post.toObject();
    delete (safePost as any).authorId;
    
    res.status(201).json({
      success: true,
      data: { post: safePost },
      message: 'Post created',
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    
    const posts = await communityService.getPosts(page, limit);
    res.status(200).json({
      success: true,
      data: { posts, pagination: { page, limit } },
    });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await communityService.toggleLike(req.user._id as string, req.params.id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = await communityService.createComment(req.user._id as string, req.params.id as string, req.body.content);
    const safeComment = comment.toObject();
    delete (safeComment as any).authorId;

    res.status(201).json({
      success: true,
      data: { comment: safeComment },
      message: 'Comment added',
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = await communityService.getComments(req.params.id as string);
    res.status(200).json({
      success: true,
      data: { comments },
    });
  } catch (error) {
    next(error);
  }
};
