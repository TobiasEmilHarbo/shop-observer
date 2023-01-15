import axios, { AxiosResponse } from "axios";
import { from, Observable } from "rxjs";

export class KlaravikHttpClient {
    private defaultPageSize = 30;
    private defaultPageNumber = 1;

    constructor(private host: string) {}

    public query(searchString: string, pageNumber: number = this.defaultPageNumber, pageSize: number = this.defaultPageSize): Observable<AxiosResponse<any, any>> {
        return from(axios.get(`${this.host}/auction/${pageNumber}/`, {
            params: {
                searchtext: searchString,
                setperpage: pageSize
            }
        }))
    }
}