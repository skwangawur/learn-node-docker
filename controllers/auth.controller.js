import User from "../models/user.mode.js"; // Assuming the correct path to your user model
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            username,
            password: hashPassword,
        });

        req.session.user = result;

        res.status(201).json({
            status: "success",
            data: {
                user: result,
                session: req.session.user,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "fail",
            message: "Failed to create user",
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "Username or password not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid password",
            });
        }

        req.session.user = user;

        res.status(200).json({
            status: "success",
            data: {
                user: "Successfully logged in",
            },
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "fail",
            message: "Failed to login",
        });
    }
};
