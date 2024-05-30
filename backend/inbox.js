const express = require("express");
const router = express.Router();

const db = require("./firebase");
const { collection, getDocs, updateDoc, doc, addDoc, getDoc, deleteDoc, fromDate, Firestore, query, where } = require("firebase/firestore");

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let msgs = [];
        const usermsgs = await getDocs(collection(db, "users", id, "Inbox"));
        await Promise.all(usermsgs.docs.map(async (msg) => {
            const msgData = msg.data();
            // const fromDoc = await getDocs(query(collection(db, "users"), where("username", "==", msgData.From)))
            // const fromId = fromDoc.docs[0].id;
            const senderName = (await getDoc(doc(db, "users", msgData.From))).data()["username"];
            msgData["From"] = senderName;
            msgData['id'] = msg.id;
            msgs.push(msgData);
        }));
        res.status(200).json(msgs);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get("/draft/:id", async (req, res) => {
    try {
        console.log("hello");
        const users = await getDocs(collection(db, "users"));
        let usernames = [];
        users.forEach((user) => {
            userData = user.data();
            console.log(userData);
            usernames.push(userData["username"]);
        })
        const id = req.params.id;
        let username = null;
        if (id != 'x') {
            const user = await getDoc(doc(db, "users", id));
            username = user.data()["username"];
        }
        res.status(200).json({"usernames" : usernames, "username": username});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
})

router.delete("/:id/:msgId", async (req, res) => {
    try {
        console.log(req.params);
        const userId = req.params.id;
        const msgId = req.params.msgId;
        await deleteDoc(doc(db, "users", userId, "Inbox", msgId));
        res.status(200).json()
    } catch (e) {
        res.status(400).json({error: e.message});
    }
})

router.post("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newMsg = req.body;
        console.log(newMsg.to);
        const toDoc = await getDocs(query(collection(db, "users"), where("username", "==", newMsg.to)))
        const toId = toDoc.docs[0].id;
        const senderId = (await getDoc(doc(db, "users", id))).id;
        const msg = {
            "Title": newMsg.title,
            "Content": newMsg.content,
            "From": senderId
        }
        await addDoc(collection(db, "users", toId, "Inbox"), msg);
        // res.redirect("http://localhost:5173/inbox")
        res.status(200).json({message: `Successfully sent message to ${toId}`})
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;
