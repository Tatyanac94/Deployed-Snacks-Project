const axiosInstance = require('../utils/supabaseConfig');

module.exports = async (req, res) => {
    try {
        const response = await axiosInstance.get('/snacks?order=id.asc');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching snacks:', error.message);
        res.status(error.response?.status || 500).json({
            error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred while fetching snacks.'
        });
    }
};
