//routes/getSnacks.js
const axiosInstance = require('../supabaseConfig');

module.exports = async (req, res) => {
    try {
        const response = await axiosInstance.get('/snacks?order=id.asc');
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'An error occurred' });
    }
};
