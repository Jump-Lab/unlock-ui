import { ImageLoaderProps } from "next/image";

export default function myImageLoader(i: ImageLoaderProps) {
  return i.src;
}
