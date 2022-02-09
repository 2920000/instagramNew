import React from 'react';
import {Outlet} from 'react-router-dom'
function MainBody() {
  return <div>
    <Outlet/>
  </div>;
}

export default MainBody;
