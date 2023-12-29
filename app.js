//mount the express instance
const express = require("express");
const app = express();
const port = 3000;

// Middleware to check if it's working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.send(
      "The web application is only available during working hours (Monday to Friday, 9 to 17)."
    );
  }
};

app.use(checkWorkingHours);

//set template engine
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

//Routes
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

//server listening port
app.listen(port, () => {
  console.log("Server is running at http://localhost:%s", port);
});
