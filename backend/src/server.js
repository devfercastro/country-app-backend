import express from "express";
import router from "./routes/index.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", router);

export default app;
