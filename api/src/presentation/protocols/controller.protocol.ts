import { HttpResponse } from "./http-response.protocol";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HttpResponse>;
}