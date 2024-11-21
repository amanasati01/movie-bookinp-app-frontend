import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { DirectionAwareHover } from "./direction-aware-hover";
import { useNavigate } from "react-router-dom";

interface ParallaxScrollProps {
  images: {posterURL:string,title :string}[];
  className?: string;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  images,
  className,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const forth = Math.ceil(images.length / 4);
  const firstPart = images.slice(0, forth);
  const secondPart = images.slice(forth, 2 * forth);
  const thirdPart = images.slice(2 * forth,3*forth);
  const forthPart = images.slice(3*forth);
  console.log(images);
  const navigate = useNavigate();
  function navigateHandler(title : string){
    navigate(`/title?title=${title}`)
  }
  return (
    <div
      className={`h-[40rem] items-start overflow-y-auto w-full scrollbar-hide ${className}`}
      ref={gridRef}
    >
    <div className="grid grid-cols-1 mt-4  md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto  gap-10   ">
     <div className="grid gap-10">
       {firstPart.map((el, idx) => (
        <motion.div className="flex justify-center " style={{ y: translateFirst }} key={"grid-1" + idx}>
        <div onClick={()=>{
          navigateHandler(el.title);
        }} className="cursor-pointer">
        <DirectionAwareHover imageUrl={el.posterURL} children={el.title}/>
        </div>
      </motion.div>
    ))}
     </div>
     <div className="grid gap-10">
    {secondPart.map((el, idx) => (
      <motion.div className="flex justify-center" style={{ y: translateSecond }} key={"grid-2" + idx}>
       <div onClick={()=>{
          navigateHandler(el.title);
        }} className="cursor-pointer">
        <DirectionAwareHover imageUrl={el.posterURL} children={el.title}/>
        </div>
      </motion.div>
    ))}
     </div>
     <div className="grid gap-10 ">
    {thirdPart.map((el, idx) => (
      <motion.div className="flex justify-center" style={{ y: translateThird }} key={"grid-3" + idx}>
       <div onClick={()=>{
          navigateHandler(el.title);
        }} className="cursor-pointer">
        <DirectionAwareHover imageUrl={el.posterURL} children={el.title}/>
        </div>
      </motion.div>
    ))}
     </div>
     <div className="grid gap-10 ">
    {forthPart.map((el, idx) => (
      <motion.div className="flex justify-center" style={{ y: translateThird }} key={"grid-3" + idx}>
        <div onClick={()=>{
          navigateHandler(el.title);
        }} className="cursor-pointer">
        <DirectionAwareHover imageUrl={el.posterURL} children={el.title}/>
        </div>
      </motion.div>
    ))}
     </div>
   </div>

    </div>
  );
};
