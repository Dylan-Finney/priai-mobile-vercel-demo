/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  // Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LogoMark from "../assets/logomark";
import { createContext, useEffect, useState } from "react";
import { EmptyThread } from "@/assets/EmptyThreads";
import { NewThreadIcon } from "@/assets/NewThread";
import { Thread } from "./Thread";
import { ChatIconsSwiper } from "./ChatIconSwiper";
import { Convo } from "./Convo";
import Switch from "react-switch";

// const username = "User"

function App({ username, aiName }) {
  const [launch, setLaunch] = useState(false);
  const [screen, setScreen] = useState(0);
  const [innerScreen, setInnerScreen] = useState(0);
  const [index, setIndex] = useState(-1);
  const [fakeData, setFakeData] = useState(true);
  const [profiles, setProfiles] = useState({
    Fitness: {},
    Tourist: {},
  });
  const Context = createContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                fakeData={fakeData}
                profiles={profiles}
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
                  <Spacer />
                  <Button
                    onClick={() => {
                      setScreen(1);
                    }}
                  >
                    Test
                  </Button>
                  {/*
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
      {screen === 1 && (
        <>
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
                  Settings
                </Text>
                <Spacer />
                <Button
                  onClick={() => {
                    setScreen(0);
                  }}
                >
                  Go Back
                </Button>
                {/*
          <Text cursor={"pointer"} onClick={()=>{setEditMode(!editMode)}} fontWeight={600} fontSize={"20px"} color={"#107569"}>Edit</Text> */}
              </Flex>
              Fake Data?
              <Switch
                // isChecked={fakeData}
                checked={fakeData}
                // defaultChecked
                onChange={() => {
                  setFakeData(!fakeData);
                }}
              />
              <Text fontSize="xl">Fitness Profile</Text>
              <Flex gap={"10px"} flexDir={"column"}>
                <Flex flexDir={"column"}>
                  <Text>Weight</Text>
                  <Flex>
                    <Input
                      disabled={fakeData}
                      value={profiles.Fitness?.Weight}
                      variant={
                        profiles.Fitness?.["Weight"] &&
                        profiles.Fitness?.["Weight"] !== "N/A"
                          ? "outline"
                          : "filled"
                      }
                      inputMode="numeric"
                      onChange={(event) => {
                        setProfiles({
                          ...profiles,
                          Fitness: {
                            ...profiles.Fitness,
                            Weight: event.target.value,
                          },
                        });
                      }}
                    />
                    <Text alignSelf={"center"}>lb</Text>
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Height</Text>
                  <Flex>
                    <Input
                      disabled={fakeData}
                      value={profiles.Fitness?.Height?.feet}
                      variant={
                        profiles.Fitness["Height"] &&
                        profiles.Fitness["Height"] !== "N/A"
                          ? "outline"
                          : "filled"
                      }
                      inputMode="numeric"
                      onChange={(event) => {
                        setProfiles({
                          ...profiles,
                          Fitness: {
                            ...profiles.Fitness,
                            Height: {
                              ...profiles.Fitness.Height,
                              feet: event.target.value,
                            },
                          },
                        });
                      }}
                    />
                    <Text alignSelf={"center"}>Foot</Text>
                    <Input
                      disabled={fakeData}
                      value={profiles.Fitness?.Height?.inches}
                      variant={
                        profiles.Fitness["Height"] &&
                        profiles.Fitness["Height"] !== "N/A"
                          ? "outline"
                          : "filled"
                      }
                      inputMode="numeric"
                      onChange={(event) => {
                        setProfiles({
                          ...profiles,
                          Fitness: {
                            ...profiles.Fitness,
                            Height: {
                              ...profiles.Fitness.Height,
                              inches: event.target.value,
                            },
                          },
                        });
                      }}
                    />
                    <Text alignSelf={"center"}>Inches</Text>
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Workout Duration</Text>
                  <Select
                    disabled={fakeData}
                    value={profiles.Fitness.preferences?.Duration}
                    variant={
                      profiles.Fitness.preferences?.["Duration"] &&
                      profiles.Fitness.preferences?.["Duration"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            Duration: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Fitness Class</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Fitness Class"] &&
                      profiles.Fitness.preferences?.["Fitness Class"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Fitness Class"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Fitness Class": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Zumba</option>
                    <option>CrossFit</option>
                    <option>Pilates</option>
                    <option>Spin</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Intensity Level</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Intensity Level"] &&
                      profiles.Fitness.preferences?.["Intensity Level"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Intensity Level"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Intensity Level": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Cardio Exercise</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Cardio"] &&
                      profiles.Fitness.preferences?.["Cardio"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Cardio"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            Cardio: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Running</option>
                    <option>Cycling</option>
                    <option>Swimming</option>
                    <option>Kickboxing</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Strength Training Exercise</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Strength Training"] &&
                      profiles.Fitness.preferences?.["Strength Training"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Strength Training"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Strength Training": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>weightlifting</option>
                    <option>bodyweight exercises </option>
                    <option>kettlebell workouts</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Yoga Style</Text>
                  <Select
                    disabled={fakeData}
                    value={profiles.Fitness.preferences?.["Yoga Style"]}
                    variant={
                      profiles.Fitness.preferences?.["Yoga Style"] &&
                      profiles.Fitness.preferences?.["Yoga Style"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Yoga Style": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Hatha</option>
                    <option>Vinyasa </option>
                    <option>Ashtanga</option>
                    <option>Yin</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Fitness Equipment</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Fitness Equipment"] &&
                      profiles.Fitness.preferences?.["Fitness Equipment"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Fitness Equipment"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Fitness Equipment": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>dumbbells</option>
                    <option>resistance bands</option>
                    <option>stability ball</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Outdoor Activitiy</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Outdoor Activity"] &&
                      profiles.Fitness.preferences?.["Outdoor Activity"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Outdoor Activity"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Outdoor Activity": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>hiking</option>
                    <option>trail running</option>
                    <option>kayaking</option>
                    <option>rock climbing</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Fitness App or Tracking Device</Text>
                  <Select
                    disabled={fakeData}
                    value={profiles.Fitness.preferences?.["App/Device"]}
                    variant={
                      profiles.Fitness.preferences?.["App/Device"] &&
                      profiles.Fitness.preferences?.["App/Device"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "App/Device": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Fitbit</option>
                    <option>Strava</option>
                    <option>MyFitnessPal</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Stretching or Mobility Exercise</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Stretching/Mobility"] &&
                      profiles.Fitness.preferences?.["Stretching/Mobility"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={
                      profiles.Fitness.preferences?.["Stretching/Mobility"]
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Stretching/Mobility": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>yoga stretches</option>
                    <option>foam rolling</option>
                    <option>dynamic stretching</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Time of Day to Work Out</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Time of Day"] &&
                      profiles.Fitness.preferences?.["Time of Day"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Time of Day"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Time of Day": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>morning</option>
                    <option>afternoon</option>
                    <option>evening</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Post-Workout Recovery Method</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Recovery Method"] &&
                      profiles.Fitness.preferences?.["Recovery Method"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Recovery Method"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Recovery Method": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>foam rolling</option>
                    <option>stretching</option>
                    <option>ice baths</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Preferred Workout Environment</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Workout Environment"] &&
                      profiles.Fitness.preferences?.["Workout Environment"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={
                      profiles.Fitness.preferences?.["Workout Environment"]
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Workout Environment": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>gym</option>
                    <option>home</option>
                    <option>outdoors</option>
                    <option>group classes</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favorite Circuit Training Exercise</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Fitness.preferences?.["Circuit Training"] &&
                      profiles.Fitness.preferences?.["Circuit Training"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Fitness.preferences?.["Circuit Training"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Circuit Training": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>burpees</option>
                    <option>mountain climbers</option>
                    <option>kettlebell swings</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text width={"fit-content"} justifyContent={"auto"}>
                    Preferred Fitness Goal
                  </Text>
                  <Select
                    variant={
                      (profiles.Fitness.preferences?.["Fitness Goal"] &&
                        profiles.Fitness.preferences?.["Fitness Goal"] !==
                          "N/A") ||
                      fakeData
                        ? "outline"
                        : "filled"
                    }
                    disabled={fakeData}
                    value={profiles.Fitness.preferences?.["Fitness Goal"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Fitness,
                          preferences: {
                            ...profiles.Fitness.preferences,
                            "Fitness Goal": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>weight loss</option>
                    <option>muscle gain</option>
                    <option>improved endurance</option>
                    <option>flexibility</option>
                  </Select>
                </Flex>
              </Flex>
              <Divider />
              <Text fontSize="xl">Tourist Profile</Text>
              <Flex gap={"10px"} flexDir={"column"}>
                <Flex flexDir={"column"}>
                  <Text>Preferred Mode of Transport</Text>
                  <Select
                    disabled={fakeData}
                    value={profiles.Tourist.preferences?.Transport}
                    variant={
                      profiles.Tourist.preferences?.["Transport"] &&
                      profiles.Tourist.preferences?.["Transport"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Transport: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Public</option>
                    <option>Private</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Price vs Comfort</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Goal"] &&
                      profiles.Tourist.preferences?.["Goal"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Goal"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Goal: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Price</option>
                    <option>Comfort</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Favourite type of cultural experience</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Cultural experience"] &&
                      profiles.Tourist.preferences?.["Cultural experience"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={
                      profiles.Tourist.preferences?.["Cultural experience"]
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            "Cultural experience": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Festivals and Celebrations</option>
                    <option>Museums and Galleries</option>
                    <option>Cultural Performances</option>
                    <option>Cultural Workshops</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Level of Activity or relaxation</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Activity"] &&
                      profiles.Tourist.preferences?.["Activity"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Activity"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Activity: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Active</option>
                    <option>Balanced</option>
                    <option>Relaxing</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Type of accomodation</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Accomodation"] &&
                      profiles.Tourist.preferences?.["Accomodation"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Accomodation"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Accomodation: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Hotel</option>
                    <option>AirBNB</option>
                    <option>Hostel</option>
                    <option>Villa</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Duration</Text>
                  <Select
                    disabled={fakeData}
                    value={profiles.Tourist.preferences?.["Duration"]}
                    variant={
                      profiles.Tourist.preferences?.["Duration"] &&
                      profiles.Tourist.preferences?.["Duration"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Duration: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>1 day</option>
                    <option>Few Days</option>
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>Month</option>
                  </Select>
                </Flex>

                <Flex flexDir={"column"}>
                  <Text>Budget</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Budget"] &&
                      profiles.Tourist.preferences?.["Budget"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Budget"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Budget: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Low</option>
                    <option>Average</option>
                    <option>High</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Board</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Board"] &&
                      profiles.Tourist.preferences?.["Board"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Board"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Board: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>None</option>
                    <option>Half</option>
                    <option>All inclusive</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Type</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Type"] &&
                      profiles.Tourist.preferences?.["Type"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Type"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Type: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Resort</option>
                    <option>Cruise</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Family or Friends</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Family or Friends"] &&
                      profiles.Tourist.preferences?.["Family or Friends"] !==
                        "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={profiles.Tourist.preferences?.["Family or Friends"]}
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            "Family or Friends": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Large Family</option>
                    <option>Small Family</option>
                    <option>Friends (Small)</option>
                    <option>Friends (Large)</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Safety</Text>
                  <Select
                    disabled={fakeData}
                    value={profiles.Tourist.preferences?.["Safety"]}
                    variant={
                      profiles.Tourist.preferences?.["Safety"] &&
                      profiles.Tourist.preferences?.["Safety"] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            Safety: event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>High</option>
                    <option>Low</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Environmental Responsiblity</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.[
                        "Environmental Responsiblity"
                      ] &&
                      profiles.Tourist.preferences?.[
                        "Environmental Responsiblity"
                      ] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={
                      profiles.Tourist.preferences?.[
                        "Environmental Responsiblity"
                      ]
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Fitness: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            "Environmental Responsiblity": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>High</option>
                    <option>Average</option>
                    <option>Low</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Cultural Responsiblity</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.[
                        "Culturally Responsiblity"
                      ] &&
                      profiles.Tourist.preferences?.[
                        "Culturally Responsiblity"
                      ] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={
                      profiles.Tourist.preferences?.["Culturally Responsiblity"]
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            "Culturally Responsiblity": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>High</option>
                    <option>Average</option>
                    <option>Low</option>
                  </Select>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Politics is Important</Text>
                  <Select
                    disabled={fakeData}
                    variant={
                      profiles.Tourist.preferences?.["Politics is Important"] &&
                      profiles.Tourist.preferences?.[
                        "Politics is Important"
                      ] !== "N/A"
                        ? "outline"
                        : "filled"
                    }
                    value={
                      profiles.Tourist.preferences?.["Politics is Important"]
                    }
                    onChange={(event) => {
                      setProfiles({
                        ...profiles,
                        Tourist: {
                          ...profiles.Tourist,
                          preferences: {
                            ...profiles.Tourist.preferences,
                            "Politics is Important": event.target.value,
                          },
                        },
                      });
                    }}
                  >
                    <option>N/A</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </Flex>
              </Flex>
            </Flex>
          </>
        </>
      )}
      {console.log({ fakeData, profiles })}
    </Flex>
  );
}

export default App;
