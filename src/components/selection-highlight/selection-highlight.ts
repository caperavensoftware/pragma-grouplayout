import {customElement, inject,bindable} from 'aurelia-framework';
import {SelectionHighlightBase} from "./selection-highlight-base";

@customElement('selection-highlight')
@inject(Element)
export class SelectionHighlight extends SelectionHighlightBase {
    @bindable selectedItem = null;

    constructor(element) {
        super(element);
    }

    highlightElement(elementToHighlight) {
        console.error('highlight');
        console.log(elementToHighlight);
    }

    selectedItemChanged() {
        console.log(this.selectedItem);
    }
}
