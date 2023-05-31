import { AIAvatar } from "@/assets/AIAvatar";
import { UserAvatar } from "@/assets/UserAvatar";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Error } from "@/assets/Error";
import { Retry } from "@/assets/Retry";
import { agentsImages } from "./Utils";
import styles from "./Message.module.css";
import Image from "next/image";

export const Message = ({
  index,
  time,
  username,
  aiName,
  speaker,
  message,
  calloutAgent,
  keepMessageAsIs,
  lastMessage,
  error,
  loading,
  retry,
}) => {
  function formatTimestamp(timestamp) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(timestamp);
    const day = daysOfWeek[date.getDay()];
    let hour = date.getHours();
    const minutes = date.getMinutes();
    let period = "am";

    if (hour >= 12) {
      period = "pm";
      if (hour > 12) {
        hour -= 12;
      }
    }

    const formattedTime = `${hour}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;
    return `${day} ${formattedTime}`;
  }

  // console.log({
  //   index,
  //   time,
  //   username,
  //   aiName,
  //   speaker,
  //   message,
  //   calloutAgent,
  //   keepMessageAsIs,
  //   lastMessage,
  //   error,
  //   loading,
  // });
  return (
    <Flex
      key={index}
      onDoubleClick={() => {
        try {
          calloutAgent();
        } catch (e) {}
      }}
      style={{
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1,
        backgroundColor: speaker === username ? "#F9FAFB" : "white",
        flexDirection: "column",
      }}
    >
      {speaker !== username && loading === 0 && (
        <Text
          style={{
            fontSize: 12,
            color: "#475467",
            fontWeight: 400,
            alignSelf: "end",
          }}
        >
          {formatTimestamp(time)}
        </Text>
      )}
      <Flex flexDir={"row"}>
        <Box>
          {speaker === username ? (
            <UserAvatar />
          ) : agentsImages[speaker]?.chatIcon ? (
            agentsImages[speaker]?.chatIcon
          ) : (
            <AIAvatar />
          )}
        </Box>
        <Flex
          width={"100%"}
          style={{
            marginLeft: "8px",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: "4px",
            justifyContent: "space-between",
            borderBottom: "1px solid #EAECF0",
            alignItems: "center",
          }}
        >
          <Flex width={"100%"}>
            <Text
              height={"fit-content"}
              style={{
                fontSize: 16,
                color: "#344054",
                fontWeight: 500,
              }}
            >
              {speaker === username
                ? `You (${username})`
                : speaker === "Personal Assistant"
                ? aiName !== ""
                  ? aiName
                  : `${username}'s personal AI assistant`
                : speaker}
            </Text>
            <Spacer />
            {speaker === username ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "#475467",
                  fontWeight: 400,
                  alignSelf: "end",
                }}
              >
                {formatTimestamp(time)}
              </Text>
            ) : (
              <Flex alignItems={"center"} gap={"5px"}>
                {speaker === "Personal Assistant" ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#107569",
                      fontWeight: 500,
                      backgroundColor: "#F0FDF9",
                      padding: "3px",
                      height: "fit-content",
                    }}
                  >
                    PRI AI
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#5925DC",
                      fontWeight: 500,
                      backgroundColor: "#F4F3FF",
                      padding: "3px",
                      height: "fit-content",
                    }}
                  >
                    AGENT
                  </Text>
                )}
                {((loading === 2 && lastMessage === index) ||
                  (!index && loading > 0)) && (
                  <Image
                    src="/Spinner.gif"
                    width={30}
                    height={30}
                    alt="Picture of the author"
                  />
                )}
                {error && <Error />}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} style={{ marginLeft: 36, marginTop: 10 }}>
        <Text
          className={
            (loading === 2 && lastMessage === index) || (!index && loading > 0)
              ? styles.message
              : null
          }
          style={{
            fontSize: 16,
            color: "#475467",
            fontWeight: 400,
          }}
        >
          {keepMessageAsIs === true ? (
            <>{message}</>
          ) : (
            <>
              {message.split(/([@#]\w+)/).map((str, strIndex) => {
                return (
                  <span
                    key={strIndex}
                    style={{
                      fontWeight: ["#", "@"].includes(str.charAt(0))
                        ? "bold"
                        : "normal",
                    }}
                  >
                    {str}
                  </span>
                );
              })}
            </>
          )}
        </Text>
        {error && (
          <Flex
            marginTop={"10px"}
            flexDir={"row"}
            borderLeft={"8px solid #FECDCA"}
            border={"1px solid #FECDCA"}
            borderRadius={"8px"}
            style={{ background: "#FFFBFA" }}
          >
            <Flex
              position={"relative"}
              borderTopLeftRadius={"8px"}
              borderBottomLeftRadius={"8px"}
              backgroundColor={"#FECDCA"}
              width={"8px"}
            ></Flex>
            <Flex flexDirection={"column"} padding={"16px 10px"}>
              <Flex flexDirection={"row"} gap={"5px"} alignItems={"center"}>
                <Text fontSize={"14px"} color={"#F04438"} fontWeight={600}>
                  {error.status === 503
                    ? "No Network Connection"
                    : "APIConnectionError"}
                </Text>
                <Error />
              </Flex>

              <Text fontWeight={400} fontSize={"14px"} color={"#F04438"}>
                {error.status === 503
                  ? "You are not connected to the internet. Please reconnect and try again."
                  : "Issue connecting to our services. Check your network settings, proxy configuration, SSL certificates, or firewall rules."}
              </Text>
            </Flex>
          </Flex>
        )}
        {/* {console.log({a, messageIndex,conversations[messageIndex]?.messages.})} */}
        {console.log({
          index,
          time,
          username,
          aiName,
          speaker,
          message,
          calloutAgent,
          keepMessageAsIs,
          lastMessage,
          error,
          loading,
          retry,
        })}
        {error &&
          loading === 0 &&
          error.status !== 503 &&
          index === lastMessage && (
            <Box
              marginTop={"10px"}
              onClick={() => {
                retry();
              }}
              cursor={"pointer"}
            >
              <Retry />
            </Box>
          )}
      </Flex>
    </Flex>
  );
};
