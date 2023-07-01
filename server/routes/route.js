import express from "express";

import {signupUser,loginUser} from '../controller/user-controller.js'
import { uploadImage,getImage } from "../controller/image-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { createPost,getAllPost,getPost,updatePost,deletePost } from "../controller/post-controller.js";

import upload from "../utils/upload.js"


const router=express.Router();

router.post('/signup',signupUser);  //router.post takes three arguments 2nd is middlewere and 3rd is function
router.post('/login',loginUser);


router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);

router.post('/create',authenticateToken,createPost)
router.get('/posts',authenticateToken,getAllPost)
router.get('/post/:id',authenticateToken,getPost)
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id', authenticateToken, deletePost);




export default router;