const withAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No credentials sent!' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
};

module.exports = withAuth;