/* import mongoose from 'mongoose';

const CONNECTION_STRING : string | any = process.env.MONGO_URL as string;
const connect = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING).then((connected) => console.log(`Database Connected ${connected.connection.name} ${connected.connection.host}`));
    } catch (error: any) {
        console.log(error.name, error.message);
    }
};

export default connect; */

import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_URL;

if (!CONNECTION_STRING) {
    console.error('MONGO_URL environment variable is not set');
    process.exit(1);
}

const connect = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log(`Database Connected: ${mongoose.connection.name} ${mongoose.connection.host}`);
    } catch (error: any) {
        console.error('Database connection error:', error.name, error.message);
    }
};

export default connect;
