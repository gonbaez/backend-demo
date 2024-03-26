const express = require("express");
const router = express.Router();

router.post("/postDemo", (req, res) => {
  console.log(req.body);
  console.log("Post request received");
  res.send(req.body);
});

router.get("/about/:country", (req, res) => {
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

module.exports = router;
