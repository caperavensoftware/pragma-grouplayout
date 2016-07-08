import {bindable} from 'aurelia-framework';

class WorkOrder {
    @bindable workorderCode: string = "R00100";
    @bindable staffCode: string = "Robin";
    @bindable assetCode: string = "PUMP 002"
}

export class Welcome {
    @bindable items;
    @bindable model;

    constructor() {

        this.model = new WorkOrder();
        this.model.workorderCode = "R00200";

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