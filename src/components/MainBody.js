import React ,{memo}from "react";
import Footer from "./Footer";
import MainBodyLeft from "./MainBodyLeft";
import MainBodyRight from "./MainBodyRight";
import UserSuggested from "./UserSuggested";
import { selectLoginUserFullData } from "../features/usersSilce";
import {useSelector} from 'react-redux'
function MainBody() {
  const loginUserFullData=useSelector(selectLoginUserFullData)
  console.log('he')
    return (
     <>
       {loginUserFullData.isReady
       ? <div className="pt-[65px] relative max-w-[600px] lg:max-w-[940px]  m-auto grid grid-cols-2 lg:grid-cols-3 ">
        <div className="col-span-2 ">
          <MainBodyLeft />
        </div>
        <div className="col-span-1 w-full absolute top-[65px] right-0 max-w-[293px] hidden lg:block  ">
          <MainBodyRight />
        </div>
      </div>
       :<div>
         <UserSuggested/>
       </div>}
      <Footer/>
     </>
    );
 
}

export default memo(MainBody);
