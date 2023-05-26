import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MicrophoneIcon } from "@/assets/MicrophoneIcon";
import { SendIcon } from "@/assets/SendIcon";
import { MentionsInput, Mention } from "react-mentions";
import { agents } from "./Utils";

export const ChatInput = ({
  submit,
  loading,
  input,
  doubleClick,
  selectedAgent,
  finishDoubleClick,
}) => {
  const [prompt, setPrompt] = useState("");
  const handleInputChange = (event, newValue) => {
    setPrompt(newValue);
  };
  useEffect(() => {
    if (!loading) {
      setPrompt("");
    }
  }, [loading]);
  useEffect(() => {
    if (doubleClick !== "") {
      setPrompt(
        `${prompt} @[${doubleClick}](${Object.keys(agents).findIndex(
          (agent) => {
            return agent === selectedAgent;
          }
        )}) `
      );
    }
    finishDoubleClick();
  }, [doubleClick]);
  useEffect(() => {
    if (selectedAgent !== "" && selectedAgent !== "Personal Assistant") {
      var foundIndex = 0;
      var foundProperty = "";
      Object.keys(agents).some((key, index) => {
        const value = agents[key];
        if (value === selectedAgent) {
          foundIndex = index;
          foundProperty = key;
          return true;
        }
        return false;
      });
      setPrompt(`@[${foundProperty}](${foundIndex}) `);
    } else {
      setPrompt("");
    }
  }, [selectedAgent]);
  return (
    <Flex
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
      }}
    >
      {/* {console.log(value)} */}
      <MentionsInput
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            submit({ prompt });
          }
        }}
        forceSuggestionsAboveCursor={true}
        value={prompt}
        onChange={handleInputChange}
        placeholder="How did I sleep last night?"
        disabled={loading}
        singleLine
        style={{
          "&singleLine": {
            display: "inline-block",
            width: "100%",
            maxWidth: "calc(100vw - 107px)",
            height: 40,
            marginLeft: "10px",
            suggestions: {
              list: {
                overflowY: "auto",
                height: "40vh",
              },
            },
            highlighter: {
              padding: 1,
              paddingTop: 5,
              border: "2px inset transparent",
              overflowX: "hidden",
            },
            input: {
              padding: 1,
              // border: '2px inset',

              minHeight: 40,
            },
          },
        }}
      >
        <Mention
          trigger="@"
          displayTransform={(a, display) => `@${display}`}
          data={Object.keys(agents).map((data, i) => {
            return {
              id: i,
              display: data,
            };
          })}
          style={{
            backgroundColor: "#F0FDF9",
          }}
          markup={"@[__display__](__id__)"}
        />
        <Mention
          trigger="#"
          displayTransform={(a, display) => `#${display}`}
          data={[]}
          regex={/#(\S+)/}
          style={{
            backgroundColor: "#F0FDF9",
            textShadow: "",
          }}
          markup="#__id__"
        />
      </MentionsInput>
      <Flex
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 4 }}
      >
        <Box
          onClick={() => {
            submit({ prompt });
          }}
          cursor={"pointer"}
        >
          <SendIcon />
        </Box>

        <MicrophoneIcon />
      </Flex>
    </Flex>
  );
};
