import { responses } from "../config/responses.js"

const IPs = new Map();
export default function rateLimiter(req, res, settings, next = () => {}){

    const {windowMs = 60000, maxReqs = 100} = settings;

    let ip = req.headers["X-forwarded-for"];

    if(ip){
        ip = ip.split(",")[0].trim();
    }else{
        ip = req.socket.remoteAddress;
    }

    const now = Date.now()

    if(IPs.has(ip)){
        const limit = IPs.get(ip);
        if(now > limit.resetTime + windowMs){
            IPs.delete(ip);
        }
    }
    
    let limit = IPs.get(ip);

    if(limit && limit.resetTime < now){
        limit.tokens = 0;
        limit.resetTime = now + windowMs;
    }

    if(!limit){
        limit = { tokens : 0, resetTime : now + windowMs}
        IPs.set(ip, limit);
    }

    if(limit.tokens >= maxReqs){
        const retryAfter = Math.ceil((limit.resetTime - now) / 1000);

        res.writeHead(
            responses.http.LIMIT_REACHED,
            {
                "Retry-After" : retryAfter.toString()
            }
        )
        // sendError(res, 429, responses.errors.LIMIT);
        res.end(JSON.stringify({error : responses.errors.LIMIT, retryAfter}));
        return;
    }

    limit.tokens++
    next();
}