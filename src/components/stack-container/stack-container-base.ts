import {StackContentItemPositionToCSS} from "./stack-container-definitions";
import {child} from "aurelia-templating";

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
        this.itemsContainer.addEventListener('focus', this.handelFocus.bind(this));
    }

    unregisterEvents() {
        this.element.removeEventListener('click', this.itemClicked);
        this.element.removeEventListener('touchstart', this.itemClicked);

        this.unregisterArrowKeyStrokeEvents();
    }

    registerArrowKeyStrokeEvents() {
        this.itemsContainer.addEventListener('keyup', this.handelKeyPress.bind(this))
    }

    unregisterArrowKeyStrokeEvents() {
        this.itemsContainer.removeEventListener('keyup', this.handelKeyPress)
    }


    itemClicked(event) {
        if (event.target !== this.itemsContainer) {
            this.setSelectedElement(event.target);
            event.preventDefault();
        }
    }

    setSelectedElement(element) {
        this.selectedElement = element;
        this.selectedElementChanged();
    }

    focusChild(index: number) {
        this.setSelectedElement(this.itemsContainer.children[index]);
    }

    selectedElementChanged() {
        console.log('override this method on inherited');
    }

    setAllowFocus(allowFocus: boolean) {
        if (!this.itemsContainer) {
            return;
        }

        if (allowFocus) {
            this.itemsContainer.setAttribute("tabindex", 0);
            this.registerArrowKeyStrokeEvents();
        }
        else {
            if (this.itemsContainer.hasAttribute('tabindex')) {
                this.itemsContainer.removeAttribute('tabindex');
                this.unregisterArrowKeyStrokeEvents();
            }
        }
    }

    handelFocus() {
        if (!this.selectedElement) {
            this.focusChild(0);
        }
    }

    handelKeyPress(event) {
        if (event.keyCode == 37) {
            this.focusChild(this.getNextItemIndex(-1))
        }
        else if (event.keyCode == 39) {
            this.focusChild(this.getNextItemIndex(1))
        }
    }

    getNextItemIndex(directionOffset: number): number {
        if (!this.selectedElement) {
            return 0;
        }

        const currentIndex = Array.prototype.indexOf.call(this.itemsContainer.children, this.selectedElement);
        const lastIndex = this.itemsContainer.children.length - 1;
        let result = currentIndex + directionOffset;

        if (result === -1) {
            result = 0;
        }

        if (result > lastIndex) {
            result = lastIndex;
        }

        return result;
    }
}