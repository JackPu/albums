import { ModuleWithProviders } from '@angular/core';
import { Renderer } from '@angular/core';
import { ElementRef } from '@angular/core';
export declare class MdToolbarRow {
}
export declare class MdToolbar {
    private elementRef;
    private renderer;
    private _color;
    constructor(elementRef: ElementRef, renderer: Renderer);
    color: string;
    private _updateColor(newColor);
    private _setElementColor(color, isAdd);
}
export declare class MdToolbarModule {
    static forRoot(): ModuleWithProviders;
}
