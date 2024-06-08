const express = require("express");
const router = express.Router();

router.get('/foodData', (req, res) => {
    try {
        const responseData = {
            foodItems: global.food_items,
            foodCategory: global.foodCategory
        };
        res.status(200).send(responseData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
