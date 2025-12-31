function sanitizeRequest(req, res, next){

    const safeHeaders = {}
    const blacklist = ['__proto__', 'constructor', 'prototype']

    for(const [k, v] of Object.entries(req.headers || {})){
        if(!blacklist.includes(k.toLowerCase())){
            safeHeaders[k] = v;
        }
    }
    
    const safeBody = {}
    if(req.body && typeof req.body === 'object'){
        for(const [k, v] of Object.entries(req.body || {})){
            if(!blacklist.includes(k.toLowerCase())){
                safeBody[k] = v;
            }
        }
    }
    
    req.headers = safeHeaders;
    req.body = safeBody;
    next()
}

export default sanitizeRequest;