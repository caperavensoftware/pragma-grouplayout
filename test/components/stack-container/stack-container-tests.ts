import {expect} from 'chai';
import {StackContainerBase} from "../../../src/components/stack-container/stack-container-base";

describe('stack container tests', function() {
    it('updateItemPosition make sure style justifycontent is being set', function() {
        // Arrange
        var element = {};
        const container = new StackContainerBase(element);

        container.itemsContainer = {
            style: {
                justifyContent: ''
            }
        }

        // Act
        container.updateItemPosition('left');

        // Assert
        expect(container.itemsContainer.style.justifyContent).to.be.equal("flex-start");
    })

});