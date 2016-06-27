import {StackContentItemPositionToCSS} from "./stack-container-definitions";

export class StackContainerBase {
    element = null;
    itemsContainer = null;

    constructor(element) {
        this.element = element;
    }

    updateItemPosition(itemPosition: any) {
        if (this.itemsContainer) {
            this.itemsContainer.style.justifyContent = StackContentItemPositionToCSS(itemPosition);
        }
    }

    updateItemStyle(itemStyle: any) {

    }
}