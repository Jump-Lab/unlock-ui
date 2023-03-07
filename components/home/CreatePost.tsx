import Image from "next/image";

const CreatePost = () => {
  return (
    <div className="p-5 bg-jacarta-800 border border-jacarta-600 rounded-5x mb-5 font-body">
      <div className="flex items-start w-full gap-4">
        <Image
          src="/public/images/avatars/frame_2"
          width={48}
          height={48}
          className="rounded-full"
          alt="avatar"
          loader={() => "./images/avatars/frame_2.png"}
        />
        <div className="flex-1 ">
          <input
            className="w-full border border-jacarta-700 bg-jacarta-600 rounded-lg placeholder:text-white py-3 px-4 mb-5"
            name="name"
            id=""
            placeholder="Create Post"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <button>
                <Image
                  src="./images/add_image.svg"
                  width={20}
                  height={20}
                  className="rounded-full"
                  alt="add_image"
                  loader={(e) => e.src}
                />
              </button>
              <button>
                <Image
                  src="./images/take_picture.svg"
                  width={20}
                  height={20}
                  className="rounded-full"
                  alt="take_picture"
                  loader={(e) => e.src}
                />
              </button>
              <button>
                <Image
                  src="./images/insert_link.svg"
                  width={20}
                  height={20}
                  className="rounded-full"
                  alt="insert_link"
                  loader={(e) => e.src}
                />
              </button>
              <button>
                <Image
                  src="./images/checkin.svg"
                  width={20}
                  height={20}
                  className="rounded-full"
                  alt="checkin"
                  loader={(e) => e.src}
                />
              </button>
            </div>
            <button className="px-6 py-[6px] rounded-25x shadow-accent-volume bg-accent font-body">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
