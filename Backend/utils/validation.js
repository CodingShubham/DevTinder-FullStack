const validator=require("validator");

const validateSignupData=(req)=>{

    const{firstName,lastName,emailId,password}=req.body;

    if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)){
          throw new Error("Password is not valid");
    }
}


const validateEditProfile=(req)=>{

    const allowedEditFields=["firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",];
   

   const isallowedProfileEdit=Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isallowedProfileEdit;
}



module.exports={validateSignupData,validateEditProfile};