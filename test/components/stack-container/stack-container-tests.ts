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
        assert(elementSpy.calledTwice, "element addEventListener should have been called twice");

        assert(elementSpy.withArgs('click').calledOnce);
        assert(elementSpy.withArgs('touchstart').calledOnce);

        // Cleanup
        elementSpy.restore();
    });

    it('unregisterEvents, ensure events are removed', function() {
        // Arrange
        const elementSpy = sinon.spy(container.element, 'removeEventListener');
        const itemsContainerSpy = sinon.spy(container.itemsContainer, 'removeEventListener');

        // Act
        container.unregisterEvents();

        // Assert
        assert(elementSpy.calledTwice, "element removeEventListener should have been called twice");
        assert(itemsContainerSpy.calledTwice, "itemsContainer removeEventListener should have been called twice");

        assert(elementSpy.withArgs('click').calledOnce, 'element remove click event expected');
        assert(elementSpy.withArgs('touchstart').calledOnce, 'element remove touchstart event expected');

        assert(itemsContainerSpy.withArgs('keyup').calledOnce, 'itemsContainer remove keyup event expected');
        assert(itemsContainerSpy.withArgs('focus').calledOnce, 'itemsContainer remove focus event expected');

        // Cleanup
        elementSpy.restore();
        itemsContainerSpy.restore();
    });

    it ('registerCanFocusEvents, ensure events are added when a container can focus', function() {
        // Arrange
        const itemsContainerSpy = sinon.spy(container.itemsContainer, 'addEventListener');

        // Act
        container.registerCanFocusEvents();

        // Assert
        assert(itemsContainerSpy.calledTwice, "itemsContainer addEventListener should have been called twice");
        assert(itemsContainerSpy.withArgs('keyup').calledOnce, 'itemsContainer add keyup event expected');
        assert(itemsContainerSpy.withArgs('focus').calledOnce, 'itemsContainer add focus event expected');

        // Cleanup
        itemsContainerSpy.restore();
    });

    it ('unregisterCanFocusEvents, ensure events are added when a container can focus', function() {
        // Arrange
        const itemsContainerSpy = sinon.spy(container.itemsContainer, 'removeEventListener');

        // Act
        container.unregisterCanFocusEvents();

        // Assert
        assert(itemsContainerSpy.calledTwice, "itemsContainer removeEventListener should have been called twice");
        assert(itemsContainerSpy.withArgs('keyup').calledOnce, 'itemsContainer remove keyup event expected');
        assert(itemsContainerSpy.withArgs('focus').calledOnce, 'itemsContainer remove focus event expected');

        // Cleanup
        itemsContainerSpy.restore();
    });

    it ('itemClicked, do nothing because the container was clicked', function() {
        // Arrange
        const event = {
            target: container.itemsContainer
        };

        const setSelectedElementSpy = sinon.spy(container, 'setSelectedElement');

        // Act
        container.itemClicked(event);

        // Assert
        expect(setSelectedElementSpy.callCount).to.equal(0, 'setSelectedElementSpy should not be called');

        // Cleanup
        setSelectedElementSpy.restore();
    });

    it ('itemClicked, call setSelectedElement', function() {
        // Arrange
        const event = {
            target: {},
            preventDefault() {}
        };

        const setSelectedElementSpy = sinon.spy(container, 'setSelectedElement');
        const eventSpy = sinon.spy(event, 'preventDefault');

        // Act
        container.itemClicked(event);

        // Assert
        assert(setSelectedElementSpy.withArgs(event.target).calledOnce);
        assert(eventSpy.calledOnce);

        // Cleanup
        setSelectedElementSpy.restore();
        eventSpy.restore();
    });
});