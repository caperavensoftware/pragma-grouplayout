import {customElement, useShadowDOM, inject, bindable} from 'aurelia-framework';
import {StackContainerBase} from "./stack-container-base";

@customElement('stack-container')
@useShadowDOM()
@inject(Element)
export class StackContainer extends StackContainerBase{
    @bindable itemPosition = null;

    constructor(element) {
        super(element)
    }

    bind() {
        this.updateItemPosition(this.itemPosition);
    }

    itemPositionChanged() {
        this.updateItemPosition(this.itemPosition);
    }
}