import Mongoose from "mongoose";

const postsSchema = new Mongoose.Schema({
    title: {
        type: String,
        require: [true, "must contain title"],
    },
    body: {
        type: String,
        require: [true, "must contain body"],
    },
});

const Posts = Mongoose.model("Posts", postsSchema);

export default Posts;
