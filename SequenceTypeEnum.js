import BaseEnumerator from "./BaseEnumerator";

export default class SequenceTypeEnum extends BaseEnumerator {

    static DNA = new SequenceTypeEnum(0);

    constructor(code) {
        super();
        this.code = code;
    }
}