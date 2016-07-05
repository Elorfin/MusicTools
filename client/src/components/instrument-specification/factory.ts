import {
    Injectable,
    Component,
    ComponentResolver,
    ComponentMetadata,
    ComponentFactory} from '@angular/core';

@Injectable()
export class SpecificationFactory
{
    constructor(private resolver: ComponentResolver) {}

    /*public createSpecificationComponent(): Promise<ComponentFactory<any>>
    {
        /!*const cmpClass = class DynamicComponent {};
        const decoratedCmp = Component(metadata)(cmpClass);
        return resolver.resolveComponent(decoratedCmp);*!/
        return {};
    }*/

    public createComponent(componentName: String): Promise<ComponentFactory<any>> {
        return this.resolver.resolveComponent('GuitarComponent');
    }
}
