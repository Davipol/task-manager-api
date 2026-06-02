import { errorHandler } from "./middleware/errorHandler";
import router from "./routes/tasks";
import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);
app.listen(port, () => {
  console.log(
    "Server is Successfully Running, and App is listening on port " + port,
  );
});
