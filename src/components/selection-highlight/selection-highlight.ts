import {customElement, inject,bindable} from 'aurelia-framework';
import {SelectionHighlightBase} from "./selection-highlight-base";

@customElement('selection-highlight')
@inject(Element)
export class SelectionHighlight extends SelectionHighlightBase {
    @bindable selectedItem = null;

    constructor(element) {
        super(element);
    }

    unbind() {
        this.selectedItem = null;
    }

    selectedItemChanged() {
        if (this.selectedItem) {
            this.performHighlight(this.selectedItem);
        }
    }
}
