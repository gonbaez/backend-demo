const express = require("express");
const router = express.Router();

const theSimpsons = require("../simpsons.json");

// add an id to each character (note this is no tin the request as that would give a different ID each time)
theSimpsons.forEach((char, index) => {
  return (char.id = index + 1);
});

let downloadCount = 0;

router.get("/quotes/:count/:character", (req, res) => {
  downloadCount++;
  const { count = 1, character } = req.params; // destructuring with default value

  let countAsNumber = Number(count);

  if (Number.isNaN(countAsNumber)) {
    res.send("Invalid query parameter");
    return;
    countAsNumber = 1;
  }

  // randomize the array
  let theSimpsonsCopy = [...theSimpsons];

  theSimpsonsCopy.sort(() => {
    return Math.random() - 0.5;
  });

  if (character) {
    theSimpsonsCopy = theSimpsonsCopy.filter((char) => {
      return char.character.toLowerCase().includes(character.toLowerCase());
    });
  }

  theSimpsonsCopy.length =
    countAsNumber > theSimpsonsCopy.length
      ? theSimpsonsCopy.length
      : countAsNumber;

  //   const randomNumber = Math.floor(Math.random() * theSimpsons.length);
  res.send({ copy: theSimpsonsCopy, downloadCount });
});

module.exports = router; // basically export
