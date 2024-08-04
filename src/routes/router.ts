import { Router } from 'express';
import { register, login } from '../controllers/AuthController';
import { createPost, posts, likePost, unlikePost, commentOnPost } from '../controllers/PostController';
import { searchFriend, sendFriendRequest, acceptFriendRequest, declineOrRemoveFriend } from '../controllers/FriendController';
import authentication from "../middleware/authentication";
import { postCreateValidate, paginationValidate, commentOnPostValidate } from '../validators/postValidator';
import { loginValidate, registerValidate } from '../validators/authValidator';

const router = Router();

// auth routes
router.post('/register', registerValidate, register);
router.post('/login', loginValidate, login);

//middleware
router.use(authentication);

// post, like & comment routes
router.post('/posts', postCreateValidate, createPost);
router.get('/posts', paginationValidate, posts);
router.post('/posts/:id/like', likePost);
router.post('/posts/:id/unlike', unlikePost);
router.post('/posts/:id/comment', commentOnPostValidate, commentOnPost);

// friend routes
router.get('/friends', searchFriend);
router.post('/friends/:id/add', sendFriendRequest);
router.post('/friends/:id/accept', acceptFriendRequest);
router.post('/friends/:id/decline', declineOrRemoveFriend);

export default router;