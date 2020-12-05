class DigitalPet {
  constructor() {
    // game data
    this.score = 0;
    this.username = "Unknown";
    this.fooditems = ["apple", "Cake", "Candy", "Carrot", "Chocolate", "lollipop", "Pet Food", "Recover Potion", "StrawBerry", ""]
    this.foodpoints = [10, 10, -20, 15, -40, -30, 20, 40, 15];
    this.complimentArray = [];
    this.jsonData = [];
    this.GameScore(60, true);
    this.GamePlayerName();
    this.FetchApi();

    this.reTime = 3;

    // gsap timelines
    this.t1 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t2 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t3 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t4 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t5 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    this.t6 = gsap.timeline({ repeat: 0, repeatDelay: 0 });
  }

  // Main Functionalities
  StartGame = () => {
    console.log("startbtn")
    gsap.timeline()
      .to("#startBtn", { display: "none", scale: 0.0, duration: 2 })
      .from(".getDetails", { display: "block", scale: 0, duration: 2 })
      .to(".getDetails", { display: "block", scale: 1, duration: 2 });

  }
  RestartGame = () => {
    console.log("RestartGame");
    this.score = 0;
    this.GameScore(60, true);
    gsap.to("#game_end", { display: "none" })
    gsap.to("#game", { display: "block" })
    gsap.to("#food_list", { display: "none" });
    gsap.to("#petEmotions", { display: "none" });
    gsap.to("#food", { display: "none" });
    gsap.to("#getcomplimentBtns", { display: "none" });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#arms_down", { display: "inline-block", });

    this.metabolism = setInterval(
      this.SpeedingDownMetabolism, 1000);

  }
  GameEnd = () => {
    gsap.to("#game_end", { display: "block" })
    gsap.to("#game", { display: "none" })
    clearInterval(this.metabolism);
    console.log("GameEnd")
  }

  SetFood() {
    // this.FetchApi();
    this.fooditems = this.jsonData[2];
    console.log(this.jsonData)
  }

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
  GamePlayerName(gamePlayerName) {
    if (gamePlayerName != null) {
      this.username = gamename;
      document.getElementById("pName").innerHTML = `Player Name: ${this.username}`;
    } else {
      document.getElementById("pName").innerHTML = `Player Name: ${this.username}`;
    }
  }

  // getters
  GetPlayerName(name) {
    gsap.timeline()
      .to("#before_starting_game", { display: "none", scale: 0.0, duration: 2 })
      .to("#game", { display: "block", duration: 1, });

    this.GamePlayerName(name);

  }

  GetCompliment() {
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#food", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#arms_down", { display: "inline-block", });

    gsap.from("#getcomplimentBtns", { display: "inline-block", duration: 2, scale: 0.8 });
    gsap.to("#getcomplimentBtns", { display: "inline-block", duration: 2, scale: 0.8 });
  }

  FetchApi() {
    fetch('/resources/javascript/data.json')
      .then((res) => res.json())
      .then((data) => {
        this.jsonData = data;
      })
      .catch(err => console.error(err));
    console.log(this.jsonData, "json")
    this.SetFood();
  }

  GetComplimentFromPet = (type, count = 0) => {
    this.Talking(type)

    // output text
    const output = document.querySelector("#compliments");
    const outputText = document.querySelector("#compliments .text");

    for (let i = 0; i < this.jsonData[count].length; i++) {
      if (this.jsonData[count][i].type == type) {
        this.complimentArray[i] = this.jsonData[count][i].compliment;
        // console.log(this.complimentArray[i])
      }
    }

    let textToDisplay = this.complimentArray[Math.floor(Math.random() * 5)];
    textToDisplay = textToDisplay.split(' ');
    outputText.innerText = this.username + "!! ";
    let displayWordTime = setInterval(() => {
      var word = textToDisplay.shift();
      if (word == null) {
        return clearInterval(displayWordTime);
      }
      outputText.append(word + ' ');
    }, 300)
    gsap.from(output, { display: "inline-block", duration: 2, scale: 0.8 })
    gsap.to(output, { display: "inline-block", duration: 2, scale: 1 });

    // javascript textreplace
    // get that file through fetch
    // these should be four moods when complimenting Pet
    // put theme in array with assosiated array of tags:
    // sad
    // neutral
    // jokey
    // angry

    // user click on sad button he will be getting sad prase and vice versa
    // 1: show the emotion, 2: do the talk 3: then go back to neutral
  }

  PetMood() {
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#food", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_up", { display: "none", });
    gsap.to("#arms_down", { display: "inline-block", });
    // gsap.from("#compliments", { display: "inline-block", duration: 2, scale: 0.8 })
    // gsap.to("#compliments", { display: "inline-block", duration: 2, scale: 1 });

    this.FetchApi();
    let moods = ["happy", "angry", "jokey", "sad"];
    // moods[Math.floor(Math.random() * 4)]
    this.GetComplimentFromPet("happy", 0);
  }

  PetFood = () => {
    gsap.to("#compliments", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#getcomplimentBtns", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_down", { display: "none", });
    gsap.to("#arms_up", { display: "inline-block", });

    gsap.from("#food_list", { display: "inline-block", duration: 2, scale: 0.8 });
    gsap.to("#food_list", { display: "inline-block", duration: 2, scale: 0.8 });


  }

  FeedingPet(food) {
    if (this.score <= 0) {
      this.GameEnd();
    } else {
      if (this.foodpoints[food] < 0) {
        this.Eating(food);
        this.MakePetFaceSad();
        this.GameScore(this.foodpoints[food], true);
      } else {
        this.Eating(food);
        this.MakePetFaceHappy();
        this.GameScore(this.foodpoints[food], true);
      }
    }
  }
  EatRandomFood = () => {
    gsap.to("#food_list", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#compliments", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#getcomplimentBtns", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#petEmotions", { display: "none", scale: 0.0, duration: 2 });
    gsap.to("#arms_down", { display: "none", });
    gsap.to("#arms_up", { display: "inline-block", });

    const food = Math.floor(Math.random() * 9);
    if (this.score == 0) {
      this.GameEnd();
    } else {
      if (this.foodpoints[food] < 0) {
        this.MakePetFaceSad();
        this.GameScore(this.foodpoints[food], true);
      } else {
        this.MakePetFaceHappy();
        this.GameScore(this.foodpoints[food], true);
        this.Eating(food);
      }
    }
  }

  Eating(food) {
    const output = document.querySelector("#food img");
    const t1 = gsap.timeline();
    const t2 = gsap.timeline({ repeat: 0 });
    output.src = `/resources/imgs/petfood/${this.fooditems[food]}.png`;
    t1.from(output, { display: "inline-block", duration: 2, scale: 0.8 });
    t1.to(output, { display: "inline-block", duration: 2, scale: 1 });

    t1.eventCallback("onComplete", () => {
      gsap.to("#arms_down", { display: "inline-block", });
      gsap.to("#arms_up", { display: "none", });

      t1.pause();
      t2.restart();
      t2.to(output, { display: "none", duration: 0 })

    })
  }

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


  SpeedingUpMetabolism = () => {
    console.log("SpeedingUp");
  }

  SpeedingDownMetabolism = () => {

    this.GameScore(-2, true)

    console.log("SpeedingDown");
  }

  // Animation Functions
  StartingMouthMovement = () => {
    console.log("StartingMouthMovement");
  }
  StopingMouthMovement = () => {
    console.log("StopingMouthMovement");
  }

  // Face Animations
  MakePetFaceHappy = (type) => {
    this.t2.pause();
    this.t3.pause();
    this.t4.pause();
    this.t5.pause();
    this.t6.pause();

    this.t1.restart();
    this.t1.to("#sad", { duration: 0, display: "none" })
      .to("#angry", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
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

    this.t2.restart();
    this.t2.to("#sad", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
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

    this.t3.restart();
    this.t3.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
      .from("#sad", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#sad", { duration: 1.5, display: "inline-block", scale: 0.8 });
    // .wait("+=1");
    // this.t3.eventCallback("onComplete", this.EndFaceAnimation);

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

    this.t4.restart();
    this.t4.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#neutral", { duration: 0, display: "none" })
      .to("#sad", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })
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
    this.t6.pause();

    this.t5.restart();
    this.t5.to("#angry", { duration: 0, display: "none" })
      .to("#happy", { duration: 0, display: "none" })
      .to("#sad", { duration: 0, display: "none" })
      .to("#jokey", { duration: 0, display: "none" })
      .to("#talking", { duration: 0, display: "none" })

      .from("#neutral", { duration: 1.5, display: "inline-block", scale: 0.8 })
      .to("#neutral", { duration: 1.5, display: "inline-block", scale: 0.9 });
    this.t5.eventCallback("onComplete", setInterval(this.MakePetEyesAnimated, 3000))

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

    console.log("TTalking", type);

    this.t1.pause();
    this.t2.pause();
    this.t3.pause();
    this.t4.pause();
    this.t5.pause();

    // this.t6.delay(5)
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
    this.reTime = 3;
    const tl = gsap.timeline({ repeat: this.reTime, repeatDelay: 0 });
    tl.from(".talking_lips2", { duration: 0.6, display: "inline-block", transform: "scale(1,4)" })
      .to(".talking_lips2", { duration: 0.6, display: "inline-block", transform: "scale(1,1)" });
    tl.eventCallback("onComplete", this.MakePetFaceNeutral);
    console.log("call back called")
  }

  // Health Points Management
  FoodPoisning = (FoodPoisning = false) => {
    console.log("Food Poisning");

    if (FoodPoisning == true) {
      this.LostHealthPoints();
    } else {
      this.GainedHealthPoints();
    }
  }

  GainedHealthPoints = () => {
    console.log("GainedHealthPoints")
  }
  LostHealthPoints = () => {
    console.log("LostHealthPoints")
  }

  // Behaviours Functions
}


let myPet = new DigitalPet();


// gsap.to("h1", {duration: 1, x: 100, y: 100, scale: 0.5, rotation: 180, skewX: 45});