var _Logout;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import { SessionAvatar } from "./SessionAvatar.js";
import { SessionContext, AuthenticationContext } from "../AppProvider/AppProvider.js";
import DEFAULT_LOCALE_TEXT from "../shared/locales/en.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AccountInfoContainer = styled('div')(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  gap: theme.spacing(2)
}));
const SignOutContainer = styled('div')(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(1),
  justifyContent: 'flex-end'
}));
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
function Account(props) {
  const {
    slots,
    slotProps,
    localeText = DEFAULT_LOCALE_TEXT
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const session = React.useContext(SessionContext);
  const authentication = React.useContext(AuthenticationContext);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!authentication) {
    return null;
  }
  if (!session?.user) {
    return slots?.signInButton ? /*#__PURE__*/_jsx(slots.signInButton, {
      onClick: authentication.signIn
    }) : /*#__PURE__*/_jsx(Button, {
      disableElevation: true,
      variant: "contained",
      color: "inherit",
      size: "small",
      onClick: authentication.signIn,
      sx: {
        textTransform: 'capitalize',
        filter: 'opacity(0.9)',
        transition: 'filter 0.2s ease-in',
        '&:hover': {
          filter: 'opacity(1)'
        }
      },
      ...slotProps?.signInButton,
      children: localeText?.signInLabel
    });
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      },
      children: /*#__PURE__*/_jsx(Tooltip, {
        title: session.user.name ?? 'Account',
        children: /*#__PURE__*/_jsx(IconButton, {
          onClick: handleClick,
          "aria-describedby": "account-menu",
          "aria-label": "Current User",
          size: "small",
          "aria-controls": open ? 'account-menu' : undefined,
          "aria-haspopup": "true",
          "aria-expanded": open ? 'true' : undefined,
          ...slotProps?.iconButton,
          children: /*#__PURE__*/_jsx(SessionAvatar, {
            session: session,
            sx: {
              width: 32,
              height: 32
            }
          })
        })
      })
    }), /*#__PURE__*/_jsxs(Popover, {
      anchorEl: anchorEl,
      id: "account-menu",
      open: open,
      onClick: handleClose,
      onClose: handleClose,
      slotProps: {
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            // Attach a caret to the dropdown menu
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }
      },
      transformOrigin: {
        horizontal: 'right',
        vertical: 'top'
      },
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
      },
      children: [/*#__PURE__*/_jsxs(AccountInfoContainer, {
        children: [/*#__PURE__*/_jsx(SessionAvatar, {
          session: session,
          sx: {
            height: 48,
            width: 48
          }
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Typography, {
            fontWeight: "bolder",
            children: session.user.name
          }), /*#__PURE__*/_jsx(Typography, {
            variant: "caption",
            children: session.user.email
          })]
        })]
      }), /*#__PURE__*/_jsx(Divider, {
        sx: {
          mb: 1
        }
      }), slots?.menuItems ? /*#__PURE__*/_jsx(slots.menuItems, {}) : null, slots?.signOutButton ? /*#__PURE__*/_jsx(slots.signOutButton, {
        onClick: authentication?.signOut
      }) : /*#__PURE__*/_jsx(SignOutContainer, {
        children: /*#__PURE__*/_jsx(Button, {
          disabled: !authentication,
          variant: "outlined",
          size: "small",
          disableElevation: true,
          onClick: authentication?.signOut,
          sx: {
            textTransform: 'capitalize',
            fontWeight: 'normal',
            filter: 'opacity(0.9)',
            transition: 'filter 0.2s ease-in',
            '&:hover': {
              filter: 'opacity(1)'
            }
          },
          startIcon: _Logout || (_Logout = /*#__PURE__*/_jsx(Logout, {})),
          ...slotProps?.signOutButton,
          children: localeText?.signOutLabel
        })
      })]
    })]
  });
}
process.env.NODE_ENV !== "production" ? Account.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The labels for the account component.
   * @default DEFAULT_LOCALE_TEXT
   */
  localeText: PropTypes.shape({
    signInLabel: PropTypes.string.isRequired,
    signOutLabel: PropTypes.string.isRequired
  }),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    iconButton: PropTypes.object,
    signInButton: PropTypes.object,
    signOutButton: PropTypes.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    menuItems: PropTypes.elementType,
    signInButton: PropTypes.elementType,
    signOutButton: PropTypes.elementType
  })
} : void 0;
export { Account };