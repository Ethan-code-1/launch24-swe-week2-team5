const express = require("express");
const router = express.Router();
const { getDoc, doc, updateDoc } = require('firebase/firestore');
const db = require("./firebase");

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        userData = (await getDoc(doc(db, "users", id))).data();
        res.status(200).json(userData);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.put("/update-name/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.username;
        await updateDoc(doc(db, "users", id), { username: name });
        res.status(200).json({message: `Successfully updated username`})
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;