import {expect} from 'chai';
import {TextInputBase} from './../../../src/components/text-input/text-input-base';

describe('Text-inputBase Tests', function() {
   var textInputBase;

   beforeEach(function() {
       textInputBase = new TextInputBase({});
   });

   it('constructor', function() {
       expect(textInputBase).to.not.be.null;
   });
});