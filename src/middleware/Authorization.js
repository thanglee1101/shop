

module.exports.authoriationAdmin= async(req,res,next)=>{
    const role=req.user.role
    if(role==="Admin"){
        return next()
    }else{
        res.status(401).json({message:"The user does not have permission to access the resource"})
    }
}