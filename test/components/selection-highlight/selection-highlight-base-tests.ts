import {expect} from 'chai';
import {SelectionHighlightBase} from './../../../src/components/selection-highlight/selection-highlight-base';
import * as jsdom from 'mocha-jsdom';

describe('stack-container-definitions tests', function() {
    var highlightBase : SelectionHighlightBase;
    var element = null;
    (<any>jsdom)();

    beforeEach(function() {
        element = {
            getBoundingClientRect: function() {
                return {
                    left: 50,
                    top: 0,
                    width: 100,
                    height: 100
                }
            },

            parentElement: {
                getBoundingClientRect: function() {
                    return {
                        left: 0,
                        top: 0,
                        width: 400,
                        height: 100
                    }
                }
            }
        };

        var highlight = {
            style : {
                transform: ''
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: 50,
                    height: 20
                }
            }
        };

        highlightBase = new SelectionHighlightBase({});
        highlightBase.highlightElement = highlight;
    });

    it('constructor', function() {
        expect(highlightBase).to.not.be.null;
    });

    it('performHighlight', function() {
        // Arrange
        (<any>window).requestAnimationFrame = function(callback: any) {
            callback();
        };

        // Act
        highlightBase.performHighlight(element)

        // Assert
        expect(highlightBase.highlightElement.style.transform).to.equal('translate3d(75px, 40px, 0)')
    });
});