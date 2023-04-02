import express from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Up and running");
});

app.use("/api/", routes);
