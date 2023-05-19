import { Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, GridItem, Input, SlideFade, Spacer, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { motion, PanInfo } from 'framer-motion';
import Logo from "../assets/logo"
import LogoMark from "../assets/logomark";
import { createContext, useEffect, useState } from "react";
import { MicrophoneIcon } from "@/assets/MicrophoneIcon";
import { SendIcon } from "@/assets/SendIcon";
import { UserAvatar } from "@/assets/UserAvatar";
import { AIAvatar } from "@/assets/AIAvatar";
import { EmptyThread } from "@/assets/EmptyThreads";
import { Swiper, SwiperSlide } from 'swiper/react';
import {AgentAvatar1} from "@/assets/AgentAvatar1";
import { AgentAvatar2 } from "@/assets/AgentAvatar2";
import Image from "next/image";
import { ThreadIcon } from "@/assets/ThreadIcon";
import { HelpIcon } from "@/assets/HelpIcon";
import { Back } from "@/assets/Back";
import axios from 'axios';
import { UpgradeIcon } from "@/assets/UpgradeIcon";
import { ProfileIcon } from "@/assets/ProfileIcon";
import { ChatIcon } from "@/assets/ChatIcon";
import { InfoIcon } from "@/assets/InfoLogo";
import { KebabIcon } from "@/assets/KebabIcon";
import { RenameIcon } from "@/assets/RenameIcon";
import { TrashIcon } from "@/assets/TrashIcon";
import { MentionsInput, Mention } from 'react-mentions'
import { Error } from "@/assets/Error";
import { Retry } from "@/assets/Retry";
import { NewThreadIcon } from "@/assets/NewThread";

const username = "User"

const agentDetails = [
  {
    "title": "Heierling",
    "url": "AgentSpecialist.png",
    "description": "Get detailed breakdowns and suggestions for every run.",
    "call": "SkiCoach"
  },
  {
    "title": "Sleep lab",
    "url": "AgentSpecialist.png",
    "description": "Understand your sleep profile and create plans to maximize your sleep health ",
    "call": "SleepCoach"
  },
  {
    "title": "Game 6",
    "url": "AgentSpecialist.png",
    "description": "A coach in your pocket. Training and game day analysis help you perform your best every time.",
    "call": "BasketballCoach"
  },
  {
    "title": "NourishWell",
    "url": "AgentSpecialist.png",
    "description": "Get detailed breakdowns and suggestions for every meal.",
    "call": "Nutritionist"
  },
  {
    "title": "Opti-Fit",
    "url": "AgentSpecialist.png",
    "description": "Plan and analyze your workouts.",
    "call": "Trainer"
  }
]

const agentsImages = {
  "Personal Assistant": "AgentAvatar1.png",
  //Personality
  "Caregiver": "AgentAvatar1.png",
  "Jester": "AgentAvatar1.png",
  "Storyteller": "AgentAvatar1.png",
  "Analyst": "AgentAvatar1.png",
  "Mentor": "AgentAvatar1.png",
  "Philosopher": "AgentAvatar1.png",
  "Challenger": "AgentAvatar1.png",
  "Language Tutor": "AgentAvatar1.png",
  //Topical
  "Nutritionist": "AgentAvatar1.png",
  "Sleep Coach": "AgentAvatar1.png",
  "Basketball Coach": "AgentAvatar1.png",
  "Ski Coach": "AgentAvatar1.png",
  "Travel Guide": "AgentAvatar1.png",
  "Productivity Coach": "AgentAvatar1.png",
  "Social Interaction Coach": "AgentAvatar1.png",
  "Tailor": "AgentAvatar1.png",
  "Personal trainer": "AgentAvatar1.png"


}
function App(){
    const [launch, setLaunch] = useState(false)
    const [screen, setScreen] = useState(0)
    const [innerScreen, setInnerScreen] = useState(0)
    const [index, setIndex] = useState(-1)
    const Context = createContext()
    const [editMode, setEditMode] = useState(false)
    const [threadFilter, setThreadFilter] = useState("")
    const [conversations, setConversations] = useState([
      {title: "Example Message", messages: [
        {"speaker": "User", message: "@sleep What is the capital of France?"}, {"speaker": "Sleep Coach", message: "The capital of France is Paris. If you're planning a trip to Paris, I can offer suggestions on how to improve your sleep while travelling, such as adjusting your sleep schedule a few days before your trip to better align with the new time zone, using a sleep mask and earplugs to block out noise and light, and staying well-hydrated throughout your journey."},
        {"speaker": "User", message: "How did I sleep last night? #Oura"}, {"speaker": "Personal Assistant", message: "Based on your Oura sleep data available in your private data cloud, you slept for 6 hours and 45 minutes last night. Your sleep consisted of 1 hour and 50 minutes of deep sleep, 3 hours and 30 minutes of light sleep, and 1 hour and 25 minutes of REM sleep. Your sleep efficiency was 88%, which is considered good. It seems like you had a decent night's sleep, but you might want to aim for a bit more rest tonight to ensure optimal recovery."},
        {"speaker": "User", message: "How did I sleep last night? #Oura"}, {"speaker": "Social Interaction Coach", message: "Based on your Oura sleep data available in your private data cloud, you slept for 6 hours and 45 minutes last night. Your sleep consisted of 1 hour and 50 minutes of deep sleep, 3 hours and 30 minutes of light sleep, and 1 hour and 25 minutes of REM sleep. Your sleep efficiency was 88%, which is considered good. It seems like you had a decent night's sleep, but you might want to aim for a bit more rest tonight to ensure optimal recovery."},
        {"speaker": "User", message: "How did I sleep last night? #Oura"}, {"speaker": "Productivity Coach", message: "Based on your Oura sleep data available in your private data cloud, you slept for 6 hours and 45 minutes last night. Your sleep consisted of 1 hour and 50 minutes of deep sleep, 3 hours and 30 minutes of light sleep, and 1 hour and 25 minutes of REM sleep. Your sleep efficiency was 88%, which is considered good. It seems like you had a decent night's sleep, but you might want to aim for a bit more rest tonight to ensure optimal recovery."}
        
      ], lastAccess: new Date(1683999993000).toLocaleDateString()},
      {title: "Example Errors", messages: [
        {
          "speaker": "User",
          "message": "What is the capital of Japan?"
        },
        {
          "speaker": "Personal Assistant",
          "message": "Pri-AI encountered the following error:",
          "error": {
            "status": 401,
            "statusText": "Unauthorized"
          }
        },{
          "speaker": "User",
          "message": "What is the capital of France?"
        },
        {
          "speaker": "Personal Assistant",
          "message": "Pri-AI encountered the following error:",
          "error": {
            "status": 401,
            "statusText": "Unauthorized"
          }
        }
      ], lastAccess: new Date(1683999993000).toLocaleDateString()},
      
    ])
    
    
    
    const newConversations=(newMessages)=>{
        var index = conversations.length
        setConversations([...conversations, {title: newMessages[0].message, messages: newMessages, lastAccess: new Date().toLocaleDateString()}])
        return index
      }
    const array = [1,1,1,1]
    useEffect(()=>{
        if (launch){
            setTimeout(()=>{
                setLaunch(false)
            },1000)
        }
    },[])

    useEffect(()=>{
        console.log("parent", conversations)
    },[conversations])
    
    return (
      <Flex width={"100vw"} height={"100vh"} flexDirection={"column"} overflowX={"hidden"}>

      {
          screen === 0 && (
              <>
              {
                  innerScreen === true ? (
                      <>
                      
                      <Convo  conversations={conversations} setConversations={(convoCopy)=>{setConversations(convoCopy)}}  index={index} setIndex={(newIndex)=>{setIndex(newIndex)}} clearConversation={()=>{setConversations(conversations.filter((data, idx) => idx !== index )); setIndex(-1);}} newConversation={(newMessages)=>{return newConversations(newMessages)}} goBack={()=>{setInnerScreen(false)}}/>
                      </>
                  ) : (
                      <>
                      <Flex alignItems={"center"} padding={2} borderBottom={"1px solid #EAECF0"}>
              <LogoMark/>
              <Text color={"#134E48"} fontWeight={"700"} paddingLeft={"5px"} fontSize={"20px"}>Pri-AI</Text>
          </Flex>
          <Flex position={"relative"} overflowY={"scroll"} flexDirection={"column"} padding={"10px"} flexGrow={1} height={"100%"}>
          <Flex flexDirection={"row"}>
          <Text fontWeight={600} fontSize={"20px"} color={"#107569"}>Threads</Text>
          {/* <Spacer/>
          <Text cursor={"pointer"} onClick={()=>{setEditMode(!editMode)}} fontWeight={600} fontSize={"20px"} color={"#107569"}>Edit</Text> */}
          </Flex>
          <Box width={"100%"} marginTop={"32px"}>
                <ChatIconsSwiper/>
              </Box>
          {
            conversations.length > 0 ? (
              <>
              <Input marginTop={"20px"} placeholder="Search threads" value={threadFilter} onChange={(e)=>{setThreadFilter(e.target.value)}}/>
              <Text>Recent</Text>
              {
                  conversations.filter((conversation)=>{
                    if (conversation.title.toLowerCase().includes(threadFilter.toLowerCase())){
                      return true
                    } else {
                      return false
                    }
                  }).map((a,index)=>{
                      return (
                          <Thread key={index} index={index} message={a} onClick={()=>{setIndex(index);setInnerScreen(true); var newConversations = conversations;
                            newConversations[index].lastAccess = new Date().toLocaleDateString();
                            setConversations(newConversations);}} last={index === conversations.length-1} deleteFunc={()=>{setConversations(conversations.filter((data, idx) => idx !== index ))}} rename={(newTitle)=>{var newConversations = conversations;
                              newConversations[index].title = newTitle;
                              setConversations(newConversations);}}/>
                      )
                  })
              }
              </>
            ) : (
              <>
              
              <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"} textAlign={"center"} marginTop={"auto"} marginBottom={"auto"}>
              <Text fontWeight={600} fontSize={"16px"}>No Threads Yet</Text>
              <Text padding={"10px 50px"}>Get started with your first thread. Pri-AI and specialist bots make any task a breeze!</Text>
              <EmptyThread/>
              </Flex>
              </>
            )
          }
       
       <Flex style={{ zIndex: 99999, position: 'fixed', right: 10, bottom: "0.5vh", paddingBottom: "8%"}}>
          <Button onClick={()=>{setInnerScreen(true); setIndex(-1);  }} style={{padding: "8px 14px", background: "#0E9384", border: "1px solid #0E9384", boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);", borderRadius: "100px", color: "#fff", fontWeight: 600, fontSize: "14px"}}>
            <NewThreadIcon/>
            <Text paddingLeft={"5px"}>New Thread</Text>
            </Button>

       </Flex>
       
          </Flex>
                      </>
                  )
              }
              </>
          )
      }

  {/* <Flex flexDirection={"column"}> */}
          
      {/* {
        !innerScreen && (
            <Flex backgroundColor={"rgba(249, 249, 249, 0.94);"} height={"84px"} justifyContent={"space-evenly"} alignItems={"center"}>
              <Box padding={"8px"} borderRadius={"8px"} backgroundColor={screen === 1 ? "#F0FDF9" : "unset"}>
              <InfoIcon/>
              </Box>
              <Box padding={"8px"} borderRadius={"8px"} backgroundColor={screen === 0 ? "#F0FDF9" : "unset"}>
              <ChatIcon/>
              </Box>
              <Box padding={"8px"} borderRadius={"8px"} backgroundColor={screen === 2 ? "#F0FDF9" : "unset"}>
              <ProfileIcon/>
              </Box>
              <Box padding={"8px"} borderRadius={"8px"} backgroundColor={screen === 3 ? "#F0FDF9" : "unset"}>
              <UpgradeIcon/>
              </Box>
            </Flex>

        )
      } */}
  </Flex>
        
    )
}
const Convo = ({goBack, emptyConvo, index, newConversation, setIndex,conversations, setConversations, clearConversation, retryExchange}) => {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    

    const [drawerTab, setDrawerTab] = useState(0)
    const pattern = /@\[(.*?)\]\((-?\d+)\)/g;


    const [value, setValue] = useState('');

    const swipeConfidenceThreshold = 5000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const onDrag = async (e, info) => {
    const { offset, velocity } = info;
    const swipe = swipePower(offset.y, velocity.y);
    if (offset.y > 0 && swipe > swipeConfidenceThreshold) onClose();

  };

  const handleInputChange = (event, newValue) => {

    setPrompt(newValue);
  };

    const agents = {
      //Personality
      "caregiver": "Caregiver",
      "jester": "Jester",
      "storyteller": "Storyteller",
      "analyst": "Analyst",
      "mentor": "Mentor",
      "philosopher": "Philosopher",
      "challenger": "Challenger",
      "language": "Language Tutor",
      //Topical
      "nutritionist": "Nutritionist",
      "sleepcoach": "Sleep Coach",
      "basketballcoach": "Basketball Coach",
      "skicoach": "Ski Coach",
      "travel": "Travel Guide",
      "productivity": "Productivity Coach",
      "socialint": "Social Interaction Coach",
      "tailor": "Tailor",
      "trainer": "Personal trainer"
  
  
  }

    const submit = async (retryIndex = null) => {
        console.log("test")
        
        // if (retryIndex) {
        //   setLoading(retryIndex)
        //   const promptProcessed = prompt.replace(pattern, "@$1")
        //   try {
        //       const response = await fetch("/api/chat", {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify({
        //             "chat": conversations[index]?.messages.slice(Math.max(retryIndex-11, 0), retryIndex - 1) || [],
        //             "prompt": conversations[index]?.messages[retryIndex-1].message
        //         })
        //        })
  
  
        //        console.log(response)
        //        //Text Complete
        //       //  const data = response.body
        //       //   if (!data) {
        //       //     return
        //       //   }
        //       //   const reader = data.getReader()
        //       //   const decoder = new TextDecoder()
        //       //   let done = false
        //       //   var answer = ""
            
        //       //   // const responseReceived = Date.now()
        //       //   while (!done) {
        //       //     const { value, done: doneReading } = await reader.read()
        //       //     done = doneReading
        //       //     const chunkValue = decoder.decode(value)
        //       //     answer = answer + chunkValue
        //       //     console.log(chunkValue)
                  
        //       //   }
        //       //   console.log(answer)
        //       //   if (index === -1) {
        //       //     const newIndex = newConversation([{"speaker": "User", message: prompt},{"speaker": "AA", message: answer.trim()}])
        //       //     setIndex(newIndex)
        //       // } else {
        //       //     setConversations([{"speaker": "User", message: prompt},{"speaker": "AA", message: answer.trim()}])
        //       //   }
              
        //        const data = response.body;
        //        console.log("data",data)
        //        if (!data) {
        //          return;
        //        }
           
        //        const reader = data.getReader();
        //        const decoder = new TextDecoder();
        //        let done = false;
           
        //         var answer = ""
        //         while (!done) {
        //           const { value, done: doneReading } = await reader.read();
        //           console.log("value",value)
        //           done = doneReading;
        //           const chunkValue = decoder.decode(value);
  
        //           answer = answer + chunkValue
        //           console.log(answer)
        //         }
        //         if (response.status > 399) throw JSON.parse(answer)
        //         console.log(answer)
  
                
        //       var speaker = "Personal Assistant"
        //       const agent = promptProcessed.match(/@(\w+)/)
  
  
        //       if (agent && Object.keys(agents).includes(agent[1].toLowerCase())){
        //         speaker = agents[agent[1].toLowerCase()]
        //       }
        //       var conversationCopy = conversations 
        //       conversationCopy[index].messages[retryIndex].message = answer
        //       setConversations(conversationCopy)
        //   } catch (e) {
        //       console.error(e)
        //       var speaker = "Personal Assistant"
        //       const agent = promptProcessed.match(/@(\w+)/)
  
  
        //       if (agent && Object.keys(agents).includes(agent[1].toLowerCase())){
        //         speaker = agents[agent[1].toLowerCase()]
        //       }
        //       var conversationCopy = conversations 
        //       conversationCopy[index].messages[retryIndex].message = answer
        //       conversationCopy[index].messages[retryIndex].error = e

        //       setConversations(conversationCopy)
        //   }
        //   setLoading(false)
        //   console.log("end")
        // } else {
          setLoading(true)
          
          var promptProcessed
          if (retryIndex === true){
            promptProcessed = conversations[index]?.messages[conversations[index]?.messages.length-2].message
            setPrompt(promptProcessed)
            var tempConversations = conversations
            tempConversations[index].messages = tempConversations[index].messages.slice(0,-2)
            setConversations(tempConversations)
          } else {
            promptProcessed = prompt.replace(pattern, "@$1")
          }
          

          try {
              const response = await fetch("/api/chat", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - (retryIndex === true ? 14 : 12) : 0,retryIndex === true ? conversations[index]?.messages.length-2 : undefined ) || [],
                    "chat": conversations[index]?.messages.filter((message, messageIndex)=>{
                      if (conversations[index]?.messages[messageIndex].error){
                        return false
                      }
                      if (messageIndex === conversations[index]?.messages.length - 1){
                        return true
                      } 
                      if (conversations[index]?.messages[messageIndex+1].error || conversations[index]?.messages[messageIndex].error ) {
                        return false
                      } else {
                        return true
                      }
                    }).slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - 12 : 0 ) || [],
                    "prompt": promptProcessed
                })
               })
  
  
               console.log(response)
               //Text Complete
              //  const data = response.body
              //   if (!data) {
              //     return
              //   }
              //   const reader = data.getReader()
              //   const decoder = new TextDecoder()
              //   let done = false
              //   var answer = ""
            
              //   // const responseReceived = Date.now()
              //   while (!done) {
              //     const { value, done: doneReading } = await reader.read()
              //     done = doneReading
              //     const chunkValue = decoder.decode(value)
              //     answer = answer + chunkValue
              //     console.log(chunkValue)
                  
              //   }
              //   console.log(answer)
              //   if (index === -1) {
              //     const newIndex = newConversation([{"speaker": "User", message: prompt},{"speaker": "AA", message: answer.trim()}])
              //     setIndex(newIndex)
              // } else {
              //     setConversations([{"speaker": "User", message: prompt},{"speaker": "AA", message: answer.trim()}])
              //   }
              
               const data = response.body;
               console.log("data",data)
               if (!data) {
                 return;
               }
           
               const reader = data.getReader();
               const decoder = new TextDecoder();
               let done = false;
           
                var answer = ""
                while (!done) {
                  const { value, done: doneReading } = await reader.read();
                  console.log("value",value)
                  done = doneReading;
                  const chunkValue = decoder.decode(value);
  
                  answer = answer + chunkValue
                  console.log(answer)
                }
                if (response.status > 399) throw JSON.parse(answer)
                console.log(answer)
  
                
              var speaker = "Personal Assistant"
              const agent = promptProcessed.match(/@(\w+)/)
  
  
              if (agent && Object.keys(agents).includes(agent[1].toLowerCase())){
                speaker = agents[agent[1].toLowerCase()]
              }
                if (index === -1) {
                  const newIndex = newConversation([{"speaker": username, message: promptProcessed},{"speaker": speaker, message: answer}])
                  setIndex(newIndex)
              } else {
                var conversationCopy = conversations
                conversationCopy[index].messages = conversationCopy[index].messages.concat([{"speaker": username, message: promptProcessed},{"speaker": speaker, message: answer}])
                setConversations(conversationCopy)
                setPrompt("")
              }
          } catch (e) {
              console.error(e)
              var speaker = "Personal Assistant"
              const agent = promptProcessed.match(/@(\w+)/)
  
  
              if (agent && Object.keys(agents).includes(agent[1].toLowerCase())){
                speaker = agents[agent[1].toLowerCase()]
              }
                if (index === -1) {
                  const newIndex = newConversation([{"speaker": username, message: promptProcessed},{"speaker": speaker, message: "Pri-AI encountered the following error:", error: e}])
                  setIndex(newIndex)
              } else {
                var conversationCopy = conversations
                conversationCopy[index].messages = conversationCopy[index].messages.concat([{"speaker": username, message: promptProcessed},{"speaker": speaker, message: "Pri-AI encountered the following error:", error: e}])
                setConversations(conversationCopy)
                }
                setPrompt("")
          }
          setLoading(false)
          console.log("end")
        // }
    }
    {console.log(conversations)}

    useEffect(()=>{
      var element = document.getElementById('chatlog');
      element.scrollTop = element.scrollHeight;
    },[conversations[index]?.messages, loading])
    return (
        <>
          {/* Header */}
          <Flex flexDirection={"column"}>
                        {/* <Flex alignItems={"end"} backgroundColor={"#2D31A6"} height={"80px"} color={"#ffffff"} padding={"10px"}>
                            <Text>{conversations[index]?.messages.filter((message)=>message.speaker === "User").length || 0}/100 Questions used </Text>
                            <Spacer/>
                            <button padding={0}>Upgrade</button>
                        </Flex> */}

                        {console.log("convoTest",conversations[index]?.messages.filter((message, messageIndex)=>{
                          if (conversations[index]?.messages[messageIndex].error){
                            return false
                          }
                          if (messageIndex === conversations[index]?.messages.length - 1){
                            return true
                          } 
                          if (conversations[index]?.messages[messageIndex+1].error || conversations[index]?.messages[messageIndex].error ) {
                            return false
                          } else {
                            return true
                          }
                        }))}
                        <Flex flexDir={"row"} padding={"10px"} borderBottom={"1px solid #EAECF0"} alignItems={"center"}>
                          <Box onClick={()=>{goBack()}} cursor={"pointer"} padding={"5px"}>
                            <Back/>
                          </Box>
                          <Flex flexDir={"column"} paddingLeft={"10px"} overflow={"hidden"}>
                          <Text fontWeight={600} fontSize={"12px"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} >{conversations[index]?.title}</Text>
                          <Text fontWeight={400} fontSize={"10px"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} >{[...new Set(conversations[index]?.messages.map(item => item.speaker))].filter(speaker=>speaker !== "User").join(", ")}</Text>
                          <Text></Text>

                          </Flex>
                        </Flex>

                    </Flex>
                    {/* Chatlog */}
                        <Flex id="chatlog" flexGrow={1} style={{backgroundColor: "#fcfcfd",whiteSpace: "pre-wrap","overflow-y": "scroll", "scroll-behavior": "smooth", "border-left": "1px solid #eaecf0", "border-top": "1px solid #eaecf0", "display": "flex", "flexDirection": "column"}}>
                            <div style={{marginTop:"auto", height: "100%"}}/>
                           
                        {
                            conversations[index]?.messages.map((a, messageIndex)=>{
                                console.log("a",a)
                                const type = a.speaker === "User" ? "entry": ""
                                const title ="Title"
                                const time = "Thursday 6:30pm"
                                return (
                                    <>
                                    {messageIndex===0 && (
                                      <Flex flexDirection={"row"} alignItems={"center"}>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>
                                      <Text>Today</Text>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>

                                      </Flex>
                                    )}
                                    <Flex
                                      key={messageIndex}
                                      style={{
                                        paddingTop: 32,
                                        paddingBottom: 32,
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        flex: 1,
                                        backgroundColor: type === "entry" ? "#F9FAFB" : "white",
                                        flexDirection: "column"
                                      }}>
                                        {
                                          type !== "entry" && (
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: '#475467',
                                                fontWeight: 400,
                                                alignSelf: "end"
                                              }}>
                                              {time}
                                            </Text>
                                          )
                                        }
                                        <Flex flexDir={"row"}>
                                          <Box>
                                            {type === 'entry' ? <UserAvatar /> : <AIAvatar />}
                                          </Box>
                                        <Flex
                                          width={"100%"}
                                          style={{
                                            marginLeft: "8px",
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: "4px",
                                            justifyContent: 'space-between',
                                            borderBottom: "1px solid #EAECF0",
                                            alignItems:"center"
                                          }}>
                                          <Flex width={"100%"}>
                                            
                                            <Text
                                            height={"fit-content"}
                                              style={{
                                                fontSize: 16,
                                                color: '#344054',
                                                fontWeight: 500,
                                              }}>
                                              {type === 'entry' ? `You (${username})` : a.speaker === "Personal Assistant" ? `${username}'s personal AI assistant` : a.speaker}
                                            </Text>
                                          <Spacer/>
                                          {
                                          type === "entry" ? (
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: '#475467',
                                                fontWeight: 400,
                                                alignSelf: "end"
                                              }}>
                                              {time}
                                            </Text>
                                          ) : (
                                            <Flex alignItems={"center"} gap={"5px"}>
                                            {
                                              a.speaker === "Personal Assistant" ? (
                                                <Text
                                                style={{
                                                  fontSize: 10,
                                                  color: '#107569',
                                                  fontWeight: 500,
                                                  backgroundColor: "#F0FDF9",
                                                  padding: "3px",
                                                  height: "fit-content"
                                                }}>
                                                PRI AI
                                              </Text>
                                              ) : (
                                                <Text
                                                style={{
                                                  fontSize: 10,
                                                  color: '#5925DC',
                                                  fontWeight: 500,
                                                  backgroundColor: "#F4F3FF",
                                                  padding: "3px",
                                                  height: "fit-content"
                                                }}>
                                                AGENT
                                              </Text>
                                              )
                                            }
                                            {a.error && (
                                              <Error/>
                                            )}
                                            </Flex>
                                          )
                                          }

                                        
                                          </Flex>
                                          </Flex>
                                      </Flex>
                                      <Flex flexDir={"column"} style={{marginLeft: 36,
                                          marginTop: 10}}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: '#475467',
                                          fontWeight: 400,
                                          
                                        }}>
                                        {a.message.split(/([@#]\w+)/).map((str, strIndex)=>{
                                          return (
                                            <span 
                                            key={strIndex}
                                            style={{
                                              fontWeight: ["#","@"].includes(str.charAt(0)) ? "bold" : "normal"
                                            }}
                                            >
                                            {str}
                                          </span>
                                          )
                                        })}
                                      </Text>
                                      {a.error && (
                                        <Flex marginTop={"10px"} flexDir={"row"} borderLeft={"8px solid #FECDCA"} border={"1px solid #FECDCA"} borderRadius={"8px"} style={{background: "#FFFBFA"}} >
                                          <Flex position={"relative"} borderTopLeftRadius={"8px"} borderBottomLeftRadius={"8px"} backgroundColor={"#FECDCA"} width={"8px"}></Flex>
                                          <Flex flexDirection={"column"} padding={"16px 10px"}>

                                          <Flex flexDirection={"row"} gap={"5px"} alignItems={"center"}>
                                            <Text fontSize={"14px"} color={"#F04438"} fontWeight={600}>
                                              {a.error.status === 503 ? (
                                                "No Network Connection"
                                              ) : (
                                                "APIConnectionError"
                                              )}
                                              
                                              </Text>
                                            <Error/>
                                          </Flex>

                                        <Text fontWeight={400} fontSize={"14px"} color={"#F04438"}>{a.error.status === 503 ? (
                                                "You are not connected to the internet. Please reconnect and try again."
                                              ) : (
                                                "Issue connecting to our services. Check your network settings, proxy configuration, SSL certificates, or firewall rules."
                                              )}</Text>
                                        </Flex>

                                        </Flex>
                                      )}
                                      {/* {console.log({a, messageIndex,conversations[messageIndex]?.messages.})} */}
                                      {
                                        a.error && !loading && a.error.status !== 503 && messageIndex === conversations[index]?.messages.length -1 && (
                                         <Box marginTop={"10px"} onClick={()=>{submit(true)}} cursor={"pointer"}>
                                           <Retry/>
                                         </Box>
                                        )
                                      }
                                      </Flex>
                                    </Flex>
                                  </>
                                )
                            })
                        }
                        {loading && (
                            <>
                            {console.log("retry2", {length: conversations[index]?.messages.length , index })}
                            {
                              index === -1 ? (
                                      <Flex flexDirection={"row"} alignItems={"center"}>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>
                                      <Text>Today</Text>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>

                                      </Flex>
                              ) : (
                                <>
                                  {
                                    conversations[index].messages.length === 0 && (
                                      <Flex flexDirection={"row"} alignItems={"center"}>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>
                                      <Text>Today</Text>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>

                                      </Flex>
                                    )
                                  }
                                </>
                              )
                            }
                            <Flex
                                      style={{
                                        paddingTop: 32,
                                        paddingBottom: 32,
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        flex: 1,
                                        flexDirection: "column"
                                      }}>
                                        
                                        <Flex flexDir={"row"}>
                                          <Box>
                                            <UserAvatar />
                                          </Box>
                                        <Flex
                                          width={"100%"}
                                          style={{
                                            marginLeft: "8px",
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: "4px",
                                            justifyContent: 'space-between',
                                            borderBottom: "1px solid #EAECF0",
                                            alignItems:"center"
                                          }}>
                                          <Flex width={"100%"}>
                                            
                                            <Text
                                            height={"fit-content"}
                                              style={{
                                                fontSize: 16,
                                                color: '#344054',
                                                fontWeight: 500,
                                              }}>
                                              You ({username})
                                            </Text>
                                          <Spacer/>
                                          <Text
                                          style={{
                                            fontSize: 12,
                                            color: '#475467',
                                            fontWeight: 400,
                                            alignSelf: "end"
                                          }}>
                                          Thursday 6:30pm
                                        </Text>

                                        
                                          </Flex>
                                          </Flex>
                                      </Flex>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: '#475467',
                                          fontWeight: 400,
                                          marginLeft: 36,
                                          marginTop: 10
                                        }}>
                                        {prompt.replace(pattern, "@$1").split(/([@#]\w+)/).map((str, strIndex)=>{
                                          return (
                                            <span 
                                            key={strIndex}
                                            style={{
                                              fontWeight: ["#","@"].includes(str.charAt(0)) ? "bold" : "normal"
                                            }}
                                            >
                                            {str}
                                          </span>
                                          )
                                        })}
                                      </Text>
                                      
                                    </Flex>
                                    <Flex
                                      style={{
                                        paddingTop: 32,
                                        paddingBottom: 32,
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        flex: 1,
                                        flexDirection: "column"
                                      }}>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: '#475467',
                                            fontWeight: 400,
                                            alignSelf: "end"
                                          }}>
                                          Thursday 6:30pm
                                        </Text>
                                        <Flex flexDir={"row"}>
                                          <Box>
                                            <AIAvatar />
                                          </Box>
                                        <Flex
                                          width={"100%"}
                                          style={{
                                            marginLeft: "8px",
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: "4px",
                                            justifyContent: 'space-between',
                                            borderBottom: "1px solid #EAECF0",
                                            alignItems:"center"
                                          }}>
                                          <Flex width={"100%"}>
                                            
                                            <Text
                                            height={"fit-content"}
                                              style={{
                                                fontSize: 16,
                                                color: '#344054',
                                                fontWeight: 500,
                                              }}>
                                              {
                                                prompt.replace(pattern, "@$1").match(/@(\w+)/)  === null ? `${username}'s personal AI assistant` : 
                                                Object.keys(agents).includes(prompt.replace(pattern, "@$1").match(/@(\w+)/)[1].toLowerCase()) ? agents[prompt.replace(pattern, "@$1").match(/@(\w+)/)[1].toLowerCase()] : `${username}'s personal AI assistant`
                                              }
                                            </Text>
                                          <Spacer/>
                                          <Flex flexDirection={"row"} alignItems={"center"} >

                                          {
                                            prompt.replace(pattern, "@$1").match(/@(\w+)/) === null ? (
                                              <Text
                                              style={{
                                                fontSize: 10,
                                                color: '#107569',
                                                fontWeight: 500,
                                                backgroundColor: "#F0FDF9",
                                                padding: "3px",
                                                height: "fit-content"
                                              }}>
                                              PRI AI
                                            </Text>
                                            ) : (
                                              <>
                                              {!Object.keys(agents).includes(prompt.replace(pattern, "@$1").match(/@(\w+)/)[1].toLowerCase()) ? (
                                                  <Text
                                                  style={{
                                                    fontSize: 10,
                                                    color: '#107569',
                                                    fontWeight: 500,
                                                    backgroundColor: "#F0FDF9",
                                                    padding: "3px",
                                                    height: "fit-content"
                                                  }}>
                                                  PRI AI
                                                </Text>
                                                ) : (
                                                  <Text
                                                  style={{
                                                    fontSize: 10,
                                                    color: '#5925DC',
                                                    fontWeight: 500,
                                                    backgroundColor: "#F4F3FF",
                                                    padding: "3px",
                                                    height: "fit-content"
                                                  }}>
                                                  AGENT
                                                </Text>
                                                )}
                                              </>
                                            )
                                                
                                            }
                                            <Image
                                              src="/Spinner.gif"
                                              width={30}
                                              height={30}
                                                alt="Picture of the author"
                                              />
                                          </Flex>

                                        
                                          </Flex>
                                          </Flex>
                                      </Flex>
                                    </Flex>
                            {/* </Flex>    */}
                            </>
                            
                            )}
                        </Flex>
                        
                    {/* Input */}
                    <Flex style={{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottom: "unset",
    // borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,

    // justifyContent: "center",
    // flex: 1,
    height: 48,
  }} >
                        <Box paddingRight={"10px"} cursor={"pointer"} onClick={onOpen}>
                          <HelpIcon/>
                        </Box>
    <Flex
    style={ {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  }}
    >
      {console.log(value)}
  <MentionsInput   onKeyDown={(event)=>{if(event.key==="Enter"){submit()}}} forceSuggestionsAboveCursor={true} value={prompt} onChange={handleInputChange} placeholder="How did I sleep last night?" disabled={loading} singleLine style={{ "&singleLine": {
    display: 'inline-block',
    width: "100%",
    maxWidth: "calc(100vw - 107px)",
    
    suggestions: {
      list: {
        overflowY: "auto",
        height: "40vh"
      }
    },
    highlighter: {
      padding: 1,
      border: '2px inset transparent',
      overflowX: "hidden",
    },
    input: {
      padding: 1,
      // border: '2px inset',
      minHeight: 30,
    },
  } }}>
        <Mention
          trigger="@"
          displayTransform={(a, display) => `@${display}`}
          data={Object.keys(agents).map((data, i)=>{
            return {
              id: i,
              display: data
            }
          })}
          style={{
            backgroundColor: '#F0FDF9',
          }}
          markup={"@[__display__](__id__)"}
        />
        <Mention
          trigger="#"
          displayTransform={(a, display) => `#${display}`}
          data={[]}
          regex={/#(\S+)/}
          style={{
            backgroundColor: '#F0FDF9',
            textShadow: ""
          }}
          markup="#__id__"
        />
      </MentionsInput>
                        {/* <Input style={{flex: 1,
    fontSize: 16,
    color: '#333',}} 
    isDisabled={loading}
    value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} paddingLeft={"8px"} placeholder="How did I sleep last night?">
                        </Input> */}
                        <Flex style={{flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4}}>
        <Box onClick={()=>{submit()}} cursor={"pointer"}><SendIcon /></Box>
            
            <MicrophoneIcon/>

                        </Flex>
                    </Flex>  
                    </Flex>
                    <Box minHeight={"6vh"} width={"100%"} backgroundColor={"#F9F9F9"}/>
                    <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <motion.div drag="y"  dragElastic={{bottom:1}} dragPropagation onDragEnd={onDrag} dragConstraints={{ top: 0, bottom: 0 }} style={{top: 0, bottom: 0}}>
        <DrawerContent maxHeight={"90vh"} borderTopLeftRadius={"16px"} borderTopRightRadius={"16px"}>
          <DrawerCloseButton />
         <ButtonGroup isAttached justifyContent={"center"} marginTop={"20px"}>
            <Button isActive={drawerTab===0} onClick={()=>{setDrawerTab(0)}}>Agents</Button>
            <Button isActive={drawerTab===1} onClick={()=>{setDrawerTab(1)}}>Prompting</Button>
         </ButtonGroup>
         <Flex padding={"20px"} height={"100%"} flexDir={"column"} minH={"1px"}>
          {
            drawerTab === 0 && (
              <>
              <Text fontSize={"16px"} fontWeight={600}>Specialist agents</Text>
              <Text fontSize={"14px"} color={"#475467"}>Use Pri-AI to talk to your connected data.</Text>
              <Box minHeight={"1px"} width={"100%"} backgroundColor={"#EAECF0"} margin={"10px 0px"}/>
              <Flex flexDirection={"column"} overflowY={"scroll"} gap={"16px"}>
              {
                agentDetails.map((agent,i)=>{
                  return (
                    <Flex key={i} flexDir={"row"} padding={"8px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} border={"1px solid #EAECF0"}>
                      <Box alignSelf={"center"} >
                      <Image
                      src="/AgentSpecialist.png"
                      width={84}
                      height={84}
                        alt={`Picture of ${agent.title}`}
                        style={{maxWidth: "unset"}}
                    
                      />
                      </Box>
                      <Flex paddingLeft={"16px"} flexDir={"column"}>
                      <Text color={"#101828"} fontWeight={600} fontSize={"14px"}>{agent.title} <span style={{color: "#107569", fontWeight: 500, fontSize: "12px", backgroundColor: "#F0FDF9", padding: "2px 8px", borderRadius: "16px" }}>@{agent.call}</span></Text>
                      <Text color={"#475467"} fontSize={"12px"}>{agent.description}</Text>
                      </Flex>
                      
                    </Flex>
                  )
                })
              }
              

              </Flex>
              </>
            )
          }
          {
            drawerTab === 1 && (
              <>
              <Flex flexDirection={"column"} overflowY={"scroll"} gap={"10px"}>
              <Text fontSize={"16px"} fontWeight={600}>Live data promping</Text>
              <Text fontSize={"14px"} color={"#475467"}>Use Pri-AI to talk to your connected data.</Text>
              <Box minHeight={"1px"} width={"100%"} backgroundColor={"#EAECF0"} margin={"10px 0px"}></Box>
              <Flex flexDirection={"column"}  gap={"16px"}>
                <Text color={"#101828"} fontWeight={500}>#+source name</Text>
                <Flex flexDir={"column"} gap={"10px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} padding={"16px"}>
                  <Text color={"#101828"} fontWeight={600}>Try this</Text>
                  <Text color={"#475467"}>“<span style={{display: "inline-block",mixBlendMode: "multiply",backgroundColor: "#F2F4F7", borderRadius: "16px", padding: "2px 8px", color: "#344054", fontWeight: 500}}>#appleHealth</span> What is my average step count over the last two weeks?”</Text>
                </Flex>
                <Text color={"#101828"} fontWeight={500}>Ask Pri-AI what it can do with a source </Text>
                <Flex flexDir={"column"} gap={"10px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} padding={"16px"}>
                  <Text color={"#101828"} fontWeight={600}>Try this</Text>
                  <Text color={"#475467"}>“What can you do with <span style={{display: "inline-block",mixBlendMode: "multiply",backgroundColor: "#F2F4F7", borderRadius: "16px", padding: "2px 8px", color: "#344054", fontWeight: 500}}>#appleHealth</span>?”</Text>
                </Flex>
                <Text color={"#101828"} fontWeight={500}>Example sources </Text>
                <Flex flexDir={"column"} gap={"10px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} padding={"16px"}>
                  <Text style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}} >{["appleHealth", "fitbit", "oura", "garmin", "logmore", "ichijiku", "movesense", "heierling", "netflix", "chasebank", "myftinesspal", "amazon", "spotify", "applemusic"].map((source, key)=>{
                    return (
                      <span key={index} style={{margin: "2px",display: "inline-block",mixBlendMode: "multiply",backgroundColor: "#F2F4F7", borderRadius: "16px", padding: "2px 8px", color: "#344054", fontWeight: 500}}>#{source}</span>
                    )
                  })}</Text>
                  <Text style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>{["fitness", "nutrition", "externalSensor", "finance"].map((source, key)=>{
                    return (
                      <span key={index} style={{margin: "2px",display: "inline-block",mixBlendMode: "multiply",backgroundColor: "#F2F4F7", borderRadius: "16px", padding: "2px 8px", color: "#344054", fontWeight: 500}}>#{source}</span>
                    )
                  })}</Text>
                  
                </Flex>


              </Flex>
              <Text fontSize={"16px"} fontWeight={600}>General prompting tips</Text>
              <Box minHeight={"1px"} width={"100%"} backgroundColor={"#EAECF0"} margin={"10px 0px"}></Box>
              <Flex flexDirection={"column"}  gap={"16px"}>
                <Text color={"#101828"} fontWeight={500}>Ask Pri-AI what they can help you with</Text>
                <Flex flexDir={"column"} gap={"10px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} padding={"16px"}>
                  <Text color={"#101828"} fontWeight={600}>Try this</Text>
                  <Text color={"#475467"}>“What can you help me with?”</Text>
                </Flex>
                <Text color={"#101828"} fontWeight={500}>Ask Pri-AI to explain </Text>
                <Flex flexDir={"column"} gap={"10px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} padding={"16px"}>
                  <Text color={"#101828"} fontWeight={600}>Try this</Text>
                  <Text color={"#475467"}>“Explain your answer”</Text>
                  <Text color={"#475467"}>“Explain why the sky is blue”</Text>
                </Flex>
                <Text color={"#101828"} fontWeight={500}>Ask Pri-AI ot brainstorm ideas</Text>
                <Flex flexDir={"column"} gap={"10px"} backgroundColor={"#F9FAFB"} borderRadius={"8px"} padding={"16px"}>
                  <Text color={"#101828"} fontWeight={600}>Try this</Text>
                  <Text color={"#475467"}>Brainstorm 10 ideas for pet names. They all must start with “T””</Text>
                </Flex>


              </Flex>
              </Flex>
              
              </>
            )
          }
         
         </Flex>
        </DrawerContent>
        </motion.div>
      </Drawer>
        </>
    )
}
const ChatIconsSwiper = () => {
  return (
    <Swiper
      // spaceBetween={50}
      slidesPerView={6}
      autoHeight={true}
      spaceBetween={0}
      grabCursor={true}
      freeMode={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><Image
      src="/AgentAvatar1.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
      <SwiperSlide><Image
      src="/AgentAvatar2.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
      <SwiperSlide><Image
      src="/AgentAvatar3.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
      <SwiperSlide><Image
      src="/AgentAvatar4.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
      <SwiperSlide><Image
      src="/AgentAvatar5.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
      <SwiperSlide><Image
      src="/AgentAvatar6.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
      <SwiperSlide><Image
      src="/AgentAvatar7.png"
      width={50}
      height={50}
        alt="Picture of the author"
      /></SwiperSlide>
    </Swiper>
  )
}
const Thread = ({
  onClick, 
  index,
  message, 
  deleteFunc, 
  rename,
  last}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [renameOption, setRenameOption] = useState(false)
  const [save, setSave] = useState(false)
  const [tempName, setTempName] = useState(message.title)
  const mentionedAgents = [...new Set(message.messages.map(item => item.speaker))].filter(speaker=>speaker !== "User").reverse()
  return (
    <Flex id="thread" flexDirection={"row"} alignItems={"center"} onClick={()=>{onClick()}} cursor={"pointer"} padding={"10px 10px"} border={"1px solid #EAECF0"} borderTop={index > 0 ? "unset" : "1px solid #EAECF0"} key={index} borderTopLeftRadius={ index === 0 ? "md" : "unset"} borderTopRightRadius={ index === 0 ? "md" : "unset"} width={"100%"}  borderBottomLeftRadius={ last ? "md" : "unset"} borderBottomRightRadius={ last ? "md" : "unset"} backgroundColor={showOptions ? "#f6f7f8":"#fff"}>
        <Box>
        <ThreadIcon/>
        </Box>
        <Flex paddingLeft={"10px"} flexDir={"column"} overflow={"hidden"}>
        <Text fontWeight={600} fontSize={"12px"} textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>{message.title}</Text>
        <Text fontWeight={400} fontSize={"10px"}>{message.lastAccess || "01/01/1990"}</Text>
        </Flex>
        <Spacer/>
        {
          showOptions ? (
            <>
            <Flex gap={"5px"}>
              <Box padding={"5px"} onClick={(event)=>{event.stopPropagation();const newTitle = prompt(`What would you want to rename thread "${message.title}" as?`, message.title)
                if (newTitle !== null && newTitle.length > 0) {
                  setSave(!save)
                  rename(newTitle)
                }}}>
                <RenameIcon/>
              </Box>
              <Box padding={"5px"} onClick={(event)=>{event.stopPropagation();deleteFunc()}}>
                <TrashIcon/>
              </Box>
            </Flex>
            </>
          ) : (
            <>
            {
                mentionedAgents.slice(0,3).map((speaker, agentIndex)=>{
                  return (
                    <>
                     <Box width={"32px"} height={"32px"} backgroundColor={"white"} border={"1px solid white"} borderRadius={"20px"} marginLeft={agentIndex > 0 ? "-10px" : "unset"}>
                    <Image
                              src={`/${agentsImages[speaker]}`}
                              width={35}
                              height={35}

                              />
                    </Box>
                    </>
                  )
                })
            }
            {
              mentionedAgents.length > 3 && (
                <Box width={"32px"} height={"32px"} backgroundColor={"white"} border={"2px solid white"}  borderRadius={"20px"}  marginLeft={"-10px"} alignItems={"center"} justifyContent={"center"}>
                  <Box backgroundColor={"#F2F4F7"} height={"95%"} width={"95%"}  borderRadius={"200px"} textAlign={"center"} padding={"5px 0"}>
                    <Text color={"#475467"} fontSize={"12px"} fontWeight={500} marginTop={"auto"}>+{mentionedAgents.length - 3}</Text>
                  </Box>
                </Box>
              )
            }
           
            

             {/* <Grid width={"fit-content"} templateColumns='repeat(5, 1fr)'>
             {
                mentionedAgents.slice(0,3).map((speaker, agentIndex)=>{
                  return (
                    <>
                    <GridItem w='50px' h='33px' marginLeft={agentIndex > 0 ? `${-25 * agentIndex}px` : "unset"}>
                      <Image
                      src={`/${agentsImages[speaker]}`}
                      width={35}
                      height={35}

                      />
                    </GridItem>
                    </>
                  )
                })
              }
              {
                mentionedAgents.length > 3 && (
                  <>
                    <GridItem w='50px' h='33px' bg='blue.500' border={"1px solid red"} marginLeft={`${-25 * 3}px`}></GridItem>
                    </>
                )
              }
            </Grid> */}
            </>
          )
        }
        <Box id="" minWidth={"30px"} maxWidth={"30px"} onClick={(event)=>{event.stopPropagation();setShowOptions(!showOptions)}}>
        <KebabIcon/>
        </Box> 

    </Flex>
)
}
export default App;