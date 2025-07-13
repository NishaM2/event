const express = require("express")
const app = express()

const cors = require("cors");
app.use(cors());

require("./config/db")
const auth = require("./routes/")
app.use(express.json())

app.listen(3000);