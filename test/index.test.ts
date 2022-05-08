import app from '../src/server';

import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

describe('Test backend', () => {
    it('Testcase 1: User A', async () => {
        let postData = {
            dnd: [
                { "nutrient": "zinc", "target": 6.6 },
                { "nutrient": "vitamin d3", "target": 1500 }
            ]
        }
        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
    })

    it('Testcase 2: User B', async () => {
        let postData = {
            dnd: [
                { "nutrient": "zinc", "target": 2.6 },
                { "nutrient": "vitamin d3", "target": 3000 },
                { "nutrient": "omega 3", "target": 1500 }
            ]
        };

        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
    })

    it('Testcase 3: User C', async () => {
        let postData = {
            dnd: [
                { "nutrient": "zinc", "target": 3.6 },
                { "nutrient": "vitamin d3", "target": 3000 },
                { "nutrient": "omega 3", "target": 2000 }
            ]
        };

        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
    })
})