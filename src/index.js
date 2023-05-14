const express = require('express');
const path = require('path');
const cors = require("cors");
const { handleError } = require('./utils/error');

const recipesRouter = require('./routers/recipes');
const app = express();
app.use(cors());
app.use((req, res, next) => {
    const {method, path} = req;
    console.log(
        `New request to: ${method} ${path} at ${new Date().toISOString()}`
    );
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/recipes', recipesRouter);
app.use(handleError);
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server listening on port " + port)
});