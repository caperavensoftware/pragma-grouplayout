import {customElement, useShadowDOM, inject, bindable} from 'aurelia-framework';
import {StackContainerBase} from "./stack-container-base";

@customElement('stack-container')
@useShadowDOM()
@inject(Element)
export class StackContainer extends StackContainerBase{
    @bindable itemPosition = null;
    @bindable selectable = false;
    @bindable selectedItem = null;
    @bindable canFocus = false;

    constructor(element) {
        super(element)
    }

    bind() {
        this.updateItemPosition(this.itemPosition);
        this.setAllowFocus(this.canFocus);
        this.registerEvents();
    }

    unbind() {
        this.unregisterEvents();
        this.selectedItem = null;
        this.selectedElement = null;
    }

    attached() {
        this.focusChild(0);
    }

    itemPositionChanged() {
        this.updateItemPosition(this.itemPosition);
    }

    selectableChanged() {
        if (this.selectable) {
            this.registerEvents();
        }
        else {
            this.unregisterEvents();
        }
    }

    selectedElementChanged() {
        this.selectedItem = this.selectedElement;
    }

    canFocusChanged() {
        this.setAllowFocus(this.canFocus);
    }
}