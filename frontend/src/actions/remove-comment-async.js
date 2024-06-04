import { request } from "../utils/request";
import { removeComment } from "./remove-comment";

export const removeCommentAsync = (postId, commentId) => (dispatch) => {
  request(`/posts/${postId}/comments/${commentId}`, "DELETE").then(() => {
    dispatch(removeComment(commentId));
  });
};
