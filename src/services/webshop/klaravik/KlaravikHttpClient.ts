import axios, { AxiosError, AxiosResponse } from "axios";
import { catchError, from, Observable, retry } from "rxjs";
import { genericRetryConfig } from "../../genericRetryConfig";

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
    })).pipe(
        retry(
          genericRetryConfig({
            excludedStatusCodeFamilies: [400],
          })
        )
      )
    }
}