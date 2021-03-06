import Router from 'express';
import validate from 'express-validation';

import * as postController from './post.controller';
import { authJwt } from '../../services/auth.services';
import postValidation from './post.validation';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(postValidation.createPost),
  postController.createPost
);
routes.get('/:id', postController.getPostById);
routes.get('/', postController.getPosts);

export default routes;
