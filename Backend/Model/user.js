const mongoose=require("mongoose");
const UserSchema= new mongoose.Schema({


    firstName:{
        type:String,
        required:true,
        unique:true
        
    },

    lastName:{
        type:String,
        
        

    },

    emailId:{
        type:String,
         required:true,
       

        
    },

    password:{
        type:String,
        unique:true,
    
    },

    age:{
        type:Number,
      
    },

    gender:{
        type:String,
         
    },
     photoUrl: {
        type: String,
        required: false,
    },

    about:{
        type:String,
    }
   

});

    const UserModel=mongoose.model("User", UserSchema);

    module.exports=UserModel;