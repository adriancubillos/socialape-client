import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core/';

export default ({ children, onClick, tip, tipPlacement, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement={tipPlacement}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
