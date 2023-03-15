import { useDispatch } from "react-redux";

import { setShowCreatePostModal } from "redux/counterSlice";
import CreatePost from "./CreatePost";
import Post from "./Post";

const POST_ADDRESSES = ["3j49vEXvJp7UakXeUBHmExA1nqQ8sbjDrAfdBq5NLWu7", "5Y19eNFJLXq6J3csYfkSaQcpY6B4rGwCjBfgHxhz4hAi"]

const Newsfeed = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex-1">
      <div onClick={() => dispatch(setShowCreatePostModal(true))}>
        <CreatePost />
      </div>
      <div className="flex flex-col gap-y-4">
        {POST_ADDRESSES.map((address, index) => (
          <Post key={`post-${index}`} address={address} />
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
