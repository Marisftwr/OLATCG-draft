import BaseEnumerator from "./BaseEnumerator";

export default class OriginCountryEnum extends BaseEnumerator {

    static brazil = new OriginCountryEnum(0);

    constructor(code) {
        super();
        this.code = code;
    }
}