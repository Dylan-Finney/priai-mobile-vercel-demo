import { Box, Button, Flex, Input, SlideFade, Spacer, Spinner, Text } from "@chakra-ui/react";
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

const username = "User"
function App(){
    const [launch, setLaunch] = useState(false)
    const [screen, setScreen] = useState(0)
    const [innerScreen, setInnerScreen] = useState(0)
    const [index, setIndex] = useState(-1)
    const Context = createContext()
    const [editMode, setEditMode] = useState(false)
    const [conversations, setConversations] = useState([
      {title: "Example Message", messages: [{"speaker": "User", message: "@sleep What is the capital of France?"}, {"speaker": "Sleep Coach", message: "The capital of France is Paris. If you're planning a trip to Paris, I can offer suggestions on how to improve your sleep while travelling, such as adjusting your sleep schedule a few days before your trip to better align with the new time zone, using a sleep mask and earplugs to block out noise and light, and staying well-hydrated throughout your journey."}], lastAccess: new Date(1683999993000).toLocaleDateString()}
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
                      
                      <Convo   conversations={conversations} setConversations={(newMessages)=>{
var newConversations = conversations
newConversations[index].messages = newConversations[index].messages.concat(newMessages)
setConversations(newConversations)
}} index={index} setIndex={(newIndex)=>{setIndex(newIndex)}} clearConversation={()=>{setConversations(conversations.filter((data, idx) => idx !== index )); setIndex(-1);}} newConversation={(newMessages)=>{return newConversations(newMessages)}} goBack={()=>{setInnerScreen(false)}}/>
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
              <Input marginTop={"20px"} placeholder="Search threads"/>
              <Text>Recent</Text>
              {
                  conversations.map((a,index)=>{
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
       
       <Flex style={{ zIndex: 99999, position: 'fixed', right: 10, bottom: 60, paddingBottom: "8%"}}>
          <Button onClick={()=>{setInnerScreen(true); setIndex(-1);  }} style={{padding: "8px 14px", background: "#0E9384", border: "1px solid #0E9384", boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);", borderRadius: "100px", color: "#fff", fontWeight: 600, fontSize: "14px"}}>New Thread</Button>
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
const Convo = ({goBack, emptyConvo, index, newConversation, setIndex,conversations, setConversations, clearConversation}) => {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const pattern = /@\[(.*?)\]\((-?\d+)\)/g;

    const [value, setValue] = useState('');

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
      "sleep": "Sleep Coach",
      "basketball": "Basketball Coach",
      "ski": "Ski Coach",
      "travel": "Travel Guide",
      "productivity": "Productivity Coach",
      "socialint": "Social Interaction Coach",
      "tailor": "Tailor",
      "trainer": "Personal trainer"
  
  
  }

    const submit = async () => {
        console.log("test")
        setLoading(true)
        const promptProcessed = prompt.replace(pattern, "@$1")
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - 12 : 0) || [],
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
              console.log(answer)

              
            var speaker = "Personal Assistant"
            const agent = prompt.match(/@(\w+)/)
            if (agent && Object.keys(agents).includes(agent[1].toLowerCase())){
              speaker = agents[agent[1].toLowerCase()]
            }
              if (index === -1) {
                const newIndex = newConversation([{"speaker": username, message: promptProcessed},{"speaker": speaker, message: answer}])
                setIndex(newIndex)
            } else {
                setConversations([{"speaker": username, message: promptProcessed},{"speaker": speaker, message: answer}])
              }
              setPrompt("")
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
        console.log("end")
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
                        <Flex flexDir={"row"} padding={"10px"} borderBottom={"1px solid #EAECF0"} alignItems={"center"}>
                          <Box onClick={()=>{goBack()}} cursor={"pointer"} padding={"5px"}>
                            <Back/>
                          </Box>
                          <Flex flexDir={"column"} paddingLeft={"10px"}>
                          <Text fontWeight={600} fontSize={"12px"}>{conversations[index]?.title}</Text>
                          <Text fontWeight={400} fontSize={"10px"}>{[...new Set(conversations[index]?.messages.map(item => item.speaker))].filter(speaker=>speaker !== "User").join(", ")}</Text>
                          <Text></Text>

                          </Flex>
                        </Flex>

                    </Flex>
                    {/* Chatlog */}
                        <Flex id="chatlog" flexGrow={1} style={{backgroundColor: "#fcfcfd",whiteSpace: "pre-wrap","overflow-y": "scroll", "scroll-behavior": "smooth", "border-left": "1px solid #eaecf0", "border-top": "1px solid #eaecf0", "display": "flex", "flexDirection": "column"}}>
                            <div style={{marginTop:"auto"}}/>
                           
                        {
                            conversations[index]?.messages.map((a, index)=>{
                                console.log("a",a)
                                const type = a.speaker === "User" ? "entry": ""
                                const title ="Title"
                                const time = "Thursday 6:30pm"
                                return (
                                    <>
                                    {index===0 && (
                                      <Flex flexDirection={"row"} alignItems={"center"}>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>
                                      <Text>Today</Text>
                                      <Box borderBottom={"2px solid #000"} width={"100%"}></Box>

                                      </Flex>
                                    )
                                    }
                                    <Flex
                                    key={index}
                                    style={{
                                      backgroundColor: type === 'entry' ? '#F6FEFC' : null,
                                      paddingTop: 32,
                                      paddingBottom: 32,
                                      paddingLeft: 16,
                                      paddingRight: 16,
                                      flexDirection: 'row',
                                    }}>
                                    {type === 'entry' ? <UserAvatar /> : <AIAvatar />}
                              
                                    <Flex
                                      style={{
                                        marginLeft: 12,
                                        flex: 1,
                                        flexDirection: "column"
                                      }}>
                                      <Flex
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          marginBottom: type === 'entry' ? 23 : null,
                                        }}>
                                        <Flex>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              color: '#344054',
                                              fontWeight: 500,
                                            }}>
                                            {type === 'entry' ? `You (${username})` : a.speaker === "Personal Assistant" ? `${username}'s personal AI assistant` : a.speaker}
                                          </Text>
                                        </Flex>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: '#475467',
                                            fontWeight: 400,
                                          }}>
                                          {time}
                                        </Text>
                                      </Flex>
                                      {/* {type === 'entry' ? null : (
                                        <Divider marginVertical={0} style={{marginTop: 9, marginBottom: 12}} />
                                      )} */}
                              
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: '#475467',
                                          fontWeight: 400,
                                        }}>
                                        {a.message}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                  </>
                                )
                            })
                        }
                        {loading && (
                            <>
                            <Flex
                                    style={{
                                      backgroundColor: '#F6FEFC',
                                      paddingTop: 32,
                                      paddingBottom: 32,
                                      paddingLeft: 16,
                                      paddingRight: 16,
                                      flexDirection: 'row',
                                    }}>
                                    <UserAvatar />
                              
                                    <Flex
                                      style={{
                                        marginLeft: 12,
                                        flex: 1,
                                        flexDirection: "column"
                                      }}>
                                      <Flex
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          marginBottom: 23,
                                        }}>
                                        <Flex>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              color: '#344054',
                                              fontWeight: 500,
                                            }}>
                                            You
                                          </Text>
                                        </Flex>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: '#475467',
                                            fontWeight: 400,
                                          }}>
                                          Thursday 6:30pm
                                        </Text>
                                      </Flex>
                                      {/* {type === 'entry' ? null : (
                                        <Divider marginVertical={0} style={{marginTop: 9, marginBottom: 12}} />
                                      )} */}
                              
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: '#475467',
                                          fontWeight: 400,
                                        }}>
                                        {prompt.replace(pattern, "@$1")}
                                      </Text>
                                    </Flex>
                                  </Flex>
                            <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            alignSelf={"center"}
                          />
                            </>
                            
                        )}
                        </Flex>
                        
                    {/* Input */}
                    <Flex style={{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    // borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,

    // justifyContent: "center",
    // flex: 1,
    height: 48,
  }} >
                        <Box paddingRight={"10px"}>
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
  <MentionsInput allowSuggestionsAboveCursor={true} value={prompt} onChange={handleInputChange} placeholder="How did I sleep last night?" disabled={loading} singleLine style={{display: "inline-flex", input: {paddingLeft: "10px"},highlighter: {paddingLeft: "10px", outline: "none", textDecoration: "none"}, flex: 1, fontSize: 16, color: 'inherit', suggestions: {
    list: {
      overflowY: "auto",
      height: "40vh"
    }
  }}}>
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
            backgroundColor: '#107896',
          }}
          markup={"@[__display__](__id__)"}
        />
        <Mention
          trigger="#"
          displayTransform={(a, display) => `#${display}`}
          data={[]}
          regex={/#(\S+)/}
          style={{
            backgroundColor: '#9A2617',
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
  return (
    <Flex id="thread" flexDirection={"row"} alignItems={"center"} onClick={()=>{onClick()}} cursor={"pointer"} padding={"10px 10px"} border={"1px solid #EAECF0"} borderTop={index > 0 ? "unset" : "1px solid #EAECF0"} key={index} borderTopLeftRadius={ index === 0 ? "md" : "unset"} borderTopRightRadius={ index === 0 ? "md" : "unset"} width={"100%"}  borderBottomLeftRadius={ last ? "md" : "unset"} borderBottomRightRadius={ last ? "md" : "unset"} backgroundColor={showOptions ? "#f6f7f8":"#fff"}>
        <ThreadIcon/>
        <Flex paddingLeft={"10px"} flexDir={"column"}>
          {
            renameOption ? (
              <Input onBlur={()=>{if (save){rename(tempName);setTempName(message.title);} else {setTempName(message.title);}setRenameOption(false)}} autoFocus onClick={(event)=>{event.stopPropagation()}} fontWeight={600} fontSize={"12px"} value={tempName} onChange={(event)=>{setTempName(event.target.value)}}/>

            ) : (
              <Text fontWeight={600} fontSize={"12px"}>{message.title}</Text>

            )
          }
        <Text fontWeight={400} fontSize={"10px"}>{message.lastAccess || "01/01/1990"}</Text>
        </Flex>
        <Spacer/>
        {
          showOptions && (
            <>
            <Flex gap={"5px"}>
              <Box onMouseDown={()=>{
                if (renameOption){
                  setSave(true)
                }
              }} padding={"5px"} onClick={(event)=>{event.stopPropagation();if (!save){setRenameOption(true)} else {setSave(false)}}}>
                <RenameIcon/>
              </Box>
              <Box padding={"5px"} onClick={(event)=>{event.stopPropagation();deleteFunc()}}>
                <TrashIcon/>
              </Box>
            </Flex>
            </>
          )
        }
        <Box id="" width={"30px"} onClick={(event)=>{event.stopPropagation();setShowOptions(!showOptions)}}>
        <KebabIcon/>
        </Box>

    </Flex>
)
}
export default App;