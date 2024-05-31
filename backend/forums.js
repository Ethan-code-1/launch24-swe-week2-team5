const express = require("express");
const router = express.Router();
const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, Timestamp , query , where , collectionGroup } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        let posts = []
        const users = await getDocs(collection(db, "users"));
        await Promise.all(users.docs.map(async (user) => {
            const id = user.id;
            const userPosts = await getDocs(collection(db, "users", id, "posts"));
            userPosts.forEach((post) => {
                const postData = post.data();
                postData.id = post.id;  // Add post id to the data
                postData.Date = new Date(postData.Date.seconds * 1000).toString();
                postData.userId = id;
                posts.push(postData);
            });
        }));
        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let posts = []
        const userPosts = await getDocs(collection(db, "users", id, "posts"));
        userPosts.forEach((post) => {
            const postData = post.data();
            postData.id = post.id;  // Add post id to the data
            postData.Date = new Date(postData.Date.seconds * 1000).toString();
            posts.push(postData);
        });
        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const author = (await getDoc(doc(db, "users", id))).data()['spotify-data']['display_name'];
        const docRef = await addDoc(collection(db, "users", id, "posts"), {
            Author: author,
            Title: req.body.title,
            Content: req.body.content,
            Date: new Date(Date.now()),
            Votes: 1,
            upVoteUsers: [id],
            downVoteUsers: []
        });
        res.status(200).json({ message: `Successfully created post with id ${docRef.id}` });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get("/:userId/vote/:postId", async (req, res) => {
    try {
        const { userId, postId } = req.params;
        const { voteType, userPostId } = req.body; // 'upvote' or 'downvote'
        console.log(userId, postId, voteType, userPostId);  

        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists) {
            return res.status(404).json({ error: "User not found" });
        }
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (!postDoc.exists) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Retrieve the specific post within the user's posts collection
        const userPostsCollection = collection(db, "users", userId, "posts");
        const postSnapshot = await getDocs(userPostsCollection);
        let postDocRef = null;

        postSnapshot.forEach((post) => {
            if (post.id === userPostId) {
                postDocRef = post.ref;
            }
        });

        if (postDocRef === null) {
            return res.status(404).json({ error: "Post not found in user's posts" });
        }

        // Handle vote (upvote or downvote) on the post
        const postData = (await getDoc(postDocRef)).data();
        if (voteType === 'upvote') {
            postData.votes = (postData.votes || 0) + 1;
        } else if (voteType === 'downvote') {
            postData.votes = (postData.votes || 0) - 1;
        }

        // Update the post document with the new vote count
        await setDoc(postDocRef, postData);

        res.status(200).json({ message: "Vote recorded successfully" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
