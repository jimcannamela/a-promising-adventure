function encounterCallback(entities) {
  console.log(entities);

  // this callback will handle the logic for what to do
  // in the encounter between the player and the creature
  // ---
  // entities is an array: [playerStats, creatureStats]
  // The stats format is: { name, type, hp, power, armor }

  // You will be using completeEncounter() to move the
  // adventure forward when your logic is done
  // completeEncounter() returns a promise that will need to chain

  // if the creature is of type "friendly"
  // invoke completeEncounter("meet", creatureStats.name)

  // if the creature is of type "not-so-friendly"
  // define a loop where each iteration the player
  // and creature take turns attacking each other
  // the formula is: entity.hp -= (attacker.power - defender.armor)
  // do this until either entity reaches 0 hp or below

  // if the player reaches 0 or below call
  // completeEncounter("defeat", creatureStats.name)

  // if the creature reaches 0 or below call
  // completeEncounter("victory", creatureStats.name)
  
  // don't forget to return the promise from completeEncounter()
  // no matter what the outcome is

// ##################################################################################
 
  // Loop not needed if we know there are always only two entries in the array
  // for (let c = 0; c <= entities.length; c++) {

  const playerStats = entities[0];
  const creatureStats = entities[1];

  if (creatureStats.type === 'friendly') {
    return completeEncounter("meet", creatureStats.name)   
  };

  if (creatureStats.type === 'not-so-friendly') {

    let whosTurn = 'player';
    let playerHP = playerStats.hp;
    let creatureHP = creatureStats.hp;

    while (playerHP > 0 && creatureHP > 0) {

      if (whosTurn === 'player') {
        creatureHP -= playerStats.power - creatureStats.armor;
        whosTurn='creature';
      } else {  
        playerHP -= creatureStats.power - playerStats.armor;
        whosTurn='player';
      }    
    };

    if (playerHP > 0 ) {
      console.log('Player Won!!');
      return completeEncounter("victory", creatureStats.name);
    } else {
      console.log('Player Lost!!');
      return completeEncounter("defeat", creatureStats.name);
    };
    
  };

}

function outcomeCallback(outcome) {
  console.log(outcome);

  // this callback is used to process the data
  // from the outcome of the encounter
  // ---
  // outcome is the format: { status, creature, reward }

  // You will be using notifyUser()to show the player
  // the outcome of the encounter
  // notifyUser() will return a promise you will need to chain

  // if the status is "met" call notifyUser() 
  // with the following string as an argument:
  // "You met {creature}! They gave you {reward}!"
  // replace the {} placeholder with the values
  // from the data

  // if the status is "slain" call notifyUser() 
  // with the following string as an argument:
  // "You were slain by {creature}! Your reward is DEATH!"

  // if the status is "level-up" call notifyUser() 
  // with the following string as an argument:
  // "You defeated a {creature}! Your reward is {reward} xp and a new level!"

  // don't forget to return the promise from notifyUser()
  // no matter what the outcome is
  
  if (outcome.status === 'met') {
    return notifyUser(`You met ${outcome.creature}! They gave you ${outcome.reward}!`)
  };

  if (outcome.status === 'slain') {
    return notifyUser(`You met ${outcome.creature}! They gave you DEATH!`)
  };

  if (outcome.status === 'level-up') {
    return notifyUser(`You met ${outcome.creature}! Your reward is ${outcome.reward} xp and a new level!`)
  };
}

function notificationCallback() {
  // This is the final callback
  // You do not need to do anything here.
  reset();
}

// This begins an the adventure by starting the operation of
// retrieving a player and creature
// These two operations run in parallel
const entitiesPromise = Promise.all([getPlayer(1, "Brian the Mighty"), getCreature()]);

// This binds the encounter callback so it is invoked when
// the entities have been retrieved
const outcomePromise = entitiesPromise.then(encounterCallback);

// This binds the outcome callback so it is invoked when
// the encounter has been resolved
const notificationPromise = outcomePromise.then(outcomeCallback);

// This binds the notification callback so it is invoked
// when the outcome has been processed.
notificationPromise.then(notificationCallback);