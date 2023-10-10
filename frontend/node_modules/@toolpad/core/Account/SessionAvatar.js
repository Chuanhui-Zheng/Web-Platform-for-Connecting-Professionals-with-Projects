import * as React from 'react';
import Avatar from '@mui/material/Avatar';

/**
 * @ignore - internal component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function SessionAvatar(props) {
  const {
    session,
    ...rest
  } = props;
  return /*#__PURE__*/_jsx(Avatar, {
    src: session.user?.image || '',
    alt: session.user?.name || session.user?.email || '',
    ...rest
  });
}