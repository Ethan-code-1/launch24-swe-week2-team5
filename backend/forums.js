const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let posts = []
        const users = await getDocs(collection(db, "users"));
        await Promise.all(users.docs.map(async (user) => {
            const id = user.id;
            const userPosts = await getDocs(collection(db, "users", id, "posts"))
            userPosts.forEach((post) => {
                posts.push(post.data());
            })
        }));
        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let posts = []
        const userPosts = await getDocs(collection(db, "users", id, "posts"));
        userPosts.forEach((post) => {
            posts.push(post.data());
        })
        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;