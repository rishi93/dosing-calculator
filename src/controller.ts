import { PillModel } from "./models";
import getPills from "./utils";

export const getDailyPills = async (req, res) => {
    const users = req.body;

    const finalResponse = {}

    for (let user in users) {
        let user_dnd = users[user].dnd;
        let prescriptions = [];

        for (let deficiency of user_dnd) {
            let nutrient = deficiency.nutrient;
            let target = deficiency.target;
            const pills = await PillModel.find({ nutrient: nutrient });
            const result = getPills(target, pills);
            if (result.length == 1) {
                let new_prescription = `${result.length} pill of ${result[0].nutrient} of ${result[0].amount} ${result[0].unit}`;
                prescriptions.push(new_prescription);
            }
            else if (result.length > 1) {
                let new_prescription = `${result.length} pills of ${result[0].nutrient} of ${result.map(item => item.amount + item.unit)}`;
                prescriptions.push(new_prescription);
            }
        }

        finalResponse[user] = { prescriptions: prescriptions };
    }

    console.log(finalResponse);

    res.json(finalResponse);
}