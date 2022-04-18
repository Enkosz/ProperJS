import {Provider} from "../../common/type/provider";

export default interface ApplicationContext {

    get(token: String): Provider
}
