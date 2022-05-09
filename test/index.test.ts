import app from '../src/server';
import { PillModel } from '../src/models';

import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

beforeEach(() => {
    PillModel.insertMany([
        { nutrient: "zinc", amount: 22, absorption: 0.15, unit: "mg" },
        { nutrient: "zinc", amount: 30, absorption: 0.1, unit: "mg" },
        { nutrient: "zinc", amount: 50, absorption: 0.1, unit: "mg" },
        { nutrient: "vitamin d3", amount: 1000, absorption: 0.78, unit: 'iU' },
        { nutrient: "vitamin d3", amount: 3000, absorption: 0.78, unit: "iU" },
        { nutrient: "omega 3", amount: 750, absorption: 1.0, unit: "mg" },
        { nutrient: "omega 3", amount: 1400, absorption: 1.0, unit: "mg" }
    ]);
})

describe('Test backend', () => {
    it('Testcase 1: User A', async (done) => {
        let postData = {
            dnd: [
                { "nutrient": "zinc", "target": 6.6 },
                { "nutrient": "vitamin d3", "target": 1500 }
            ]
        }
        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
        done();
    })

    it('Testcase 2: User B', async (done) => {
        let postData = {
            dnd: [
                { "nutrient": "zinc", "target": 2.6 },
                { "nutrient": "vitamin d3", "target": 3000 },
                { "nutrient": "omega 3", "target": 1500 }
            ]
        };

        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
        done();
    })

    it('Testcase 3: User C', async (done) => {
        let postData = {
            dnd: [
                { "nutrient": "zinc", "target": 3.6 },
                { "nutrient": "vitamin d3", "target": 3000 },
                { "nutrient": "omega 3", "target": 2000 }
            ]
        };

        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
        done();
    })
})