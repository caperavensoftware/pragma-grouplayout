import {expect, assert} from 'chai';
import {StackContainerBase} from "../../../src/components/stack-container/stack-container-base";

var sinon = require('sinon');

describe('stack container tests', function() {
    let container: StackContainerBase = null;

    beforeEach(function() {
        const element = {
            addEventListener(event, callback) {
            },
            removeEventListener(event, callback) {
            }
        };

        const itemsContainer = {
            style: {
                justifyContent: ''
            },

            addEventListener(event, callback) {
            },
            removeEventListener(event, callback) {
            }
        };

        container = new StackContainerBase(element);
        container.itemsContainer = itemsContainer;
    });

    it('updateItemPosition make sure style justifycontent is being set', function() {
        // Act
        container.updateItemPosition('left');

        // Assert
        expect(container.itemsContainer.style.justifyContent).to.be.equal("flex-start");
    })

    it('registerEvents, ensure events are set up', function() {
        // Arrange
        const elementSpy = sinon.spy(container.element, 'addEventListener');

        // Act
        container.registerEvents();

        // Assert
        assert((<any>container.element.addEventListener).calledTwice, "element addEventListener should have been called twice");

        assert(elementSpy.withArgs('click').calledOnce);
        assert(elementSpy.withArgs('touchstart').calledOnce);

        // Cleanup
        (<any>container.element.addEventListener).restore();
    });

    it('unregisterEvents, ensure events are removed', function() {
        // Arrange
        const elementSpy = sinon.spy(container.element, 'removeEventListener');
        const itemsContainerSpy = sinon.spy(container.itemsContainer, 'removeEventListener');

        // Act
        container.unregisterEvents();

        // Assert
        assert((<any>container.element.removeEventListener).calledTwice, "element removeEventListener should have been called twice");
        assert((<any>container.itemsContainer.removeEventListener).calledTwice, "itemsContainer removeEventListener should have been called twice");

        assert(elementSpy.withArgs('click').calledOnce, 'element remove click event expected');
        assert(elementSpy.withArgs('touchstart').calledOnce, 'element remove touchstart event expected');

        assert(itemsContainerSpy.withArgs('keyup').calledOnce, 'itemsContainer remove keyup event expected');
        assert(itemsContainerSpy.withArgs('focus').calledOnce, 'itemsContainer remove focus event expected');

        // Cleanup
        (<any>container.element.removeEventListener).restore();
        (<any>container.itemsContainer.removeEventListener).restore();
    })
});