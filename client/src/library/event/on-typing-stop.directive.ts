
import {Directive, ElementRef, Input} from 'angular2/core';

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
    private stopDelay = 1000; // There is an average of 160ms split-time between key press when someone type

    private typingTimer: number;

    @Input('myHighlight') callback: Function;

    onKeyUp() {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(function () {
            this.callback.call();
        }, this.stopDelay);
    }

    onKeyDown() {
        clearTimeout(this.typingTimer);
    }
}
