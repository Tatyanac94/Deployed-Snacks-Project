const request = require('supertest');
const app = require('../index'); // Adjust the path to your app

describe('Snacks API', () => {
    let snackId;

    // Test GET /snacks
    describe('GET /snacks', () => {
        it('should retrieve all snacks', async () => {
            const res = await request(app).get('/snacks');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    // Test POST /snacks
    describe('POST /snacks', () => {
        it('should create a new snack', async () => {
            const newSnack = {
                name: 'Chips',
                description: 'Crunchy and salty',
                price: 1.99,
                category: 'Snacks',
                inStock: true
            };
            const res = await request(app)
                .post('/snacks')
                .send(newSnack);
            
            snackId = res.body.id; // Assuming response includes the created snack's id
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject(newSnack);
        });
    });

    // Test GET /snacks/:id
    describe('GET /snacks/:id', () => {
        it('should retrieve a snack by ID', async () => {
            const res = await request(app).get(`/snacks/${snackId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', snackId);
        });

        it('should return 404 if snack not found', async () => {
            const res = await request(app).get('/snacks/999999');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error', 'Snack not found');
        });
    });

    // Test PUT /snacks/:id
    describe('PUT /snacks/:id', () => {
        it('should update a snack', async () => {
            const updatedSnack = {
                name: 'Chips',
                description: 'Crunchy and extra salty',
                price: 2.49,
                category: 'Snacks',
                inStock: true
            };
            const res = await request(app)
                .put(`/snacks/${snackId}`)
                .send(updatedSnack);
            
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(updatedSnack);
        });
    });

    // Test DELETE /snacks/:id
    describe('DELETE /snacks/:id', () => {
        it('should delete a snack', async () => {
            const res = await request(app).delete(`/snacks/${snackId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Snack deleted successfully');
        });

        it('should return 404 if trying to delete a non-existent snack', async () => {
            const res = await request(app).delete('/snacks/999999');
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error', 'Snack not found');
        });
    });
});
