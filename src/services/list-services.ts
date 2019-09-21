import { sp } from '@pnp/sp';
import ServiceBase from './service-base';
import MockData from './mock-data';
import NominationData from '../entities/nomination';
import IUpdatedData from '../entities/updatedNominationItem';



class ListServices extends ServiceBase {
    public constructor() { 
        super();
    }

    public async getUserInfo(listName: string): Promise<any> {
        if (process.env.NODE_ENV === 'production') {
            const result: any[] = await sp.web.lists.getByTitle(listName).items
            .select('LatinFullName', 'EmailAddress', 'SPLatinFullName','Department','Id')
            .top(4900)
            .get();
            return Promise.resolve(result.map(({ SPLatinFullName: label, Id,EmailAddress,SPLatinFullName,Department }) => {
                return ({
                    label,
                    value: String(Id),
                    Department,
                    SPLatinFullName,
                    EmailAddress
                });
            }));
          
           
        }
        return Promise.resolve(MockData.getUserInfo);

    }
    /****************get nomination form data*****************************************************8 */
    public async getNominationData(itemId:number): Promise<NominationData> {
        if (process.env.NODE_ENV === 'production') {
        const items: any = await this.get("/survey/nomination?itemId="+itemId+"");
        console.log(items);
        return Promise.resolve(items.data);
        }
        return Promise.resolve(MockData.NominationData);
      }
      /*******************put nomination form data************************************************** */
      public async updateNominationData(param:IUpdatedData):Promise<IUpdatedData>{                  
        const items: any = await this.put("/survey/nomination",param);
        // console.log(items);
         return Promise.resolve(items.data);  
         
    }
}
export default ListServices;
