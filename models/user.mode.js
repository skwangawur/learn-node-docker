import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        require: [true, "should contain username"],
    },
    password: {
        type: String,
        require: [true, "should contain password"],
    },
});

const User = Mongoose.model("User", userSchema);

export default User;
