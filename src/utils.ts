// Recursive helper function
const helper = (amount, target, lowLimit, highLimit, pills, result, i) => {
    // Return if end of list reached
    if (i >= pills.length) {
        return result;
    }
    // Stop when amount within threshold
    if (lowLimit <= amount && amount <= highLimit) {
        return result;
    }

    let pill = pills[i];
    let effective_amount = pill.amount * pill.absorption;

    if (effective_amount <= target) {
        result.push(pill)
        return helper(amount + effective_amount, target - effective_amount, lowLimit, highLimit, pills, result, i);
    }
    else {
        return helper(amount, target, lowLimit, highLimit, pills, result, i + 1);
    }
}

const getPills = (target, pills) => {
    let result = [];

    let lowLimit = target - (0.3 * target);
    let highLimit = target + (0.2 * target);

    return helper(0, target, lowLimit, highLimit, pills, result, 0);
}

export default getPills;