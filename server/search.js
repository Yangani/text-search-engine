const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

/** Preprocess text before search **/
const tokenize = (str) => {
  const regExp = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g; // match panctuations

  /** remove punctuations --> remove spaces
   * --> toLowerCase --> split into array **/
  return str
    .replace(regExp, "")
    .replace(/\s{2,}/g, " ")
    .toLowerCase()
    .split(" ");
};

/** Search methods map **/
/** 1. Simple Search **/
/** 2. Regex Search **/
/** 3. Indexed Search **/
const wordCountMethods = {
  1: (words, text) => `${words}`.toLowerCase().split(text).length - 1,
  2: (words, text) => {
    const regExp = new RegExp(text, "gi");

    return (`${words}`.toLowerCase().match(regExp) || []).length;
  },
  3: (words, text) => {
    return tokenize(words).reduce((total, word) => {
      if (word.indexOf(text) !== -1) total++;
      return total;
    }, 0);
  },
};

/** Read text file and count words **/
const searchText = (filename, searchMethod, text) =>
  new Promise((resolve) => {
    const inStream = fs.createReadStream(`server/searchfiles/${filename}.txt`);
    const outStream = new stream();
    const rl = readline.createInterface(inStream, outStream);

    let count = 0;

    rl.on("line", (line) => {
      count += wordCountMethods[searchMethod](line, text) || 0;
    });
    rl.on("close", () => {
      resolve(count);
    });
  });

module.exports = {
  searchText,
};
