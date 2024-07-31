import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  articleList: []
};

export const articleSlice = createSlice({
  name: 'article',
  initialState: INITIAL_STATE,
  reducers: {
    setArticleList(state, action){
      state.articleList = {...state.articleList, ...action.payload};
    }
  }
})

export const {setArticleList} = articleSlice.actions;

export const articleReducer = articleSlice.reducer;