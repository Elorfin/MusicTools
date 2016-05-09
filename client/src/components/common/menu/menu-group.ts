import {MenuItem} from './menu-item';

/**
 * Menu Group definition
 */
export class MenuGroup {
    /**
     * Icon of the group
     * @type {String}
     */
    public icon: String;

    /**
     * Label of the group
     * @type {String}
     */
    public label: String;

    /**
     * Link items
     * @type {Array}
     */
    public items: MenuItem[];
}
