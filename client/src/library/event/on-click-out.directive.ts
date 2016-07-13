
import {Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';

/**
 * On Click Out Directive
 *
 * Executes a callback when the User click outside the observed HTML element
 * Uses click and element position to catch the click out to not interfere with other click events (This is also more efficient)
 */
@Directive({
    selector: '[onClickOut]',
    host: {
        '(click)': 'onClick($event)',
        '(window:click)': 'onClickOut($event)'
    }
})

export class OnClickOutDirective {
    @Output('onClickOut') clickOut = new EventEmitter();

    private element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    onClick(event: MouseEvent): void {
        console.log('click on element');

        // Avoid propagation of the event
        event.stopPropagation();
    }

    onClickOut(event: MouseEvent): void {
        console.log('click out of element');

        this.clickOut.emit({});
    }
}
