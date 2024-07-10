import IOrg from "../interfaces/org.interface";
import Org from "../models/org.model";

class Org_Service {
    async create_org_service(data: IOrg): Promise<IOrg> {
        const org = new Org(data);
        return await org.save();
    }
}

export default new Org_Service();