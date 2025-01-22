import express from "express";
import connectToDatabase from './connectToDatabase.js';
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

app.use('/', routes);

app.listen(3000, () => {
    connectToDatabase();
    console.log(`Server is up and running on 3000`)
});