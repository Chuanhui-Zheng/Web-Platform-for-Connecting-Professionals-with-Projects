import * as React from 'react';
import { type AccountProps } from '../Account';
export interface DashboardLayoutSlots {
    /**
     * The toolbar actions component used in the layout header.
     * @default ToolbarActions
     */
    toolbarActions?: React.JSXElementConstructor<{}>;
    /**
     * The toolbar account component used in the layout header.
     * @default Account
     */
    toolbarAccount?: React.JSXElementConstructor<AccountProps>;
}
export interface DashboardLayoutProps {
    /**
     * The content of the dashboard.
     */
    children: React.ReactNode;
    /**
     * Whether the sidebar should not be collapsible to a mini variant in desktop and tablet viewports.
     * @default false
     */
    disableCollapsibleSidebar?: boolean;
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots?: DashboardLayoutSlots;
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps?: {
        toolbarActions?: {};
        toolbarAccount?: AccountProps;
    };
}
/**
 *
 * Demos:
 *
 * - [Dashboard Layout](https://mui.com/toolpad/core/react-dashboard-layout/)
 *
 * API:
 *
 * - [DashboardLayout API](https://mui.com/toolpad/core/api/dashboard-layout)
 */
declare function DashboardLayout(props: DashboardLayoutProps): React.JSX.Element;
declare namespace DashboardLayout {
    var propTypes: any;
}
export { DashboardLayout };
