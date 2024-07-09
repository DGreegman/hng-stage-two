import {Document} from 'mongoose'

interface IOrg extends Document { 
    name: string;
    description: string;
}

export default IOrg;