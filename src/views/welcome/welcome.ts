import {bindable} from 'aurelia-framework';

export class Welcome {
    @bindable items;
    svg;

    constructor() {
        this.items = [
            {
                id: 1,
                name: "Tab 1",
            },
            {
                id: 2,
                name: "Tab 2"
            },
            {
                id: 3,
                name: "Tab 3"
            },
            {
                id: 4,
                name: "Tab 4"
            }]

    }

    bind() {
        this.svg.addEventListener('click', this.animateSvg);
    }

    animateSvg() {
        requestAnimationFrame(function() {
            const circle = document.getElementById('circle');
            circle.style.transform = 'translateX(300px)';
        })
    }
}