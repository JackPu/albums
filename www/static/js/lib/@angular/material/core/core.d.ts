import { ModuleWithProviders } from '@angular/core';
export { Dir, LayoutDirection, RtlModule } from './rtl/dir';
export { Portal, PortalHost, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { MdGestureConfig } from './gestures/MdGestureConfig';
export { MdRipple, MdRippleModule } from './ripple/ripple';
export { AriaLivePoliteness, MdLiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN } from './a11y/live-announcer';
export { FocusTrap } from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { A11yModule } from './a11y/index';
export { MdUniqueSelectionDispatcher, MdUniqueSelectionDispatcherListener } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
export { applyCssTransform } from './style/apply-transform';
export { MdError } from './errors/error';
export { BooleanFieldValue } from './annotations/field-value';
export { ComponentType } from './overlay/generic-component-type';
export * from './keyboard/keycodes';
export declare class MdCoreModule {
    static forRoot(): ModuleWithProviders;
}
