import Image from "next/image";
import { useDispatch } from "react-redux";

import myImageLoader from "utils/loader";
import Button from "components/Button";
import {
  setShowCreateCommunityModal,
  setShowCreatePostModal,
} from "redux/counterSlice";

const Information = () => {
  const dispatch = useDispatch();

  return (
    <div className="py-6 px-4 bg-jacarta-700 rounded-5x lg:w-fit w-full h-fit divide-y divide-jacarta-600 ">
      <div className="flex flex-col items-center gap-3 px-14 mb-6">
        <Image
          src="./images/avatars/frame_2.png"
          width={100}
          height={100}
          className="rounded-full"
          alt="avatar"
          loader={myImageLoader}
        />
        <p className="text-xl leading-7 font-semibold">Ha Huyen Chi</p>
        <div className="flex items-center gap-1">
          <Image
            src="./images/location_green.svg"
            alt="location_icon"
            width={20}
            height={20}
            loader={myImageLoader}
          />
          <p className="text-green text-sm">Hanoi, Vietnam</p>
        </div>
      </div>
      <div className="flex flex-col">
        <Button
          isPrimary
          className="mt-6 mb-2"
          onClick={() => dispatch(setShowCreatePostModal(true))}
        >
          Create Post
        </Button>
        <Button
          isSecondary
          onClick={() => dispatch(setShowCreateCommunityModal(true))}
        >
          Create Community
        </Button>
      </div>
    </div>
  );
};

export default Information;
