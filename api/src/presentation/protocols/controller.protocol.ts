import { HttpRequest } from "./http-request.protocol";
import { HttpResponse } from "./http-response.protocol";

export interface Controller {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}