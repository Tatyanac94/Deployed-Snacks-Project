//routes/updateSnacks.js
const axiosInstance = require('../utils/supabaseConfig');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || price == null || category == null || inStock == null) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const response = await axiosInstance.patch(`/snacks?id=eq.${id}`, {
            name,
            description,
            price,
            category,
            inStock
        });
        console.log('Supabase Response:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error updating snack:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'An error occurred while updating the snack.'
        });
    }
};
