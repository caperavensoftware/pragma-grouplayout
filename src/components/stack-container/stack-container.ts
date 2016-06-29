import {customElement, useShadowDOM, inject, bindable} from 'aurelia-framework';
import {StackContainerBase} from "./stack-container-base";

@customElement('stack-container')
@useShadowDOM()
@inject(Element)
export class StackContainer extends StackContainerBase{
    @bindable itemPosition = null;
    @bindable selectable = false;
    @bindable selectedItem = null;

    constructor(element) {
        super(element)
    }

    bind() {
        this.updateItemPosition(this.itemPosition);
        this.registerEvents();
    }

    unbind() {
        this.unregisterEvents();
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

    itemClicked(event) {
        super.itemClicked(event);
        this.selectedItem = event.target;
    }
}