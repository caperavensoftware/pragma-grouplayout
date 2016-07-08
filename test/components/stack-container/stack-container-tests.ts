import {expect, assert} from 'chai';
import {StackContainerBase} from "../../../src/components/stack-container/stack-container-base";
import * as sinon from 'sinon';

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
            children: [{id: 1}, {id: 2}, {id: 3}],
            style: {justifyContent: ''},
            setAttribute(name: string, value: any) {},
            hasAttribute(name: string) {return true;},
            removeAttribute(name: string) {},
            addEventListener(event, callback) {
            },
            removeEventListener(event, callback) {
            }
        };

        container = new StackContainerBase(element);
        container.itemsContainer = itemsContainer;
    });

    it('constructor', function() {
        expect(container).to.not.be.null;
        expect(container.ariaUtils).to.not.be.null;
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
        assert(setSelectedElementSpy.withArgs(event.target).calledOnce, 'setSelectedElement should be called once');
        assert(eventSpy.calledOnce, 'event prevent default should be called once');

        // Cleanup
        setSelectedElementSpy.restore();
        eventSpy.restore();
    });

    it ('setSelectedElement', function() {
        // Arrange
        const element = {};
        const selectedElementChangedSpy = sinon.spy(container, 'selectedElementChanged');

        // Act
        container.setSelectedElement(element);

        // Assert
        assert(container.selectedElement === element, 'container selected element should be the same as the element passed on');
        assert(selectedElementChangedSpy.calledOnce);
        // Cleanup
        selectedElementChangedSpy.restore();
    });

    it('focusChild', function(){
        // Arrange
        const setSelectedElementSpy = sinon.spy(container, 'setSelectedElement');

        // Act
        container.focusChild(0);

        // Assert
        assert(setSelectedElementSpy.calledOnce, 'setSelectedElement should have been called once from focusChild');
        assert(setSelectedElementSpy.withArgs(container.itemsContainer.children[0]).calledOnce, 'focusChild does not seem to pass the right element to setSelectedElement');

        // Cleanup
        setSelectedElementSpy.restore();
    });

    it('selectedElementChanged', function() {
        // Arrange
        const consoleSpy = sinon.spy(console, "log");

        // Act
        container.selectedElementChanged();

        // Assert
        assert(consoleSpy.calledOnce, 'console.log should have been called in selectedElementChanged');

        // Cleanup
        consoleSpy.restore();
    });

    it ('setAllowFocus, no items container so return out of function', function() {
        // Arrange
        container.itemsContainer = null;

        // Act
        const result = container.setAllowFocus(true);

        // Assert
        assert(result === false, 'setAllowFocus should exit with return false if there is no container');
    });

    it ('setAllowFocus, make focusable', function() {
        // Arrange
        const setAttributeSpy = sinon.spy(container.itemsContainer, 'setAttribute');
        const registerCanFocusEventsSpy = sinon.spy(container, 'registerCanFocusEvents');
        
        // Act
        const result = container.setAllowFocus(true);

        // Assert
        assert(setAttributeSpy.withArgs('tabindex', 0).calledOnce, 'tabindex should be set with index 0');
        assert(registerCanFocusEventsSpy.calledOnce, 'registerCanFocusEvent should have been called');
        assert(result, 'result type should be true');
        
        // Cleanup
        setAttributeSpy.restore();
        registerCanFocusEventsSpy.restore();
    });

    it ('setAllowFocus, remove focusable', function() {
        // Arrange
        const hasAttributeSpy = sinon.spy(container.itemsContainer, 'hasAttribute');
        const removeAttributeSpy = sinon.spy(container.itemsContainer, 'removeAttribute');
        const unregisterCanFocusEventsSpy = sinon.spy(container, 'unregisterCanFocusEvents');

        // Act
        const result = container.setAllowFocus(false);

        // Assert
        assert(hasAttributeSpy.withArgs('tabindex').calledOnce, 'hasAttribute should have been called once');
        assert(removeAttributeSpy.withArgs('tabindex').calledOnce, 'removeAttribute should have been called once');
        assert(unregisterCanFocusEventsSpy.calledOnce, 'unregisterCanFocusEvent should have been called once');
        assert(result, 'result type should be true');

        // Cleanup
        hasAttributeSpy.restore();
        removeAttributeSpy.restore();
        unregisterCanFocusEventsSpy.restore();
    });

    it ('handelFocus, set focus if no element present', function() {
        // Arrange
        container.selectedElement = null;
        const focusChildSpy = sinon.spy(container, 'focusChild');

        // Act
        container.handelFocus();

        // Assert
        assert(focusChildSpy.withArgs(0).calledOnce);

        // Cleanup
        focusChildSpy.restore();
    });

    it ('handelKeyPress - left key', function() {
        // Arrange
        const focusChildSpy = sinon.spy(container, 'focusChild');
        const getNextItemIndexSpy = sinon.spy(container, 'getNextItemIndex');

        // Act
        container.handelKeyPress({keyCode: 37});

        // Assert
        assert(focusChildSpy.calledOnce, 'focusChild should have been called once');
        assert(getNextItemIndexSpy.withArgs(-1).calledOnce, 'getNextItemIndex should have been called with a -1 offset');

        // Cleanup
        focusChildSpy.restore();
        getNextItemIndexSpy.restore();
    });

    it ('handelKeyPress - right key', function() {
        // Arrange
        const focusChildSpy = sinon.spy(container, 'focusChild');
        const getNextItemIndexSpy = sinon.spy(container, 'getNextItemIndex');

        // Act
        container.handelKeyPress({keyCode: 39});

        // Assert
        assert(focusChildSpy.calledOnce, 'focusChild should have been called once');
        assert(getNextItemIndexSpy.withArgs(1).calledOnce, 'getNextItemIndex should have been called with a 1 offset');

        // Cleanup
        focusChildSpy.restore();
        getNextItemIndexSpy.restore();
    });

    it ('getNextItemIndex, no selectedElement', function() {
        // Arrange
        container.selectedElement = null;

        // Act
        const result = container.getNextItemIndex(1);

        // Assert
        assert(result === 0, 'getNextItemIndex should have been zero when no selectedElement present');
    });

    it ('getNextItemIndex, prevent below zero index', function() {
        // Arrange
        container.selectedElement = container.itemsContainer.children[0];

        // Act
        const result = container.getNextItemIndex(-1);

        // Assert
        assert(result === 0, 'result should have been zero when moving left and the slected element is the first child');
    });

    it ('getNextItemIndex, prevent greater than count index', function() {
        // Arrange
        const lastIndex = container.itemsContainer.children.length -1;
        container.selectedElement = container.itemsContainer.children[lastIndex];

        // Act
        const result = container.getNextItemIndex(1);

        // Assert
        assert(result === lastIndex, 'result should have been last index when moving left and the slected element is the first child');
    });

    it('getNextItemIndex, get index based on offset', function() {
        // Arrange
        container.selectedElement = container.itemsContainer.children[0];

        // Act
        const result = container.getNextItemIndex(1);

        // Assert
        assert(result === 1, 'result should have been 1');
    });
});