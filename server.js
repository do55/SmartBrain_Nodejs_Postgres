import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import Clarifai from "clarifai";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import handleImage from "./controllers/image.js";
import handleApiCall from "./controllers/imageurl.js";

const appClarifai = new Clarifai.App({
  apiKey: "06c2eb8fa8134e4d80c9e1344b44c8cd",
});

const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-animate-09644",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

db.select("email")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  handleApiCall(req, res, appClarifai);
});

// app.listen(3000, () => {
//   console.log("app is running on port 3000");
// });

//ENVIRONMENT VARIABLE
const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
});
