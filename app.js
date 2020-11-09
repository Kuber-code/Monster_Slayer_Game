function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      specialAttackCounter: 3,
      winner: null,
      logMessages: [],
      Monster__healthbar__value: "healthbar__value",
      Player__healthbar__value: "healthbar__value",
      timesWin: 0,
      timesLost: 0,
      playerName: "Player",
      nameNotAdded: true,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      if (this.monsterHealth <= 40 && this.monsterHealth > 20) {
        this.Monster__healthbar__value = "healthbar__value__orange";
      } else if (this.monsterHealth <= 20 && this.monsterHealth > 0) {
        this.Monster__healthbar__value = "healthbar__value__red";
      } else {
        this.Monster__healthbar__value = "healthbar__value";
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      if (this.playerHealth <= 40 && this.playerHealth > 20) {
        this.Player__healthbar__value = "healthbar__value__orange";
      } else if (this.playerHealth <= 20 && this.playerHealth > 0) {
        this.Player__healthbar__value = "healthbar__value__red";
      } else {
        this.Player__healthbar__value = "healthbar__value";
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackDisabled() {
      if (this.specialAttackCounter > 2) {
        return false; // musis zwracac przeciwne do
      } else {
        return true; // musis zwracac przeciwne do
      }
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
        this.timesLost++;
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "player";
        this.timesWin++;
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      (this.specialAttackCounter = 3), (this.logMessages = []);
      this.Monster__healthbar__value = "healthbar__value";
      this.Player__healthbar__value = "healthbar__value";
    },
    setPlayerName(event) {
      this.playerName = event.target.value;
      this.nameNotAdded = false;
    },
    setPlayerNameButton() {
      this.nameNotAdded = false;
    },
    attackMonster() {
      this.countValuesEveryRound();
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.specialAttackCounter = 0;
      this.countValuesEveryRound();
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "special-attack", attackValue);
      this.attackPlayer();
    },
    countValuesEveryRound() {
      this.currentRound++;
      this.specialAttackCounter++;
    },
    healPlayer() {
      this.countValuesEveryRound();
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
