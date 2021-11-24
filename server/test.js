const search = require("./search");
const randomWords = require("random-words");
const { performance } = require("perf_hooks");
const { resolve } = require("path");

/** ample files to run search **/
const searchFiles = [
  "french_armed_forces",
  "hitchhikers",
  "warp_drive",
  "large",
  "largest",
];

const runSearch = async (text, searchMethod) => {
  const result = searchFiles.reduce(
    (store, filename) => ({ ...store, [filename]: 0 }),
    {}
  );
  const start = performance.now();

  return new Promise((resolve) => {
    (async () => {
      for (let filename of searchFiles) {
        await search.searchText(filename, searchMethod, text).then((res) => {
          const end = performance.now();
          result[filename] = end - start;
        });
      }
      resolve(result);
    })();
  });
};

/** Run search text for a million random words **/
/** Print perfomance results: title is search type **/
const parallelSearch = async (searchMethod, title) => {
  (async () => {
    const data = [];

    for (let word of randomWords(2000000)) {
      await runSearch(word, searchMethod).then((res) => {
        data.push(res);
      });
    }

    const report = data.reduce((res, row) => {
      Object.entries(row).forEach(([key, val]) => {
        res[key] = (res[key] || 0) + val;
      });
      return res;
    }, {});

    console.log("\n" + title);
    console.table(report);
  })();
};

parallelSearch(1, "Simple search");
parallelSearch(2, "Regex search");
parallelSearch(3, "Indexed search");
