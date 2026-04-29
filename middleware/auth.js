const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, authorization denied.' });
        }

        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: 'Token verification failed, authorization denied.' });
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = auth;
