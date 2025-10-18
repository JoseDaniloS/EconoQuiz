import { uuidv7 } from "uuidv7";

export class Partida {
  constructor(id, difficulty) {
    this.id = id || uuidv7();
    this.answeredQuestions = [];
    this.questions = []; // logica para buscar em um banco de dados as questões de medio facil e dificil
    this.correctSequence = 0;
    this.difficulty = difficulty;
  }

  startMatch() {
    //logica para iniciar a partida
  }

  getCorrectSequence() {
    return this.correctSequence;
  }

  proximaQuestão(questao) {
    this.answeredQuestions.push(questao);
  }

  incremetarAcertos() {
    this.correctSequence++;
  }

  resetarAcertos() {
    this.correctSequence = 0;
  }

  isFinished() {
    //logica para finalizar a partida
  }

  toPublicObject() {
    return {
      id: this.id,
      answeredQuestions: this.answeredQuestions,
      difficulty: this.difficulty,
      questions: this.questions,
      score: this.score,
      correctSequence: this.correctSequence,
    };
  }
}
