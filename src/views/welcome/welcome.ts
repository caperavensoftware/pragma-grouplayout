import {bindable} from 'aurelia-framework';

export class Welcome {
    @bindable items;

    constructor() {
        this.items = [
            {
                id: 1,
                name: "Tab 1",
            },
            {
                id: 2,
                name: "Tab 2"
            },
            {
                id: 3,
                name: "Tab 3 With some other stuff"
            },
            {
                id: 4,
                name: "Tab 4"
            },
            {
                id: 5,
                name: "Tab 5"
            },
            {
                id: 6,
                name: "Tab 6"
            }]

    }
}