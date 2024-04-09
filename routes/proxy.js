const express = require("express");
const router = express.Router();
const axios = require("axios");
const asyncMySQL = require("../mySql/driver");

router.get("/:searchTerm", async (req, res) => {
  const cachedResponse = await asyncMySQL(
    `SELECT response FROM cache WHERE search_term = '${req.params.searchTerm}'`
  );

  if (cachedResponse.length > 0) {
    console.log("Cache hit");
    const data = JSON.parse(
      Buffer.from(cachedResponse[0].response, "base64").toString("utf-8")
    );
    res.send(data);
    return;
  }

  try {
    const { searchTerm } = req.params;

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQ2YjFmOGE4ZmM2ZGJmOGU0YWY0M2U3MzBhNDY2MSIsInN1YiI6IjY0Nzc4OGJhOTM4MjhlMDBiZjljOTkwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PaH_RToi9pI0GJ_K_BtR3PlwJiScoFClmEfUqXuUzo`,
        },
      }
    );

    const b64 = Buffer.from(JSON.stringify(data)).toString("base64");

    const result = await asyncMySQL(
      `INSERT INTO cache (search_term, response) VALUES ('${searchTerm}', '${b64}')`
    );

    res.send(data);
  } catch (e) {
    res.send({ status: 0, reason: e });
  }
});

module.exports = router;
