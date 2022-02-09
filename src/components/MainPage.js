import React, { memo } from 'react';    
import MainHeader from './MainHeader';
import MainBody from './MainBody';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import CreatePost from './CreatePost';
import SelectPost from './SelectPost';
import DetailPost from './DetailPost';
import UpLoadPost from './UpLoadPost';
import SeePost from './SeePost';
function MainPage() {
  // đặt sai route , lần sau cẩn thận đặt lại
  return <div>
   <Router>
   <MainHeader/>
      <Routes>
         <Route path='/' element={<MainBody/>}>
              <Route path='/create/' element={<CreatePost/>} >
                  <Route path='select' element={<SelectPost/>} />
                  <Route path='detail' element={<DetailPost/>} />
                  <Route path='upload' element={<UpLoadPost/>} />
             </Route>
            
         </Route>
         <Route path='/post/:postId' element={<SeePost/>} >
      
      </Route>
      </Routes>
      
   </Router>
 
  </div>;
}

export default memo(MainPage);
