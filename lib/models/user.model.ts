import mongoose from 'mongoose'
import { boolean } from 'zod'

const userSchema = new mongoose.Schema({
    id:{type: String, require: true},
    username:{type: String, require: true, unique: true},
    name:{type: String, require: true},
    image:{type: String,},
    bio:{type: String,},
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Thread"
        }
    ],
    onboarded:{
        type:boolean,
        default:false
    },
    communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'community'
        }
    ]
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;