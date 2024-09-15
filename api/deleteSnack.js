//routes/deleteSnacks.js
const axiosInstance = require('../utils/supabaseConfig');

module.exports = async (req, res) => {
    const { id } = req.params;
    try {
        await axiosInstance.delete(`/snacks?id=eq.${id}`);
        res.json({ message: 'Snack deleted successfully' });
    } catch (error) {
        console.error('Error deleting snack:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'An error occurred while deleting the snack.'
        });
    }
};