export class TextInputBase {
    element = null;
    inputId = null;
    labelId = null;
    describeId = null;
    messageId = null;
    
    constructor(element) {
        this.element = element;

        if (this.element.id.length === 0) {
            throw new Error('text-input must have a id');
        }

        this.inputId = this.element.id + '_input';
        this.labelId = this.element.id + '_label';
        this.describeId = this.element.id + '_describe';
        this.messageId = this.element.id + '_message;'
    }
}