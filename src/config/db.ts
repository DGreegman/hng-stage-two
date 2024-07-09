import mongoose from "mongoose";

const CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.iec4oco.mongodb.net/TEST`;
const connect =  async() => { 
    try {
        await mongoose.connect(CONNECTION_STRING).then((connected) => console.log(`Database Connected ${connected.connection.name} ${connected.connection.host}`))
    } catch (error : any) {
        console.log(error.name, error.message);
    }
}


export default connect;