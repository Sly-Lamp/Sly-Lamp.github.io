//WEB TECH COURSEWORK - KENNETH BROWN - 40090523

//Code Adapted from https://www.youtube.com/watch?v=R1S_NhKkvGA

function startGame() { //Starts the game, sets state to empty, shows the first text node
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) { //Create the games narrative text
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  storyText.innerText = textNode.text
  while (options.firstChild) { //Only show the number of buttons needed at one time
    options.removeChild(options.firstChild)
  }

  function showOption(option) { //Show options on the screen
    return option.requiredState == null || option.requiredState(state) 
    //Certain options require a certain 'state' to be shown
  }

  function selectOption(option) { //Links the option buttons to the next text node.
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) { //Restart game when text node value is below zero.
      return startGame()
    }
    state = Object.assign(state, option.setState) //Set custom player 'state' options.
    showTextNode(nextTextNodeId)
  }

  textNode.options.forEach(option => { //Create the buttons for the options
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      options.appendChild(button)
    }
  })
}

let state = {}

const storyText = document.getElementById('text')
const options = document.getElementById('options')
const textNodes = [
  {
    id: 1,
    text: 'The rain is cascading down in SHADE CITY... \n\n You are standing outside the SHADY-HQ building. The main entrance has one security guard posted who is currently engrossed in the latest issue of \'The Shady Reporter\'. You are unsure of wether he is one of the Fodder AI or a human. There is an alleyway on the east side of the building and a fire escape which leads to the second floor on the west side. How are you going to infilrate the building? You throw the burning embers of your cigarette butt into the gutter and make your decision.',
    options: [
      {
        text: 'Approach the Guard, ready for anything.',
        setState: { guardOK: true, ammoFull: true, ammo3Quarter: false },
        nextText: 2
      },
      {
        text: 'Try to sneak past the Guard.',
        setState: { guardOK: true, ammoFull: true, ammo3Quarter: false },
        nextText: 3
      },
      {
        text: 'Head towards the alleyway on the east side of the building.',
        setState: { guardOK: true, ammoFull: true, ammo3Quarter: false },
        nextText: 4
      },
      {
        text: 'Head towards the fire escape on the west side of the building.',
        setState: { guardOK: true, ammoFull: true, ammo3Quarter: false },
        nextText: 5
      }
    ]
  },
  {
    id: 2,
    text: 'You approach the guard and introduce yourself. He does not respond, other than casting you a suspicious look. His hand moves slowly down to his hip where you can see a HUGE revolver is holstered. After a long, awkward silence he finally speaks, \"TORBO DANDRIO? The hell kinda name is that? What do you want BUDDY?! This place is off-limits, I got enough crazy in there without you bringing me more out here!\"',
    options: [
      {
        text: "I'm here to take down the mad doctor. Let me in right away!\"",
        nextText: 6
      },
      {
        text: "\"What\'s the situation inside the building? Can I expect heavy resistance?\"",
        nextText: 7
      },
      {
        text: "Pull out your SHADY issue pistol and start BLASTING!!!",
        setState: { ammoFull: false, ammo3Quarter: true, alarm: true, guardKO: true, guardOK: false },
        nextText: 11
      },
      {
        text: "Punch him in the face",
        nextText: 9
      }
    ]
  },
  {
    id: 3,
    text: 'You creep closer,  just outside the guards line of sight, approaching the entrance cautiously. Upon closer inspection you realise there is going to be no way through the main entrance without either alerting the guard or taking him out. What do you do?',
    options: [
      {
        text: 'Grab the guard from behind and choke him out silently.',
        setState: { guardKO: true, guardOK: false, stealth: true },
        nextText: 8
      },
      {
        text: 'Re-evaluate the situation and speak to the guard. Approach confidently, ready for anything.',
        nextText: 2
      },
      {
        text: 'Pull out your SHADY issue SOCOM pistol and start BLASTING!!!',
        setState: { ammoFull: false, ammo3Quarter: true, alarm: true, guardKO: true, guardOK: false },
        nextText: 11
      },
      {
        text: "Walk up and punch him in the face",
        nextText: 9
      }
    ]
  },
  {
    id: 4,
    text: 'In the alleyway you find a large empty dumpster and not much else. On the second floor of the building you notice a window has been left open. What do you do?',
    options: [
      {
        text: 'Push the dumpster underneath window and climb through. Proceed to Level 2.',
        setstate: { allAlive: true },
        nextText: 21
      },
      {
        text: 'Return to the front of the building.',
        nextText: 1
      },
      {
        text: 'Head round to the fire escape on the west side of the building.',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'You head around to the west side of the building and climb the fire escape. Once you reach the second floor you realise there is no way into the building from the outside, all of the windows are made from extra thick bulletproof glass and are tightly sealed shut. What do you want to do?',
    options: [
      {
        text: 'Look through the Window.',
        nextText: 10
      },
      {
        text: 'Head back down to the main entrace.',
        requiredState: (currentState) => currentState.guardOK,
        nextText: 1
      },
      {
        text: 'Head back down to the street and proceed to Level 1.',
        requiredState: (currentState) => currentState.stealth,
        nextText: 12
      },
      {
        text: 'Head back down to the street and proceed to Level 1.',
        requiredState: (currentState) => currentState.alarm,
        nextText: 13
      },
      {
        text: 'Head towards the alleyway on the east side of the building.',
        requiredState: (currentState) => currentState.binFull,
        nextText: 8
      },
      {
        text: 'Head towards the alleyway on the east side of the building.',
        requiredState: (currentState) => currentState.guardOK,
        nextText: 4
      }
    ]
  },
  {
    id: 6,
    text: '\"Are ya now?\" he asks, not sounding particularly interested. His hand moves back away from his holstered gun. \"Rather YOU than ME BUDDY! It\'s a DAMNED NUTHOUSE in there, even at the best of times, and these certainly ain\'t the best of times for our pals at the SHADY company! But I suppose you already knew that didn\'t ya?\" You don\'t much care for his tone but he also seems far too ineffecient at his job to be a machine.',
    options: [
      {
        text: '\"Move aside you babbling peasant!\" Shove him aside and storm your way the building!',
        nextText: 9
      },
      {
        text: '\"What level of resistance can I expect to meet inside the building?\"',
        nextText: 7
      },
      {
        text: 'Pull out your SHADY issue pistol and start BLASTING!!!',
        setState: { ammoFull: false, ammo3Quarter: true, alarm: true, guardKO: true, guardOK: false  },
        nextText: 11
      },
      {
        text: 'Punch him straight in the face.',
        nextText: 9
      }
    ]
  },
  {
    id: 7,
    text: '\"Guess you\'re the chump they sent to clean up this whole mess then huh!?\" he asks loudly. Clearly not expecting an answer to this, he continues,\"Alls I knows is that each of the FIVE floors in this place are guarded by at LEAST one of those Fodder freaks! Some of em don\'t seem to be attacking on sight and some will tear you apart for just existing in the same room. Hard to say what\'s going on in the mind of a machine! It\'s all just nuts and bolts to me BUDDY! Guess it\'s YOUR job to work that one out for yourself! Well, don\'t let me keep ya waiting! This is your show now.\" He steps aside and you walk through the main entrance, inside SHADY HQ.',
    options: [
      {
        text: 'Continue to Level 1',
        nextText: 12
      },
      {
        text: 'Head towards the alleyway on the east side of the building.',
        nextText: 4
      },
      {
        text: 'Head towards the fire escape on the west side of the building.',
        nextText: 5
      },
      {
        text: 'Punch him, punch him NOW!',
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'You drag the guard\'s body into the alleyway on the east side of the building and throw him in a nearby dumpster. After doing this you quickly notice an open window on the second floor. Had the dumpster not now contained a person, you might have been able to push it underneath to gain entry. Oh well! You return to the front of the building.',
    options: [
      {
        text: 'Enter SHADY HQ and Proceed to Level 1.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { binFull: true },
        nextText: 12
      },
      {
        text: 'Enter SHADY HQ and Proceed to Level 1.',
        requiredState: (currentState) => currentState.alarm,
        setState: { binFull: true },
        nextText: 13
      },
      {
        text: 'Inspect the west side of the building.',
        setState: { binFull: true },
        nextText: 5
      }
    ]
  },
  {
    id: 9,
    text: 'This guard is much quicker than you first anticipated. In a flash, his massive fingers wrap around your wrist and your arm is yanked upwards painfully, behind your back. The next thing you see is the filthy pavement as you are slammed face-first straight into it, with predjudice. The guard then enquires loudly, \"What the hell do you think you\'re doing BUDDY!?\" You have failed the mission.',
    options: [
      {
        text: 'Don\'t be so RUDE! Start over and work on your manners!',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'As you peer through the window you see a computer terminal has been left on. On the screen you are able to make out the words F4-EXPERIMENTAL-WEAPON: 01101001.',
    options: [
      {
        text: 'Return to the street',
        requiredState: (currentState) => currentState.guardOK,
        nextText: 1
      },      
      {
        text: 'Return to the street and proceed to Level 1.',
        requiredState: (currentState) => currentState.alarm,
        nextText: 13
      },
      {
        text: 'Return to the street and proceed to Level 1.',
        requiredState: (currentState) => currentState.stealth,
        nextText: 12
      }
    ]
  },
  {
    id: 11,
    text: 'The guard wasn\'t expecting this  and doesn\'t stand a chance, even as he tries to reach for his weapon. You fire 3 times, using a quarter of your current ammo. You immediately realise your mistake when you see the blood he goes down straight away... he was a human, just doing his job. Your handlers at the SHADY CO are not likely to be pleased. Deep from inside the building you hear an alarm going off, likely in response to the gunfire. How are you going to proceed?',
    options: [
      {
        text: 'Head towards the alleyway on the east side of the building.',
        nextText: 8
      },
      {
        text: 'Head towards the fire escape on the west side of the building.',
        nextText: 5
      },
      {
        text: 'Proceed inside to Level 1.',
        nextText: 13
      } 
    ]
  },
  {
    id: 12,
    text: 'You are in the lobby area of SHADY HQ. A gleaming testament to the power of the mighty tech giant. This place reminds you more of an opulent, alien palace than any kind of place of business. In the center of the room is a reception desk, behind this is a chrome staircase which leads to the second floor. Along the left side of the room you see an elevator. How will you proceed?',
    options: [
      {
        text: 'Walk over to the reception desk.',
        setState: { fodderAlive: true },
        nextText: 14
      },
      {
        text: 'Check out the elevator.',
        setState: { fodderAlive: true },
        nextText: 17
      },
      {
        text: 'Head straight for the stairs.',
        setState: { fodderAlive: true },
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: 'You are in the lobby area of SHADY HQ. A gleaming testament to the power of the mighty tech giant. This place reminds you more of an opulent, alien palace than any kind of place of business. The alarms are blaring loudly whilst a robotic female voice is delcaring \"SECURITY BREACH\" on a constant loop. In the center of the room is a reception desk, behind it is a chrome staircase which leads to the second floor. Along the left side of the room you see an elevator. How will you proceed?',
    options: [
      {
        text: 'Walk over to the reception desk.',
        setState: { fodderAlive: true },
        nextText: 15
      },
      {
        text: 'Check out the elevator.',
        setState: { fodderAlive: true },
        nextText: 15
      },
      {
        text: 'Head straight for the stairs.',
        setState: { fodderAlive: true },
        nextText: 15
      }
    ]
  },
  {
    id: 14,
    text: 'As you\'re approaching the reception desk you realise you can hear a crunching, mechanical noise coming from just behind it.',
    options: [
      {
        text: 'Approach carefully.',
        nextText: 16
      },
      {
        text: 'Ignore the noise and check out the reception desk.',
        nextText: 15
      }
    ]
  },
  {
    id: 15,
    text: 'A tall, pale form lunges for you. It is covered in blood and appears to have been wearing a SHADY CO uniform, which is in tatters and hangs from it\'s weird frame like shredded bat wings. It\'s face has been damaged and you can see exposed wires and circuitry underneath a layer of white, synthetic flesh. It is one of the Fodder. You have lost the advantage in this siutation by not noticing it earlier. How will you proceed?',
    options: [
      {
        text: 'Dodge the Fodder?',
        nextText: 20
      },
      {
        text: 'Make a break for the stairs.',
        nextText: 20
      },
      {
        text: 'Shoot the Fodder?',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true, fodderAlive: false, fodderDead: true, alarm: true },
        nextText: 19
      },
      {
        text: 'Shoot the Fodder?',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammo3Quarter: true, fodderAlive: false, fodderDead: true, alarm: true },
        nextText: 19
      },
    ]
  },
  {
    id: 16,
    text: 'You lean over and see one of the Fodder hunched over the lifeless body of one of the SHADY reception staff, seemingly trying to reattach the poors souls nose to their face. It turns it\'s head slowly around to meet your gaze. It\'s face has been damaged and you can see exposed wires and circuitry underneath a layer of white, synthetic flesh.',
    options: [
      {
        text: 'Shoot it.',
        setState: { ammoFull: false, ammo3Quarter: true, fodderAlive: false, fodderDead: true, alarm: true },
        nextText: 19
      },
      {
        text: 'Attempt to speak to it and say \"Hey.\"',
        nextText: 18
      }
    ]
  },
  {
    id: 17,
    text: 'Above the elevator a glowing LCD screen displays the words \"3F - STAFF CANTEEN - (*CURRENTLY NOT RESPONDING*). Nothing happens when you try pressing the button. It appears to be stuck on the third floor of the building. How will you proceed?',
    options: [
      {
        text: 'Walk over to the reception desk.',
        requiredState: (currentState) => currentState.fodderAlive,
        nextText: 14
      },
      {
        text: 'Head straight for the stairs.',
        requiredState: (currentState) => currentState.fodderAlive,
        nextText: 15
      },
      {
        text: 'Head up the stairs to Level 2.',
        requiredState: (currentState) => currentState.fodderDead,
        setState: { allAlive: true },
        nextText: 21
      },
      {
        text: 'Turn off the alarm at the desk and proceed to up to Level 2.',
        requiredState: (currentState) => currentState.alarm,
        setState: { alarm: false, allAlive: true },
        nextText: 21
      }
    ]
  },
  {
    id: 18,
    text: 'It responds with a series of illegible clicks and beeps, clearly malfunctioning. It doesn\'t appear to be be hostile towards you at the moment. You might be able to get past it if you don\'t make any sudden movements. How should you proceed?',
    options: [
      {
        text: 'Shoot it.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammo3Quarter: true, fodderAlive: false, fodderDead: true, alarm: true },
        nextText: 19
      },
      {
        text: 'Move towards the stairs carefully and proceed up to Level 2.',
        setState: { allAlive: true },
        nextText: 21
      },
    ]
  },
  {
    id: 19,
    text: 'Your bullets rip through the Fodders head and it goes down, twitching and clicking until it finally stops moving. A pool of transluscent liquid begins to quickly form underneath it. The room is now clear of enemies. How will you proceed?',
    options: [
      {
        text: 'Turn off the alarm at the desk and proceed to up to Level 2.',
        requiredState: (currentState) => currentState.alarm,
        setState: { alarm: false, allAlive: true },
        nextText: 21
      },
      {
        text: 'Check out the elevator.',
        nextText: 17
      },
      {
        text: 'Move towards the stairs and proceed up to Level 2.',
        setState: { allAlive: true },
        nextText: 22
      },
    ]
  },
  {
    id: 20,
    text: 'The Fodder grabs you! It\'s strength is unmatchable and you a torn apart limb from limb. You have failed the mission!',
    options: [
      {
        text: 'Try that again?',
        nextText: -1
      },
    ]
  },
  {
    id: 21,
    text: 'You arrive on the second floor of the building. Rows of shiny office cubicles line the walls. A sterile looking environment to say the least. All of a sudden you notice two Fodder are roaming this floor. Both are wearing SHADY-SEC uniforms and look like they could be tough! At the far side of the room you can see a large pool of water where a cooler has tipped over. Could be slippy you weren\'t to notice it! What will you do next?',
    options: [
      {
        text: 'Hide in one of the cubicles and wait for the Fodder to pass.',
        nextText: 23
      },
      {
        text: 'Get their attention and try to lead them to the pool of water.',
        setState: { water: true },
        nextText: 24
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammo3Quarter: true, firstfod: true, allAlive: false },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true, firstfod: true, allAlive: false },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true, firstfod: true, allAlive: false },
        nextText: 25
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoHalf: true, ammoFull: false },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoEmpty: true, ammoHalf: false },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammo1Quarter: true },
        nextText: 26
      },
    ]
  },
  {
    id: 22,
    text: 'You arrive on the second floor of the building but you\'ve forgotten to switch of the alarm at the reception desk! You are immediately surrounded by two hostile Fodder! Both are wearing SHADY-SEC uniforms and look like they could be tough!What will you do next?',
    options: [
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammo1Quarter: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammoEmpty: true },
        nextText: 26
      },
    ]
  },
  {
    id: 23,
    text: 'You run into one of the nearby office cubicles and hunker down out of sight. You can hear the Fods conversing in a series of beeps and whistles, shuffling quickly along the length of the floor searching for intruders. You realise you are not alone in the cubicle. A SHADY employee lies slumped underneath the desk, his head crushed. Motivational posters line the walls of his cubicle, encouraging him to work harder to achieve his goals. This guy probably should have taken more days off. The shuffling sounds grow quieter and you think it might now be safe to head out. How do you proceed?',
    options: [
      {
        text: 'Remain a little longer, they could still be waiting.',
        nextText: 28
      },
      {
        text: 'Head out and move towards the overturned cooler.',
        setState: { water: true },
        nextText: 24
      },
    ]
  },
  {
    id: 24,
    text: 'You run straight towards the overturned water cooler and both of the Fods immediately give chase! Carefully managing not to slip yourself, you run straight across and spin around just in time to see the first of the maniacal AI flying commically into the air and landing hard on his back. The second Fodder see\'s this and does not follow suite. Next to you there is a power brick, connecting to many of the office computers. How should you proceed next?',
    options: [
      {
        text: 'Throw the power brick at the Fod on the floor.',
        setState: { allAlive: false, firstfod: true },
        nextText: 29
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammo3Quarter: true, firstfod: true, allAlive: false },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true, firstfod: true, allAlive: false },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true, firstfod: true, allAlive: false },
        nextText: 25
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammoHalf: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammo1Quarter: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammoEmpty: true },
        nextText: 26
      },
      {
        text: 'Make a run for the nearby stairs.',
        setState: { wounded: true },
        nextText: 27
      },
    ]
  },
  {
    id: 25,
    text: 'You start blasting and the first of the Fods hits the deck for good! At least the odds are even now! What are you going to do next?',
    options: [
      {
        text: 'Throw the power brick at the Fod on the floor.',
        requiredState: (currentState) => currentState.water,
        setState: { allAlive: false, firstfod: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammo1Quarter,
        setState: { ammo1Quarter: false, ammoEmpty: true },
        nextText: 30
      },
      {
        text: 'Bash it\'s head in!',
        setState: { wounded: true },
        nextText: 27
      },
      {
        text: 'Make a run for the nearby stairs and proceed to Level 3?',
        nextText: 31
      }
    ]
  },
  {
    id: 26,
    text: 'You are overwhelmed by the inhuman strength of the Fodder! You are thrown around the office like a rag doll before being thrown overheard, straight out the window. This mission is offically over. Do you want to try again?',
    options: [
      {
        text: 'Yes',
        nextText: -1
      },
      {
        text: 'Yes Please',
        nextText: -1
      }
    ]
  },
  {
    id: 27,
    text: 'You are immediately grabbed and thrown painfully across the room. As you try to stand up it is clear that one or more bones might be broken. Damn! Just have to carry on like this now and finish the mission with a slight handicap. How will you proceed?',
    options: [
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.allAlive,
        setState: { ammoFull: false, ammo3Quarter: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter && currentState.allAlive,
        setState: { ammo3Quarter: false, ammoHalf: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf && currentState.allAlive,
        setState: { ammoHalf: false, ammo1Quarter: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull && currentState.allAlive,
        setState: { ammoFull: false, ammoHalf: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter && currentState.allAlive,
        setState: { ammo3Quarter: false, ammo1Quarter: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf && currentState.allAlive,
        setState: { ammoHalf: false, ammoEmpty: true },
        nextText: 26
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.firstfod && currentState.ammoFull,
        setState: { ammoFull: false, ammo3Quarter: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.firstfod && currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.firstfod && currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.firstfod && currentState.ammo1Quarter,
        setState: { ammo1Quarter: false, ammoEmpty: true },
        nextText: 30
      },
      {
        text: 'Make a run for the nearby stairs and proceed to Level 3?',
        requiredState: (currentState) => currentState.firstfod,
        nextText: 31
      }
    ]
  },
  {
    id: 28,
    text: 'You wait another minute and then slowly lean out to check the coast is clear. It is! You managed to avoid any confrontation with the enemy! You can see the staircase that leads to Level 3 on the far side of the room. You hear noises coming from the direction the Fodder went in. They\'re coming back! You must decide what to do next quickly!',
    options: [
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammo3Quarter: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot one of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true, firstfod: true },
        nextText: 25
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammoHalf: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammo1Quarter: true },
        nextText: 26
      },
      {
        text: 'Shoot both of the Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammoEmpty: true },
        nextText: 26
      },
      {
        text: 'Make a run for the nearby stairs and proceed to Level 3?',
        nextText: 31
      },
      {
        text: 'Run for the water cooler and create a trap?',
        setState: { water: true },
        nextText: 24
      }
    ]
  },
  {
    id: 29,
    text: 'The water immediately crackles and sparks as electrcity runs through the floored Fodder. As it twitches maniacally you can smell oil and burning rubber. The other Fod steps around its quickly burning companion and moves to rush you. What should you do?',
    options: [
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammoFull,
        setState: { ammoFull: false, ammo3Quarter: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setState: { ammo3Quarter: false, ammoHalf: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammoHalf,
        setState: { ammoHalf: false, ammo1Quarter: true },
        nextText: 30
      },
      {
        text: 'Shoot the other Fodder.',
        requiredState: (currentState) => currentState.ammo1Quarter,
        setState: { ammo1Quarter: false, ammoEmpty: true },
        nextText: 30
      },
      {
        text: 'Bash it\'s head in!',
        setState: { wounded: true },
        nextText: 27
      },
      {
        text: 'Make a run for the nearby stairs and proceed to Level 3?',
        nextText: 31
      }
    ]
  },
  {
    id: 30,
    text: 'As the second Fodder drops dead you see something large falling from its security jacket to the ground. You walk over and pick it up. Looks like a battery for something large. Might come in useful soon! You take it with you and continue your mission.',
    options: [
      {
        text: 'Continue up the stairs to Level 3.',
        setState: { battery: true },
        nextText: 31
      }
    ]
  },  
  {
    id: 31,
    text: 'You arrive on the third floor. The stairs continue up to the fourth floor but there is also a door leading to the rest of the floor? How will you proceed?',
    options: [
      {
        text: 'Continue up to Level 4.',
        nextText: 32
      },
      {
        text: 'Explore Level 3.',
        nextText: 33
      },
    ]
  },
  {
    id: 32,
    text: 'You reach the fourth floor finally. You are out of breath, worn-out from the ordeal so far. But you must complete the mission! Once again there is a staircase leading directly up to the fifth and FINAL level. This is where you must face the MAD DOCTOR and his LATEST CREATION! You are unsure if you are ready for the challenge. How much ammo do you have left? There is a large steel door in front of you marked \'!AUTHORISED MEMBERS OF STAFF ONLY! F4 - EXPERIMENTAL WEAPONS DIVISION\'. How are you going to proceed?',
    options: [
      {
        text: 'Continue up to Level 5.',
        nextText: 34
      },
      {
        text: 'Inspect the door.',
        nextText: 35
      },
    ]
  },
  {
    id: 33,
    text: 'The third floor is a wreck. Desks and computers lie smashed across the floor. Five bodies are also present, four human security guards and one Fodder. Looks like the final guard got a good shot in just before he died of his wounds, hitting the Fod straight through the eye and turning most it\'s head into synthetic confetti. Great job. You are about to return to the landing to continue up the stairs when you notice that the elevator has stopped on this floor and the doors are open. Upon closer inspection you see that the battery which powers it has been removed. You might be able to get it going again if you found it! How will you proceed?',
    options: [
      {
        text: 'Return to the stairs.',
        nextText: 31
      },
      {
        text: 'Put the battery back in the elevator.',
        requiredState: (currentState) => currentState.battery,
        nextText: 36
      },
    ]
  },
  {
    id: 34,
    text: 'You arrive on Level 5. This is the final challenge! Doctor Redfield Herring waits for you on the other side of this door with his FINAL CREATION. Are you sure you want to continue?',
    options: [
      {
        text: 'I\'m ready!',
        setState: { weaponX: false },
        nextText: 37
      },
      {
        text: 'I\'m not ready! Let\'s go back!',
        nextText: 38
      },
      {
        text: 'Lock and Load. Prime the SECRET WEAPON!',
        requiredState: (currentState) => currentState.weaponX,
        nextText: 37
      }
    ]
  },
  {
    id: 35,
    text: 'The door is locked tight. To the right hand side is a key-code panel with only the digits 0 and 1. If you had the code you might be able to get in! What will you do?',
    options: [
      {
        text: 'Enter Code.',
        nextText: 39
      },
      {
        text: 'Leave it alone.',
        nextText: 32
      },
    ]
  },
  {
    id: 36,
    text: 'The lights spring back to life and a pleasing elevator tune rings out. You now have access to all five floors of the building! From here you can choose to revisit any of the previous floors or even move straight up to the FINAL CHALLENGE on floor 5! What are you going to do?',
    options: [
      {
        text: 'Head Back to Level 3',
        nextText: 33
      },
      {
        text: 'LEVEL 1',
        nextText: 12
      },
      {
        text: 'LEVEL 2',
        nextText: 21
      },
      {
        text: 'LEVEL 4',
        nextText: 32
      },
      {
        text: 'LEVEL 5',
        nextText: 34
      },
    ]
  },
  {
    id: 37,
    text: 'The Doctor is waiting for you. He is standing with his back to you, tinkering with some massive machine that is obscured from your vision. \"Torbo Dandrio is it?\" he asks. \"Funny name, have you ever tried rearranging the letters to see what else it might spell? I don\'t imagine you would have had time for such games given how busy you\'ve been destroying my creations. No matter, I\'m certain you\'ll have plenty of time to think it over very soon.\" Something about his voice makes you deeply uncomfortable. It is eerily familiar to you, although this is the first time you\'ve met Doctor Herring.',
    options: [
      {
        text: 'Blast him with the SECRET WEAPON.',
        requiredState: (currentState) => currentState.weaponX,
        nextText: 42
      },
      {
        text: 'Shoot at him.',
        requiredState: (currentState) => currentState.ammoFull,
        setstate: { ammoFull: false, ammo3Quarter: true },
        nextText: 43
      },
      {
        text: 'Shoot at him.',
        requiredState: (currentState) => currentState.ammo3Quarter,
        setstate: { ammo3Quarter: false, ammoHalf: true },
        nextText: 43
      },
      {
        text: 'Shoot at him.',
        requiredState: (currentState) => currentState.ammoHalf,
        setstate: { ammoHalf: false, ammo1Quarter: true },
        nextText: 43
      },
      {
        text: 'Shoot at him.',
        requiredState: (currentState) => currentState.ammo1Quarter,
        setstate: { ammo1Quarter: false, ammoEmpty: true },
        nextText: 43
      },
      {
        text: 'Shoot at him.',
        requiredState: (currentState) => currentState.ammoEmpty,
        nextText: 44
      },
      {
        text: 'Keep Listening',
        nextText: 46
      },
    ]
  },
  {
    id: 38,
    text: 'MISSION FAILED!',
    options: [
      {
        text: 'Too scary',
        nextText: -1
      },
    ]
  },
  {
    id: 39,
    text: 'Enter the correct code or a security alarm will call all the Fodder to this floor.',
    options: [
      {
        text: '00101101',
        nextText: 40
      },
      {
        text: '00011011',
        nextText: 40
      },
      {
        text: '01101001',
        nextText: 41
      },
      {
        text: '11010110',
        nextText: 40
      },
    ]
  },
  {
    id: 40,
    text: 'Incorrect! You are surrounded immediately and don\'t stand a chance against this many Fodder. The mission is over!',
    options: [
      {
        text: 'Start Again',
        nextText: -1
      }
    ]
  },
  {
    id: 41,
    text: 'Correct! The door slides open. Inside you find a weapons lab full of space-age looking technology. Most of it is beyond your comprehension but something of interest grabs your eye in the center of the room. You see what is clearly a large gun, though you\'ve never encountered one like this before. It looks like something you might want to take with you if you ever went on holiday to LV-426. This will do nicely against the doctors FINAL CREATION. You grab it and head back out.',
    options: [
      {
        text: 'Continue to Level 5',
        setState: { weaponX: true },
        nextText: 34
      }
    ]
  },
  {
    id: 42,
    text: 'You end his speech swiftly. You have no time for plot twists. The weapon sends a massive laser across the room creating a massive hole in the wall where the good doctor had just been standing. He had no time to show you his LATEST CREATION.',
    options: [
      {
        text: 'Continue.',
        nextText: 45
      },
    ]
  },
  {
    id: 43,
    text: 'You try to fire your weapon but find yourself unable to do so. Your finger hovers above the trigger but despite your best efforts you simply cannot squeeze it.\"Having a bit of trouble there?\" the doctor asks. You notice a small remote control in his hand which is flashing eratically. \"I can\'t just allow my LATEST CREATION to go and shoot me now, can I?\" He presses another button and you lose control of your legs and topple over onto the cold lab floor!',
    options: [
      {
        text: 'Keep Listening.',
        setState: { legs: false },
        nextText: 46
      },
    ]
  },
  {
    id: 44,
    text: 'You have no more ammo left. You have no choice but to listen to the Doctors speech.\"Having a bit of trouble there?\" the doctor asks. You notice a small remote control in his hand which is flashing eratically. \"I can\'t just allow my LATEST CREATION to go and shoot me now, can I?\" He presses another button and you lose control of your legs and topple over onto the cold lab floor!',
    options: [
      {
        text: 'Keep Listening.',
        setState: { legs: false },
        nextText: 46
      },
    ]
  },
  {
    id: 45,
    text: 'Congratulations! You have reached the end of the game! This is a work in progress and new systems/mechanics will be added over time. Play again to see if you can find a different ending by clicking the restart button below!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 46,
    text: '\"YOU are my latest creation Torbo Dandrio. This whole operation has been a simulation designed to test your abilities against my previous work and you have performed spectacularly by making it this far! Now I believe it is time to put you back in your box and make some adjustments!\" He presses a large red button on the remote and everything goes dark.',
    options: [
      {
        text: 'Continue.',
        nextText: 45
      },
    ]
  },
]

startGame()