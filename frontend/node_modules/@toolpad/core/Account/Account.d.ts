import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { IconButtonProps } from '@mui/material/IconButton';
import DEFAULT_LOCALE_TEXT from '../shared/locales/en';
export interface AccountSlots {
    /**
     * The component used for the sign in button.
     * @default Button
     */
    signInButton?: React.ElementType;
    /**
     * The component used for the sign out button.
     * @default MenuItem
     */
    signOutButton?: React.ElementType;
    /**
     * The component used for the custom menu items.
     * @default null
     */
    menuItems?: React.ElementType;
}
export interface AccountProps {
    /**
     * The components used for each slot inside.
     */
    slots?: AccountSlots;
    /**
     * The props used for each slot inside.
     */
    slotProps?: {
        signInButton?: ButtonProps;
        signOutButton?: ButtonProps;
        iconButton?: IconButtonProps;
    };
    /**
     * The labels for the account component.
     * @default DEFAULT_LOCALE_TEXT
     */
    localeText?: typeof DEFAULT_LOCALE_TEXT;
}
/**
 *
 * Demos:
 *
 * - [Account](https://mui.com/toolpad/core/react-account/)
 * - [Dashboard Layout](https://mui.com/toolpad/core/react-dashboard-layout/)
 * - [Sign-in Page](https://mui.com/toolpad/core/react-sign-in-page/)
 *
 * API:
 *
 * - [Account API](https://mui.com/toolpad/core/api/account)
 */
declare function Account(props: AccountProps): React.JSX.Element | null;
declare namespace Account {
    var propTypes: any;
}
export { Account };
