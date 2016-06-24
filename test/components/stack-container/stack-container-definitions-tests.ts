import {expect} from 'chai';
import {StackContentItemPositionToCSS} from './../../../src/components/stack-container/stack-container-definitions';

describe('stack-container-definitions tests', function() {
    it('StackContentItemPositionToCSS - Left', function() {
        const result = StackContentItemPositionToCSS('left');
        expect(result).to.equal('flex-start');
    });

    it('StackContentItemPositionToCSS - Center', function() {
        const result = StackContentItemPositionToCSS('center');
        expect(result).to.equal('center');
    });

    it('StackContentItemPositionToCSS - Right', function() {
        const result = StackContentItemPositionToCSS('right');
        expect(result).to.equal('flex-end');
    });

    it('StackContentItemPositionToCSS - Space-Between', function() {
        const result = StackContentItemPositionToCSS('space-between');
        expect(result).to.equal('space-between');
    });

    it('StackContentItemPositionToCSS - Space-Around', function() {
        const result = StackContentItemPositionToCSS('space-around');
        expect(result).to.equal('space-around');
    });
});