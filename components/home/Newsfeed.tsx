import CreatePost from "./CreatePost";
import Post from "./Post";

const Newsfeed = () => {
  const arrayPost = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="flex-1">
      <CreatePost />
      <div className="flex flex-col gap-y-4">
        {arrayPost.map((_item, index) => (
          <Post key={`post-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
