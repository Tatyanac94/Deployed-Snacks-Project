const axiosInstance = require('../utils/supabaseConfig');

module.exports = async (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || price == null || category == null || inStock == null) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const response = await axiosInstance.post('/snacks', {
            name,
            description,
            price,
            category,
            inStock
        });
        console.log('Supabase Response:', response.data);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error adding snack:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'An error occurred while adding the snack.'
        });
    }
};