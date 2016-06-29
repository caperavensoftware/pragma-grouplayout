export class SelectionHighlightBase {
    element = null;
    highlightElement = null;

    constructor(element) {
         this.element = element;
     }

    performHighlight(element) {
        requestAnimationFrame(function() {
            const rect = element.getBoundingClientRect();
            const parentRect = element.parentElement.getBoundingClientRect();
            const highlightRect = this.highlightElement.getBoundingClientRect();

            const rectXCenter = rect.width / 2;
            const rectYCenter = rect.height / 2;

            const offsetX = highlightRect.width / 2;
            const offsetY = highlightRect.height / 2;

            const x = (rect.left - parentRect.left) + rectXCenter - offsetX;
            const y = (rect.top - parentRect.top) + rectYCenter - offsetY;

            this.highlightElement.style.transform = `translate(${x}px, ${y}px)`;
        }.bind(this))
    }

}