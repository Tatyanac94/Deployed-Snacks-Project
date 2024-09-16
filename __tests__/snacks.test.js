require('dotenv').config();

const request = require('supertest');
const app = require('../index');
const axiosInstance = require('../utils/supabaseConfig');

jest.mock('../utils/supabaseConfig');

describe('API Routes', () => {
  let snackId = null;

  beforeAll(() => {
    snackId = null; 
  });

  afterAll(() => {
  });

  it('should return the welcome page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
  });

  it('should return the snacks page', async () => {
    const response = await request(app).get('/snacks');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
  });

  it('should return all snacks', async () => {
    const mockSnacks = [
      { id: 1, name: 'Chips', description: 'Crunchy potato chips', price: 1.5, category: 'Salty', inStock: true },
    ];

    axiosInstance.get.mockResolvedValue({ data: mockSnacks });

    const response = await request(app).get('/api/snacks');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toEqual(mockSnacks);
  });

  it('should create a new snack', async () => {
    const newSnack = {
      name: 'Chips',
      description: 'Crunchy potato chips',
      price: 1.5,
      category: 'Salty',
      inStock: true
    };

    const createdSnack = { id: 1, ...newSnack };
    axiosInstance.post.mockResolvedValue({ data: createdSnack });

    const response = await request(app)
      .post('/api/snacks')
      .send(newSnack)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toMatchObject(newSnack);
    expect(response.body).toHaveProperty('id');
    snackId = response.body.id;

    console.log(`Created snack with ID: ${snackId}`); 
  });

  it('should return a snack by ID', async () => {
    if (snackId === null || typeof snackId !== 'number') {
      throw new Error('No valid snack ID available for testing');
    }

    const mockSnack = {
      id: snackId,
      name: 'Chips',
      description: 'Crunchy potato chips',
      price: 1.5,
      category: 'Salty',
      inStock: true
    };

    axiosInstance.get.mockResolvedValue({ data: [mockSnack] });

    const response = await request(app)
      .get(`/api/snacks/${snackId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject(mockSnack);
  });

  it('should update a snack by ID', async () => {
    if (snackId === null || typeof snackId !== 'number') {
      throw new Error('No valid snack ID available for testing');
    }

    const updatedSnack = {
      name: 'Updated Chips',
      description: 'Crunchier potato chips',
      price: 2.0,
      category: 'Salty',
      inStock: false
    };

    axiosInstance.put.mockResolvedValue({ data: { id: snackId, ...updatedSnack } });

    const response = await request(app)
      .put(`/api/snacks/${snackId}`)
      .send(updatedSnack)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject(updatedSnack);
  });

  it('should delete a snack by ID', async () => {
    if (snackId === null || typeof snackId !== 'number') {
      throw new Error('No valid snack ID available for testing');
    }

    axiosInstance.delete.mockResolvedValue({ data: { message: 'Snack deleted successfully' } });

    await request(app)
      .delete(`/api/snacks/${snackId}`)
      .expect(200);

    axiosInstance.get.mockResolvedValue({ data: [] });

    const response = await request(app)
      .get(`/api/snacks/${snackId}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Snack not found');
  });
});
