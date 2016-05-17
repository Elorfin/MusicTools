
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
        '(window:click)': 'onClick($event)'
    }
})

export class OnClickOutDirective {
    /*@Input('onClickOut') callback: Function;*/
    @Output('onClickOut') clickOut = new EventEmitter();

    private element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    onClick(event: MouseEvent) {
        // Check if the User has click inside the element
        let clickOut = false;

        const maxX = this.element.clientLeft + this.element.clientWidth;
        const maxY = this.element.clientTop + this.element.clientHeight;
        if (event.clientX > this.element.clientLeft || event.clientX < maxX // Check horizontal position
            || event.clientY > this.element.clientTop || event.clientY < maxY ) {  // Check vertical position
            clickOut = true;
        }

        if (clickOut) {
            // Execute the registered callback
            /*this.callback();*/
            this.clickOut.emit({});
        }
    }
}