export type RolesForGroups =
    'group'| 'listbox' | 'menu' | 'menubar' | 'tablist' | 'tree' | 'combobox';

export interface AriaRole {
    group: string;
    item: string;
}

export class AriaUtilities {
    itemRoles = null;

    constructor() {
        this.itemRoles = [
            {group: 'group', item: 'listitem'},
            {group: 'listbox', item: 'option'},
            {group: 'menu', item: 'menuitem'},
            {group: 'menubar', item: 'menuitem'},
            {group: 'tablist', item: 'tabitem'},
            {group: 'tree', item: 'treeitem'},
            {group: 'combobox', item: 'option'}
        ];
    }

    groupByName(containerRole: RolesForGroups) : AriaRole {
        return this.itemRoles.find(function (item) {
            return item.group === containerRole;
        });
    }

    isValidContainerRole(containerRole: RolesForGroups) {
        return this.groupByName(containerRole) != undefined;
    }

    childRoleFor(containerRole: RolesForGroups) {
        var aria = this.groupByName(containerRole);
        return aria ? aria.item : '';
    }
}