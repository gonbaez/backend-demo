const express = require("express");
const app = express();

const theSimpsons = require("./simpsons.json");

// add an id to each character (note this is no tin the request as that would give a different ID each time)
theSimpsons.forEach((char, index) => {
  return (char.id = index + 1);
});

// handle reques to static files
app.use(express.static("public"));

// handle requests for dynamic data
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/quotes", (req, res) => {
  const { count = 1, character } = req.query; // destructuring with default value

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
  res.send(theSimpsonsCopy);
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
