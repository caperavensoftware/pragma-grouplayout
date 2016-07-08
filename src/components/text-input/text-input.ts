import {customElement, inject, bindable} from 'aurelia-framework';
import {TextInputBase} from './text-input-base';

@customElement('text-input')
@inject(Element)
export class TextInput extends TextInputBase {
    @bindable value;
    @bindable label;
    @bindable description;

    constructor(element) {
        super(element);
    }

    bind() {
        if (!this.description || this.description.length === 0) {
            this.description = this.label;
        }
    }
}
