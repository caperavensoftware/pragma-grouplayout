import {StackContentItemPositionToCSS} from "./stack-container-definitions";

export class StackContainerBase {
    element = null;
    itemsContainer = null;
    selectedElement = null;

    constructor(element) {
        this.element = element;
    }

    updateItemPosition(itemPosition: any) {
        if (this.itemsContainer) {
            this.itemsContainer.style.justifyContent = StackContentItemPositionToCSS(itemPosition);
        }
    }

    registerEvents() {
        this.element.addEventListener('click', this.itemClicked.bind(this));
        this.element.addEventListener('touchstart', this.itemClicked.bind(this));
    }

    unregisterEvents() {
        this.element.removeEventListener('click', this.itemClicked);
        this.element.removeEventListener('touchstart', this.itemClicked);
    }

    itemClicked(event) {
        this.selectedElement = event.target;
        this.selectedElementChanged();
        event.preventDefault();
    }

    selectedElementChanged() {
        console.log('override this method on inherited');
    }
}