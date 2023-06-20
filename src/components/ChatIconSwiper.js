import { Box } from "@chakra-ui/react";
import { AIAvatar } from "@/assets/AIAvatar";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { agentsImages } from "./Utils";

// Swiper for the Agent Icons for use in the Chat Mode Screen
export const ChatIconsSwiper = ({ onClickAgent }) => {
  return (
    <Swiper
      // spaceBetween={50}
      // slidesPerView={4}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 4,
        },
        370: {
          slidesPerView: 5,
        },
        440: {
          slidesPerView: 6,
        },
        // 480: {
        //   slidesPerView: 4
        // }
      }}
      // autoHeight={true}
      spaceBetween={0}
      grabCursor={true}
      freeMode={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {/* Show a Pri-AI icon for base Pri-AI */}
      <SwiperSlide style={{ padding: "10px" }}>
        <Box
          cursor={"pointer"}
          position={"relative"}
          width={"fit-content"}
          onClick={() => {
            onClickAgent("Personal Assistant");
          }}
        >
          <AIAvatar scale={3} />
        </Box>
      </SwiperSlide>
      {/* Show a Agent icon for all the agents that have a set Icon */}
      {Object.keys(agentsImages)
        .filter((agent) => {
          return agentsImages[agent]?.circleAvatar || false;
        })
        .sort()
        .map((agent, i) => {
          return (
            <SwiperSlide key={i} style={{ padding: "10px" }}>
              <Box
                cursor={"pointer"}
                position={"relative"}
                width={"fit-content"}
                onClick={() => {
                  onClickAgent(agent);
                }}
              >
                <Image
                  src={`/${agentsImages[agent].circleAvatar}`}
                  width={50}
                  height={50}
                  alt={`Picture of the ${agent}`}
                ></Image>
                <Box position={"absolute"} zIndex={2} bottom={-2} right={-2}>
                  {agentsImages[agent].chatIcon}
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
