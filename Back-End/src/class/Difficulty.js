export class Difficulty {
  static LEVELS = ["easy", "medium", "hard"]; // níveis permitidos
  static WEIGHTS = {
    easy: 1.1,
    medium: 1.2,
    hard: 1.3,
  };

  constructor(level) {
    if (!Difficulty.LEVELS.includes(level)) {
      throw new Error(`Level Invalido!: ${level}`);
    }
    this.level = level;
    this.weight = Difficulty.WEIGHTS[level];
  }

  static getWeights(level) {
    return Difficulty.WEIGHTS[level]
  }

  getLevel() {
    return this.level
  }
}
