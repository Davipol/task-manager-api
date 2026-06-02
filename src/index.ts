import router from "./routes/tasks";
import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", router);
app.listen(port, (error: unknown) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + port,
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
