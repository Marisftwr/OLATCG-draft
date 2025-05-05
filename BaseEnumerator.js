const { getMessage } = require("../../services/MessageService");

export default class BaseEnumerator {

    static getSelectStructure(){
        return Object.keys(this).map(key=> 
            {
                return {
                    code: BaseEnumerator[key], 
                    value: key, 
                    label: getMessage('enum.' + this.name + '.' + key)
                }
            }
        );
    }

}