import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';

const defaultAttributes = {
    id: -1,
    name: "",
    email: "",
    password: ""
}

export class User {

    constructor(json) {
        assign(this, cloneDeep(defaultAttributes), json);
    }

}