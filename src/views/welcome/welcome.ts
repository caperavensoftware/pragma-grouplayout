import {bindable} from 'aurelia-framework';

export class Welcome {
    @bindable items;

    constructor() {
        this.items = [
            {
                id: 1,
                name: "Details",
            },
            {
                id: 2,
                name: "Labour"
            },
            {
                id: 3,
                name: "Tasks"
            },
            {
                id: 4,
                name: "Documents"
            }]
    }
}