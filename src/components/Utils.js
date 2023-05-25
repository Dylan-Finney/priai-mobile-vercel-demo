import { AgentBasketballCoachIcon } from "@/assets/AgentBasketballIcon";
import { AgentNutritionistIcon } from "@/assets/AgentNutritionistIcon";
import { AgentSkiCoachIcon } from "@/assets/AgentSkiCoachIcon";
import { AgentSleepCoachIcon } from "@/assets/AgentSleepCoachIcon";
import { AgentTrainerIcon } from "@/assets/AgentTrainerIcon";

export const agentsImages = {
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
    "Nutritionist":{ 
      circleAvatar: "AIAgentNutritionistAvatar.png",
      threadIcon: <AgentNutritionistIcon scale={2}/>,
      chatIcon: <AgentNutritionistIcon scale={1}/>
    },
    "Sleep Coach":{ 
      circleAvatar: "AIAgentSleepCoachAvatar.png",
      threadIcon: <AgentSleepCoachIcon scale={2}/>,
      chatIcon: <AgentSleepCoachIcon scale={1}/>
    },
    "Basketball Coach":{ 
      circleAvatar: "AIAgentBasketballCoachAvatar.png",
      threadIcon: <AgentBasketballCoachIcon scale={2}/>,
      chatIcon: <AgentBasketballCoachIcon scale={1}/>
    },
    "Ski Coach":{ 
      circleAvatar: "AIAgentSkiCoachAvatar.png",
      threadIcon: <AgentSkiCoachIcon scale={2}/>,
      chatIcon: <AgentSkiCoachIcon scale={1}/>
    },
    "Travel Guide": "AgentAvatar1.png",
    "Productivity Coach": "AgentAvatar1.png",
    "Social Interaction Coach": "AgentAvatar1.png",
    "Tailor": "AgentAvatar1.png",
    "Personal trainer":{ 
      circleAvatar: "AIAgentTrainerAvatar.png",
      threadIcon: <AgentTrainerIcon scale={2}/>,
      chatIcon: <AgentTrainerIcon scale={1}/>
    },
  
  
  }

  export  const agents = {
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
  export const agentDetails = [
    {
      "title": "Heierling",
      "url": "Heierling.png",
      "icon": <AgentSkiCoachIcon scale={1}/>,
      "description": "Get detailed breakdowns and suggestions for every run.",
      "call": "SkiCoach"
    },
    {
      "title": "Sleep lab",
      "url": "SleepLab.png",
      "icon": <AgentSleepCoachIcon scale={1}/>,
      "description": "Understand your sleep profile and create plans to maximize your sleep health ",
      "call": "SleepCoach"
    },
    {
      "title": "Game 6",
      "url": "Game6.png",
      "icon": <AgentBasketballCoachIcon scale={1}/>,
      "description": "A coach in your pocket. Training and game day analysis help you perform your best every time.",
      "call": "BasketballCoach"
    },
    {
      "title": "NourishWell",
      "url": "NourishWell.png",
      "icon": <AgentNutritionistIcon scale={1}/>,
      "description": "Get detailed breakdowns and suggestions for every meal.",
      "call": "Nutritionist"
    },
    {
      "title": "Opti-Fit",
      "url": "OptiFit.png",
      "icon": <AgentTrainerIcon scale={1}/>,
      "description": "Plan and analyze your workouts.",
      "call": "Trainer"
    }
  ]