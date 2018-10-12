//Create the map
var map = ["Dragon's Secret room.", "Surprise ! now look for a Treasure box.", " A Wall.", "This room has a way to the teasures","Main door to the house.","There is a Key for the Treasure Box", "Do you see Purple Flowers? ", "A door to the treasure.", " Ground level of the house"];

var mapLocation = 4;    //Set the player's start location

var map2 = [0,1,2,3,4,5,6,7,8,];    //Create the map 2
var map2Location = 4;               //Set the player's start location in map 2

//Set the images
var images = ["Witch's_House.png", "thHouseWithGold.jpg","thGoldWall.jpg", "Madeleine's_Shop.png","thHouse.jpg", "thHouseWGold.jpg", "c7bce.jpg", "thLockedDoor.jpg", "ground_level.jpg" ];
    
let blockedPathMessages = [];                               //Set the blocked path messages
blockedPathMessages[0] = "if you move right, there is a surprise for you";
blockedPathMessages[1] = "Cant do that for you, Sorry";
blockedPathMessages[2] = "No Outlet ! Please go back.";
blockedPathMessages[3] = "Move forward to look for your treasures";
blockedPathMessages[4] = "you should keep trying ";
blockedPathMessages[5] = "No outlet this way.";
blockedPathMessages[6] = " Warning! you can not move left or go back. Please move forward or turn Right.";
blockedPathMessages[7] = "The door is locked, please find all the items to open it.";
blockedPathMessages[8] = "look for ways to get out"; 
  

//var mapNumbers = [8];    //numbers for map on output page. 
    
var items = ["treasure box", "key", "flowers"];    //Create the objects and set their locations
var itemLocations = [1,5,6];
                                                 //An array to store what the player is carrying

var playersInput = "";                              //Initialize the player's input

var gameMessage = "";                                 //Initialize the gameMessage

var actionsIKnow = ["north", "east", "south", "west", "take", "use", "drop", "enter"]; //Create an array of actions the game understands
    
var action = "";                                         //variable to store the current action


var itemsIKnow = ["treasure box", "key", "flowers"];     //An array of items the game understands 
var item = "";                                          // a variable to store the current item


var image = document.querySelector("img");            //The img element

var historyMain = document.getElementById("twoOuPut"); //get html div elements
    
var history1 = "";                                      // a variable to store the history.
 
//var itemDroped = false;                                      // a variable to check if the door is locked
var backpack = []; 
    
//var oldLocation = mapLocation;                           // a variable to check player's last location.
       
var output = document.querySelector("#output");         //The output field
var input = document.querySelector("#input");           //The input field
var outputRight = document.getElementById("p1");         //The input field

var resumebtn = document.getElementById("btn3");            //The resume button
    
var savebtn = document.getElementById("savebtn");            //The save button
    
var button = document.querySelector("button");               // //The main button
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
    
//************************************//
render();                                               //Dispay the player's location

function clickHandler()                                 // play game.
{
  playGame();
}

function playGame()
{
  
  playersInput = input.value;
  playersInput = playersInput.toLowerCase();            //Get the player's input and convert it to lowercase
  gameMessage = "";                                     //Reset these variables from the previous turn
  action = "";

  for(i = 0; i < actionsIKnow.length; i++)                //Figure out the player's action
  {
    if(playersInput.indexOf(actionsIKnow[i]) !== -1)
    {
      action = actionsIKnow[i];
        history1 = history1 + playersInput + '<br>';
        historyMain.innerHTML = history1;
      console.log("player's action: " + action);
      break;
    }
  }
//*************************************************//
 
  for(i = 0; i < itemsIKnow.length; i++)                     //Figure out the item the player wants
  {
    if(playersInput.indexOf(itemsIKnow[i]) !== -1)
    {
      item = itemsIKnow[i];
      console.log("player's item: " + item);
    }
  }
 //****************************************************//   
  
            switch(action)
             {   case "north": 
                  if(mapLocation >= 3)
                  {
                    mapLocation -= 3;
                    map2Location -= 3;
                  }
                  else
                  {
                    gameMessage = blockedPathMessages[mapLocation];
                  }
                  break;

                case "east":
                    if(mapLocation % 3 != 2)
                  {
                    mapLocation += 1;
                      map2Location +=1;
                  }
                  else
                  {
                    gameMessage = blockedPathMessages[mapLocation];
                  }
                  break;

                case "south":
                  if(mapLocation < 6)
                  { 
                      mapLocation += 3;
                      map2Location +=3;
                        
                  }      
                 else{
                    gameMessage = gameMessage = blockedPathMessages[mapLocation];
                     }
                              

                  break;

                case "west":
                  if(mapLocation % 3 != 0)
                  {
                    mapLocation -= 1;
                      map2Location -=1;
                  }
                  else
                  {
                    gameMessage = blockedPathMessages[mapLocation];
                  }
                  break;

                 case "take":
                  takeItem();
                      break;

                 case "drop":
                      dropItem();
                      break;

                  case "use":
                      useItem();
                      break;

                  default:
                    gameMessage = "I don't understand that.";
              }
          
         render();         //Render the game
    } 

//**************************************************************************//

function takeItem()
{
  let itemIndexNumber = items.indexOf(item);            //Find the index number of the item in the items array

  if(itemIndexNumber !== -1                             //Does the item exist in the game world is it at the player's current location?
  && itemLocations[itemIndexNumber] === mapLocation)
  {
    gameMessage = "You take the " + item + ".";
      
    backpack.push(item);                        //Add the item to the player's backpack

    items.splice(itemIndexNumber, 1);           //Remove the item from the game world
    itemLocations.splice(itemIndexNumber, 1); 
      useItem();
      
    console.log("World items: " + items);          //Display in the console for testing
    console.log("backpack items: " + backpack);
  }
  else
  {
    gameMessage = "You can't do that.";             //Message if you try and take an item that isn't in the current location
  }
}
//***************************************************************************//
    
function dropItem()
{
  if(backpack.length !== 0)                          //Try to drop the item only if the backpack isn't empty
  {
    var backpackIndexNumber = backpack.indexOf(item);    //Find the item's array index number in the backpack

    if(backpackIndexNumber !== -1)                      //The item is in the backpack if backpackIndex number isn't -1
    {
   	 gameMessage = "You drop the " + item + ".";        //Tell the player that the item has been dropped

     items.push(backpack[backpackIndexNumber]);          //Add the item from the backpack to the game world
     itemLocations.push(mapLocation);
        
     backpack.splice(backpackIndexNumber, 1);             //Remove the item from the player's backpack
    }
    else
    {
      gameMessage = "You can't do that.";                  //Message if the player tries to drop something that's not in the backpack
    }
  }
  else
  {
    gameMessage = "You're not carrying anything.";           //Message if the backpack is empty
  }
}
//**********************************************************************//
    
function useItem()
{                                                       //1. Find out if the item is in the backpack

  let backpackIndexNumber = backpack.indexOf(item);     //Find the item's array index number in the backpack
                                                          //If the index number is -1, then it isn't in the backpack.
   if(backpackIndexNumber === -1)                          //Tell the player that he or she isn't carrying it.
  {
    gameMessage = "You're not carrying it.";
  }

  if(backpack.length === 0)                         //If there are no items in the backpack, then tell the player the backpack is empty
  {
    gameMessage += " Your backpack is empty";
  }

  if(backpackIndexNumber !== -1)                        //2. If the item is found in the backpack figure out what to do with it
  {
    switch(item)
    {
	   
	    case "flowers":
	      if(mapLocation === 6)
        {
          gameMessage = "Good job! You found the flowers. now look for other items ";
          gameMessage += "if you have all the items, go open the door.";
          //gameMessage += "you drop the flowers and get the key.";  
//          backpack.splice(backpackIndexNumber, 6); 
//         items.push("key");
//         itemLocations.push(mapLocation);
        }
        else
        {
          gameMessage = "You are taking the flowers but they have no fragrance.";
        }
	      break;

	    case "key":
	      if(mapLocation === 5)
	      {
	         gameMessage = "Great! you found the Key. now look for other items. ";
          gameMessage += "if you have all the items, go open the door.";               //Remove the key from the player's backpack

//          items.push("treasure box");                                        //Add the key to the world
//	        itemLocations.push(mapLocation);
	      }
        else
        {
	        gameMessage = "You now have key in your pocket, but you missed the treasure box.";
	      }
          break;
            
        case "treasure box":
	      if(mapLocation === 1)
            {   gameMessage = "Hurray ! You found the box. now look for other items. ";
                 gameMessage += "if you have all the items, go open the door.";
              }
        else
          {
           gameMessage = "You need to get the key in order to open the door.";
          
          }
	   }
   }
}
//*****************************************************************************//
    
function render()
{
  output.innerHTML = map[mapLocation];                  //Render the 
    if (mapLocation === 7 && backpack.length === 3){
        gameMessage = "you won! the door is open now";
        image.src ="images/youWin.jpg";
        
        //game should stop running
        
    } else {
        image.src ="images/" + images[mapLocation];
        outputRight.innerHTML = map2[map2Location];
    }

                                                        //Display an item if there's one in this location
    for(var i = 0; i < items.length; i++)                //1. Loop through all the game items
  {
   
   if(mapLocation === itemLocations[i])
   {
     output.innerHTML                                   //Display it
      += "<br>You see a <strong>"
      + items[i]
      + "</strong> here." ;
   }
  }

 output.innerHTML += "<br><em>" + gameMessage + "</em>";           //Display the game message

  if(backpack.length !== 0)                                         //Display the player's backpack contents
  {
    output.innerHTML += "<br>You are carrying: " + backpack.join(", ");
  }
}
//*******************************************************************************//
    
    function resumebtn3()                       //resume function
    {
        display();
    }
//*****************************************************************************//
    function savebtn2()                         // calling save function
    {
        saveInfo();
    }    
 //****************************************************************************************//  
   function saveInfo(){                            // the save info function

    let Ilocation=mapLocation;
   let Ibackpack=backpack;
    let savedHistory = history1;
   
    localStorage.setItem("mapLocation",Ilocation);
    localStorage.setItem("backpack",Ibackpack);
    localStorage.setItem("history",history1);	
   }

    //***************************************************************************************//    
    function display(){                                 // the display function
	//var rightBox=document.getElementById("two");
	let theLocation=localStorage.getItem("mapLocation");
   let theBackup=localStorage.getItem("backpack");
   let theHistory=localStorage.getItem("history");
    
    mapLocation =theLocation;
    backpack=theBackup;
    history1=theHistory;
    historyMain.innerHTML = history1;
    render();	
}
//********************************************************************************************//
