// --- Constants ---
const colorPoole = ["#ffa300","#cf0060","#ff00ff","#13a8fe","#67C50A","#845F4D"];
const colorNames = ["Orange","Red","Magenta","Blue","Green","Brown"];
// --- Global Variables ---
let historyArr = [];
let choosenPattern = [];
let currentGuessArr = [0,0,0,0];
let currentGuess;
let colorResolve = {};
colorNames.forEach((c,i) => colorResolve[c]=colorPoole[i]);
// --- Support Classes ---
class Guess{
  constructor(guessArr){
    this.guess = guessArr;
    let tempArr = [];
    let ignoreIndex = [];
    guessArr.forEach((c,i) => {
      if(c == choosenPattern[i]){
        tempArr.push("black");
        ignoreIndex.push(i);
      }
    });
    let counter = 0;
    let takenList = [];
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(!ignoreIndex.includes(i) && !ignoreIndex.includes(j)){
          if(choosenPattern[i] == guessArr[j] && !takenList.includes(j)){
            tempArr.push("white");
            takenList.push(j);
          }
        }
      }
    }
    this.score = shuffle(tempArr);
    historyArr.push(this);
  }
}
// --- Functions ---
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
const displayHistory = () => {
  historyArr.forEach((c,j) => {
      for(let i=0;i<4;i++){
        fill(c.guess[i]);
        ellipse(50*(j+1),20*(i+1)+50,15,15);
        if(!(c.score[i] === undefined)) fill(c.score[i]);
        if(!(c.score[i] === undefined)) ellipse(50*(j+1)+20,20*(i+1)+50,15,15);
      }
      fill(random(colorPoole));
      textSize(25);
      text(j+1,((50*(j+1))+(50*(j+1)+20))/2 - 10,225);
  });
}
const displayButtons = arr => {
  colorPoole.forEach((c,i) => {
    $("#cButtCol1").append(`<button class="btn m-1" id="GuessBtnCol1_${colorNames[i]}" style="background-color:${colorPoole[i]}">${arr[i]}</button>`);
    $("#cButtCol2").append(`<button class="btn m-1" id="GuessBtnCol2_${colorNames[i]}" style="background-color:${colorPoole[i]}">${arr[i]}</button>`);
    $("#cButtCol3").append(`<button class="btn m-1" id="GuessBtnCol3_${colorNames[i]}" style="background-color:${colorPoole[i]}">${arr[i]}</button>`);
    $("#cButtCol4").append(`<button class="btn m-1" id="GuessBtnCol4_${colorNames[i]}" style="background-color:${colorPoole[i]}">${arr[i]}</button>`);
  });
}
const displayPattern = pattern => {
  pattern.forEach((c,i)=>{
    fill(c);
    ellipse((width*(i+1))/(pattern.length+1),3*height/4,50,50);
  });
}
const uxDisplay = () => {
  fill(0);
  divider(height/2);
  textSize(32);
  text("Current Guess",20,height/2+44);
  text("History",20,44);
  displayHistory();
}
const divider = y => line(0,y,width,y);
function setup() {
  let canvas = createCanvas(windowWidth-20,Math.round((windowWidth-20)*9/16));
  canvas.parent("sketch_holder");
  displayButtons(colorNames);
  for(let i=0;i<4;i++) choosenPattern.push(random(colorPoole));
  displayPattern([0,0,0,0]);
  uxDisplay();
}
$(document).ready(function(){
  $("#submitGuessButton").click(function(){
    currentGuess = new Guess(currentGuessArr);
    clear();
    uxDisplay();
    displayHistory();
    displayPattern([0,0,0,0]);
    currentGuessArr = [0,0,0,0];
  });
  $("button").click(function(){
    currentGuessArr[this.id[11]-1] = colorResolve[this.id.split("_")[1]];
    displayPattern(currentGuessArr);
  });
});
