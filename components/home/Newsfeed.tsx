import { useDispatch } from "react-redux";

import { setShowCreatePostModal } from "redux/counterSlice";
import CreatePost from "./CreatePost";
import Post from "./Post";

const Newsfeed = () => {
  const dispatch = useDispatch();

  const arrayPost = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="flex-1 max-w-3xl">
      <div onClick={() => dispatch(setShowCreatePostModal(true))}>
        <CreatePost />
      </div>
      <div className="flex flex-col gap-y-4">
        {arrayPost.map((_item, index) => (
          <Post key={`post-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
