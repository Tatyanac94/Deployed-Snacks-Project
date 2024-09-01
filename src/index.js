require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const axiosInstance = require('./supabaseConfig'); // Adjusted path for the same directory

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Adjusted path for serving static files

// Serve the welcome page at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'welcome.html'));
});

// Serve the snacks page
app.get('/snacks.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'snacks.html'));
});

// Get a list of snacks
app.get('/snacks', async (req, res) => {
  try {
    const response = await axiosInstance.get('/snacks?order=id.asc');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
});

// Get a specific snack by ID
app.get('/snacks/:id', async (req, res) => {
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
});

// Add a new snack
app.post('/snacks', async (req, res) => {
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
});

// Update a snack by ID
app.put('/snacks/:id', async (req, res) => {
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
});

// Delete a snack by ID
app.delete('/snacks/:id', async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
