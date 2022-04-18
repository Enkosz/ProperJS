export default interface ApplicationContext {

    get<T>(token: String | any): T

    init(): Promise<ApplicationContext>
}
