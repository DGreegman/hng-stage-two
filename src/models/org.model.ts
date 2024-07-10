import mongoose, { Schema } from 'mongoose'
import IOrg from '../interfaces/org.interface'
const org_schema = new Schema({
    name: {
        type: String,
        required: [true, '{PATH}  is required']
    },
    description: {
        type: String,
        required: [true, '{PATH}  is required']
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
)

const Org = mongoose.model<IOrg>('Orgnazation', org_schema);
export default Org;