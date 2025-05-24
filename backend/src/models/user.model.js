import {Schema,model} from "mongoose"

const userSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        maxlength:16,

    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",

    }


},{timestamps: true});

const User = model("User", userSchema);

export default User;