import * as React from 'react';
import { AvatarProps } from '@mui/material/Avatar';
import { Session } from '../AppProvider/AppProvider';
/**
 * @ignore - internal component.
 */
export interface SessionAvatarProps extends AvatarProps {
    session: Session;
}
export declare function SessionAvatar(props: SessionAvatarProps): React.JSX.Element;
