import express, { Request, Response } from 'express';
import cors from "cors";
import authRoutes from "./routes/auth/config";
import dashboardRoutes from "./routes/dashboard/config";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";
import {connectWithRetry} from "./service/mongooseService"
const port = 3000;
const app = express();

// env config
dotenv.config()

// middlewares
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("trust proxy", 1);
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// services
if(process.env.NODE_ENV !== "test"){
  connectWithRetry()
}

// routes
app.use("/api/users",authRoutes);
app.use("/api/dashboard",dashboardRoutes);


// listening 
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, There .');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default app;
