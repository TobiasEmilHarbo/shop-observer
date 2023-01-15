/* eslint-disable require-jsdoc */
import {WebshopId} from "../external/WebshopId";
import {KlaravikService} from "./webshop/klaravik/KlaravikService";
import {WebshopService} from "./webshop/WebshopService";

export class WebshopServiceFactory {
  private klaravikService: KlaravikService;

  constructor() {
    this.klaravikService = new KlaravikService();
  }

  public getWebshopService(webshopId: WebshopId): WebshopService {
    switch (webshopId) {
      case WebshopId.KLARAVIK:
        return this.klaravikService;
      default:
        throw new Error(`No webshop found for id: ${webshopId}`);
    }
  }
}