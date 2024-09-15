const request = require('supertest');
const { app } = require('../api/index'); // Import the app instance

describe('Snacks API', () => {
    // Example data
    let snackId;

    // Test GET /snacks
    test('GET /snacks should return a list of snacks', async () => {
        const response = await request(app).get('/snacks');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST /snacks
    test('POST /snacks should create a new snack', async () => {
        const newSnack = {
            name: 'Chocolate Bar',
            description: 'A delicious chocolate bar',
            price: 1.99,
            category: 'Candy',
            inStock: true,
        };

        const response = await request(app).post('/snacks').send(newSnack);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newSnack.name);
        snackId = response.body.id; // Save the ID for later tests
    });

    // Test PUT /snacks/:id
    test('PUT /snacks/:id should update an existing snack', async () => {
        const updatedSnack = {
            name: 'Updated Chocolate Bar',
            description: 'An updated description',
            price: 2.99,
            category: 'Candy',
            inStock: false,
        };

        const response = await request(app).put(`/snacks/${snackId}`).send(updatedSnack);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedSnack.name);
        expect(response.body.price).toBe(updatedSnack.price);
    });

    // Test DELETE /snacks/:id
    test('DELETE /snacks/:id should delete a snack', async () => {
        const response = await request(app).delete(`/snacks/${snackId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Snack deleted successfully');
    });

    // Optionally, you can test GET /snacks to ensure the snack was deleted
    test('GET /snacks should not include deleted snack', async () => {
        const response = await request(app).get('/snacks');
        expect(response.statusCode).toBe(200);
        const deletedSnack = response.body.find(snack => snack.id === snackId);
        expect(deletedSnack).toBeUndefined();
    });
});
