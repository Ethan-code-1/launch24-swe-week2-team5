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
            let imagesArray = userData['spotify-data'].images;

            if (imagesArray && imagesArray.length > 0) {
                imageUrl = imagesArray[0].url; // Access the 'url' property correctly
            }

            eachProfile.push({
                id: userDoc.id,
                display_name: userData['spotify-data'].display_name,
                email: userData['spotify-data'].email,
                image: imageUrl, // Store the image URL instead of the array
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
