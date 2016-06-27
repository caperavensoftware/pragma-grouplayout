import {customElement, useShadowDOM, inject, bindable} from 'aurelia-framework';
import {StackContentItemPositionToCSS} from './stack-container-definitions';
import {StackContainerBase} from "./stack-container-base";

@customElement('stack-container')
@useShadowDOM()
@inject(Element)
export class StackContainer extends StackContainerBase{
    @bindable itemPosition = null;
    @bindable itemStyle = null;

    constructor(element) {
        super(element)
    }

    bind() {
        this.updateItemPosition(this.itemPosition);
        this.updateItemStyle(this.itemStyle);
    }

    itemPositionChanged() {
        this.updateItemPosition(this.itemPosition);
    }

    itemStyleChanged() {
        this.updateItemStyle(this.itemStyle);
    }

}