/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import LogoMark from "../assets/logomark";
import { createContext, useEffect, useState } from "react";
import { EmptyThread } from "@/assets/EmptyThreads";
import { NewThreadIcon } from "@/assets/NewThread";
import { Thread } from "./Thread";
import { ChatIconsSwiper } from "./ChatIconSwiper";
import { Convo } from "./Convo";

// const username = "User"

function App({ username, aiName }) {
  const [launch, setLaunch] = useState(false);
  const [screen, setScreen] = useState(0);
  const [innerScreen, setInnerScreen] = useState(0);
  const [index, setIndex] = useState(-1);
  const Context = createContext();
  const [editMode, setEditMode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [threadFilter, setThreadFilter] = useState("");
  const [conversations, setConversations] = useState([
    // {title: "Example Message", messages: [
    //   {"speaker": "User", message: "@sleep What is the capital of France?"}, {"speaker": "Sleep Coach", message: "The capital of France is Paris. If you're planning a trip to Paris, I can offer suggestions on how to improve your sleep while travelling, such as adjusting your sleep schedule a few days before your trip to better align with the new time zone, using a sleep mask and earplugs to block out noise and light, and staying well-hydrated throughout your journey."},
    //   {"speaker": "User", message: "How did I sleep last night? #Oura"}, {"speaker": "Personal Assistant", message: "Based on your Oura sleep data available in your private data cloud, you slept for 6 hours and 45 minutes last night. Your sleep consisted of 1 hour and 50 minutes of deep sleep, 3 hours and 30 minutes of light sleep, and 1 hour and 25 minutes of REM sleep. Your sleep efficiency was 88%, which is considered good. It seems like you had a decent night's sleep, but you might want to aim for a bit more rest tonight to ensure optimal recovery."},
    //   {"speaker": "User", message: "How did I sleep last night? #Oura"}, {"speaker": "Social Interaction Coach", message: "Based on your Oura sleep data available in your private data cloud, you slept for 6 hours and 45 minutes last night. Your sleep consisted of 1 hour and 50 minutes of deep sleep, 3 hours and 30 minutes of light sleep, and 1 hour and 25 minutes of REM sleep. Your sleep efficiency was 88%, which is considered good. It seems like you had a decent night's sleep, but you might want to aim for a bit more rest tonight to ensure optimal recovery."},
    //   {"speaker": "User", message: "How did I sleep last night? #Oura"}, {"speaker": "Productivity Coach", message: "Based on your Oura sleep data available in your private data cloud, you slept for 6 hours and 45 minutes last night. Your sleep consisted of 1 hour and 50 minutes of deep sleep, 3 hours and 30 minutes of light sleep, and 1 hour and 25 minutes of REM sleep. Your sleep efficiency was 88%, which is considered good. It seems like you had a decent night's sleep, but you might want to aim for a bit more rest tonight to ensure optimal recovery."}
    // ], lastAccess: new Date(1683999993000).toLocaleDateString()},
    // {
    //   title: "Example Errors",
    //   messages: [
    //     {
    //       speaker: "Personal Assistant",
    //       message: "Pri-AI encountered the following error:",
    //       time: 1683999993000,
    //       error: {
    //         status: 401,
    //         statusText: "Unauthorized",
    //       },
    //     },
    //     {
    //       speaker: "User",
    //       message: "What is the capital of Japan?",
    //       time: 1683999993000,
    //     },
    //     {
    //       speaker: "Personal Assistant",
    //       message: "Pri-AI encountered the following error:",
    //       time: 1683999993000,
    //       error: {
    //         status: 401,
    //         statusText: "Unauthorized",
    //       },
    //     },
    //     {
    //       speaker: "User",
    //       message: "What is the capital of France?",
    //       time: 1683999993000,
    //     },
    //     {
    //       speaker: "Personal Assistant",
    //       message: "Pri-AI encountered the following error:",
    //       time: 1683999993000,
    //       error: {
    //         status: 401,
    //         statusText: "Unauthorized",
    //       },
    //     },
    //   ],
    //   lastAccess: new Date(1683999993000).toLocaleDateString(),
    // },
  ]);

  const newConversations = (newMessages) => {
    var index = conversations.length;
    setConversations([
      ...conversations,
      {
        title: newMessages.filter((message) => !message.ignore)[0].message,
        messages: newMessages,
        lastAccess: new Date().toLocaleDateString(),
      },
    ]);
    return index;
  };
  const array = [1, 1, 1, 1];
  useEffect(() => {
    if (launch) {
      setTimeout(() => {
        setLaunch(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    console.log("parent", conversations);
  }, [conversations]);

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDirection={"column"}
      overflowX={"hidden"}
    >
      {screen === 0 && (
        <>
          {innerScreen === true ? (
            <>
              <Convo
                username={username}
                aiName={aiName}
                selectedAgent={selectedAgent}
                conversations={conversations}
                setConversations={(convoCopy) => {
                  setConversations([...convoCopy]);
                }}
                index={index}
                setIndex={(newIndex) => {
                  setIndex(newIndex);
                }}
                clearConversation={() => {
                  setConversations(
                    conversations.filter((data, idx) => idx !== index)
                  );
                  setIndex(-1);
                }}
                newConversation={(newMessages) => {
                  return newConversations(newMessages);
                }}
                goBack={() => {
                  setInnerScreen(false);
                  setSelectedAgent("");
                }}
              />
            </>
          ) : (
            <>
              <Flex
                alignItems={"center"}
                padding={2}
                borderBottom={"1px solid #EAECF0"}
              >
                <LogoMark />
                <Text
                  color={"#134E48"}
                  fontWeight={"700"}
                  paddingLeft={"5px"}
                  fontSize={"20px"}
                >
                  Pri-AI
                </Text>
              </Flex>
              <Flex
                position={"relative"}
                overflowY={"scroll"}
                flexDirection={"column"}
                padding={"10px"}
                flexGrow={1}
                height={"100%"}
              >
                <Flex flexDirection={"row"}>
                  <Text fontWeight={600} fontSize={"20px"} color={"#107569"}>
                    Threads
                  </Text>
                  {/* <Spacer/>
          <Text cursor={"pointer"} onClick={()=>{setEditMode(!editMode)}} fontWeight={600} fontSize={"20px"} color={"#107569"}>Edit</Text> */}
                </Flex>
                <Box width={"100%"} marginTop={"32px"}>
                  <ChatIconsSwiper
                    onClickAgent={(agent) => {
                      setInnerScreen(true);
                      setIndex(-1);
                      setSelectedAgent(agent);
                    }}
                  />
                </Box>
                {conversations.length > 0 ? (
                  <>
                    <Input
                      marginTop={"20px"}
                      marginBottom={"16px"}
                      placeholder="Search threads"
                      value={threadFilter}
                      onChange={(e) => {
                        setThreadFilter(e.target.value);
                      }}
                    />
                    <Text marginBottom={"8px"}>Recent</Text>
                    {conversations
                      .filter((conversation) => {
                        if (
                          conversation.title
                            .toLowerCase()
                            .includes(threadFilter.toLowerCase())
                        ) {
                          return true;
                        } else {
                          return false;
                        }
                      })
                      .map((a, index) => {
                        return (
                          <Thread
                            username={username}
                            key={index}
                            index={index}
                            message={a}
                            onClick={() => {
                              setIndex(index);
                              setInnerScreen(true);
                              var newConversations = conversations;
                              newConversations[index].lastAccess =
                                new Date().toLocaleDateString();
                              setConversations(newConversations);
                            }}
                            last={index === conversations.length - 1}
                            deleteFunc={() => {
                              setConversations(
                                conversations.filter(
                                  (data, idx) => idx !== index
                                )
                              );
                            }}
                            rename={(newTitle) => {
                              var newConversations = conversations;
                              newConversations[index].title = newTitle;
                              setConversations(newConversations);
                            }}
                          />
                        );
                      })}
                  </>
                ) : (
                  <>
                    <Flex
                      alignItems={"center"}
                      flexDir={"column"}
                      justifyContent={"center"}
                      textAlign={"center"}
                      marginTop={"auto"}
                      marginBottom={"auto"}
                    >
                      <Text fontWeight={600} fontSize={"16px"}>
                        No Threads Yet
                      </Text>
                      <Text padding={"10px 50px"}>
                        Get started with your first thread. Pri-AI and
                        specialist bots make any task a breeze!
                      </Text>
                      <EmptyThread />
                    </Flex>
                  </>
                )}

                <Flex
                  style={{
                    zIndex: 99999,
                    position: "fixed",
                    right: 10,
                    bottom: "0.5vh",
                    paddingBottom: "8%",
                  }}
                >
                  <Button
                    onClick={() => {
                      setInnerScreen(true);
                      setIndex(-1);
                      setSelectedAgent("Personal Assistant");
                    }}
                    style={{
                      padding: "8px 14px",
                      background: "#0E9384",
                      border: "1px solid #0E9384",
                      boxShadow:
                        "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);",
                      borderRadius: "100px",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    <NewThreadIcon />
                    <Text paddingLeft={"5px"}>New Thread</Text>
                  </Button>
                </Flex>
              </Flex>
            </>
          )}
        </>
      )}
    </Flex>
  );
}

export default App;
