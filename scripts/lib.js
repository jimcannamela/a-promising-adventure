function getInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getName() {
  let n = [getInt(65, 90)];
  for(let l = 0; l < getInt(4, 9); l++) {
    n.push(getInt(97, 122));
  }

  return String.fromCharCode(...n);
}

function getEntity(id, type, name) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        id,
        type,
        name: name || getName(),
        hp: getInt(50, 100),
        power: getInt(1, 10),
        armor: getInt(1, 10)
      });
    }, getInt(1000, 3000));
  });
}

function getPlayer(id, name) {
  return getEntity(id, "player", name);
}

function getCreature() {
  let type = "friendly";
  if(getInt(1, 100) > 50) {
    type = "not-so-friendly";
  }

  return getEntity(getInt(4000, 10000), type);
}

const statuses = {
  meet: "met",
  defeat: "slain",
  victory: "level-up"
};
function completeEncounter(outcome, creature) {
  const data = { 
    status: statuses[outcome], 
    creature,
    reward: null
  };

  if(data.status === "met") {
    data.reward = "sword"
  }

  if(data.status === "level-up") {
    data.reward = getInt(100, 1000);
  }

  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(data);
    }, getInt(1000, 3000));
  });
}

function notifyUser(message) {

}

function reset() {

}
