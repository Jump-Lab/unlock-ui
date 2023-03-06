import Image from "next/image";
import myImageLoader from "utils/loader";

const Information = () => {
  return (
    <div className="py-10 px-6 bg-jacarta-700 rounded-5x w-fit h-fit">
      <div className="flex flex-col items-center gap-3 px-14">
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
    </div>
  );
};

export default Information;
