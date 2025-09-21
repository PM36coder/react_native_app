import jwt from 'jsonwebtoken'

export const authTokenMiddleware = async(req,res,next)=>{

    const token = req.header("Authorization")

    if(!token){
        return res.status(404).json({message: "Access Denied"})
    }

    const jwtToken = token.replace("Bearer " , "").trim()

    try {
        const decode = jwt.verify(jwtToken,process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        return res.status(500).json({message: "invalid token"})
    }
}