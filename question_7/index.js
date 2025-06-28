function getMaxValue(carrotTypes, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    const composition = new Array(capacity + 1).fill(null).map(() => []);

    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < carrotTypes.length; i++) {
            const carrot = carrotTypes[i];

            if (carrot.kg <= w) {
                const newValue = dp[w - carrot.kg] + carrot.price;

                if (newValue > dp[w]) {
                    dp[w] = newValue;
                    composition[w] = [...composition[w - carrot.kg], i];
                }
            }
        }
    }

    const carrotCount = new Array(carrotTypes.length).fill(0);
    composition[capacity].forEach((carrotIndex) => {
        carrotCount[carrotIndex]++;
    });

    return {
        maxValue: dp[capacity],
        carrots: carrotCount
            .map((count, index) => ({
                type: carrotTypes[index],
                quantity: count,
                totalWeight: count * carrotTypes[index].kg,
                totalValue: count * carrotTypes[index].price,
            }))
            .filter((item) => item.quantity > 0),
    };
}

const carrotTypes = [
    { kg: 5, price: 100 },
    { kg: 7, price: 150 },
    { kg: 3, price: 70 },
];
const capacity = 36;

const detailedResult = getMaxValue(carrotTypes, capacity);
console.log("Maximum value:", detailedResult.maxValue);
detailedResult.carrots.forEach((item, index) => {
    console.log(
        `${item.quantity} units (${item.totalWeight}kg, $${item.totalValue})`
    );
    console.log(`Type: ${item.type.kg}kg, $${item.type.price}`);
});