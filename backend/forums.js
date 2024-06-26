const express = require("express");
const router = express.Router();
const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, Timestamp , query , where , collectionGroup } = require("firebase/firestore");

function comp(a, b) {
    if (a["compDate"] > b["compDate"]) {
        return -1;
    } else {
        return 1;
    }
}

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
                postData.compDate = postData.Date.seconds;
                postData.Date = new Date(postData.Date.seconds * 1000).toString();
                postData.userId = id;
                posts.push(postData);
            });
        }));
        posts.sort(comp);
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
            postData.compDate = postData.Date.seconds;
            postData.Date = new Date(postData.Date.seconds * 1000).toString();
            posts.push(postData);
        });
        posts.sort(comp);
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
            upVoteUsers: [],
            downVoteUsers: []
        });
        res.status(200).json({ message: `Successfully created post with id ${docRef.id}` });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post("/vote/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { voteType, userId, postId } = req.body; // 'upvote' or 'downvote'
        console.log(id, userId, postId, voteType);

        const postRef = doc(db, "users", userId, "posts", postId);
        const postData = (await getDoc(postRef)).data()
        
        function rmUser(l, uid) {
            const i = l.indexOf(uid);
            if (i > -1) {
                l.splice(i, 1);
            }
        }

        const update = !((postData["downVoteUsers"].includes(id) && voteType == 'downvote') || (postData["upVoteUsers"].includes(id) && voteType == 'upvote'))

        rmUser( postData["downVoteUsers"], id);
        rmUser(postData["upVoteUsers"], id);
        
        if (update) {
            if (voteType == 'upvote') {
                postData["upVoteUsers"].push(id);
                console.log('up', postData["upVoteUsers"]);
            } else {
                postData["downVoteUsers"].push(id);
                console.log('down', postData["downVoteUsers"]);
            }
            await updateDoc(postRef, {"upVoteUsers": postData["upVoteUsers"]});
            await updateDoc(postRef, {"downVoteUsers": postData["downVoteUsers"]});
        }
       
        // const userDoc = await getDoc(doc(db, "users", userId));
        // if (!userDoc.exists) {
        //     return res.status(404).json({ error: "User not found" });
        // }
        // const postDoc = await getDoc(doc(db, "posts", postId));
        // if (!postDoc.exists) {
        //     return res.status(404).json({ error: "Post not found" });
        // }

        // // Retrieve the specific post within the user's posts collection
        // const userPostsCollection = collection(db, "users", userId, "posts");
        // const postSnapshot = await getDocs(userPostsCollection);
        // let postDocRef = null;

        // postSnapshot.forEach((post) => {
        //     if (post.id === userId) {
        //         postDocRef = post.ref;
        //     }
        // });

        // if (postDocRef === null) {
        //     return res.status(404).json({ error: "Post not found in user's posts" });
        // }

        // // Handle vote (upvote or downvote) on the post
        // const postData = (await getDoc(postDocRef)).data();
        // if (voteType === 'upvote') {
        //     postData.votes = (postData.votes || 0) + 1;
        // } else if (voteType === 'downvote') {
        //     postData.votes = (postData.votes || 0) - 1;
        // }

        // // Update the post document with the new vote count
        // await setDoc(postDocRef, postData);

        res.status(200).json({ message: "Vote recorded successfully" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
