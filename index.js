const getSearchResult = require("./scraper");
const express = require("express");

const app = express();

app.get("/get-result", async (req, res) => {
  const { query, tag, club } = req.query;
  const result = await getSearchResult(query, tag, club);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
