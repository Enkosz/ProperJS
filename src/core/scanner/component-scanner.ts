import Component from "../../common/type/component";

export default interface ComponentScanner {

    scanComponents(): Promise<Component[]>
}
