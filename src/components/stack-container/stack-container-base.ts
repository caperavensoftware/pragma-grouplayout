import {StackContentItemPositionToCSS} from "./stack-container-definitions";

export class StackContainerBase {
    element = null;
    itemsContainer = null;
    item1 = null;

    constructor(element) {
        this.element = element;
    }

    updateItemPosition(itemPosition: any) {
        if (this.itemsContainer) {
            this.itemsContainer.style.justifyContent = StackContentItemPositionToCSS(itemPosition);
        }
    }
}