const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  const postBody = {
    caption: req.body.caption,
    images: req.body.images,
    userId: req.user.id,
  };
  const post = await postService.createPost(postBody);
  res.status(httpStatus.CREATED).send({ status: 201, message: 'User login successfully!', data: post });
});

const getPosts = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const result = await postService.queryPosts(page, limit);
  res.send(result);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updateUserById(req.params.userId, req.body);
  res.send(post);
});

const likeOrDislikePost = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const post = await postService.likeOrDislikePost(req.params.postId, userId);
  res.send(post);
});

const disLikePost = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const post = await postService.disLikePost(req.params.postId, userId);
  res.send(post);
});

module.exports = {
  createPost,
  getPosts,
  updatePost,
  likeOrDislikePost,
  disLikePost,
};
