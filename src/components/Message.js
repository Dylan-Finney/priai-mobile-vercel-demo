// import { AIAvatar } from "@/assets/AIAvatar";
// import { UserAvatar } from "@/assets/UserAvatar";
// import { Box, Flex, Text } from "@chakra-ui/react"

// export const Message = ({key, time, type, username, aiName, speaker}) => {
//     function formatTimestamp(timestamp) {
//         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
//         const date = new Date(timestamp);
//         const day = daysOfWeek[date.getDay()];
//         let hour = date.getHours();
//         const minutes = date.getMinutes();
//         let period = 'am';
        
//         if (hour >= 12) {
//           period = 'pm';
//           if (hour > 12) {
//             hour -= 12;
//           }
//         }
        
//         const formattedTime = `${hour}:${minutes.toString().padStart(2, '0')}${period}`;
//         return `${day} ${formattedTime}`;
//       }
//     return (
//         <Flex
//         key={key}
//         style={{
//         paddingTop: 32,
//         paddingBottom: 32,
//         paddingLeft: 16,
//         paddingRight: 16,
//         flex: 1,
//         backgroundColor: type === "entry" ? "#F9FAFB" : "white",
//         flexDirection: "column"
//         }}>
//         {
//             type !== "entry" && (
//             <Text
//                 style={{
//                 fontSize: 12,
//                 color: '#475467',
//                 fontWeight: 400,
//                 alignSelf: "end"
//                 }}>
//                 {formatTimestamp(time)}
//             </Text>
//             )
//         }
//         <Flex flexDir={"row"}>
//             <Box>
//             {type === 'entry' ? <UserAvatar /> :  agentsImages[a.speaker]?.chatIcon ? agentsImages[a.speaker]?.chatIcon :  <AIAvatar/>}
//             </Box>
//         <Flex
//             width={"100%"}
//             style={{
//             marginLeft: "8px",
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingBottom: "4px",
//             justifyContent: 'space-between',
//             borderBottom: "1px solid #EAECF0",
//             alignItems:"center"
//             }}>
//             <Flex width={"100%"}>
            
//             <Text
//             height={"fit-content"}
//                 style={{
//                 fontSize: 16,
//                 color: '#344054',
//                 fontWeight: 500,
//                 }}>
//                 {type === 'entry' ? `You (${username})` : a.speaker === "Personal Assistant" ? (aiName !== "" ? aiName : `${username}'s personal AI assistant`) : a.speaker}
//             </Text>
//             <Spacer/>
//             {
//             type === "entry" ? (
//             <Text
//                 style={{
//                 fontSize: 12,
//                 color: '#475467',
//                 fontWeight: 400,
//                 alignSelf: "end"
//                 }}>
//                 {formatTimestamp(a.time)}
//             </Text>
//             ) : (
//             <Flex alignItems={"center"} gap={"5px"}>
//             {
//                 a.speaker === "Personal Assistant" ? (
//                 <Text
//                 style={{
//                     fontSize: 10,
//                     color: '#107569',
//                     fontWeight: 500,
//                     backgroundColor: "#F0FDF9",
//                     padding: "3px",
//                     height: "fit-content"
//                 }}>
//                 PRI AI
//                 </Text>
//                 ) : (
//                 <Text
//                 style={{
//                     fontSize: 10,
//                     color: '#5925DC',
//                     fontWeight: 500,
//                     backgroundColor: "#F4F3FF",
//                     padding: "3px",
//                     height: "fit-content"
//                 }}>
//                 AGENT
//                 </Text>
//                 )
//             }
//             {a.error && (
//                 <Error/>
//             )}
//             </Flex>
//             )
//             }

        
//             </Flex>
//             </Flex>
//         </Flex>
//         <Flex flexDir={"column"} style={{marginLeft: 36,
//             marginTop: 10}}>
//         <Text
//         style={{
//             fontSize: 16,
//             color: '#475467',
//             fontWeight: 400,
            
//         }}>
//         {a.message.split(/([@#]\w+)/).map((str, strIndex)=>{
//             return (
//             <span 
//             key={strIndex}
//             style={{
//                 fontWeight: ["#","@"].includes(str.charAt(0)) ? "bold" : "normal"
//             }}
//             >
//             {str}
//             </span>
//             )
//         })}
//         </Text>
//         {a.error && (
//         <Flex marginTop={"10px"} flexDir={"row"} borderLeft={"8px solid #FECDCA"} border={"1px solid #FECDCA"} borderRadius={"8px"} style={{background: "#FFFBFA"}} >
//             <Flex position={"relative"} borderTopLeftRadius={"8px"} borderBottomLeftRadius={"8px"} backgroundColor={"#FECDCA"} width={"8px"}></Flex>
//             <Flex flexDirection={"column"} padding={"16px 10px"}>

//             <Flex flexDirection={"row"} gap={"5px"} alignItems={"center"}>
//             <Text fontSize={"14px"} color={"#F04438"} fontWeight={600}>
//                 {a.error.status === 503 ? (
//                 "No Network Connection"
//                 ) : (
//                 "APIConnectionError"
//                 )}
                
//                 </Text>
//             <Error/>
//             </Flex>

//         <Text fontWeight={400} fontSize={"14px"} color={"#F04438"}>{a.error.status === 503 ? (
//                 "You are not connected to the internet. Please reconnect and try again."
//                 ) : (
//                 "Issue connecting to our services. Check your network settings, proxy configuration, SSL certificates, or firewall rules."
//                 )}</Text>
//         </Flex>

//         </Flex>
//         )}
//         {/* {console.log({a, messageIndex,conversations[messageIndex]?.messages.})} */}
//         {
//         a.error && !loading && a.error.status !== 503 && messageIndex === conversations[index]?.messages.length -1 && (
//             <Box marginTop={"10px"} onClick={()=>{submit(true)}} cursor={"pointer"}>
//             <Retry/>
//             </Box>
//         )
//         }
//         </Flex>
//     </Flex>
//     )
// } 