if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expresssLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expresssLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); //default로 old accessing방법을 사용(사용성이 떨어지는 추세)
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
