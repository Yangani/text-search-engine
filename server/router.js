const express = require("express");
const router = express.Router();
const search = require("./search");
const { performance } = require("perf_hooks");

/** ample files to run search **/
const searchFiles = ["french_armed_forces", "hitchhikers", "warp_drive"];

/* GET: Search Fext File. */
router.get("/", function (req, res) {
  const text = req.query.searchText;
  const searchMethod = req.query.searchMethod;

  if (text.length === 0 || !(searchMethod !== (1 || 2 || 3))) {
    res.json({ error: "Invalid request!" });
  }

  const results = [];
  const start = performance.now();

  (async () => {
    for (let filename of searchFiles) {
      await search.searchText(filename, searchMethod, text).then((res) => {
        const end = performance.now();

        results.push({
          matches: res,
          name: filename,
          time: end - start,
        });
      });
    }

    res.json(results);
  })();
});

module.exports = router;
