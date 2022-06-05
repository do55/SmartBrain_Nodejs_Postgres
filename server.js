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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const appClarifai = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI,
});

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    port: 5432,
    ssl: true,
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
