const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const connectDB = require("./dbinit");
const userRoutes = require("./routes/user");
const postsRoute = require("./routes/posts");

const PORT = process.env.PORT;
//invoke connectDB function after port declaring
connectDB();

//necessary middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//http://localhost:8080/user/signup
//http://localhost:8080/user/login
app.use("/user", userRoutes);
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to JWT Authentication");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
