function isValidBrackets(str) {
  const stack = [];
  const brackets = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (const char of str) {
    if (brackets[char]) {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.length === 0) {
        return false;
      }

      const lastOpening = stack.pop();
      if (brackets[lastOpening] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log("{[]} " + isValidBrackets("{[]}"));
console.log("{(])} " + isValidBrackets("{(])}"));
console.log("{([)]} " + isValidBrackets("{([)]}"));
console.log("()[]{} " + isValidBrackets("()[]{}"));
console.log("([{}]) " + isValidBrackets("([{}])"));
console.log("(( " + isValidBrackets("(("));
console.log("abc{[d]e}f " + isValidBrackets("abc{[d]e}f"));
