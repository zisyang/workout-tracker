
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const PORT = process.env.PORT || 4000;

const app = express();

const dotenv = require("dotenv")
dotenv.config()

const uri = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.aazvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// connect to mongoose
mongoose.connect(
    uri,  // || process.env.MONGODB_URI || "mongodb://localhost/workout", {
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      //serverApi: ServerApiVersion.v1
    },
        () => console.log(" Mongoose is connected"),
);


// loggin middleware
app.use(logger("dev"));

// post request middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// statuc folder
app.use(express.static("public"));

// routes
// app.get("/", (req, res) => {
//     response.send("Hello World");
// });
app.use(apiRoutes);
app.use(htmlRoutes);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

app.listen(PORT, () => {
    console.log(`You are up and running on port ${PORT}`);
})