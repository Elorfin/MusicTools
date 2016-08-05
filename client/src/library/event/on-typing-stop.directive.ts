import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * On Typing Stop Directive
 * Executes a callback when the User stop typing
 * @returns {{restrict: string, link: link}}
 * @constructor
 */
@Directive({
    selector: '[onTypingStop]',
    host: {
        '(keyup)'  : 'onKeyUp()',
        '(keydown)': 'onKeyDown()'
    }
})

export class OnTypingStopDirective {
    @Output('onTypingStop') typingStop = new EventEmitter();

    private stopDelay = 1000; // There is an average of 160ms split-time between key press when someone type

    private typingTimer: number;

    @HostListener('keyup') onKeyUp() {
        clearTimeout(this.typingTimer);
        
        this.typingTimer = setTimeout(function () {
            this.typingStop.emit({});
        }, this.stopDelay);
    }

    @HostListener('keydown') onKeyDown() {
        clearTimeout(this.typingTimer);
    }
}
