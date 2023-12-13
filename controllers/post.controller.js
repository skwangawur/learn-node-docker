import Posts from "../models/posts.model.js";

export const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Posts.findById(id);

        if (!result) {
            return res.status(404).json({
                data: null,
                message: "Post not found",
            });
        }

        res.status(200).json({
            data: result,
            message: "Success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Internal server error",
        });
    }
};

export const list = async (req, res, next) => {
    try {
        console.log(req.session.user);
        const result = await Posts.find();

        console.log(req.session);
        res.status(200).json({
            data: result,
            message: "Success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Internal server error",
        });
    }
};

export const post = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Posts.create(data);

        req.session.user = "data";
        res.status(201).json({
            data: result,
            message: "Post created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Internal server error",
        });
    }
};

export const update = async (req, res, next) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const result = await Posts.findByIdAndUpdate(id, data, { new: true });

        if (!result) {
            return res.status(404).json({
                data: null,
                message: "Post not found",
            });
        }

        res.status(200).json({
            data: result,
            message: "Post updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Internal server error",
        });
    }
};

export const remove = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await Posts.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                data: null,
                message: "Post not found",
            });
        }

        res.status(200).json({
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Internal server error",
        });
    }
};
