import express from "express";
import {
    get,
    list,
    post,
    remove,
    update,
} from "../controllers/post.controller.js";

import authProtect from "../middleware/middleware.js";

const RouterPost = express.Router();

RouterPost.route("/").get(authProtect, list).post(post);
RouterPost.route("/:id").get(get).put(update).delete(remove);

export default RouterPost;
