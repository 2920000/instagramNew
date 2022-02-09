import React, { memo } from 'react';    
import MainHeader from './MainHeader';
import MainBody from './MainBody';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import CreatePost from './CreatePost';
import SelectPost from './SelectPost';
import DetailPost from './DetailPost';
function MainPage() {

  return <div>
   <Router>
   <MainHeader/>
      <Routes>
         <Route path='/' element={<MainBody/>}>
              <Route path='/create/' element={<CreatePost/>} >
                  <Route path='select' element={<SelectPost/>} />
                  <Route path='detail' element={<DetailPost/>} />

               </Route>
         </Route>

      </Routes>
      
   </Router>
 
  </div>;
}

export default memo(MainPage);
