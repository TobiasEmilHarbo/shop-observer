import { WebshopId } from "./external/WebshopId";
import { WebshopServiceFactory } from "./services/WebshopServiceFactory";

const facorty = new WebshopServiceFactory();

const service = facorty.getWebshopService(WebshopId.KLARAVIK);

// service.getAllItems().subscribe((items) => {
//     console.log(items);
// });