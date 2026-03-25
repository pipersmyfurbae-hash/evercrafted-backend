const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use('/run-engine', async (req, res) => {
    try {
        const response = await axios.post('https://evercrafted-engine-production.up.railway.app/run-engine', req.body, {
            headers: {
                'Content-Type': 'application/json',
                ...req.headers,
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

module.exports = router;