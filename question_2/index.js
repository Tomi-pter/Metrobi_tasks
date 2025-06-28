async function printWithDelay(array) {
    const promises = array.map((item, index) => {
        const delay = Math.pow(2, index) * 1000;

        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(item, `time delay: ${delay / 1000}s`);
                resolve();
            }, delay);
        });
    });

    await Promise.all(promises);
}

printWithDelay(["a", "b", "c", "d", "e"]);