import mongoose from 'mongoose'
import colors from 'colors'

const connectDB=async()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to Monogodb Database ${conn.connection.host}`)
    }
    catch(err){
        console.log(`Error in Mongodb${err}`.bgRed.white)
    }
}

export default connectDB;
 