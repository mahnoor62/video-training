export const trainingData = {
  videos: [
    {
      id: 1,
      title: "Firefighting Safety Training",
      description: "Learn essential firefighting techniques, safety protocols, and emergency response procedures to protect lives and property.",
      videoUrl: "/videos/firefighting-training.mp4",
      duration: "12:45",
      thumbnail: "/videos/firefighting-training.mp4"
    },
    {
      id: 2,
      title: "CPR Training",
      description: "Master life-saving CPR techniques, first aid procedures, and emergency medical response skills.",
      videoUrl: "/videos/cpr-training.mp4",
      duration: "18:30",
      thumbnail: "/videos/cpr-training.mp4"
    }
  ],
  quizzes: [
    {
      videoId: 1,
      questions: [
        {
          id: 1,
          question: "If a fire is too large to control, what's your best action?",
          options: [
            "Try harder",
            "Wait for help",
            "Evacuate immediately",
            "Hide inside"
          ],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "It's safe to use water on electrical fires. (True or False)",
          options: [
            "True",
            "False"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "What class of fire involves flammable liquids like petrol?",
          options: [
            "Class A",
            "Class B",
            "Class C",
            "Class D"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "In the PASS method, what does the 'A' stand for?",
          options: [
            "Attack",
            "Aim",
            "Alert",
            "Assist"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "During evacuation, why should you avoid elevators?",
          options: [
            "Too slow",
            "Power may fail",
            "They're hot",
            "Smoke alarms deactivate them"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "In most fire-related deaths, what is the biggest killer?",
          options: [
            "Flames",
            "Smoke inhalation",
            "Heat burns",
            "Falling debris"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      videoId: 2,
      questions: [
        {
          id: 7,
          question: "The recommended compression rate per minute is:",
          options: [
            "60–80",
            "100–120",
            "140–160",
            "As fast as possible"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "If you are tired during CPR, you should stop until help arrives? (True or False)",
          options: [
            "True",
            "False"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "CPR should continue until:",
          options: [
            "The person starts breathing",
            "You get tired",
            "Ambulance arrives",
            "Both a & c"
          ],
          correctAnswer: 3
        },
        {
          id: 10,
          question: "You see someone collapse and they're not responding. What's the first thing you should do?",
          options: [
            "Start compressions",
            "Call for help and get an AED",
            "Check their ID card",
            "Wait for a doctor"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          question: "You're performing CPR and someone brings an AED. What should you do first?",
          options: [
            "Keep compressing until finished",
            "Turn on the AED and follow prompts",
            "Place pads anywhere on the body",
            "Wait for EMS"
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          question: "How many compressions to breaths in CPR?",
          options: [
            "10:1",
            "15:2",
            "30:2",
            "50:1"
          ],
          correctAnswer: 2
        }
      ]
    }
  ]
}
