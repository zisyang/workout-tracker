let mongoose = require("mongoose");
let db = require("../models");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

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



db.Workout.count(function (err, count) {
  if (err) return handleError(err);
  console.log('there are %d records', count);
  process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
