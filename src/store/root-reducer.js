import { combineReducers } from "@reduxjs/toolkit";
import { articleReducer } from "./article/article.reducer";

export const rootReducer = combineReducers({
  articles: articleReducer,
})