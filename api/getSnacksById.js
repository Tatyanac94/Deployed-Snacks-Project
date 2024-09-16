const axiosInstance = require('../utils/supabaseConfig');

module.exports = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axiosInstance.get(`/snacks?id=eq.${id}`);
        if (response.data.length > 0) {
            res.json(response.data[0]);
        } else {
            res.status(404).json({ error: 'Snack not found' });
        }
    } catch (error) {
        console.error('Error fetching snack by ID:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'An error occurred while fetching the snack.'
        });
    }
};
