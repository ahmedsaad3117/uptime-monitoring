const express = require("express");
const userRoute = require("./route/user");
require("./db/mongoose");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(userRoute);

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
