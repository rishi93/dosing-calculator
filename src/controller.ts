import { PillModel } from "./models";
import getPills from "./utils";

export const getDailyPills = async (req, res) => {
    const dnd = req.body.dnd;

    const finalResult = []

    for (let deficiency of dnd) {
        let nutrient = deficiency.nutrient;
        let target = deficiency.target;
        const pills = await PillModel.find({ nutrient: nutrient });
        const result = getPills(target, pills);
        if (result.length == 1) {
            finalResult.push(`${result.length} pill of ${result[0].nutrient} of ${result[0].amount} ${result[0].unit}`)
        }
        else if (result.length > 1) {
            finalResult.push(`${result.length} pills of ${result[0].nutrient} of ${result.map(item => item.amount + item.unit)}`);
        }
    }

    console.log(finalResult);

    res.json({ result: finalResult });
}