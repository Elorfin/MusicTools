import { Resource } from './../../../library/data/resource/resource';

/**
 * Tuning definition
 */
export class TuningCategory extends Resource {
    /**
     * ID of the Category
     * @type {String}
     */
    public id: string;

    public type: string = 'tuning_categories';

    public attributes: {
        name: string
    };
}
