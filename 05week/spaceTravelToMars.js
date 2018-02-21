'use strict';

/*
--WHITEBOARD--

PROJECT: Build the Space To Mars app using the provided tests.
-Test 1: It should have a name, a job, a specialSkill and ship upon instantiation
  -Creates a new object called crewMember1
  -What's required:
    1. Create a class called CrewMember
    2. Contruct the class to accept the following:
      a. name
      b. job
      c. speckialSkill
      d. ship  = this will be null 

-Test 2: It can enter a ship
  -This will test if the crew member job type is applicable to the ship.
    T. assign the ship for the crew member, and insert the crew member into the crew for the ship
    F. -

  -What's required:
    1. create a method on the crewmember class called enterShip
      a. the enterShip method will accept an object [ship]
        - find out if  'this' relates to the object.  if so, then begin pulling methods, else use the obj name
      b. Ternary to determine truthiness of the crewmember job title against jobTypes object
        -assign the ship for the crew member, and insert the crew member into the crew for the ship when true

-Test 3: It should have a name, a type, an ability and an empty crew upon instantiation
  -Creates a new object called mav
  -What's required:
    1. Create a class called Ship
    2. Construct the class to accept the following:
      a. name
      b. type
      c. ability
      d. crew -> this will be an empty array

-Test 4: It can return a mission statement correctly
  -This will test the crew array to check if there is a crew
  -What's required:
    1. Method on the ship class called missionStatement
      -Test if crew is > 0 
        T: Ability
        F: Can't perform a mission yet

PLAN:
  1. Create the classes required to make this work
  2. Build the method enterShip with the ability to accept an object [ship]
  3. Build the method missionStatement -> doesn't req object, since the length is being tested on crew

*/

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

/*
Step 1: Build the classes for the app
*/

class CrewMember {
  constructor(name, job, specialSkill){
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
    /*
    Step 2: add enterShip method to assign ship and push the crew memeber to ship
    Had to build the method into constructor because terminal would not run
    code when outside the constructor. 
    ***FIXED IT...does not like ES6 Fat Arrows
    */
  }
    enterShip(ship){
      this.ship = ship
      ship.crew.push(this)
  }
}

class Ship {
  constructor(name, type, ability){
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
    /*
    Step 3: create the missionStatement method to check the crew length and return ability
      if there is a crew member on deck, else can't perform a mission yet is returned
    Had to build the method into constructor because terminal would not run
    code when outside the constructor.
     ***FIXED IT...does not like ES6 Fat Arrows
    */
  }
    missionStatement(){
      return this.crew.length === 0 ? `Can't perform a mission yet.` : this.ability
  }
}


if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
