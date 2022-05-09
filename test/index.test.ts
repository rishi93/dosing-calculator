import app from '../src/server';

import { PillModel } from '../src/models';

import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

describe('Test backend', () => {
    /* Prepopulate the inventory */
    before(async () => {
        await PillModel.insertMany([
            { nutrient: "zinc", amount: 22, absorption: 0.15, unit: "mg" },
            { nutrient: "zinc", amount: 30, absorption: 0.1, unit: "mg" },
            { nutrient: "zinc", amount: 50, absorption: 0.1, unit: "mg" },
            { nutrient: "vitamin d3", amount: 1000, absorption: 0.78, unit: 'iU' },
            { nutrient: "vitamin d3", amount: 3000, absorption: 0.78, unit: "iU" },
            { nutrient: "omega 3", amount: 750, absorption: 1.0, unit: "mg" },
            { nutrient: "omega 3", amount: 1400, absorption: 1.0, unit: "mg" }
        ]);
    })

    it('Testcase 1', async () => {
        let postData = {
            "userA": {
                "dnd": [
                    { "nutrient": "zinc", "target": 6.6 },
                    { "nutrient": "vitamin d3", "target": 1500 }
                ]
            },
            "userB": {
                "dnd": [
                    { "nutrient": "zinc", "target": 2.6 },
                    { "nutrient": "vitamin d3", "target": 3000 },
                    { "nutrient": "omega 3", "target": 1500 }
                ]
            },
            "userC": {
                "dnd": [
                    { "nutrient": "zinc", "target": 3.6 },
                    { "nutrient": "vitamin d3", "target": 3000 },
                    { "nutrient": "omega 3", "target": 2000 }
                ]
            }
        };

        /* This is the response returned that SHOULD BE returned */
        let expectedResponse = {
            "userA": {
                "prescriptions": [
                    '2 pills of zinc of 22mg,22mg',
                    '1 pill of vitamin d3 of 1000 iU'
                ]
            },
            "userB": {
                "prescriptions": [
                    '3 pills of vitamin d3 of 1000iU,1000iU,1000iU',
                    '2 pills of omega 3 of 750mg,750mg'
                ]
            },
            "userC": {
                "prescriptions": [
                    '1 pill of zinc of 22 mg',
                    '3 pills of vitamin d3 of 1000iU,1000iU,1000iU',
                    '2 pills of omega 3 of 750mg,750mg'
                ]
            }
        }

        let res = await chai.request(app).post('/dnd').send(postData);
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body).to.have.property("userA");
        chai.expect(res.body).to.have.property("userB");
        chai.expect(res.body).to.have.property("userC");
        chai.expect(res.body.userA).to.have.property("prescriptions");
        chai.expect(res.body.userA.prescriptions).to.be.an('array');
        chai.expect(res.body.userB).to.have.property("prescriptions");
        chai.expect(res.body.userB.prescriptions).to.be.an('array');
        chai.expect(res.body.userC).to.have.property("prescriptions");
        chai.expect(res.body.userC.prescriptions).to.be.an('array');
        // Just a quick check to see we are getting the expected response
        chai.expect(res.body).to.deep.equal(expectedResponse);
    })
})