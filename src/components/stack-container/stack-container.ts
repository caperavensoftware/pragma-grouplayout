import {customElement, useShadowDOM, inject, bindable} from 'aurelia-framework';
import {StackContentItemPositionToCSS} from './stack-container-definitions';


@customElement('stack-container')
@useShadowDOM()
@inject(Element)
export class StackContainer {
    element = null;
    itemsContainer = null;

    @bindable itemPosition = null;
    @bindable itemStyle = null;
    @bindable orientation = null;

    constructor(element) {
        this.element = element;
    }

    itemPositionChanged() {
        this.updateItemPosition();
    }

    itemStyleChanged() {
        this.updateItemStyle();
    }

    orientationChanged() {

    }

    bind() {
        this.updateItemPosition();
        this.updateItemStyle();
    }

    updateItemPosition() {
        if (this.itemsContainer) {
            this.itemsContainer.style.justifyContent = StackContentItemPositionToCSS(this.itemPosition);
        }
    }

    updateItemStyle() {

    }

}