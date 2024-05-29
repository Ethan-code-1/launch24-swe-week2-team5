const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, fromDate, Firestore, Timestamp } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let posts = []
        const users = await getDocs(collection(db, "users"));
        await Promise.all(users.docs.map(async (user) => {
            const id = user.id;
            const userPosts = await getDocs(collection(db, "users", id, "posts"))
            userPosts.forEach((post) => {
                const postData = post.data();
                postData.Date = new Date(postData['Date'].seconds*1000);
                postData.Date = postData.Date.toString();
                posts.push(postData);
            })
        }));
        console.log("all posts");
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
            const postData = post.data();
            postData.Date = new Date(postData['Date'].seconds*1000);
            postData.Date = postData.Date.toString();
            posts.push(postData);
        })
        console.log(posts);
        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const author = (await getDoc(doc(db, "users", id))).data()['spotify-data']['display_name'];
        const docRef = await addDoc(collection(db, "users", id, "posts"), {
            Author: author,
            Title: req.body.title,
            Content: req.body.content,
            Date: new Date(Date.now()),
            Votes: 0
        });
        res.status(200).json({message: `Successfully created post with id ${docRef.id}`})
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;