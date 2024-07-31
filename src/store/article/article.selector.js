import { createSelector } from "@reduxjs/toolkit";

export const selectArticleReducer = (state) => state.articles.articleList;

export const selectFirstArticle = createSelector(
  [selectArticleReducer],
  (articles) => articles[0]
)

export const selectArticleFilteredList = createSelector(
  [selectArticleReducer],
  (articles) => Object.values(articles).slice(1)
)