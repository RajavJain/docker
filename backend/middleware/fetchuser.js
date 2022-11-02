
//middleware ka use isliye kiya hai taaki jaha jaha hame user ki information chahiye hoga wo hum le lenge.... iski help se... to hame simply fetchuser daalna hai ek parameter m ke user information mill jaaega

var jwt = require('jsonwebtoken');//imported from jwt web token, use to sign the password follwed by salt
const JWT_SECRET = 'Signedby@RajavJain'//made the signed string which will be added in the password of the user

const fetchuser= (req, res, next)=>{ // isme next() jo diya hai wo auth.js mai /getuser router mai jo async function hai usko call kre ga 
    const token= req.header('auth-token');//ye hamne get user data thunder-client collection se liya hai... waha par humne header mai auth-token dala hai jis user ka data chahiye hai aur uska data dikha diya...
    if(!token){
        res.status(401).send({error: 'Please authenticate using a valid token'})
    }
    try {
        const data= jwt.verify(token, JWT_SECRET);//used verify function of jwt...
        req.user=data.user
        next();
    } catch (error) {
        res.status(401).send({error: 'Please authenticate using a valid token'})
    }
   
}



module.exports = fetchuser;