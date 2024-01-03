const {rateLimit} = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

// Apply the rate limiting middleware to all requests.
module.exports= limiter;