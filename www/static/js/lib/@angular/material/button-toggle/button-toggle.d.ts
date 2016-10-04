import { ModuleWithProviders, OnInit, QueryList, AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdUniqueSelectionDispatcher } from '../core';
export declare type ToggleType = 'checkbox' | 'radio';
/**
 * Provider Expression that allows md-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
export declare const MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any;
/** A simple change event emitted by either MdButtonToggle or MdButtonToggleGroup. */
export declare class MdButtonToggleChange {
    source: MdButtonToggle;
    value: any;
}
/** Exclusive selection button toggle group that behaves like a radio-button group. */
export declare class MdButtonToggleGroup implements AfterViewInit, ControlValueAccessor {
    /** The value for the button toggle group. Should match currently selected button toggle. */
    private _value;
    /** The HTML name attribute applied to toggles in this group. */
    private _name;
    /** Disables all toggles in the group. */
    private _disabled;
    /** The currently selected button toggle, should match the value. */
    private _selected;
    /** Whether the button toggle group is initialized or not. */
    private _isInitialized;
    /** The method to be called in order to update ngModel. */
    private _controlValueAccessorChangeFn;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    onTouched: () => any;
    /** Event emitted when the group's value changes. */
    private _change;
    readonly change: Observable<MdButtonToggleChange>;
    /** Child button toggle buttons. */
    _buttonToggles: QueryList<MdButtonToggle>;
    /** TODO: internal */
    ngAfterViewInit(): void;
    name: string;
    disabled: boolean;
    value: any;
    selected: MdButtonToggle;
    private _updateButtonToggleNames();
    private _updateSelectedButtonToggleFromValue();
    /** Dispatch change event with current selection and group value. */
    private _emitChangeEvent();
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any): void;
}
/** Multiple selection button-toggle group. */
export declare class MdButtonToggleGroupMultiple {
    /** Disables all toggles in the group. */
    private _disabled;
    disabled: boolean;
}
export declare class MdButtonToggle implements OnInit {
    buttonToggleDispatcher: MdUniqueSelectionDispatcher;
    /** Whether or not this button toggle is checked. */
    private _checked;
    /** Type of the button toggle. Either 'radio' or 'checkbox'. */
    _type: ToggleType;
    /** The unique ID for this button toggle. */
    id: string;
    /** HTML's 'name' attribute used to group radios for unique selection. */
    name: string;
    /** Whether or not this button toggle is disabled. */
    private _disabled;
    /** Value assigned to this button toggle. */
    private _value;
    /** Whether or not the button toggle is a single selection. */
    private _isSingleSelector;
    /** The parent button toggle group (exclusive selection). Optional. */
    buttonToggleGroup: MdButtonToggleGroup;
    /** The parent button toggle group (multiple selection). Optional. */
    buttonToggleGroupMultiple: MdButtonToggleGroupMultiple;
    /** Event emitted when the group value changes. */
    private _change;
    readonly change: Observable<MdButtonToggleChange>;
    constructor(toggleGroup: MdButtonToggleGroup, toggleGroupMultiple: MdButtonToggleGroupMultiple, buttonToggleDispatcher: MdUniqueSelectionDispatcher);
    ngOnInit(): void;
    readonly inputId: string;
    checked: boolean;
    /** MdButtonToggleGroup reads this to assign its own value. */
    value: any;
    /** Dispatch change event with current value. */
    private _emitChangeEvent();
    disabled: boolean;
    /** Toggle the state of the current button toggle. */
    private _toggle();
    /** Checks the button toggle due to an interaction with the underlying native input. */
    _onInputChange(event: Event): void;
    /** TODO: internal */
    _onInputClick(event: Event): void;
}
export declare class MdButtonToggleModule {
    static forRoot(): ModuleWithProviders;
}
