// यहा हम authentication का राउट बनेंगे 

import express from "express";


// ======================================
// ye functions import कीये, क्यू कीये ये हम जानेंगे 
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// ===========================================================

const router = express.Router();



// हमने राउट इम्पोर्ट किया 

// read commented code first

// ============================================

// router.get("/signup", (req, res) => {
//     res.send("signup page")
// });


// ============================================

// यहा राउटर पर हम और राउट बनाएंगे 
// और other pages 


// ध्यान दे 
//     get method when backend to frontent
//     post method when frontend to backedn


// ============================================
// router.get("/login", (req, res) => {
//     res.send("login page")
// });
// router.get("/logout", (req, res) => {
//     res.send("log out page")
// });

// ============================================
// हमने ये comment क्यू कर दिए 
// क्युकी its a better practice
// to have these function in controller file

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
 
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
// router.get("/check", protectRoute, checkAuth)
export default router;