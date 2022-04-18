import {ComponentType} from "./component-type";

export default interface Component {
    type: ComponentType,
    reference: any
}
