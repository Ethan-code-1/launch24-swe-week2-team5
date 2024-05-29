const express = require("express");
const router = express.Router();
const { getDocs, collection } = require('firebase/firestore');
const db = require("./firebase");

router.get("/", async (req, res) => {
    try {
        let eachProfile = [];
        const usersCollection = await getDocs(collection(db, "users"));

        usersCollection.forEach((userDoc) => {
            const userData = userDoc.data();
            let imageUrl = null;
            if (userData.images && Array.isArray(userData.images) && userData.images.length > 0) {
                imageUrl = userData.images[0].url; // Take the first image URL
            }
            eachProfile.push({
                id: userDoc.id,
                display_name: userData['spotify-data'].display_name,
                email: userData['spotify-data'].email,
                image: imageUrl,
            });
        });

        console.log("All user profiles:", eachProfile);
        res.status(200).json(eachProfile);
    } catch (e) {
        console.error("Error fetching users:", e);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
