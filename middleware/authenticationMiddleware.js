const jwt = require("jsonwebtoken")

/**
 * Middleware to authenticate requests for protected routes.
 * Verifies token for protected paths and proceeds if authorized.
 *
 * @param {Object} req - Request object containing the route path
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {void}
 */
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

/**
 * Verifies the JWT token from the request headers and authenticates the user.
 * Returns an object with status and message indicating success or failure.
 *
 * @param {Object} req - The HTTP request object containing the authorization token
 * @returns {Object} - An object with status and message indicating the result of the authentication
 */
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
/**
 * Checks if the given route is a protected route.
 * Returns true if the route is protected, false if public.
 *
 * @param {string} route - The route to check
 * @returns {boolean} - True if the route is protected, false otherwise
 */
const isProtectedRoute = (route) => {
    const publicRoutes = [
        "/api/users/login",
        "/api/users/register",
        "/api/users/password-reset",
        // "api/users/health"
    ]
    return !publicRoutes.includes(route);
}

const checkRoles = (...requiredRoles) =>{
    return (req, res, next) =>{
        if(!req.user || !req.user.role || !requiredRoles.includes(req.user.role)){
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    }
}
module.exports = authenticateRequest