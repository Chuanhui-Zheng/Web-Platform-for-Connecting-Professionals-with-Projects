"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = Account;
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Popover = _interopRequireDefault(require("@mui/material/Popover"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _Logout2 = _interopRequireDefault(require("@mui/icons-material/Logout"));
var _material = require("@mui/material");
var _SessionAvatar = require("./SessionAvatar");
var _AppProvider = require("../AppProvider/AppProvider");
var _en = _interopRequireDefault(require("../shared/locales/en"));
var _jsxRuntime = require("react/jsx-runtime");
var _Logout;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AccountInfoContainer = (0, _styles.styled)('div')(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  gap: theme.spacing(2)
}));
const SignOutContainer = (0, _styles.styled)('div')(({
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
  var _session$user$name;
  const {
    slots,
    slotProps,
    localeText = _en.default
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const session = React.useContext(_AppProvider.SessionContext);
  const authentication = React.useContext(_AppProvider.AuthenticationContext);
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
  if (!(session != null && session.user)) {
    return slots != null && slots.signInButton ? /*#__PURE__*/(0, _jsxRuntime.jsx)(slots.signInButton, {
      onClick: authentication.signIn
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
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
      ...(slotProps == null ? void 0 : slotProps.signInButton),
      children: localeText == null ? void 0 : localeText.signInLabel
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
        title: (_session$user$name = session.user.name) != null ? _session$user$name : 'Account',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
          onClick: handleClick,
          "aria-describedby": "account-menu",
          "aria-label": "Current User",
          size: "small",
          "aria-controls": open ? 'account-menu' : undefined,
          "aria-haspopup": "true",
          "aria-expanded": open ? 'true' : undefined,
          ...(slotProps == null ? void 0 : slotProps.iconButton),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SessionAvatar.SessionAvatar, {
            session: session,
            sx: {
              width: 32,
              height: 32
            }
          })
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Popover.default, {
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
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(AccountInfoContainer, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SessionAvatar.SessionAvatar, {
          session: session,
          sx: {
            height: 48,
            width: 48
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            fontWeight: "bolder",
            children: session.user.name
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
            variant: "caption",
            children: session.user.email
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Divider.default, {
        sx: {
          mb: 1
        }
      }), slots != null && slots.menuItems ? /*#__PURE__*/(0, _jsxRuntime.jsx)(slots.menuItems, {}) : null, slots != null && slots.signOutButton ? /*#__PURE__*/(0, _jsxRuntime.jsx)(slots.signOutButton, {
        onClick: authentication == null ? void 0 : authentication.signOut
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(SignOutContainer, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
          disabled: !authentication,
          variant: "outlined",
          size: "small",
          disableElevation: true,
          onClick: authentication == null ? void 0 : authentication.signOut,
          sx: {
            textTransform: 'capitalize',
            fontWeight: 'normal',
            filter: 'opacity(0.9)',
            transition: 'filter 0.2s ease-in',
            '&:hover': {
              filter: 'opacity(1)'
            }
          },
          startIcon: _Logout || (_Logout = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Logout2.default, {})),
          ...(slotProps == null ? void 0 : slotProps.signOutButton),
          children: localeText == null ? void 0 : localeText.signOutLabel
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
  localeText: _propTypes.default.shape({
    signInLabel: _propTypes.default.string.isRequired,
    signOutLabel: _propTypes.default.string.isRequired
  }),
  /**
   * The props used for each slot inside.
   */
  slotProps: _propTypes.default.shape({
    iconButton: _propTypes.default.object,
    signInButton: _propTypes.default.object,
    signOutButton: _propTypes.default.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: _propTypes.default.shape({
    menuItems: _propTypes.default.elementType,
    signInButton: _propTypes.default.elementType,
    signOutButton: _propTypes.default.elementType
  })
} : void 0;