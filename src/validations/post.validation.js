const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    caption: Joi.string().required(),
    images: Joi.array().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    PostId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
};
