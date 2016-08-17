import { Resource } from './../../../library/data/resource/resource';

/**
 * Settings definition
 */
export class Settings extends Resource {
    /**
     * ID of the Settings
     * @type {String}
     */
    public id: string;

    public type: string = 'settings';

    public attributes: {
        volume: number;
        noteFormat: string;
    };
}
