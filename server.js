const express = require("express");
const app = express();

const theSimpsons = require("./simpsons.json");

// add an id to each character (note this is no tin the request as that would give a different ID each time)
theSimpsons.forEach((char, index) => {
  return (char.id = index + 1);
});

// handle reques to static files
app.use(express.static("public"));

app.get("/about/:country", (req, res) => {
  // res.send("<h1>Hello World!</h1>"); // This is how websites used to work (sending everything from the backend)

  switch (req.params.country) {
    case "france":
      res.send(`<div>
      <h1>French head office</h1>
      <p>123 Paris Road</p>
      <p>Paris</p>
      <p>SW1 1AB</p>
      </div>`);
      break;
    case "spain":
      res.send(`<div>
      <h1>Spanish head office</h1>
      <p>123 Madrid Road</p>
      <p>Madrid</p>
      <p>SW1 1AB</p>
      </div>`);
      break;
    case "germany":
      res.send(`<div>
      <h1>German head office</h1>
      <p>123 Berlin Road</p>
      <p>Berlin</p>
      <p>SW1 1AB</p>
      </div>`);
      break;
    default:
      res.send(`<div>
      <h1>Uk head office</h1>
      <p>123 London Road</p>
      <p>London</p>
      <p>SW1 1AB</p>
      </div>`);
  }
});

// handle requests for dynamic data
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/quotes/:count/:character", (req, res) => {
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
  res.send(theSimpsonsCopy);
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
