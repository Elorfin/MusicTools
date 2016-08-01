import { Injectable } from '@angular/core';

import { Note } from '../../components/theory/note/shared/note';

/**
 * Sound Service
 */
@Injectable()
export class SoundService {
    /**
     * Play a Note
     * @returns {OscillatorNode}
     */
    public playNote(note: Note, duration: number, start: number = 0): OscillatorNode {
        return this.playFrequency(note.attributes.frequency, duration, start);
    }

    /**
     * Play a frequency
     * @returns {OscillatorNode}
     */
    public playFrequency(frequency: number, duration: number, start: number = 0): OscillatorNode {
        const context = new AudioContext();

        const oscillator = context.createOscillator();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.connect(context.destination);

        oscillator.start(start);
        oscillator.stop(start + duration);

        return oscillator;
    }
}
