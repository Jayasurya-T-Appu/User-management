const jwt = require("jsonwebtoken")

const authenticateRequest = async (req, res, next) => {
    const path = req.path
    const isProtected = isProtectedRoute(path)
    if (isProtected) {
        const isAuthorized = await authenticateToken(req)
        if (isAuthorized.status !== 200) {
            return res.status(isAuthorized.status).json(isAuthorized.message)
        }
        return next()
    }
    return next()
}

const authenticateToken = async (req) => {
    const token = req.headers['authorization']?.split(" ")[1]
    if (!token) {
        return {
            status: 401,
            message: "Access denied. No token provided."
        }
    }
    try {
        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    reject({
                        status: 403,
                        message: "Autherization faild : Invalid token"
                    })
                } else {
                    resolve(user)
                }

            })
        })

        req.user = user
        return {
            status: 200,
            message: "Autherization successfull"
        }

    }
    catch (err) {
        return err;
    }


}

const isProtectedRoute = (route) => {
    const publicRoutes = [
        "/api/users/login",
        "/api/users/register",
        "api/users/health"
    ]
    return !publicRoutes.includes(route);

}
module.exports = authenticateRequest