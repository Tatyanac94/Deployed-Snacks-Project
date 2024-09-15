// //api/updateSnack.js
// const axiosInstance = require('../utils/supabaseConfig');

// module.exports = async (req, res) => {
//     const { id } = req.params;
//     const { name, description, price, category, inStock } = req.body;

// if (!name || typeof name !== 'string') {
//     return res.status(400).json({ error: 'Invalid or missing name' });
// }
// if (!description || typeof description !== 'string') {
//     return res.status(400).json({ error: 'Invalid or missing description' });
// }
// if (typeof price !== 'number') {
//     return res.status(400).json({ error: 'Invalid price' });
// }
// if (!category || typeof category !== 'string') {
//     return res.status(400).json({ error: 'Invalid or missing category' });
// }
// if (typeof inStock !== 'boolean') {
//     return res.status(400).json({ error: 'Invalid inStock value' });
// }

//     try {
//         const response = await axiosInstance.patch(`/snacks?id=eq.${id}`, {
//             name,
//             description,
//             price,
//             category,
//             inStock
//         });
//         console.log('Supabase Response:', response.data);
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error updating snack:', error.message);
//         res.status(error.response?.status || 500).json({
//             error: error.response?.data?.message || 'An error occurred while updating the snack.'
//         });
//     }
// };





// api/updateSnack.js
const express = require('express');
const router = express.Router();
const axiosInstance = require('../utils/supabaseConfig');

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || price == null || category == null || inStock == null) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const response = await axiosInstance.put(`/snacks?id=eq.${id}`, { name, description, price, category, inStock });
        console.log('Supabase Response:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error updating snack:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'An error occurred while updating the snack.'
        });
    }
});

module.exports = router;
