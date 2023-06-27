/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AIAvatar } from "@/assets/AIAvatar";
import Image from "next/image";
import { HelpIcon } from "@/assets/HelpIcon";
import { Back } from "@/assets/Back";
import axios from "axios";
import { Message } from "./Message";
import { agents, agentsImages, agentDetails } from "./Utils";
import { ChatInput } from "./ChatInput";
export const Convo = ({
  username,
  aiName,
  goBack,
  selectedAgent,
  emptyConvo,
  index,
  newConversation,
  setIndex,
  conversations,
  setConversations,
  clearConversation,
  retryExchange,
}) => {
  // Prompt State
  const [prompt, setPrompt] = useState("");
  // Loading State
  /* 
  Loading = 0 : No Loading
  Loading = 1 : Fetching Streamable Data
  Loading = 2 : Streaming in Data
  */
  const [loading, setLoading] = useState(0);
  //Stores name of the agent that has been double clicked
  const [doubleClickAgent, setDoubleClickAgent] = useState("");
  //Disclosure states for the drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  //currentBestAgent is the Current Best Agent for the answer of the ones mentioned in the conversation. Deafult is the Personal Assistant
  const [currentBestAgent, setCurrentBestAgent] =
    useState("Personal Assistant");
  // Stores all the agents that have been mentioned in the conversation
  const [mentionedAgents, setMentionedAgents] = useState(
    [...new Set(conversations[index]?.messages.map((item) => item.speaker))]
      .filter((speaker) => speaker !== "User")
      .sort((a, b) => {
        const lastIndexA = conversations[index]?.messages
          .map((message) => message.speaker)
          .lastIndexOf(a);
        const lastIndexB = conversations[index]?.messages
          .map((message) => message.speaker)
          .lastIndexOf(b);
        // console.log({
        //   speakerA: a.speaker,
        //   speakerB: b.speaker,
        //   lastIndexA,
        //   lastIndexB,
        // });
        return lastIndexA - lastIndexB;
      })
  );
  //Stores the open tab in the drawer
  const [drawerTab, setDrawerTab] = useState(0);
  // Regex for agent detection in prompt
  const pattern = /@\[(.*?)\]\((-?\d+)\)/g;

  // Intro texts for all the agents that one can start a conversation with
  const agentIntroductoryText = (agent) => {
    const BasicIntro = () => {
      return (
        <>
          👋 Welcome to PriAI's demo mode by Prifina!
          <br />
          Demo mode is designed to simulate having access to all of your
          personal data and information available in your private data cloud,
          along with data from various common applications and services
          typically used by consumers. This includes your emails, social media
          accounts, wearables, calendar, smart home devices, and other public
          data sources. By combining these sources, we're able to provide you
          with the best possible answers.
          <br />
          The full details on the abilities of Pri-AI can be found{" "}
          <span
            onClick={onOpen}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            here in the help sheet
          </span>
          . Keep in mind, demo mode does not have access to any of your data the
          real mode may have, nor any data not explicitly told. <br />
          <br />
        </>
      );
    };
    switch (agent) {
      case "Personal Assistant":
        return (
          <>
            <BasicIntro />
            🤝 I am your Personal Assistant. Think of me as your very own
            personal AI-powered butler, available 24/7 to assist you. If you are
            unsure how to use me, ask me how can I help you.
          </>
        );
      case "Basketball Coach":
        return (
          <>
            <BasicIntro />
            🏀 I am your Basketball Coach. Let's take your game to the next
            level. If you are unsure how to use me, ask me how can I help you.
          </>
        );
      case "Nutritionist":
        return (
          <>
            <BasicIntro />
            🥦 I am your Nutritionist. I have the knowledge and expertise to
            guide you towards a balanced and healthy lifestyle. If you are
            unsure how to use me, ask me how can I help you.
          </>
        );
      case "Personal trainer":
        return (
          <>
            <BasicIntro />
            💪 I am your Trainer, your go-to expert for all things fitness and
            wellness! If you are unsure how to use me, ask me how can I help
            you.
          </>
        );
      case "Ski Coach":
        return (
          <>
            <BasicIntro />
            ⛷️ I am your Ski Coach. I'm your go-to expert for slalom skiing,
            ready to help you carve your way to success on the slopes! If you
            are unsure how to use me, ask me how can I help you.
          </>
        );
      case "Sleep Coach":
        return (
          <>
            <BasicIntro />
            😴 I am your Sleep Coach. Need better sleep? Consider me your
            personal dream catcher. If you are unsure how to use me, ask me how
            can I help you.
          </>
        );
    }
  };

  // Get Answer
  const submit = async ({ prompt = "", retryIndex = null }) => {
    // console.log("test");
    const timeSent = Date.now();

    setLoading(1);

    var promptProcessed;
    // If previous message ended in an error and the user wishes to try again
    // Set current prompt to previous one
    if (retryIndex === true) {
      promptProcessed =
        conversations[index]?.messages[
          conversations[index]?.messages.length - 2
        ].message;
      setPrompt(promptProcessed);
      var tempConversations = conversations;
      tempConversations[index].messages = tempConversations[
        index
      ].messages.slice(0, -2);
      // console.log({ promptProcessed, tempConversations });
      setConversations(tempConversations);
    }
    // For any other message submission
    // Format the prompt such that instead of @[__agent__] with Mentions it is @agent
    else {
      setPrompt(prompt);
      promptProcessed = prompt.replace(pattern, "@$1");
    }

    try {
      const sampleIndex = newConversation([{}]);
      console.log("test", { conversations, sampleIndex });
      const agent = promptProcessed.match(/@(\w+)/);
      var speaker = "Personal Assistant";
      var answer = "";
      //If user mentions agent and agent exists
      if (
        (agent && Object.keys(agents).includes(agent[1].toLowerCase())) ||
        (speaker === selectedAgent &&
          (mentionedAgents.length === 1 || index === -1))
      ) {
        console.log("Route 1");
        speaker = agent !== null ? agents[agent[1].toLowerCase()] : speaker;
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - (retryIndex === true ? 14 : 12) : 0,retryIndex === true ? conversations[index]?.messages.length-2 : undefined ) || [],
            chat:
              conversations[index]?.messages
                .filter((message, messageIndex) => {
                  if (
                    conversations[index]?.messages[messageIndex].error ||
                    conversations[index]?.messages[messageIndex].ignore
                  ) {
                    return false;
                  }
                  if (
                    messageIndex ===
                    conversations[index]?.messages.length - 1
                  ) {
                    return true;
                  }
                  if (
                    conversations[index]?.messages[messageIndex + 1].error ||
                    conversations[index]?.messages[messageIndex].error
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .slice(
                  conversations[index]?.messages.length > 12
                    ? conversations[index]?.messages.length - 12
                    : 0
                ) || [],
            prompt: promptProcessed,
            username: username,
            aiName: aiName,
          }),
        });

        const data = response.body;
        // console.log("data", data);
        if (!data) {
          return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        if (response.status > 399) {
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            // console.log({
            //   oldAnswer: answer,
            //   newAnswer: answer + chunkValue,
            //   chunkValue,
            //   done,
            // });
            answer = answer + chunkValue;
          }
          throw JSON.parse(answer);
        } else {
          var inital = true;
          var indexNew = -1;
          var newIndex = index;
          setLoading(2);
          if (newIndex !== -1) {
            var conversationCopy = conversations;
            conversationCopy[index].messages = conversationCopy[
              index
            ].messages.concat([
              {
                speaker: username,
                message: promptProcessed,
                time: timeSent,
              },
            ]);
            setConversations(conversationCopy);
          }
          const timeReceived = Date.now();
          // console.log("test1", { conversations, index });
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            // console.log({
            //   oldAnswer: answer,
            //   newAnswer: answer + chunkValue,
            //   chunkValue,
            //   done,
            // });
            answer = answer + chunkValue;
            if (!done) {
              // console.log("test1 withIndex", {
              //   conversations,
              //   newIndex,
              //   answer,
              // });
              // const newSpeaker = !conversations[index].messages.some(
              //   (message) => message.speaker === speaker
              // );
              if (index === -1) {
                // var conversationCopy = conversations;
                newIndex = newConversation([
                  {
                    speaker: selectedAgent,
                    time: timeSent,
                    ignore: true,
                    intro: true,
                  },
                  {
                    speaker: username,
                    message: promptProcessed,
                    time: timeSent,
                  },
                  {
                    speaker: speaker,
                    message: answer,
                    time: timeReceived,
                  },
                ]);
                setIndex(newIndex);
              } else {
                if (inital) {
                  var conversationCopy = conversations;

                  conversationCopy[index].messages = conversationCopy[
                    index
                  ].messages.concat([
                    {
                      speaker: speaker,
                      message: answer,
                      time: timeReceived,
                    },
                  ]);
                  setConversations(conversationCopy);
                } else {
                  var conversationCopy = conversations;
                  var lastMessage = conversationCopy[index].messages.length - 1;
                  conversationCopy[index].messages[lastMessage].message =
                    answer;

                  setConversations(conversationCopy);
                  // console.log("test3", { conversations, answer });
                }
              }
              // var conversationCopy = conversations;
              // newConversation([
              //   {
              //     speaker: selectedAgent,
              //     time: timeSent,
              //     ignore: true,
              //     intro: true,
              //   },
              //   {
              //     speaker: username,
              //     message: promptProcessed,
              //     time: timeSent,
              //   },
              //   {
              //     speaker: speaker,
              //     message: answer,
              //     time: timeReceived,
              //   },
              // ]);
              // console.log("test2", { conversations });
              // newIndex = newConversation([
              // {
              //   speaker: selectedAgent,
              //   time: timeSent,
              //   ignore: true,
              //   intro: true,
              // },
              // {
              //   speaker: username,
              //   message: promptProcessed,
              //   time: timeSent,
              // },
              // ]);
              // setIndex(newIndex);
              // console.log(conversationCopy);

              // if (inital) {
              //   conversationCopy[newIndex].messages = conversationCopy[
              //     newIndex
              //   ].messages.concat([
              // {
              //   speaker: speaker,
              //   message: answer,
              //   time: timeReceived,
              // },
              //   ]);
              //   setConversations(conversationCopy);
              // } else {
              //   var lastMessage =
              //     conversationCopy[newIndex].messages.length - 1;
              //   conversationCopy[newIndex].messages[lastMessage].message =
              //     answer;
              //   setConversations(conversationCopy);
              // }
            }
            // setPrompt("");
            inital = false;
            // console.log("test1 pass", { conversations, answer });
          }

          if (index === -1 && speaker === selectedAgent) {
            newIndex = newConversation([
              {
                speaker: selectedAgent,
                time: timeSent,
                ignore: true,
                intro: true,
              },
              {
                speaker: username,
                message: promptProcessed,
                time: timeSent,
              },
              {
                speaker: speaker,
                message: (answer +=
                  "\n\nSeems like this is the first time you're speaking to me. Ask me what I can do if you want a detailed explaination."),
                time: timeReceived,
              },
            ]);
            setIndex(newIndex);
          } else if (
            index > -1 &&
            !conversations[index].messages
              .slice(0, -1)
              .some((message) => message.speaker === speaker)
          ) {
            var conversationCopy = conversations;
            var lastMessage = conversationCopy[index].messages.length - 1;
            conversationCopy[index].messages[lastMessage].message =
              answer +
              "\n\nSeems like this is the first time you're speaking to me. Ask me what I can do if you want a detailed explaination.";

            setConversations(conversationCopy);
          }
          // const newSpeaker = !conversations[index].messages.some(
          //   (message) => message.speaker === speaker
          // );
          // if (newSpeaker) {
          //   var conversationCopy = conversations;
          //   var lastMessage = conversationCopy[index].messages.length - 1;

          //   conversationCopy[index].messages[lastMessage].message = answer +=
          //     "\n\nSeems like this is the first time you're speaking to me. Ask me what I can do if you want a detailed explaination.";
          //   setConversations(conversationCopy);
          // }

          setPrompt("");
        }
      }
      //If user DOES NOT mention agent or agent DOES NOT exists
      else {
        console.log("Route 2");
        const response2 = await axios({
          url: "/api/autoselectAgent",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            // "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - (retryIndex === true ? 14 : 12) : 0,retryIndex === true ? conversations[index]?.messages.length-2 : undefined ) || [],
            chat:
              conversations[index]?.messages
                .filter((message, messageIndex) => {
                  if (message.error || message.ignore) {
                    return false;
                  }
                  if (
                    messageIndex ===
                    conversations[index]?.messages.length - 1
                  ) {
                    return true;
                  }
                  if (
                    conversations[index]?.messages[messageIndex + 1].error ||
                    message.error
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .slice(
                  conversations[index]?.messages.length > 12
                    ? conversations[index]?.messages.length - 12
                    : 0
                ) || [],
            prompt: promptProcessed,
            agents:
              index > -1
                ? [
                    ...new Set(
                      conversations[index]?.messages.map((item) => item.speaker)
                    ),
                  ].filter(
                    (speaker) =>
                      speaker !== "User" && speaker !== "Personal Assistant"
                  )
                : [selectedAgent],
            username,
          },
        });

        console.log({ response2 });
        var answerAgentSelection = "";
        if (response2.status > 399) throw JSON.parse(answerAgentSelection);
        answerAgentSelection = response2.data.trim();
        if (answerAgentSelection === "None")
          answerAgentSelection = "Personal Assistant";
        setCurrentBestAgent(answerAgentSelection);
        console.log({ answerAgentSelection });
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - (retryIndex === true ? 14 : 12) : 0,retryIndex === true ? conversations[index]?.messages.length-2 : undefined ) || [],
            chat:
              conversations[index]?.messages
                .filter((message, messageIndex) => {
                  if (
                    conversations[index]?.messages[messageIndex].error ||
                    conversations[index]?.messages[messageIndex].ignore
                  ) {
                    return false;
                  }
                  if (
                    messageIndex ===
                    conversations[index]?.messages.length - 1
                  ) {
                    return true;
                  }
                  if (
                    conversations[index]?.messages[messageIndex + 1].error ||
                    conversations[index]?.messages[messageIndex].error
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .slice(
                  conversations[index]?.messages.length > 12
                    ? conversations[index]?.messages.length - 12
                    : 0
                ) || [],
            prompt: promptProcessed,
            username: username,
            aiName: aiName,
            agent: answerAgentSelection,
          }),
        });

        console.log(response);

        const data = response.body;
        console.log("data", data);
        if (!data) {
          return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        // var answer = "";

        if (response.status > 399) {
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            answer = answer + chunkValue;
          }
          throw JSON.parse(answer);
        } else {
          var inital = true;
          var indexNew = -1;
          var newIndex = index;
          setLoading(2);
          if (newIndex !== -1) {
            var conversationCopy = conversations;
            conversationCopy[index].messages = conversationCopy[
              index
            ].messages.concat([
              {
                speaker: username,
                message: promptProcessed,
                time: timeSent,
              },
            ]);
            setConversations(conversationCopy);
          }
          // console.log("test1", { conversations, index });
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            answer = answer + chunkValue;
            const timeReceived = Date.now();
            if (!done) {
              if (index === -1) {
                // var conversationCopy = conversations;
                newIndex = newConversation([
                  {
                    speaker: selectedAgent,
                    time: timeSent,
                    ignore: true,
                    intro: true,
                  },
                  {
                    speaker: username,
                    message: promptProcessed,
                    time: timeSent,
                  },
                  {
                    speaker: answerAgentSelection,
                    message: answer,
                    time: timeReceived,
                  },
                ]);
                setIndex(newIndex);
              } else {
                if (inital) {
                  var conversationCopy = conversations;

                  conversationCopy[index].messages = conversationCopy[
                    index
                  ].messages.concat([
                    {
                      speaker: answerAgentSelection,
                      message: answer,
                      time: timeReceived,
                    },
                  ]);
                  setConversations(conversationCopy);
                } else {
                  var conversationCopy = conversations;
                  var lastMessage = conversationCopy[index].messages.length - 1;
                  conversationCopy[index].messages[lastMessage].message =
                    answer;

                  setConversations(conversationCopy);
                  // console.log("test3", { conversations, answer });
                }
              }
            }
            inital = false;
          }
          if (index === -1 && answerAgentSelection === selectedAgent) {
            newIndex = newConversation([
              {
                speaker: selectedAgent,
                time: timeSent,
                ignore: true,
                intro: true,
              },
              {
                speaker: username,
                message: promptProcessed,
                time: timeSent,
              },
              {
                speaker: answerAgentSelection,
                message: (answer +=
                  "\n\nSeems like this is the first time you're speaking to me. Ask me what I can do if you want a detailed explaination."),
                time: timeReceived,
              },
            ]);
            setIndex(newIndex);
          } else if (
            index > -1 &&
            !conversations[index].messages.some(
              (message) => message.speaker === answerAgentSelection
            )
          ) {
            var conversationCopy = conversations;
            var lastMessage = conversationCopy[index].messages.length - 1;
            conversationCopy[index].messages[lastMessage].message = answer +=
              "\n\nSeems like this is the first time you're speaking to me. Ask me what I can do if you want a detailed explaination.";

            setConversations(conversationCopy);
          }

          setPrompt("");
        }
      }

      console.log("TESTING", { answer });
      const response = await fetch("/api/chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - (retryIndex === true ? 14 : 12) : 0,retryIndex === true ? conversations[index]?.messages.length-2 : undefined ) || [],
          response: answer,
        }),
      });

      const data = response.body;
      if (!data || response.status > 399) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      var done = false;
      var chart = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        // console.log({
        //   oldAnswer: answer,
        //   newAnswer: answer + chunkValue,
        //   chunkValue,
        //   done,
        // });
        chart = chart + chunkValue;
      }
      console.log("TESTING", { chart });
      if (index > -1) {
        var conversationCopy = conversations;
        var lastMessage = conversationCopy[index].messages.length - 1;
        conversationCopy[index].messages[lastMessage].message =
          answer +
          "\n\nSeems like this is the first time you're speaking to me. Ask me what I can do if you want a detailed explaination.";
        conversationCopy[index].messages[lastMessage].chart =
          chart.substring(0, 2) === "No" ? null : chart;

        setConversations(conversationCopy);
      }
    } catch (e) {
      console.error(e);
      console.error("ERROR");
      var speaker = "Personal Assistant";
      const agent = promptProcessed.match(/@(\w+)/);

      if (agent && Object.keys(agents).includes(agent[1].toLowerCase())) {
        speaker = agents[agent[1].toLowerCase()];
      }
      if (index === -1) {
        const newIndex = newConversation([
          { speaker: selectedAgent, time: timeSent, ignore: true, intro: true },
          { speaker: username, message: promptProcessed },
          {
            speaker: speaker,
            message: "Pri-AI encountered the following error:",
            error: e,
          },
        ]);
        setIndex(newIndex);
      } else {
        var conversationCopy = conversations;
        conversationCopy[index].messages = conversationCopy[
          index
        ].messages.concat([
          { speaker: username, message: promptProcessed, time: timeSent },
          {
            speaker: speaker,
            message: "Pri-AI encountered the following error:",
            error: e,
            time: Date.now(),
          },
        ]);
        setConversations(conversationCopy);
      }
      setPrompt("");
    }
    setPrompt("");
    setLoading(0);
    console.log("end");
    // }
  };
  {
    // console.log(conversations);
  }

  useEffect(() => {
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
  }, [
    conversations[index]?.messages,
    loading,
    conversations[index]?.messages.at(-1).message,
  ]);

  useEffect(() => {
    setMentionedAgents(
      [...new Set(conversations[index]?.messages.map((item) => item.speaker))]
        .filter((speaker) => speaker !== "User")
        .sort((a, b) => {
          const lastIndexA = conversations[index]?.messages
            .map((message) => message.speaker)
            .lastIndexOf(a);
          const lastIndexB = conversations[index]?.messages
            .map((message) => message.speaker)
            .lastIndexOf(b);
          return lastIndexA - lastIndexB;
        })
    );
  }, [conversations[index]?.messages]);

  useEffect(() => {
    if (selectedAgent !== "" && selectedAgent !== "Personal Assistant") {
      setPrompt(
        `@${Object.keys(agents).find((agent) => {
          // console.log({find: agents[agent], selectedAgent})
          return agents[agent] === selectedAgent;
        })} `
      );
    } else {
      setPrompt("");
    }
  }, [selectedAgent]);

  const clearDoubleClick = () => {
    setDoubleClickAgent("");
  };

  return (
    <>
      {/* Header */}
      <Flex flexDirection={"column"}>
        {/* <Flex alignItems={"end"} backgroundColor={"#2D31A6"} height={"80px"} color={"#ffffff"} padding={"10px"}>
                              <Text>{conversations[index]?.messages.filter((message)=>message.speaker === "User").length || 0}/100 Questions used </Text>
                              <Spacer/>
                              <button padding={0}>Upgrade</button>
                          </Flex> */}

        {/* {console.log(
          "convoTest",
          conversations[index]?.messages.filter((message, messageIndex) => {
            if (conversations[index]?.messages[messageIndex].error) {
              return false;
            }
            if (messageIndex === conversations[index]?.messages.length - 1) {
              return true;
            }
            if (
              conversations[index]?.messages[messageIndex + 1].error ||
              conversations[index]?.messages[messageIndex].error
            ) {
              return false;
            } else {
              return true;
            }
          })
        )} */}
        <Flex
          flexDir={"row"}
          padding={"10px"}
          borderBottom={"1px solid #EAECF0"}
          alignItems={"center"}
        >
          <Box
            onClick={() => {
              goBack();
            }}
            cursor={"pointer"}
            padding={"5px"}
          >
            <Back />
          </Box>
          {console.log({ mentionedAgents })}
          {mentionedAgents
            .slice(-3)
            .reverse()
            .map((speaker, agentIndex) => {
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
                  fontWeight={500}
                  width={"32px"}
                  height={"32px"}
                  textAlign={"center"}
                  alignItems={"center"}
                  marginTop={"auto"}
                >
                  +{mentionedAgents.length - 3}
                </Text>
              </Flex>
            </Box>
          )}
          <Flex flexDir={"column"} paddingLeft={"10px"} overflow={"hidden"}>
            <Text
              fontWeight={600}
              fontSize={"12px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
            >
              {conversations[index]?.title}
            </Text>
            <Text
              fontWeight={400}
              fontSize={"10px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
            >
              {[...mentionedAgents].reverse().join(", ")}
            </Text>
            <Text></Text>
          </Flex>
        </Flex>
      </Flex>
      {/* Chatlog */}
      <Flex
        id="chatlog"
        flexGrow={1}
        style={{
          backgroundColor: "#fcfcfd",
          whiteSpace: "pre-wrap",
          "overflow-y": "scroll",
          "scroll-behavior": "smooth",
          "border-left": "1px solid #eaecf0",
          "border-top": "1px solid #eaecf0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginTop: "auto", height: "100%" }} />
        {
          <Flex flexDirection={"row"} alignItems={"center"} margin={"16px 0px"}>
            <Box borderBottom={"2px solid #EAECF0"} width={"100%"}></Box>
            <Text fontWeight={500} color={"#475467"} padding={"0px 10px"}>
              Today
            </Text>
            <Box borderBottom={"2px solid #EAECF0"} width={"100%"}></Box>
          </Flex>
        }
        {/* {console.log({ index })} */}
        {index === -1 ? (
          <Message
            time={Date.now()}
            speaker={selectedAgent}
            aiName={aiName}
            username={username}
            keepMessageAsIs={true}
            message={agentIntroductoryText(selectedAgent)}
            calloutAgent={() => {
              if (selectedAgent !== "Personal Assistant") {
                const findAgent = (obj, value) => {
                  const keys = Object.keys(obj);

                  for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (obj[key] === value) {
                      return key; // Return the first matching property name
                    }
                  }

                  return ""; // Return null if no matching property is found
                };
                // setPrompt(prompt + `@${findAgent(agents, a.speaker)} `);
                setDoubleClickAgent(`${findAgent(agents, selectedAgent)}`);
              }
            }}
          />
        ) : (
          <>
            {conversations[index]?.messages[0]?.intro && (
              <Message
                time={conversations[index]?.messages[0].time}
                speaker={conversations[index].messages[0].speaker}
                aiName={aiName}
                username={username}
                keepMessageAsIs={true}
                message={agentIntroductoryText(
                  conversations[index].messages[0].speaker
                )}
                calloutAgent={() => {
                  if (
                    conversations[index].messages[0].speaker !==
                    "Personal Assistant"
                  ) {
                    const findAgent = (obj, value) => {
                      const keys = Object.keys(obj);

                      for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        if (obj[key] === value) {
                          return key; // Return the first matching property name
                        }
                      }

                      return ""; // Return null if no matching property is found
                    };
                    // setPrompt(prompt + `@${findAgent(agents, a.speaker)} `);
                    setDoubleClickAgent(
                      `${findAgent(
                        agents,
                        conversations[index].messages[0].speaker
                      )}`
                    );
                  }
                }}
              />
            )}
          </>
        )}

        {conversations[index]?.messages
          .filter((message) => !message.ignore)
          .map((a, messageIndex) => {
            // const title ="Title"
            // const time = "Thursday 6:30pm"
            // console.log({ a, messageIndex });
            return (
              <>
                <Message
                  calloutAgent={() => {
                    if (
                      a.speaker !== username &&
                      a.speaker !== "Personal Assistant"
                    ) {
                      const findAgent = (obj, value) => {
                        const keys = Object.keys(obj);

                        for (let i = 0; i < keys.length; i++) {
                          const key = keys[i];
                          if (obj[key] === value) {
                            return key; // Return the first matching property name
                          }
                        }

                        return ""; // Return null if no matching property is found
                      };
                      // setPrompt(prompt + `@${findAgent(agents, a.speaker)} `);
                      setDoubleClickAgent(`${findAgent(agents, a.speaker)}`);
                    }
                  }}
                  aiName={aiName}
                  error={a.error || null}
                  username={username}
                  time={a.time}
                  index={messageIndex}
                  lastMessage={conversations[index]?.messages.length - 2}
                  message={a.message}
                  chart={a.chart}
                  keepMessageAsIs={false}
                  speaker={a.speaker}
                  retry={() => {
                    submit({ retryIndex: true });
                  }}
                  loading={loading}
                />
              </>
            );
          })}
        {loading === 1 && (
          <>
            <Message
              speaker={username}
              username={username}
              time={Date.now()}
              keepMessageAsIs={false}
              message={prompt.replace(pattern, "@$1")}
            />
            <Message
              loading={loading}
              speaker={
                prompt.replace(pattern, "@$1")?.match(/@(\w+)/) === null
                  ? currentBestAgent
                  : Object.keys(agents).includes(
                      prompt
                        .replace(pattern, "@$1")
                        ?.match(/@(\w+)/)[1]
                        .toLowerCase()
                    ) !== null
                  ? agents[
                      prompt
                        .replace(pattern, "@$1")
                        .match(/@(\w+)/)[1]
                        .toLowerCase()
                    ]
                  : "Personal Assistant" || "Personal Assistant"
              }
              aiName={aiName}
              username={username}
              message={""}
            />
          </>
        )}
      </Flex>

      {/* Input */}
      <Flex
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderBottom: "unset",
          // borderRadius: 10,
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 8,
          paddingRight: 8,

          // justifyContent: "center",
          // flex: 1,
          height: 60,
        }}
      >
        <Box paddingRight={"10px"} cursor={"pointer"} onClick={onOpen}>
          <HelpIcon />
        </Box>
        <ChatInput
          loading={loading}
          input={prompt}
          submit={({ prompt }) => {
            submit({ prompt });
          }}
          selectedAgent={selectedAgent}
          doubleClick={doubleClickAgent}
          finishDoubleClick={() => {
            clearDoubleClick();
          }}
        />
      </Flex>
      {/* <Box minHeight={"6vh"} width={"100%"} backgroundColor={"#F9F9F9"}/> */}
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        {/* <motion.div drag="y"  dragElastic={{bottom:1}} dragPropagation onDragEnd={onDrag} dragConstraints={{ top: 0, bottom: 0 }} style={{top: 0, bottom: 0}}> */}
        <DrawerContent
          maxHeight={"90vh"}
          borderTopLeftRadius={"16px"}
          borderTopRightRadius={"16px"}
        >
          <DrawerCloseButton />
          <ButtonGroup isAttached justifyContent={"center"} marginTop={"20px"}>
            <Button
              isActive={drawerTab === 0}
              onClick={() => {
                setDrawerTab(0);
              }}
            >
              Agents
            </Button>
            <Button
              isActive={drawerTab === 1}
              onClick={() => {
                setDrawerTab(1);
              }}
            >
              Prompting
            </Button>
          </ButtonGroup>
          <Flex
            padding={"20px"}
            height={"100%"}
            flexDir={"column"}
            minH={"1px"}
          >
            {drawerTab === 0 && (
              <>
                <Flex
                  flexDir={"row"}
                  gap={"16px"}
                  alignItems={"center"}
                  paddingBottom={"10px"}
                >
                  <Text fontSize={"16px"} fontWeight={600}>
                    Specialist agents
                  </Text>
                  <Text
                    paddingBottom={"10px"}
                    alignItems={"center"}
                    style={{
                      color: "#107569",
                      fontWeight: "bold",
                      fontSize: "12px",
                      backgroundColor: "#F0FDF9",
                      padding: "2px 8px",
                      borderRadius: "16px",
                    }}
                  >
                    @agent
                  </Text>
                </Flex>
                <Text fontSize={"14px"} color={"#475467"}>
                  Use Pri-AI to talk to your connected data.
                </Text>
                <Box
                  minHeight={"1px"}
                  width={"100%"}
                  backgroundColor={"#EAECF0"}
                  margin={"10px 0px"}
                />
                <Flex
                  flexDirection={"column"}
                  overflowY={"scroll"}
                  gap={"16px"}
                >
                  {agentDetails.map((agent, i) => {
                    return (
                      <Flex
                        key={i}
                        flexDir={"row"}
                        padding={"8px"}
                        backgroundColor={"#F9FAFB"}
                        borderRadius={"8px"}
                        border={"1px solid #EAECF0"}
                      >
                        <Box position={"relative"}>
                          <Box
                            alignSelf={"center"}
                            overflow={"hidden"}
                            borderRadius={"5px"}
                          >
                            <Image
                              src={`/${agent.url}`}
                              width={84}
                              height={84}
                              alt={`Picture of ${agent.title}`}
                              style={{ maxWidth: "unset" }}
                            />
                          </Box>
                          <Box
                            position={"absolute"}
                            zIndex={2}
                            bottom={-1}
                            right={-1}
                          >
                            {agent.icon}
                          </Box>
                        </Box>
                        <Flex paddingLeft={"16px"} flexDir={"column"}>
                          <Text
                            color={"#101828"}
                            fontWeight={600}
                            fontSize={"14px"}
                          >
                            {agent.title}{" "}
                            <span
                              style={{
                                color: "#107569",
                                fontWeight: 500,
                                fontSize: "12px",
                                backgroundColor: "#F0FDF9",
                                padding: "2px 8px",
                                borderRadius: "16px",
                              }}
                            >
                              @{agent.call}
                            </span>
                          </Text>
                          <Text color={"#475467"} fontSize={"12px"}>
                            {agent.description}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              </>
            )}
            {drawerTab === 1 && (
              <>
                <Flex flexDirection={"column"} overflowY={"scroll"}>
                  <Flex
                    flexDir={"row"}
                    gap={"16px"}
                    alignItems={"center"}
                    paddingBottom={"10px"}
                  >
                    <Text fontSize={"16px"} fontWeight={600}>
                      Live data prompting
                    </Text>
                    <Text
                      paddingBottom={"10px"}
                      alignItems={"center"}
                      style={{
                        color: "#107569",
                        fontWeight: "bold",
                        fontSize: "12px",
                        backgroundColor: "#F0FDF9",
                        padding: "2px 8px",
                        borderRadius: "16px",
                      }}
                    >
                      #source
                    </Text>
                  </Flex>
                  <Text fontSize={"14px"} color={"#475467"}>
                    Use Pri-AI to talk to your connected data.
                  </Text>
                  <Box
                    minHeight={"1px"}
                    width={"100%"}
                    backgroundColor={"#EAECF0"}
                    margin={"10px 0px"}
                  ></Box>
                  <Flex
                    flexDirection={"column"}
                    gap={"16px"}
                    paddingBottom={"10px"}
                  >
                    <Text color={"#101828"} fontWeight={500}>
                      #+source name
                    </Text>
                    <Flex
                      flexDir={"column"}
                      gap={"10px"}
                      backgroundColor={"#F9FAFB"}
                      borderRadius={"8px"}
                      padding={"16px"}
                    >
                      <Text color={"#101828"} fontWeight={600}>
                        Try this
                      </Text>
                      <Text color={"#475467"}>
                        “
                        <span
                          style={{
                            display: "inline-block",
                            mixBlendMode: "multiply",
                            backgroundColor: "#F2F4F7",
                            borderRadius: "16px",
                            padding: "2px 8px",
                            color: "#344054",
                            fontWeight: 500,
                          }}
                        >
                          #appleHealth
                        </span>{" "}
                        What is my average step count over the last two weeks?”
                      </Text>
                    </Flex>
                    <Text color={"#101828"} fontWeight={500}>
                      Ask Pri-AI what it can do with a source{" "}
                    </Text>
                    <Flex
                      flexDir={"column"}
                      gap={"10px"}
                      backgroundColor={"#F9FAFB"}
                      borderRadius={"8px"}
                      padding={"16px"}
                    >
                      <Text color={"#101828"} fontWeight={600}>
                        Try this
                      </Text>
                      <Text color={"#475467"}>
                        “What can you do with{" "}
                        <span
                          style={{
                            display: "inline-block",
                            mixBlendMode: "multiply",
                            backgroundColor: "#F2F4F7",
                            borderRadius: "16px",
                            padding: "2px 8px",
                            color: "#344054",
                            fontWeight: 500,
                          }}
                        >
                          #appleHealth
                        </span>
                        ?”
                      </Text>
                    </Flex>
                    <Text color={"#101828"} fontWeight={500}>
                      Example sources{" "}
                    </Text>
                    <Flex
                      flexDir={"column"}
                      gap={"10px"}
                      backgroundColor={"#F9FAFB"}
                      borderRadius={"8px"}
                      padding={"16px"}
                    >
                      <Text
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {[
                          "appleHealth",
                          "fitbit",
                          "oura",
                          "garmin",
                          "logmore",
                          "ichijiku",
                          "movesense",
                          "heierling",
                          "netflix",
                          "chasebank",
                          "myftinesspal",
                          "amazon",
                          "spotify",
                          "applemusic",
                        ].map((source, key) => {
                          return (
                            <span
                              key={index}
                              style={{
                                margin: "2px",
                                display: "inline-block",
                                mixBlendMode: "multiply",
                                backgroundColor: "#F2F4F7",
                                borderRadius: "16px",
                                padding: "2px 8px",
                                color: "#344054",
                                fontWeight: 500,
                              }}
                            >
                              #{source}
                            </span>
                          );
                        })}
                      </Text>
                      <Text
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {[
                          "fitness",
                          "nutrition",
                          "externalSensor",
                          "finance",
                        ].map((source, key) => {
                          return (
                            <span
                              key={index}
                              style={{
                                margin: "2px",
                                display: "inline-block",
                                mixBlendMode: "multiply",
                                backgroundColor: "#F2F4F7",
                                borderRadius: "16px",
                                padding: "2px 8px",
                                color: "#344054",
                                fontWeight: 500,
                              }}
                            >
                              #{source}
                            </span>
                          );
                        })}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text fontSize={"16px"} fontWeight={600}>
                    General prompting tips
                  </Text>
                  <Box
                    minHeight={"1px"}
                    width={"100%"}
                    backgroundColor={"#EAECF0"}
                    margin={"10px 0px"}
                  ></Box>
                  <Flex flexDirection={"column"} gap={"16px"}>
                    <Text color={"#101828"} fontWeight={500}>
                      Ask Pri-AI what they can help you with
                    </Text>
                    <Flex
                      flexDir={"column"}
                      gap={"10px"}
                      backgroundColor={"#F9FAFB"}
                      borderRadius={"8px"}
                      padding={"16px"}
                    >
                      <Text color={"#101828"} fontWeight={600}>
                        Try this
                      </Text>
                      <Text color={"#475467"}>
                        “What can you help me with?”
                      </Text>
                    </Flex>
                    <Text color={"#101828"} fontWeight={500}>
                      Ask Pri-AI to explain{" "}
                    </Text>
                    <Flex
                      flexDir={"column"}
                      gap={"10px"}
                      backgroundColor={"#F9FAFB"}
                      borderRadius={"8px"}
                      padding={"16px"}
                    >
                      <Text color={"#101828"} fontWeight={600}>
                        Try this
                      </Text>
                      <Text color={"#475467"}>“Explain your answer”</Text>
                      <Text color={"#475467"}>
                        “Explain why the sky is blue”
                      </Text>
                    </Flex>
                    <Text color={"#101828"} fontWeight={500}>
                      Ask Pri-AI ot brainstorm ideas
                    </Text>
                    <Flex
                      flexDir={"column"}
                      gap={"10px"}
                      backgroundColor={"#F9FAFB"}
                      borderRadius={"8px"}
                      padding={"16px"}
                    >
                      <Text color={"#101828"} fontWeight={600}>
                        Try this
                      </Text>
                      <Text color={"#475467"}>
                        Brainstorm 10 ideas for pet names. They all must start
                        with “T””
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
          </Flex>
        </DrawerContent>
        {/* </motion.div> */}
      </Drawer>
    </>
  );
};
