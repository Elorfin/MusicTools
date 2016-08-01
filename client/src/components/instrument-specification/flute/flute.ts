import { AbstractSpecification } from '../shared/specification';
import { Tuning } from '../../tuning/shared/tuning';

/**
 * Flute definition
 */
export class Flute extends AbstractSpecification {
    public relationships: {
        tuning: {
            data: Tuning
        }
    };
}
