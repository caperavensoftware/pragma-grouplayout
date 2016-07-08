import {StackContentItemPositionToCSS} from "./stack-container-definitions";
import {AriaUtilities, AriaRole} from './../../utilities/aria-utilities';

export class StackContainerBase {
    element = null;
    itemsContainer = null;
    selectedElement = null;
    ariaUtils = null;

    constructor(element) {
        this.element = element;
        this.ariaUtils = new AriaUtilities();
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

        this.unregisterCanFocusEvents();
    }

    registerCanFocusEvents() {
        this.itemsContainer.addEventListener('keyup', this.handelKeyPress.bind(this))
        this.itemsContainer.addEventListener('focus', this.handelFocus.bind(this));
    }

    unregisterCanFocusEvents() {
        this.itemsContainer.removeEventListener('keyup', this.handelKeyPress)
        this.itemsContainer.removeEventListener('focus', this.handelFocus.bind);
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

    setAllowFocus(allowFocus: boolean): boolean {
        if (!this.itemsContainer) {
            // the value -1 is used by tests for checks
            return false;
        }

        if (allowFocus) {
            this.itemsContainer.setAttribute("tabindex", 0);
            this.registerCanFocusEvents();
        }
        else {
            if (this.itemsContainer.hasAttribute('tabindex')) {
                this.itemsContainer.removeAttribute('tabindex');
                this.unregisterCanFocusEvents();
            }
        }

        return true;
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


    updateContainerType(containerType) {
        var role = this.ariaUtils.groupByName(containerType);

        if (!role) {
            throw new Error(`${containerType} is not a expected container role`);
        }

        this.itemsContainer.setAttribute('role', role.group);

        if (this.itemsContainer.children && this.itemsContainer.children.length > 0) {
            const childRole = role.item;

            for (var i = 0; i < this.itemsContainer.children.length -1; i++) {
                var child = this.itemsContainer.children[i];

                if (child.tagName.toLowerCase() === 'li') {
                    child.setAttribute('role', childRole);
                }
            }
        }
    }
}