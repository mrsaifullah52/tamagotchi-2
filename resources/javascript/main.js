class DigitalPet {
  constructor() {
    // game data
    this.score = 0;
    this.username = "Unknown";
    this.fooditems = ["apple", "Cake", "Candy", "Carrot", "Chocolate", "lollipop", "Pet Food", "Recover Potion", "StrawBerry", "watermelon"]
    this.foodpoints = [10, 10, -20, 15, -40, -30, 20, 40, 15, 15];
    this.complimentArray = [];
    this.jsonData = [];
    this.metabolism;
    this.GameScore(60, true);
    this.GamePlayerName();
    this.FetchApi();

    // gsap timelines
    this.t1 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t2 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t3 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t4 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t5 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t6 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.talkLip = gsap.timeline({ repeat: 2, repeatDelay: 0 });
    this.feed = gsap.timeline({ repeat: 0, repeatDelay: 0 });
  }

  // Main Functionalities
  // starting game
  StartGame = () => {
    gsap.timeline()
      .to("#startBtn", { display: "none", scale: 0.0, duration: 2 })
      .from(".getDetails", { display: "block", scale: 0, duration: 2 })
      .to(".getDetails", { display: "block", scale: 1, duration: 2 });
    this.SpeedingDownMetabolism;
  }
  // restarting game
  RestartGame = () => {
    this.score = 0;
    this.GameScore(60, true);
    gsap.to("#game_end", { display: "none" })
    gsap.to("#crosses", { display: "none" })
    gsap.to("#food_list", { display: "none" });
    gsap.to("#petEmotions", { display: "none" });
    gsap.to("#food", { display: "none" });
    gsap.to("#getcomplimentBtns", { display: "none" });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#game", { display: "block" })
    gsap.to("#arms_down", { display: "inline-block", });
    this.metabolism = setInterval(this.SpeedingDownMetabolism, 1000);
  }
  // game end
  GameEnd = () => {
    gsap.to("#game_end", { display: "block" })
    gsap.to("#crosses", { display: "block" })
    clearInterval(this.metabolism);
  }
  // setting Food Points
  GameScore(gamescore = 60, gameStatus) {
    if (gameStatus) {
      this.score = this.score + gamescore;
      if (this.score <= 0) {
        document.getElementById("foodPts").innerHTML = `Metabolism Points: ${0} Pts`;
        this.GameEnd();
      } else {
        document.getElementById("foodPts").innerHTML = `Metabolism Points: ${this.score} Pts`;
      }
    } else {
      this.score = this.score + gamescore;
      document.getElementById("foodPts").innerHTML = `Metabolism Points: ${0} Pts`;
    }
  }
  // setting player name
  GamePlayerName(gamePlayerName) {
    if (gamePlayerName != null) {
      this.username = gamePlayerName;
      document.getElementById("pName").innerHTML = `Player Name: ${this.username}`;
    } else {
      document.getElementById("pName").innerHTML = `Player Name: ${this.username}`;
    }
  }

  // getting player name
  GetPlayerName(name) {
    gsap.timeline()
      .to("#before_starting_game", { display: "none", scale: 0.0, duration: 2 })
      .to("#game", { display: "block", duration: 1, });
    this.GamePlayerName(name);
    this.metabolism = setInterval(this.SpeedingDownMetabolism, 1000);
  }

  // activating compliment section
  GetCompliment() {
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#food", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#arms_down", { display: "inline-block", });

    gsap.from("#getcomplimentBtns", { display: "inline-block", duration: 2, scale: 0.8 });
    gsap.to("#getcomplimentBtns", { display: "inline-block", duration: 2, scale: 0.8 });
  }

  // fetching data from json
  FetchApi() {
    fetch('resources/javascript/data.json')
      .then((res) => res.json())
      .then((data) => {
        this.jsonData = data;
      })
      .catch(err => console.error(err));
  }

  // setting food items
  SetFood() {
    this.fooditems = this.jsonData[1];
  }
  // getting Compliments from Pet
  GetComplimentFromPet = (type, count = 2) => {
    // face expressions
    this.Talking(type)
    // output text
    const output = document.querySelector("#compliments");
    const outputText = document.querySelector("#compliments .text");
    let j = 0;
    this.complimentArray = new Array();
    for (let i = 0; i < this.jsonData[count].length; i++) {
      if (this.jsonData[count][i].type == type) {
        this.complimentArray[j] = this.jsonData[count][i].compliment;
        j++;
      }
    }
    // displaying word by word
    let random = Math.floor(Math.random() * this.complimentArray.length);
    let textToDisplay = this.complimentArray[random];
    textToDisplay = textToDisplay.split(" ");
    outputText.innerText = this.username + "!! ";
    let displayWordTime = setInterval(() => {
      var word = textToDisplay.shift();
      if (word == null) {
        return clearInterval(displayWordTime);
      }
      outputText.append(word + " ");
    }, 300)
    gsap.from(output, { display: "inline-block", duration: 2, scale: 0.8 })
    gsap.to(output, { display: "inline-block", duration: 2, scale: 1 });
  }

  // what is pet Current Mood
  PetMood() {
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#food", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#arms_down", { display: "inline-block", });

    let moods = ["", "happy", "angry", "jokey", "sad"];
    let random = Math.floor(Math.random() * 3);
    let moodNum = "";
    if (random != 0) {
      moodNum = moods[random];
    } else {
      moodNum = "jokey";
    }
    this.GetComplimentFromPet(moodNum, 0);
  }

  // Showing Pet Food List
  PetFood = () => {
    gsap.to("#compliments", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#getcomplimentBtns", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_down", { display: "none", });
    gsap.to("#arms_up", { display: "inline-block", });

    gsap.from("#food_list", { display: "inline-block", duration: 2, scale: 0.8 });
    gsap.to("#food_list", { display: "inline-block", duration: 2, scale: 0.8 });
  }

  // Feeding Pet
  FeedingPet(food) {
    if (this.score <= 0) {
      this.GameEnd();
    } else {
      if (this.foodpoints[food] < 0) {
        this.Eating(food, "sad");
        this.GameScore(this.foodpoints[food], true);
      } else {
        this.Eating(food, "happy");
        this.GameScore(this.foodpoints[food], true);
      }
    }
  }
  // Let him Eat Random Food
  EatRandomFood = () => {
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#compliments", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#getcomplimentBtns", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_down", { display: "none", });
    gsap.to("#arms_up", { display: "inline-block", });

    const food = Math.floor(Math.random() * 9);
    if (this.score <= 0) {
      this.GameEnd();
    } else {
      if (this.foodpoints[food] < 0) {
        this.GameScore(this.foodpoints[food], true);
        this.Eating(food, "sad");
      } else {
        this.GameScore(this.foodpoints[food], true);
        this.Eating(food, "happy");
      }
    }
  }

  // Eating Food with Face animations
  Eating(food, face) {
    this.t1.pause();
    this.t2.pause();
    this.t3.pause();
    this.t4.pause();
    this.t5.pause();
    this.t6.pause();

    this.feed.clear();
    this.feed.restart();
    this.feed.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#sad", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .to("#arms_down", { display: "none", })
      .to("#arms_up", { display: "inline-block", });

    if (face == "happy") {
      this.feed.restart();
      this.feed.from("#happy", { duration: 0.5, display: "inline-block", scale: 0.8 })
        .to("#happy", { duration: 0.5, display: "inline-block", scale: 0.9 })
        .to(".lips", { display: "none", duration: 0 });
      this.feed.eventCallback("onComplete", this.TalkLipsing);

    } else {
      this.feed.restart();
      this.feed.from("#sad", { duration: 0.5, display: "inline-block", scale: 0.8 })
        .to("#sad", { duration: 0.5, display: "inline-block", scale: 0.9 })
        .to(".lips", { display: "none", duration: 0 });
      this.feed.eventCallback("onComplete", this.TalkLipsing);

    }

    // throwing the results on screen
    const output = document.querySelector("#food img");
    const t1 = gsap.timeline();
    const t2 = gsap.timeline({ repeat: 0 });
    output.src = `resources/imgs/petfood/${this.fooditems[food]}.png`;
    t1.from(output, { display: "inline-block", duration: 2, scale: 0.8 });
    t1.to(output, { display: "inline-block", duration: 2, scale: 1 });
    t1.eventCallback("onComplete", () => {
      gsap.to("#arms_down", { display: "inline-block", });
      gsap.to("#arms_up", { display: "none", });

      t1.pause();
      t2.restart();
      t2.to(output, { display: "none", duration: 0 });
    })
  }

  // starting pet Emotions
  PetEmotions() {
    gsap.to("#compliments", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#food", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#getcomplimentBtns", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#arms_down", { display: "inline-block", });

    gsap.from("#petEmotions", { display: "inline-block", duration: 2, scale: 0.8 });
    gsap.to("#petEmotions", { display: "inline-block", duration: 2, scale: 0.8 });
  }

  // metabolism
  SpeedingDownMetabolism = () => {
    this.GameScore(-2, true)
  }

  // Face Animations
  MakePetFaceHappy = (type) => {
    this.t2.pause();
    this.t3.pause();
    this.t4.pause();
    this.t5.pause();
    this.t6.pause();

    this.t1.clear();
    this.t1.restart();
    this.t1.to("#sad", { duration: 0, display: "none" })
      .to("#angry", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .to("#lips", { duration: 0, display: "inline-block" })
      .from("#happy", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#happy", { duration: 1.5, display: "inline-block", scale: 0.8 });
    if (type == "talking") {
      this.Talking(type);
    } else {
      this.t1.eventCallback("onComplete", this.MakePetFaceNeutral);
    }
  }
  MakePetFaceAngy = (type) => {
    this.t1.pause();
    this.t3.pause();
    this.t4.pause();
    this.t5.pause();
    this.t6.pause();

    this.t2.clear();
    this.t2.restart();
    this.t2.to("#sad", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .to("#lips", { duration: 0, display: "inline-block" })
      .from("#angry", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#angry", { duration: 1.5, display: "inline-block", scale: 0.8 });

    if (type == "talking") {
      this.Talking(type);
    } else {
      this.t2.eventCallback("onComplete", this.MakePetFaceNeutral);
    }
  }
  MakePetFaceSad = (type) => {
    this.t1.pause();
    this.t2.pause();
    this.t4.pause();
    this.t5.pause();
    this.t6.pause();

    this.t3.clear();
    this.t3.restart();
    this.t3.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .to("#lips", { duration: 0, display: "inline-block" })
      .from("#sad", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#sad", { duration: 1.5, display: "inline-block", scale: 0.8 });

    if (type == "talking") {
      this.Talking(type);
    } else {
      this.t3.eventCallback("onComplete", this.MakePetFaceNeutral);
    }
  }
  MakePetFaceJokey = (type) => {
    this.t1.pause();
    this.t2.pause();
    this.t3.pause();
    this.t5.pause();
    this.t6.pause();

    this.t4.clear();
    this.t4.restart();
    this.t4.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#sad", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .to("#lips", { duration: 0, display: "inline-block" })
      .from("#jokey", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#jokey", { duration: 1.5, display: "inline-block", scale: 0.8 });

    if (type == "talking") {
      this.Talking(type);
    } else {
      this.t4.eventCallback("onComplete", this.MakePetFaceNeutral);
    }
  }
  MakePetFaceNeutral = () => {
    this.t1.pause();
    this.t2.pause();
    this.t3.pause();
    this.t4.pause();
    this.t6.pause();

    this.t5.clear();
    this.t5.restart();
    this.t5.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#sad", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .to("#lips", { duration: 0, display: "inline-block" })

      .from("#neutral", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#neutral", { duration: 1.5, display: "inline-block", scale: 0.9 });
    this.t5.eventCallback("onComplete", setInterval(this.MakePetEyesAnimated, 3000));
  }
  MakePetEyesAnimated() {
    const eyeballs = document.querySelectorAll("#eyeballs");
    const whiteballs = document.querySelectorAll("#whiteballs");

    gsap.timeline()
      .from([eyeballs, whiteballs], { duration: 1, x: 0 })
      .to([eyeballs, whiteballs], { duration: 1, x: 10 })
      .to([eyeballs, whiteballs], { duration: 1, x: -10 })
      .to([eyeballs, whiteballs], { duration: 1, x: 0 });
  }

  Talking = (type) => {
    this.t1.pause();
    this.t2.pause();
    this.t3.pause();
    this.t4.pause();
    this.t5.pause();

    this.t6.clear();
    this.t6.restart();
    this.t6.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#sad", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })

    if (type == "happy") {
      this.t6.restart();
      this.t6.from("#happy", { duration: 0.5, display: "inline-block", scale: 0.8 })
        .to("#happy", { duration: 0.5, display: "inline-block", scale: 0.9 })
        .to(".lips", { display: "none", duration: 0 });
      this.t6.eventCallback("onComplete", this.TalkLipsing);

    } else if (type == "sad") {
      this.t6.restart();
      this.t6.from("#sad", { duration: 0.5, display: "inline-block", scale: 0.8 })
        .to("#sad", { duration: 0.5, display: "inline-block", scale: 0.9 })
        .to(".lips", { display: "none", duration: 0 });
      this.t6.eventCallback("onComplete", this.TalkLipsing);

    } else if (type == "angry") {
      this.t6.clear();
      this.t6.from("#angry", { duration: 0.5, display: "inline-block", scale: 0.8 })
        .to("#angry", { duration: 0.5, display: "inline-block", scale: 0.9 })
        .to(".lips", { display: "none", duration: 0 });
      this.t6.eventCallback("onComplete", this.TalkLipsing);

    } else if (type == "jokey") {
      this.t6.restart();
      this.t6.from("#jokey", { duration: 0.5, display: "inline-block", scale: 0.8 })
        .to("#jokey", { duration: 0.5, display: "inline-block", scale: 0.9 })
        .to(".lips", { display: "none", duration: 0 });
      this.t6.eventCallback("onComplete", this.TalkLipsing);
    }
  }

  TalkLipsing() {
    const tl = gsap.timeline({ repeat: 3, repeatDelay: 0 });
    tl.clear();
    tl.restart();
    tl.from(".talking_lips2", { duration: 0.6, display: "inline-block", transform: "scale(1,4)" })
      .to(".talking_lips2", { duration: 0.6, display: "inline-block", transform: "scale(1,1)" });
    tl.eventCallback("onComplete", this.MakePetFaceNeutral);
  }
}
// Creating DigitalPet Object
let myPet = new DigitalPet();