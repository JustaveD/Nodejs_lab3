const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");

const welcomeRouter = require("./routers/welcome");
const adminRouter = require("./routers/admin");
const shopRouter = require("./routers/shop");
const pageNotFoundRouter = require("./routers/error");

const app = express();
const port = 3000;

// setup for ejs
app.set("view engine", "ejs");
app.set("views", "views");

// setup for public resources
app.use(express.static(path.join(rootDir,"public")));

// routers
app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.use(welcomeRouter);
app.use(pageNotFoundRouter);


app.listen(port, () => {
    console.log(`Server in running on port ${port}`);
})