import { load } from "cheerio";
import { EMPTY, expand, map, Observable, reduce } from "rxjs";
import { Item } from "../../../domain/Item";
import { Page } from "../../../domain/Page";
import { WebshopService } from "../WebshopService";
import { KlaravikHttpClient } from "./KlaravikHttpClient";
import { KlaravikMapper } from "./KlaravikMapper";

export class KlaravikService implements WebshopService {
    private httpClient: KlaravikHttpClient;
    private mapper: KlaravikMapper;
    private host = "https://www.klaravik.dk"
 
    constructor() {
        this.httpClient = new KlaravikHttpClient(this.host);
        this.mapper = new KlaravikMapper(this.host);
    }

    public getAllItems(): Observable<Array<Item>> {
        return this.getItemPage().pipe(
            expand((page: Page<Item>) => {
                if (page.totalPages > page.number) {
                    return this.getItemPage(page.number + 1)
                }
                return EMPTY
            }), reduce((accumulatedPages, page) => {
                return {
                    items: [...accumulatedPages.items, ...page.items],
                    size: accumulatedPages.size + page.items.length,
                    number: 1,
                    totalPages: 1
                }
            }), map((accumulatedPage) => {
                return accumulatedPage.items
            })
        );
    }

    public getItemPage(pageNumber = 1): Observable<Page<Item>> {
        return this.httpClient.query("traktor", pageNumber)
            .pipe(
                map((response) => load(response.data)("html")),
                map((dom) => {
                    return this.mapper.toItemListPage(dom);
                })
            )
    }
}