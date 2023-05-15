import { Box, Button, Flex, Input, SlideFade, Spacer, Spinner, Text } from "@chakra-ui/react";
import Logo from "../assets/logo"
import LogoMark from "../assets/logomark";
import { createContext, useEffect, useState } from "react";
import { MicrophoneIcon } from "@/assets/MicrophoneIcon";
import { SendIcon } from "@/assets/SendIcon";
import { UserAvatar } from "@/assets/UserAvatar";
import { AIAvatar } from "@/assets/AIAvatar";


function App(){
    const [launch, setLaunch] = useState(true)
    const [screen, setScreen] = useState(0)
    const [innerScreen, setInnerScreen] = useState(0)
    const [index, setIndex] = useState(-1)
    const Context = createContext()
  const [conversations, setConversations] = useState([])
    const newConversations=(newMessages)=>{
        var index = conversations.length
        setConversations([...conversations, {title: newMessages[0].message, messages: newMessages}])
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
        <>
        {
            launch ? (
                <Box overflow={"hidden"} display={"flex"} width={"100vw"} height={"100vh"} background={"linear-gradient(26.57deg, #125D56 8.33%, #107569 91.67%);"}>
                <SlideFade  in={launch} offsetY='50vh' style={{display: "flex", alignItems: "center"}}>
                    <Box 
                    // transform={"translate(-50%, -50%)"}
                    alignSelf={"center"} justifyContent={"center"} width={"100vw"} display={"flex"}>
                        <Logo/>
                    </Box>
                </SlideFade>
                
                
            </Box>
            ) : (
                // <Text>Threads</Text>
                //     <Input>Search</Input>
                //     <Text>Recent</Text>
                <Flex width={"100vw"} height={"100vh"} flexDirection={"column"}>


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
                                    <Flex alignItems={"center"} paddingStart={"1"} paddingEnd={"1"}>
                            <LogoMark/>
                            <Text color={"#134E48"} fontWeight={"700"}>Pri-AI</Text>
                        </Flex>
                        <Flex position={"relative"} overflowY={"scroll"} flexDirection={"column"} padding={"10px"} flexGrow={1} height={"100%"}>
                        <Text>Threads</Text>
                     <Input/>
                     <Text>Recent</Text>
                     {
                        conversations.map((a,index)=>{
                            return (
                                <Box onClick={()=>{setIndex(index);setInnerScreen(true)}} cursor={"pointer"} padding={"10px 10px"} border={"1px solid #000"} key={index} borderTopLeftRadius={ index === 0 ? "md" : "unset"} borderTopRightRadius={ index === 0 ? "md" : "unset"} width={"100%"}  borderBottomLeftRadius={ index === conversations.length-1 ? "md" : "unset"} borderBottomRightRadius={ index === conversations.length-1 ? "md" : "unset"} backgroundColor={"red"}>
                                    {a.title}
                                </Box>
                            )
                        })
                     }
                     <Flex style={{ zIndex: 99999, position: 'fixed', right: 10, bottom: 10, paddingBottom: "8%"}}>
                        <Button onClick={()=>{setInnerScreen(true); setIndex(-1);}} style={{padding: "8px 14px", background: "#0E9384", border: "1px solid #0E9384", boxShadow: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);", borderRadius: "100px", color: "#fff", fontWeight: 600, fontSize: "14px"}}>New Thread</Button>
                     </Flex>
                     
                        </Flex>
                                    </>
                                )
                            }
                            </>
                        )
                    }

                {/* <Flex flexDirection={"column"}> */}
                        


                </Flex>
            )
        }

        </>
        
    )
}
const Convo = ({goBack, emptyConvo, index, newConversation, setIndex,conversations, setConversations, clearConversation}) => {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        console.log("test")
        setLoading(true)
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "chat": conversations[index]?.messages.slice(conversations[index]?.messages.length > 12 ? conversations[index]?.messages.length - 12 : 0) || [],
                  "prompt": prompt
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
                done = doneReading;
                const chunkValue = decoder.decode(value);

                answer = answer + chunkValue
                console.log(answer)
              }
              console.log(answer)
              if (index === -1) {
                const newIndex = newConversation([{"speaker": "User", message: prompt},{"speaker": "AA", message: answer}])
                setIndex(newIndex)
            } else {
                setConversations([{"speaker": "User", message: prompt},{"speaker": "AA", message: answer}])
              }
              setPrompt("")
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
        console.log("end")
    }
    {console.log(conversations)}
    return (
        <>
          {/* Header */}
          <Flex flexDirection={"column"}>
                        <Flex alignItems={"center"} paddingStart={"1"} paddingEnd={"1"}>
                            <Flex alignItems={"center"} onClick={()=>{goBack()}} style={{cursor: "pointer"}}>
                            <LogoMark/>
                            <Text color={"#134E48"} fontWeight={"700"}>Pri-AI</Text>
                            </Flex>
                            <Spacer/>
                            <Text onClick={()=>clearConversation()} style={{cursor: "pointer"}}>Clear chat</Text>
                        </Flex>
                        <Flex backgroundColor={"#2D31A6"} color={"#ffffff"}>
                            <Text>8/100 Questions used </Text>
                        </Flex>

                    </Flex>
                    {/* Chatlog */}
                        <Flex id="chatlog" flexGrow={1} style={{backgroundColor: "#fcfcfd",whiteSpace: "pre-wrap","overflow-y": "scroll", "scroll-behavior": "smooth", "border-left": "1px solid #eaecf0", "border-top": "1px solid #eaecf0", "display": "flex", "flexDirection": "column"}}>
                            <div style={{marginTop:"auto"}}/>
                            <Flex flexDirection={"row"} alignItems={"center"}>
                                <Box borderBottom={"2px solid #000"} width={"100%"}></Box>
                                <Text>Today</Text>
                                <Box borderBottom={"2px solid #000"} width={"100%"}></Box>

                            </Flex>
                        {
                            conversations[index]?.messages.map((a, index)=>{
                                const type = a.speaker === "User" ? "entry": ""
                                const title ="Title"
                                const time = "Thursday 6:30pm"
                                return (
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
                                            {type === 'entry' ? `You (${title})` : title}
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
                                )
                            })
                        }
                        {loading && (
                            <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            alignSelf={"center"}
                          />
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
                        <Input style={{flex: 1,
    fontSize: 16,
    color: '#333',}} 
    isDisabled={loading}
    value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} paddingLeft={"8px"} placeholder="How did I sleep last night?">
                        </Input>
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
export default App;