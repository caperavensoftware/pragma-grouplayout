import {expect} from 'chai';
import {AriaUtilities} from './../../src/utilities/aria-utilities';

describe('AriaUtilities Tests', function() {
   var ariaUtilities;

   beforeEach(function() {
       ariaUtilities = new AriaUtilities();
   });

   it('constructor', function() {
       expect(ariaUtilities).to.not.be.null;
       expect(ariaUtilities.itemRoles).to.not.be.null;
   });

    it('isValidContainerRole, ensure valid roles', function() {
        for (var i = 0; i < ariaUtilities.itemRoles.length; i++) {
            var role = ariaUtilities.itemRoles[i].group;

            var isValid = ariaUtilities.isValidContainerRole(role);
            expect(isValid).to.be.true;
        };
    });

    it('isValidContainerRole, not valid check', function() {
        // Act
        var isValid = ariaUtilities.isValidContainerRole('randomrole');
        expect(isValid).to.be.false;
    });

    it('childRoleFor, ensure valid child role', function() {
        for (var i = 0; i < ariaUtilities.itemRoles.length; i++) {
            var role = ariaUtilities.itemRoles[i].group;
            var expectedChildRole = ariaUtilities.itemRoles[i].item;

            var childRole = ariaUtilities.childRoleFor(role);
            expect(childRole).to.be.equal(expectedChildRole);
        };
    });

    it('childRoleFor, not valid check', function() {
        var childRole = ariaUtilities.childRoleFor('randomrole');
        expect(childRole.length).to.equal(0);
    });

});