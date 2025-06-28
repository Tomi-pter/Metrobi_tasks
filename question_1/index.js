function findDuplicates(arr) {
    const seen = new Map();
    const duplicates = new Map();

    for (const item of arr) {
        const key =
            typeof item === "object" && item !== null ?
            JSON.stringify(item, Object.keys(item).sort()) :
            item;

        if (seen.has(key)) {
            duplicates.set(key, item);
        } else {
            seen.set(key, item);
        }
    }

    return Array.from(duplicates.values());
}