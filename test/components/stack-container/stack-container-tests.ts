import {expect} from 'chai';
import {StackContainer} from './../../../src/components/stack-container/stack-container';

describe('stack container tests', function() {
    it('updateItemPosition make sure style justifycontent is being set', function() {
        // Arrange
        const container = new StackContainer({});

        container.itemsContainer = {
            style: {
                justifyContent: ''
            }
        }

        container.itemPosition = "left";

        // Act
        container.updateItemPosition();

        // Assert
        expect(container.itemsContainer.style.justifyContent).to.be.equal("flex-start");
    })
});