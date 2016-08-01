import { AbstractSpecification } from '../shared/specification';
import { Tuning } from '../../tuning/shared/tuning';

/**
 * Guitar definition
 */
export class Guitar extends AbstractSpecification {
    public relationships: {
        tuning: {
            data: Tuning
        }
    };
}
