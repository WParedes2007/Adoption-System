import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:{
        succes: false,
        msg: "Demasia.ñdas Peticiones Desde Esta IP, Intente Mas Tarde"
    }
})

export default limiter;