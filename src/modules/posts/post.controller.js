import HTTPStatus from 'http-status';
import Post from './post.model';

export async function createPost(req, res) {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('user');
    return res.status(HTTPStatus.OK).json(post);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user');
    return res.status(HTTPStatus.OK).json(posts);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
