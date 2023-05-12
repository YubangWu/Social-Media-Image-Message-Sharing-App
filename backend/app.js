const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello world");
});

const port = 8000;
app.listen(port, () => console.log(`App is running on port ${port}`));