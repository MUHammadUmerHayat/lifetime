import React from 'react';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Web from 'material-ui/svg-icons/av/web';
import GridOn from 'material-ui/svg-icons/image/grid-on';

const data = {
  menus: [
    { text: 'Timeline', icon: <Dashboard />, link: '/timeline' },
    { text: 'Photos & Videos', icon: <GridOn />, link: '/media' },
  ],
};

export default data;
