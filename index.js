import dotenv from 'dotenv';
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import cors from "cors";
import jwt from  "jsonwebtoken";
import cookieParser from 'cookie-parser';
import uploadRouter from './routes/uploadRoutes.js';
import { GridFSBucket} from "mongodb";
import { initializeMongoDb } from './utility/initialize-mongodb.js';
import { signinController } from './controllers/signin-controller.js';
import { signupController } from './controllers/signup-controller.js';
import { createPostController } from './controllers/createpost-controller.js';
import { userPostController } from './controllers/userpost-controller.js';
import { otherPostController } from './controllers/otherpost-controller.js';
import { userController } from './controllers/user-controller.js';
import { logoutController } from './controllers/logout-controller.js';
import { userUpdateController } from './controllers/userupdate-controller.js';
import { userDeleteController } from './controllers/userdelete-controller.js';
import { userEditController } from './controllers/useredit-controller.js';
import { fileController } from './controllers/file-controller.js';

dotenv.config();

app.use(
  cors({
    origin: "https://eco-wear.netlify.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const db = await initializeMongoDb();
export const gridfsBucket = new GridFSBucket(db, { bucketName: 'myCustomBucket' }); 

// generate token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, "your-secret-key", options);
};

// authenticate token
const authenticateToken = (req, res, next) => {
  // Get token from headers or cookies
  const token =
    req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
  //console.log("token: ",token)
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
};

app.use("/upload",uploadRouter);

app.get("/user", authenticateToken,userController);

app.post("/logout", logoutController);

app.put("/user/update", authenticateToken, userUpdateController);

app.put("/post/:id", userEditController);

app.get('/files/:id',fileController);

app.post("/signin", signinController);

app.post("/signup", signupController);

app.post("/createpost", authenticateToken, createPostController);

app.delete("/post/:postid", authenticateToken, userDeleteController);

app.get("/userposts", authenticateToken, userPostController);

app.get("/otherposts", authenticateToken, otherPostController);

app.get("/hello",(req,res)=>{
  res.send("Hello World!");
})


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

export default app;
