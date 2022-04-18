export interface ApplicationServerAdapter {

    registerRoute(route: Route): void

    registerExceptionHandler(): void

    listen(port: number): void
}

export interface Route {
    path: string,
    method: HttpMethod,
    handler: Function
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
