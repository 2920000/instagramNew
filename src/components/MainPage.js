import React, { memo,Suspense,lazy } from "react";
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeePost from "./SeePost";
import UserInfor from "./UserInfor";
import CreatePost from "./CreatePost";
import PersonalPosts from "./PersonalPosts";
import PersonalSaved from "./PersonalSaved";
import PersonalTagged from "./PersonalTagged";
import AdjustPostOverlay from "./AdjustPostOverlay";
import UnFollowBoxWithOverlay from "./UnFollowBoxWithOverlay";
import AllUserSuggested from "./AllUserSuggested";
import SeeFollowing from "./SeeFollowing";
import ChatBox from "./ChatBox";
import MessagesById from "./MessagesById";
import Explore from "./Explore";

function MainPage() {

  return (
    <div>
      <Router>
      <CreatePost />
       <AdjustPostOverlay/>
       <UnFollowBoxWithOverlay/>
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/post/:postId" element={<SeePost />} />
          <Route path="/:userId/" element={<UserInfor />}>
              <Route path="" element={<PersonalPosts/>} />
              <Route path="saved" element={<PersonalSaved/>} />
              <Route path="tagged" element={<PersonalTagged/>} />
          </Route>
          
          <Route path="explore/people" element={<AllUserSuggested/>}  />
          <Route path="chat/:userId/"  element={<ChatBox/>} >
              <Route path=":messagesId"  element={<MessagesById/>} />
          </Route>
          <Route path="/explore/" element={<Explore/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default memo(MainPage);
