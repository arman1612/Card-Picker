import React, { useState, useEffect } from "react";
import "./App.css";
import playsound from "./playsound";


const App = () => {
  const [showCards, setShowCards] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [cardOrder, setCardOrder] = useState([1, 2, 3, 4,5]);
  const [message,changemessage]=useState("Card Picker")
  const [bombdiffused,setbombdiffused]=useState(0)
  const [lost,setlost]=useState(false)
  const [counter,setcounter]=useState(5)
  

  useEffect(()=>{
     
    if(cardOrder.length===0){
      setcounter(5) 
      changemessage("You won")
    }
  },[cardOrder.length])
  

  useEffect(() => {
    if (showCards) {
      setCardOrder(shuffleArray([1, 2, 3, 4,5]));
    }
  }, [showCards]);

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleStartClick = () => {
    // Toggle the showCards state to control the visibility
    setShowCards(true);
    playsound()
    // Reset clickedCard when starting a new round
    setClickedCard(null);
  };

  const handleCardClick = (index) => {
    if (showCards) {
      // Update the state with the new image URL
      setClickedCard(index);



      if (index === 1 || index===5 || index===6) {                  //Cat 
        setcounter(counter-1)
        setTimeout(() => {
          changemessage("Congrats! You are on right path.......")
          const updatedOrder = cardOrder.filter((cardIndex) => cardIndex !== index );
          setCardOrder(updatedOrder);

          setTimeout(() => {
            if(cardOrder.length>1)  changemessage("Be the best you can be")
          }, 1000);

        }, 1000);
      }
      else if(index===2){                    
        
        if(bombdiffused===0){
          setcounter(5)
          
          changemessage("You lost")
          setTimeout(() => {
            setClickedCard(null)  
            setlost(!lost)    
            // setShowCards(false);  
          }, 1000);
        }
        else{
          setcounter(counter-1)
          setbombdiffused(0)
          changemessage("Your Good fortune comes here! Bomb diffused")
          setTimeout(() => {
            const updatedOrder = cardOrder.filter((cardIndex) => cardIndex !== 2);
            setCardOrder(updatedOrder);
            setbombdiffused(!bombdiffused)
          }, 1000);
        }
      } 
      else if(index===3){                               //Diffuse 
        setcounter(counter-1)                  
        changemessage("Lucky! You got a chance to diffuse the bomb")
        setTimeout(() => {
          const updatedOrder = cardOrder.filter((cardIndex) => cardIndex !== 3);
          setCardOrder(updatedOrder);
          setbombdiffused(bombdiffused+1)  
        },1000);
        setTimeout(() => {
          changemessage("Make the best out of it")
        },1000);
      }
      else if(index===4){                     ///Restart
        setcounter(5)   
        changemessage("Oops")
        setTimeout(() => {
          setTimeout(() => {
            changemessage("It’s time for a change")
          }, 800);  
          setCardOrder([1,2,3,5,6])
          setClickedCard(null)
          setbombdiffused(0)        
        }, 1000);
      }

    }
  };

  const handlerestart=()=>{
    setcounter(5) 
    changemessage("Card Picker")
    setShowCards(true); 
    setlost(false)
    setCardOrder([1,2,3,4,5])
    setClickedCard(null)
    setbombdiffused(0)   
    playsound()     
  }

  const handleleaderboard=()=>{

  }

  const getImageUrl = (index) => {
    // If the card is clicked during the game, show the changed image URL, else show the default
    return clickedCard === index ? `./images/${clickedCard}.jpg` : "./images/deck.jfif";
  };

  return (
    <div>

      

      {/* button   */}
      <div className="wrap">
        <button onClick={handleStartClick} className={`button ${showCards ? "hide" : ""} ${lost ? "hide" : ""} `}>
          Start
        </button>
      </div>


      {/* Reload */}
      <div className={`reload  ${showCards ? "" : "hide"} `} onClick={handlerestart}>
       <img src="./images/reload.jpeg" alt="Reload button"/>
      </div>

      {/* Leaderboard */}
      <div className={`Leaderboard ${showCards ? "" : "hide"} `} onClick={handleleaderboard} >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-houses-fill" viewBox="0 0 16 16">
          <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.5 2.5 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354z"/>
          <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708z"/>
        </svg>
      </div>

      {/* Counter */}

      <div className={`cnt ${showCards ? "" : "hide"}  `}>
        <h1>{counter}</h1>
      </div>


      {/* Cards */}
      <div className={` ${showCards ? "" : "hide"}   heading`}>
          <h1> {message} </h1>
      </div>

      <div className={`row row-cols-1 row-cols-md-5 g-4 gamecards ${showCards ? "" : "hide"}  ${lost ? "hide" : ""}`}>
        {cardOrder.map((index) => (
          <div key={index} className="col">
            <div className="card" onClick={() => handleCardClick(index)}>
              <img src={getImageUrl(index)} className="card-img-top imgstyle" alt={`Card ${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
