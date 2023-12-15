import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import Redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import userRouter from "./routers/user.router.js";
import postRouter from "./routers/routers.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const redisClient = Redis.createClient({
    port: config.REDIS_PORT,
    host: config.REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/test?authSource=admin`;

const mongoConnectRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            setTimeout(mongoConnectRetry, 5000);
        });
};

mongoConnectRetry();
const RedisStore = connectRedis(session);

app.enable("trust proxy");
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: config.REDIS_SECRET, // a secret string used to sign the session ID cookie
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        cookie: {
            secure: true,
            maxAge: 360000,
        },
    })
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", (req, res) => {
    res.send("Halo");
    console.log("test");
});
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
