import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => { 
    try {
        const user_id = req.body?.user_id || req.params?.user_id || req.ip;
        const success = await ratelimiter.limit(user_id);
        if(!success) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();

    } catch (error) {
        console.error("Error in rateLimiter middleware:", error);
        return res.status(500).json({ message: "Internal server error in ratelimiter" });
    }
}

export default rateLimiter;