import videoReducer from "./video";
import postsReducer from "./posts";
import userReducer from "./user";
import buttonReducer from "./button";
const rootReducers = {
  video: videoReducer,
  posts: postsReducer,
  user: userReducer,
  button:buttonReducer,
};

export default rootReducers;
