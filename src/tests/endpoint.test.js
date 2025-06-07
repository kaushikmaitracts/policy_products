import {expect, test, jest} from '@jest/globals'
import { describe } from 'node:test'
import {request } from 'supertest'
import { app } from 'app.js'


const baseUrl = "https://localhost:3000/policies/";
const getPolicyById = pol_002;

describe('GET /policies API tests', () => {
    it('should return 200 with a finite policies array', async () => {
        const errorCollector = [];
        //const url = baseUrl + '/' + getPolicyById
        const response = await request(app).get('/policies/pol_002');
        softAssert(() => expect(response.status).toBe(200), errorCollector);
    });
})