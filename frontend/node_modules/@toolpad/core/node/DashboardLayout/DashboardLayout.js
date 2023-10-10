"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardLayout = DashboardLayout;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _material = require("@mui/material");
var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));
var _Avatar = _interopRequireDefault(require("@mui/material/Avatar"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Collapse = _interopRequireDefault(require("@mui/material/Collapse"));
var _Divider = _interopRequireDefault(require("@mui/material/Divider"));
var _Drawer = _interopRequireDefault(require("@mui/material/Drawer"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));
var _ListItemButton = _interopRequireDefault(require("@mui/material/ListItemButton"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _ListSubheader = _interopRequireDefault(require("@mui/material/ListSubheader"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _Toolbar3 = _interopRequireDefault(require("@mui/material/Toolbar"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _useMediaQuery = _interopRequireDefault(require("@mui/material/useMediaQuery"));
var _ExpandLess = _interopRequireDefault(require("@mui/icons-material/ExpandLess"));
var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));
var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));
var _MenuOpen = _interopRequireDefault(require("@mui/icons-material/MenuOpen"));
var _Link = require("../shared/Link");
var _context = require("../shared/context");
var _Account = require("../Account");
var _navigation = require("../shared/navigation");
var _branding = require("../shared/branding");
var _ToolbarActions = require("./ToolbarActions");
var _ThemeSwitcher2 = require("./ThemeSwitcher");
var _ToolpadLogo2 = require("./ToolpadLogo");
var _jsxRuntime = require("react/jsx-runtime");
var _ExpandLessIcon, _ExpandMoreIcon, _MenuOpenIcon, _MenuIcon, _Toolbar, _ToolpadLogo, _ThemeSwitcher, _Toolbar2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AppBar = (0, _material.styled)(_AppBar.default)(({
  theme
}) => {
  var _theme$vars;
  return {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: ((_theme$vars = theme.vars) != null ? _theme$vars : theme).palette.divider,
    boxShadow: 'none',
    // TODO: Temporary fix to issue reported in https://github.com/mui/material-ui/issues/43244
    left: 0,
    zIndex: theme.zIndex.drawer + 1
  };
});
const LogoContainer = (0, _material.styled)('div')({
  position: 'relative',
  height: 40,
  '& img': {
    maxHeight: 40
  }
});
const getDrawerSxTransitionMixin = (isExpanded, property) => ({
  transition: theme => theme.transitions.create(property, {
    easing: theme.transitions.easing.sharp,
    duration: isExpanded ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
  })
});
const getDrawerWidthTransitionMixin = isExpanded => ({
  ...getDrawerSxTransitionMixin(isExpanded, 'width'),
  overflowX: 'hidden'
});
const NavigationListItemButton = (0, _material.styled)(_ListItemButton.default)(({
  theme
}) => {
  var _theme$vars2, _theme$vars3, _theme$vars4, _theme$vars5, _theme$vars6, _theme$vars7, _theme$vars8;
  return {
    borderRadius: 8,
    '&.Mui-selected': {
      '& .MuiListItemIcon-root': {
        color: ((_theme$vars2 = theme.vars) != null ? _theme$vars2 : theme).palette.primary.dark
      },
      '& .MuiTypography-root': {
        color: ((_theme$vars3 = theme.vars) != null ? _theme$vars3 : theme).palette.primary.dark
      },
      '& .MuiSvgIcon-root': {
        color: ((_theme$vars4 = theme.vars) != null ? _theme$vars4 : theme).palette.primary.dark
      },
      '& .MuiAvatar-root': {
        backgroundColor: ((_theme$vars5 = theme.vars) != null ? _theme$vars5 : theme).palette.primary.dark
      },
      '& .MuiTouchRipple-child': {
        backgroundColor: ((_theme$vars6 = theme.vars) != null ? _theme$vars6 : theme).palette.primary.dark
      }
    },
    '& .MuiSvgIcon-root': {
      color: ((_theme$vars7 = theme.vars) != null ? _theme$vars7 : theme).palette.action.active
    },
    '& .MuiAvatar-root': {
      backgroundColor: ((_theme$vars8 = theme.vars) != null ? _theme$vars8 : theme).palette.action.active
    }
  };
});
function DashboardSidebarSubNavigation({
  subNavigation,
  basePath = '',
  depth = 0,
  onLinkClick,
  isMini = false,
  isFullyExpanded = true,
  hasDrawerTransitions = false,
  selectedItemId
}) {
  var _routerContext$pathna;
  const routerContext = React.useContext(_context.RouterContext);
  const pathname = (_routerContext$pathna = routerContext == null ? void 0 : routerContext.pathname) != null ? _routerContext$pathna : '/';
  const initialExpandedSidebarItemIds = React.useMemo(() => subNavigation.map((navigationItem, navigationItemIndex) => ({
    navigationItem,
    originalIndex: navigationItemIndex
  })).filter(({
    navigationItem
  }) => (0, _navigation.hasSelectedNavigationChildren)(navigationItem, basePath, pathname)).map(({
    originalIndex
  }) => `${depth}-${originalIndex}`), [basePath, depth, pathname, subNavigation]);
  const [expandedSidebarItemIds, setExpandedSidebarItemIds] = React.useState(initialExpandedSidebarItemIds);
  const handleOpenFolderClick = React.useCallback(itemId => () => {
    setExpandedSidebarItemIds(previousValue => previousValue.includes(itemId) ? previousValue.filter(previousValueItemId => previousValueItemId !== itemId) : [...previousValue, itemId]);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_List.default, {
    sx: {
      padding: 0,
      mb: depth === 0 ? 4 : 1,
      pl: 2 * depth
    },
    children: subNavigation.map((navigationItem, navigationItemIndex) => {
      var _navigationItem$icon;
      if (navigationItem.kind === 'header') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListSubheader.default, {
          component: "div",
          sx: {
            fontSize: 12,
            fontWeight: '700',
            height: isMini ? 0 : 40,
            ...(hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, 'height') : {}),
            px: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          },
          children: (0, _navigation.getItemTitle)(navigationItem)
        }, `subheader-${depth}-${navigationItemIndex}`);
      }
      if (navigationItem.kind === 'divider') {
        const nextItem = subNavigation[navigationItemIndex + 1];
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Divider.default, {
          sx: {
            borderBottomWidth: 2,
            mx: 1,
            mt: 1,
            mb: (nextItem == null ? void 0 : nextItem.kind) === 'header' && !isMini ? 0 : 1,
            ...(hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, 'margin') : {})
          }
        }, `divider-${depth}-${navigationItemIndex}`);
      }
      const navigationItemFullPath = (0, _navigation.getPageItemFullPath)(basePath, navigationItem);
      const navigationItemId = `${depth}-${navigationItemIndex}`;
      const navigationItemTitle = (0, _navigation.getItemTitle)(navigationItem);
      const isNestedNavigationExpanded = expandedSidebarItemIds.includes(navigationItemId);
      const nestedNavigationCollapseIcon = isNestedNavigationExpanded ? _ExpandLessIcon || (_ExpandLessIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExpandLess.default, {})) : _ExpandMoreIcon || (_ExpandMoreIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExpandMore.default, {}));
      const listItemIconSize = 34;
      const isSelected = (0, _navigation.isPageItemSelected)(navigationItem, basePath, pathname);
      if (process.env.NODE_ENV !== 'production' && isSelected && selectedItemId) {
        console.warn(`Duplicate selected path in navigation: ${navigationItemFullPath}`);
      }
      if (isSelected && !selectedItemId) {
        selectedItemId = navigationItemId;
      }
      const listItem = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, {
        sx: {
          py: 0,
          px: 1,
          overflowX: 'hidden'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(NavigationListItemButton, {
          selected: isSelected && (!navigationItem.children || isMini),
          sx: {
            px: 1.4,
            height: 48
          },
          ...(navigationItem.children && !isMini ? {
            onClick: handleOpenFolderClick(navigationItemId)
          } : {
            LinkComponent: _Link.Link,
            href: navigationItemFullPath,
            onClick: onLinkClick
          }),
          children: [navigationItem.icon || isMini ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItemIcon.default, {
            sx: {
              minWidth: listItemIconSize,
              mr: 1.2
            },
            children: [(_navigationItem$icon = navigationItem.icon) != null ? _navigationItem$icon : null, !navigationItem.icon && isMini ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Avatar.default, {
              sx: {
                width: listItemIconSize - 7,
                height: listItemIconSize - 7,
                fontSize: 12,
                ml: '-2px'
              },
              children: navigationItemTitle.split(' ').slice(0, 2).map(itemTitleWord => itemTitleWord.charAt(0).toUpperCase())
            }) : null]
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
            primary: navigationItemTitle,
            sx: {
              whiteSpace: 'nowrap',
              zIndex: 1,
              '& .MuiTypography-root': {
                fontWeight: '500'
              }
            }
          }), navigationItem.action && !isMini && isFullyExpanded ? navigationItem.action : null, navigationItem.children && !isMini && isFullyExpanded ? nestedNavigationCollapseIcon : null]
        })
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [isMini ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
          title: navigationItemTitle,
          placement: "right",
          children: listItem
        }) : listItem, navigationItem.children && !isMini ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Collapse.default, {
          in: isNestedNavigationExpanded,
          timeout: "auto",
          unmountOnExit: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DashboardSidebarSubNavigation, {
            subNavigation: navigationItem.children,
            basePath: navigationItemFullPath,
            depth: depth + 1,
            onLinkClick: onLinkClick,
            selectedItemId: selectedItemId
          })
        }) : null]
      }, navigationItemId);
    })
  });
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
function DashboardLayout(props) {
  var _slots$toolbarActions, _slots$toolbarAccount, _branding$logo, _theme$vars9;
  const {
    children,
    disableCollapsibleSidebar = false,
    slots,
    slotProps
  } = props;
  const theme = (0, _material.useTheme)();
  const branding = React.useContext(_context.BrandingContext);
  const navigation = React.useContext(_context.NavigationContext);
  const appWindow = React.useContext(_context.WindowContext);
  const applicationTitle = (0, _branding.useApplicationTitle)();
  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] = React.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] = React.useState(false);
  const isUnderMdViewport = (0, _useMediaQuery.default)(theme.breakpoints.down('md'), appWindow && {
    matchMedia: appWindow.matchMedia
  });
  const isOverSmViewport = (0, _useMediaQuery.default)(theme.breakpoints.up('sm'), appWindow && {
    matchMedia: appWindow.matchMedia
  });
  const isNavigationExpanded = isUnderMdViewport ? isMobileNavigationExpanded : isDesktopNavigationExpanded;
  const setIsNavigationExpanded = React.useCallback(newExpanded => {
    if (isUnderMdViewport) {
      setIsMobileNavigationExpanded(newExpanded);
    } else {
      setIsDesktopNavigationExpanded(newExpanded);
    }
  }, [isUnderMdViewport]);
  const [isNavigationFullyExpanded, setIsNavigationFullyExpanded] = React.useState(isNavigationExpanded);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (isNavigationExpanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsNavigationFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);
      return () => clearTimeout(drawerWidthTransitionTimeout);
    }
    setIsNavigationFullyExpanded(false);
  }, [isNavigationExpanded, theme]);
  const selectedItemIdRef = React.useRef('');
  const handleSetNavigationExpanded = React.useCallback(newExpanded => () => {
    setIsNavigationExpanded(newExpanded);
  }, [setIsNavigationExpanded]);
  const toggleNavigationExpanded = React.useCallback(() => {
    setIsNavigationExpanded(!isNavigationExpanded);
  }, [isNavigationExpanded, setIsNavigationExpanded]);
  const handleNavigationLinkClick = React.useCallback(() => {
    selectedItemIdRef.current = '';
    setIsMobileNavigationExpanded(false);
  }, [setIsMobileNavigationExpanded]);

  // If useEffect was used, the reset would also happen on the client render after SSR which we don't need
  React.useMemo(() => {
    selectedItemIdRef.current = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const isDesktopMini = !disableCollapsibleSidebar && !isDesktopNavigationExpanded;
  const isMobileMini = !disableCollapsibleSidebar && !isMobileNavigationExpanded;
  const getMenuIcon = React.useCallback(isExpanded => {
    const expandMenuActionText = 'Expand';
    const collapseMenuActionText = 'Collapse';
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
      title: `${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`,
      enterDelay: 1000,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
          "aria-label": `${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`,
          onClick: toggleNavigationExpanded,
          children: isExpanded ? _MenuOpenIcon || (_MenuOpenIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuOpen.default, {})) : _MenuIcon || (_MenuIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Menu.default, {}))
        })
      })
    });
  }, [toggleNavigationExpanded]);
  const hasDrawerTransitions = isOverSmViewport && (disableCollapsibleSidebar || !isUnderMdViewport);
  const getDrawerContent = React.useCallback((isMini, ariaLabel) => {
    var _navigation$;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [_Toolbar || (_Toolbar = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar3.default, {})), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
        component: "nav",
        "aria-label": ariaLabel,
        sx: {
          overflow: 'auto',
          pt: ((_navigation$ = navigation[0]) == null ? void 0 : _navigation$.kind) === 'header' && !isMini ? 0 : 2,
          ...(hasDrawerTransitions ? getDrawerSxTransitionMixin(isNavigationFullyExpanded, 'padding') : {})
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DashboardSidebarSubNavigation, {
          subNavigation: navigation,
          onLinkClick: handleNavigationLinkClick,
          isMini: isMini,
          isFullyExpanded: isNavigationFullyExpanded,
          hasDrawerTransitions: hasDrawerTransitions,
          selectedItemId: selectedItemIdRef.current
        })
      })]
    });
  }, [handleNavigationLinkClick, hasDrawerTransitions, isNavigationFullyExpanded, navigation]);
  const getDrawerSharedSx = React.useCallback(isMini => {
    const drawerWidth = isMini ? 64 : 320;
    return {
      width: drawerWidth,
      flexShrink: 0,
      ...getDrawerWidthTransitionMixin(isNavigationExpanded),
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundImage: 'none',
        ...getDrawerWidthTransitionMixin(isNavigationExpanded)
      }
    };
  }, [isNavigationExpanded]);
  const ToolbarActionsSlot = (_slots$toolbarActions = slots == null ? void 0 : slots.toolbarActions) != null ? _slots$toolbarActions : _ToolbarActions.ToolbarActions;
  const ToolbarAccountSlot = (_slots$toolbarAccount = slots == null ? void 0 : slots.toolbarAccount) != null ? _slots$toolbarAccount : _Account.Account;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
    sx: {
      display: 'flex'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(AppBar, {
      color: "inherit",
      position: "fixed",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Toolbar3.default, {
        sx: {
          backgroundColor: 'inherit',
          minWidth: '100vw',
          mx: {
            xs: -0.75,
            sm: -1.5
          }
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
          sx: {
            mr: {
              sm: disableCollapsibleSidebar ? 0 : 1
            },
            display: {
              md: 'none'
            }
          },
          children: getMenuIcon(isMobileNavigationExpanded)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
          sx: {
            display: {
              xs: 'none',
              md: disableCollapsibleSidebar ? 'none' : 'block'
            },
            mr: disableCollapsibleSidebar ? 0 : 1
          },
          children: getMenuIcon(isDesktopNavigationExpanded)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
          sx: {
            position: {
              xs: 'absolute',
              md: 'static'
            },
            left: {
              xs: '50%',
              md: 'auto'
            },
            transform: {
              xs: 'translateX(-50%)',
              md: 'none'
            }
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.Link, {
            href: "/",
            style: {
              color: 'inherit',
              textDecoration: 'none'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Stack.default, {
              direction: "row",
              alignItems: "center",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(LogoContainer, {
                children: (_branding$logo = branding == null ? void 0 : branding.logo) != null ? _branding$logo : _ToolpadLogo || (_ToolpadLogo = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolpadLogo2.ToolpadLogo, {
                  size: 40
                }))
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
                variant: "h6",
                sx: {
                  color: ((_theme$vars9 = theme.vars) != null ? _theme$vars9 : theme).palette.primary.main,
                  fontWeight: '700',
                  ml: 0.5,
                  whiteSpace: 'nowrap'
                },
                children: applicationTitle
              })]
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
          sx: {
            flexGrow: 1
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Stack.default, {
          direction: "row",
          spacing: 1,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarActionsSlot, {
            ...(slotProps == null ? void 0 : slotProps.toolbarActions)
          }), _ThemeSwitcher || (_ThemeSwitcher = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeSwitcher2.ThemeSwitcher, {})), /*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarAccountSlot, {
            ...(slotProps == null ? void 0 : slotProps.toolbarAccount)
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Drawer.default, {
      container: appWindow == null ? void 0 : appWindow.document.body,
      variant: "temporary",
      open: isMobileNavigationExpanded,
      onClose: handleSetNavigationExpanded(false),
      ModalProps: {
        keepMounted: true // Better open performance on mobile.
      },
      sx: {
        display: {
          xs: 'block',
          sm: disableCollapsibleSidebar ? 'block' : 'none',
          md: 'none'
        },
        ...getDrawerSharedSx(false)
      },
      children: getDrawerContent(false, 'Phone')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Drawer.default, {
      variant: "permanent",
      sx: {
        display: {
          xs: 'none',
          sm: disableCollapsibleSidebar ? 'none' : 'block',
          md: 'none'
        },
        ...getDrawerSharedSx(isMobileMini)
      },
      children: getDrawerContent(isMobileMini, 'Tablet')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Drawer.default, {
      variant: "permanent",
      sx: {
        display: {
          xs: 'none',
          md: 'block'
        },
        ...getDrawerSharedSx(isDesktopMini)
      },
      children: getDrawerContent(isDesktopMini, 'Desktop')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
      component: "main",
      sx: {
        flexGrow: 1,
        // TODO: Temporary fix to issue reported in https://github.com/mui/material-ui/issues/43244
        minWidth: {
          xs: disableCollapsibleSidebar && isNavigationExpanded ? '100vw' : 'auto',
          md: 'auto'
        }
      },
      children: [_Toolbar2 || (_Toolbar2 = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar3.default, {})), children]
    })]
  });
}
process.env.NODE_ENV !== "production" ? DashboardLayout.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the dashboard.
   */
  children: _propTypes.default.node,
  /**
   * Whether the sidebar should not be collapsible to a mini variant in desktop and tablet viewports.
   * @default false
   */
  disableCollapsibleSidebar: _propTypes.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    toolbarAccount: _propTypes.default.shape({
      localeText: _propTypes.default.shape({
        signInLabel: _propTypes.default.string.isRequired,
        signOutLabel: _propTypes.default.string.isRequired
      }),
      slotProps: _propTypes.default.shape({
        iconButton: _propTypes.default.object,
        signInButton: _propTypes.default.object,
        signOutButton: _propTypes.default.object
      }),
      slots: _propTypes.default.shape({
        menuItems: _propTypes.default.elementType,
        signInButton: _propTypes.default.elementType,
        signOutButton: _propTypes.default.elementType
      })
    }),
    toolbarActions: _propTypes.default.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    toolbarAccount: _propTypes.default.elementType,
    toolbarActions: _propTypes.default.elementType
  })
} : void 0;