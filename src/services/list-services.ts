import { sp } from '@pnp/sp';
import ServiceBase from './service-base';
import MockData from './mock-data';



class ListServices extends ServiceBase {
    public constructor() { 
        super();
    }

    public async getUserInfo(listName: string): Promise<any> {
        if (process.env.NODE_ENV === 'production') {
            const result: any[] = await sp.web.lists.getByTitle(listName).items
            .select('LatinFullName', 'EmailAddress', 'SPLatinFullName','Department','Id')
            .get();
            return Promise.resolve(result.map(({ LatinFullName: label, Id }) => {
                return ({
                    label,
                    value: String(Id)
                });
            }));
          
           
        }
        return Promise.resolve(MockData.getUserInfo);

    }

}
export default ListServices;
