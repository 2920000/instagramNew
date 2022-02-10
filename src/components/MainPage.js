import React, { memo } from "react";
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeePost from "./SeePost";
import UserInfor from "./UserInfor";
import CreatePost from "./CreatePost";
import PersonalPosts from "./PersonalPosts";
import PersonalSaved from "./PersonalSaved";
import PersonalTagged from "./PersonalTagged";
function MainPage() {
  // đặt sai route , lần sau cẩn thận đặt lại
  return (
    <div>
       <CreatePost />
      <Router>
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/post/:postId" element={<SeePost />} />
          <Route path="/:userId/" element={<UserInfor />}>
              <Route path="" element={<PersonalPosts/>} />
              <Route path="saved" element={<PersonalSaved/>} />
              <Route path="tagged" element={<PersonalTagged/>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default memo(MainPage);
