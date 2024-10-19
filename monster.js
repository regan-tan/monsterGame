const app = Vue.createApp({
  data() {
    return {
      // START - DO NOT EDIT
      gameStarted: false,
      buttonSpecialAttack: null,
      buttonDetails: [
        {
          action: "attack",
          btnType: "btn-danger",
          value: "ATTACK",
          show: true,
        },
        {
          action: "specialAttack",
          btnType: "btn-warning",
          value: "SPECIAL ATTACK",
          show: true,
        },
        {
          action: "heal",
          btnType: "btn-success",
          value: "HEAL",
          show: true,
        },
        {
          action: "giveUp",
          btnType: "btn-link",
          value: "GIVE UP",
          show: true,
        },
      ],
      myHealth: 100,
      monsterHealth: 100,
      statusList: [
        {
          class: "text-dark",
          text: "Game hasn't started.",
        },
      ],
      range: [10, 20, 30, 40, 50],
      MONSTER_MAX_ATTACK: 30,
      PLAYER_MAX_ATTACK: 20,
      MAX_HEAL: 30,
      specialAttackCoolDown: 0,
      // END - DO NOT EDIT
    };
  },

  // You may add additional options (e.g. computed) here

  methods: {
    // You may add additional helper methods as you deem fit

    doAction(action) {
      this[action]();
    },

    start() {
      // Add Code Here
      // gameStarted = true after this line is executed
      this.gameStarted = !this.gameStarted;

      // Reset progress bar to 100%
      this.myHealth = 100;
      this.monsterHealth = 100;

      this.statusList = [
        {
          text: "Game has started",
          class: "text-secondary",
        }, // message object
      ];
    },

    attack() {
      // Add Code Here
      console.log("In Attack");

      let pDmg = Math.floor(Math.random() * this.MONSTER_MAX_ATTACK);

      let mDmg = Math.floor(Math.random() * this.PLAYER_MAX_ATTACK);

      this.monsterHealth -= mDmg;
      if (this.monsterHealth > 0) {
        this.statusList.push({
          text: `You attacked & Monster suffered ${mDmg} points `,
          class: "text-info",
        });
      } else {
        this.monsterHealth = 0;

        this.statusList.push({
          text: `You win & Monster lost `,
          class: "text-success",
        });
        this.gameStarted = !this.gameStarted;
      }

      this.myHealth -= pDmg;
      if (this.myHealth > 0) {
        this.statusList.push({
          text: `Monster attacked & you suffered ${pDmg} points`,
          class: "text-warning",
        });
      } else {
        this.myHealth = 0;

        this.statusList.push({
          text: `Monster win & you lost `,
          class: "text-danger",
        });

        this.gameStarted = !this.gameStarted;
      }
    },

    specialAttack() {
      // Add Code Here
      console.log("In Special Attack");

      // SPECIAL ATTACK COOLDOWN
      if (this.specialAttackCoolDown > 0) {
        // If the cooldown is not finished, prevent the action
        console.log("Special Attack is on cooldown.");
        return;
      }

      console.log("In Special Attack");

      // Set cooldown period (in seconds)
      this.specialAttackCoolDown = 3;

      // Start cooldown countdown
      const cooldownTimer = setInterval(() => {
        this.specialAttackCoolDown--;
        if (this.specialAttackCoolDown <= 0) {
          clearInterval(cooldownTimer);
        }
      }, 1000); // Reduce cooldown every 1 second

      // GENERATE RANDOM MULTIPLIER FOR SPECIAL ATTACK
      let rand_no_monster_attack = Math.random();
      let rand_no_player_attack = Math.random();

      // Make multiplier higher based on random decimal generated
      if (rand_no_monster_attack < 0.3) {
        rand_no_monster_attack += 0.55;
      } else if (0.3 <= rand_no_monster_attack < 0.5) {
        rand_no_monster_attack += 0.45;
      } else if (0.5 <= rand_no_monster_attack < 0.7) {
        rand_no_monster_attack += 0.3;
      }

      if (rand_no_player_attack < 0.3) {
        rand_no_player_attack += 0.55;
      } else if (0.3 <= rand_no_player_attack < 0.5) {
        rand_no_player_attack += 0.45;
      } else if (0.5 <= rand_no_player_attack < 0.7) {
        rand_no_player_attack += 0.3;
      }

      let pDmg = Math.floor(rand_no_monster_attack * this.MONSTER_MAX_ATTACK);

      let mDmg = Math.floor(rand_no_player_attack * this.PLAYER_MAX_ATTACK);

      this.monsterHealth -= mDmg;
      if (this.monsterHealth > 0) {
        this.statusList.push({
          text: `You've used your special attack & Monster suffered ${mDmg} points `,
          class: "text-info",
        });
      } else {
        this.monsterHealth = 0;

        this.statusList.push({
          text: `You win & Monster lost `,
          class: "text-success",
        });
        this.gameStarted = !this.gameStarted;
      }

      this.myHealth -= pDmg;
      if (this.myHealth > 0) {
        this.statusList.push({
          text: `Monster used it's special attack & you suffered ${pDmg} points`,
          class: "text-warning",
        });
      } else {
        this.myHealth = 0;

        this.statusList.push({
          text: `Monster win & you lost `,
          class: "text-danger",
        });

        this.gameStarted = !this.gameStarted;
      }
    },

    heal() {
      // Add Code Here
      console.log("Healing");

      let pHeal = Math.floor(Math.random() * 10);

      if (this.myHealth <= 80) {
        this.myHealth += pHeal;
        this.statusList.push({
          text: `The wizard has healed you with ${pHeal} points`,
          class: "text-success",
        });
      } else {
        this.statusList.push({
          text: `You are too strong. The wizard cannot heal you if you have more than 80 points!`,
          class: "text-danger",
        });
      }
    },
    giveUp() {
      // Add Code Here
      console.log("Gave up");

      this.myHealth = 0;
      this.statusList.push({
        text: `You gave up. The monster eats you.`,
        class: "text-danger",
      });
      this.gameStarted = !this.gameStarted;
    },
  },
});
const vm = app.mount("#app");
