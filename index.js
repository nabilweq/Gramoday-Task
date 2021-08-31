const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const reportRoute = require("./routes/report");
const testRoute = require("./routes/test");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log("Database connection error "+ err.message);
    } else {
    console.log("Database connected");
    }
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/reports", reportRoute);
app.use("/test", testRoute);

app.listen(3000, () => {
    console.log("Server is running in port 3000");
})