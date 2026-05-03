import { Router } from "express";
import { getAllUsers, register, login, profile, updateUser } from "../controller/user.controller.js";
let router = Router();

// get all users 
router.get('/users', getAllUsers);

// create new user [register]
router.post('/register', register);

// login
router.post('/login', login);

// user profile
router.get('/profile/:id', profile);

// update user profile
router.patch('/profile/:id', updateUser);




export default router;