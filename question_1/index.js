function findDuplicates(arr) {
  const seen = new Map();
  const duplicates = new Map();

  for (const item of arr) {
    const key =
      typeof item === "object" && item !== null
        ? JSON.stringify(item, Object.keys(item).sort())
        : item;

    if (seen.has(key)) {
      duplicates.set(key, item);
    } else {
      seen.set(key, item);
    }
  }

  return Array.from(duplicates.values());
}

const data = [
  { id: 1, name: "Alice" },
  { name: "Alice", id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 2 },
  42,
  "hello",
  42,
];

const dupes = findDuplicates(data);
console.log(dupes);
