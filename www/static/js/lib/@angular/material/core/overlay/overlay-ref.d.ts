import { PortalHost, Portal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { Observable } from 'rxjs/Observable';
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export declare class OverlayRef implements PortalHost {
    private _portalHost;
    private _pane;
    private _state;
    private _backdropElement;
    private _backdropClick;
    constructor(_portalHost: PortalHost, _pane: HTMLElement, _state: OverlayState);
    attach(portal: Portal<any>): any;
    detach(): Promise<any>;
    dispose(): void;
    hasAttached(): boolean;
    backdropClick(): Observable<void>;
    /** Gets the current state config of the overlay. */
    getState(): OverlayState;
    /** Updates the position of the overlay based on the position strategy. */
    updatePosition(): void;
    /** Attaches a backdrop for this overlay. */
    private _attachBackdrop();
    /** Detaches the backdrop (if any) associated with the overlay. */
    private _detatchBackdrop();
}
