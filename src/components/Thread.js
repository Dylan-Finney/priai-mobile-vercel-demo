import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AIAvatar } from "@/assets/AIAvatar";
import { ThreadIcon } from "@/assets/ThreadIcon";
import { KebabIcon } from "@/assets/KebabIcon";
import { RenameIcon } from "@/assets/RenameIcon";
import { TrashIcon } from "@/assets/TrashIcon";
import { agentsImages } from "./Utils";

export const Thread = ({
  onClick,
  index,
  message,
  deleteFunc,
  rename,
  last,
  username,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [renameOption, setRenameOption] = useState(false);
  const [save, setSave] = useState(false);
  const [tempName, setTempName] = useState(message.title);
  const mentionedAgents = [
    ...new Set(message.messages.map((item) => item.speaker)),
  ]
    .filter((speaker) => speaker !== username)
    .reverse();
  return (
    <Flex
      id="thread"
      flexDirection={"row"}
      alignItems={"center"}
      onClick={() => {
        onClick();
      }}
      cursor={"pointer"}
      padding={"10px 10px"}
      border={"1px solid #EAECF0"}
      borderTop={index > 0 ? "unset" : "1px solid #EAECF0"}
      key={index}
      borderTopLeftRadius={index === 0 ? "md" : "unset"}
      borderTopRightRadius={index === 0 ? "md" : "unset"}
      width={"100%"}
      borderBottomLeftRadius={last ? "md" : "unset"}
      borderBottomRightRadius={last ? "md" : "unset"}
      backgroundColor={showOptions ? "#f6f7f8" : "#fff"}
    >
      <Box>
        <ThreadIcon />
      </Box>
      <Flex paddingLeft={"10px"} flexDir={"column"} overflow={"hidden"}>
        <Text
          fontWeight={600}
          fontSize={"14px"}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
        >
          {message.title}
        </Text>
        <Text fontWeight={400} fontSize={"12px"}>
          {message.lastAccess || "01/01/1990"}
        </Text>
      </Flex>
      <Spacer />
      {showOptions ? (
        <>
          <Flex gap={"5px"}>
            <Box
              padding={"5px"}
              onClick={(event) => {
                event.stopPropagation();
                const newTitle = prompt(
                  `What would you want to rename thread "${message.title}" as?`,
                  message.title
                );
                if (newTitle !== null && newTitle.length > 0) {
                  setSave(!save);
                  rename(newTitle);
                }
              }}
            >
              <RenameIcon />
            </Box>
            <Box
              padding={"5px"}
              onClick={(event) => {
                event.stopPropagation();
                deleteFunc();
              }}
            >
              <TrashIcon />
            </Box>
          </Flex>
        </>
      ) : (
        <>
          {mentionedAgents.slice(0, 3).map((speaker, agentIndex) => {
            return (
              <>
                <Box
                  width={"32px"}
                  height={"32px"}
                  backgroundColor={"white"}
                  border={"1px solid white"}
                  borderRadius={"20px"}
                  marginLeft={agentIndex > 0 ? "-10px" : "unset"}
                >
                  {agentsImages[speaker]?.threadIcon ? (
                    agentsImages[speaker].threadIcon
                  ) : (
                    <AIAvatar scale={2} />
                  )}
                </Box>
              </>
            );
          })}
          {mentionedAgents.length > 3 && (
            <Box
              width={"32px"}
              height={"32px"}
              backgroundColor={"white"}
              border={"2px solid white"}
              borderRadius={"20px"}
              marginLeft={"-10px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Flex
                backgroundColor={"#F2F4F7"}
                height={"95%"}
                width={"95%"}
                borderRadius={"200px"}
                textAlign={"center"}
                padding={"5px 0"}
              >
                <Text
                  color={"#475467"}
                  fontSize={"12px"}
                  width={"32px"}
                  height={"32px"}
                  fontWeight={500}
                  marginTop={"auto"}
                >
                  +{mentionedAgents.length - 3}
                </Text>
              </Flex>
            </Box>
          )}
        </>
      )}
      <Box
        id=""
        minWidth={"30px"}
        maxWidth={"30px"}
        onClick={(event) => {
          event.stopPropagation();
          setShowOptions(!showOptions);
        }}
      >
        <KebabIcon />
      </Box>
    </Flex>
  );
};
