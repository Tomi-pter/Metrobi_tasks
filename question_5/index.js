function twoEggOptimal(floors) {
    let minDrops = Infinity;
    let bestFirstFloor = 1;

    for (let firstDrop = 1; firstDrop <= floors; firstDrop++) {
        let maxDropsNeeded = 1 + (firstDrop - 1);

        let remainingFloors = floors - firstDrop;
        if (remainingFloors > 0) {
            let currentFloor = firstDrop;
            let interval = firstDrop - 1;
            let drops = 1;

            while (currentFloor < floors) {
                currentFloor += interval;
                interval = Math.max(1, interval - 1);
                drops++;
                if (currentFloor >= floors) break;
            }

            maxDropsNeeded = Math.max(
                maxDropsNeeded,
                drops + (floors - (currentFloor - interval))
            );
        }

        if (maxDropsNeeded < minDrops) {
            minDrops = maxDropsNeeded;
            bestFirstFloor = firstDrop;
        }
    }

    return minDrops;
}

console.log("Optimal Solution for 100 floors:", twoEggOptimal(100));