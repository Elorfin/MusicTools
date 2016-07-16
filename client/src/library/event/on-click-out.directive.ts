import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * On Click Out Directive.
 *
 * Executes a callback when the User click outside the observed HTML element
 * Uses click and element position to catch the click out to not interfere with other click events (This is also more efficient)
 */
@Directive({
    selector: '[onClickOut]'
})

export class OnClickOutDirective {
    @Output('onClickOut') clickOut = new EventEmitter();

    private element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
        // Avoid propagation of the event
        event.stopPropagation();
    }

    @HostListener('window:click') onClickOut(): void {
        // Emit event for other components
        this.clickOut.emit({});
    }
}
