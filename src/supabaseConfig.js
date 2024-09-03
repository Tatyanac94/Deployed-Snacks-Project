const axios = require('axios');
require('dotenv').config();

const axiosInstance = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1',
  timeout: 1000,
  headers: {
    apikey: process.env.SUPABASE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  },
});

module.exports = axiosInstance;
