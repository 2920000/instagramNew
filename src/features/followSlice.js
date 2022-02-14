import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unfollowBoxWithOverlay: {
    isShow: false,
    dataUserToUnfollow: {},
    dataToUpdateFollowStatus: {},
  },
  isShowFollowingBox: false,
  isShowFollowersBox: false,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    UNFOLLOW_BOX: (state, action) => {
      state.unfollowBoxWithOverlay = action.payload;
    },
    SEE_FOLLOWING: (state, action) => {
      state.isShowFollowingBox = action.payload;
    },
    SEE_FOLLOWERS: (state, action) => {
      state.isShowFollowersBox = action.payload;
    },
  },
});

export default followSlice.reducer;
export const selectUnfollow = (state) => state.follow.unfollowBoxWithOverlay;
export const selectFollowingBoxStatus = (state) =>
  state.follow.isShowFollowingBox;
export const selectFollowersBoxStatus = (state) =>
  state.follow.isShowFollowersBox;

export const { UNFOLLOW_BOX, SEE_FOLLOWING, SEE_FOLLOWERS } =
  followSlice.actions;
