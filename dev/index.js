import React from 'react';
import ReactDOM from 'react-dom';

import Examples from './Examples';

const render = (Component) => {
  ReactDOM.render(
    <div>
      <Component />
    </div>,
    document.getElementById('app'),
  );
};

render(Examples);

