import BaseEnumerator from "./BaseEnumerator";

export default class AlignmentTypeEnum extends BaseEnumerator {

    static global = new AlignmentTypeEnum(0);
    
    constructor(code) {
        super();
        this.code = code;
    }

}