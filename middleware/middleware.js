const authProtect = (req, res, next) => {
    console.log(req.session);
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
        });
    }

    console.log("ini session di middleware", req.session.user);
    next();
};

export default authProtect;
