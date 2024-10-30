let PORT =  8000;
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const {fetchMoviesFromWs} = require("../BackEnd/WebServices/moviesWS");
const {fetchMembersFromWs} = require("../BackEnd/WebServices/membersWs");

mongoose.connect("mongodb://127.0.0.1:27017/moviesSubManager").then(() => console.log("Connected to DB"));

app.use(express.json());
app.use(cors());


const authController = require("./Controllers/authController");
app.use("/auth", authController);

const membersController = require("./Controllers/membersController");
app.use("/members", membersController);

const moviesController = require("./Controllers//movieController");
app.use("/movies", moviesController);

const subscriptionsController = require("./Controllers/subscriptionController");
app.use("/subscriptions", subscriptionsController);

const usersController = require("./Controllers/usersControllers");
app.use("/users", usersController);

const permissionsController = require("./Controllers/permissionsController");
app.use("/permissions", permissionsController);

const usersJsonController = require('./Controllers/usersJsonController')
app.use("/usersjson", usersJsonController)


// http://localhost:8000
app.listen(PORT, async () => {
  try {
    await fetchMoviesFromWs();
    await fetchMembersFromWs();

    console.log("Data fetched and saved successfully.");
  
  } catch (error) {
    console.error("Error fetching data:", error.message)
    
  }
 console.log(`Server is running on port ${PORT}`);
});