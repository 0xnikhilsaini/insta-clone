/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Op } = require("sequelize");
const { Post, Like } = require('../models');
const ApiError = require('../utils/ApiError');

const getPagination = (page, size) => {
  const limit = size || 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: posts } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, posts, totalPages, currentPage };
};

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
// eslint-disable-next-line no-unused-vars
const createPost = async (postBody) => {
  const post = await Post.create({
    caption: postBody.caption,
    userId: postBody.userId
  });
  const { images } = postBody;
  await Promise.all(images.map(async (image) => {
    await post.createImage(image);
  }));
  return Post.findByPk(post.id, { include: ["images"] });
};


/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (page, size) => {
  const { limit, offset } = getPagination(page, size);
  const data = await Post.findAndCountAll({
    limit,
    offset, 
    include: ["images"]
  });

  const posts = getPagingData(data, page, limit);
  return posts;
};


const likeOrDislikePost = async (postId, userId) => {
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post does not exists');
  }

  const like = await Like.findOne({
    where: { [Op.and]: [{ postId: post.id }, { userId }] }
  });

  if (!like) {
    const newLike = await Like.create({
      userId,
      postId: post.id
    });
    return newLike;
  }
  return like.destroy();
};


module.exports = {
  createPost,
  queryPosts,
  likeOrDislikePost,
};
