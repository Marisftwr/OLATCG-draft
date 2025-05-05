import BaseEnumerator from "./BaseEnumerator";

export default class DatabaseTypeEnum extends BaseEnumerator {

    static default = new DatabaseTypeEnum(0)

    constructor(code) {
        super();
        this.code = code;
    }
}