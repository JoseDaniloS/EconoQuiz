import { uuidv7 } from "uuidv7";
import { deleteMatch } from "../utils/matchUtils.js";
import { Question } from "./Question.js";
import { Difficulty } from "./Difficulty.js";

export class Partida {
  constructor(
    id_user,
    matchId = null,
    difficulty,
    questions,
    answeredQuestions = [],
    correctSequence = 0,
    score = 0
  ) {
    this.id_user = id_user;
    this.id = matchId || uuidv7();
    this.difficulty = difficulty;
    this.questions = questions;
    this.answeredQuestions = answeredQuestions;
    this.correctSequence = correctSequence;
    this.score = score;
  }

  static createFromDatabase(item) {
    if (!item) throw new Error("Item inválido para criar Partida.");
    return new Partida(
      item.id_user,
      item.id,
      item.difficulty,
      item.questions,
      item.answeredQuestions,
      item.correctSequence,
      item.score
    );
  }

  getCorrectSequence() {
    return this.correctSequence;
  }

  getCurrentQuestion() {
    return this.questions[this.answeredQuestions.length];
  }

  nextQuestion() {
    const question = this.getCurrentQuestion();
    const jaRespondida = this.answeredQuestions.some(
      (q) => q.id === question.id
    );
    if (jaRespondida) {
      console.warn(`Questão ${question} já foi respondida.`);
      return;
    }

    // Adiciona à lista de respondidas
    this.answeredQuestions.push(question);
  }

  incrementarAcertos() {
    this.correctSequence++;
  }

  adicionarPontuacao() {
    // 🎯 Base aleatória entre 700 e 1000
    const pontosBase = Math.floor(Math.random() * (1000 - 700 + 1)) + 700;

    // 💪 Multiplicador por dificuldade
    const multiplicador = Difficulty.getWeights(this.difficulty);

    // 🔥 Bônus progressivo por sequência (ex: 1.1, 1.2, 1.3)
    const bonus = 1 + this.correctSequence * 0.1;

    // 🧮 Calcula pontuação final
    const pontosGanhos = Math.floor(pontosBase * multiplicador * bonus);

    // ✅ Adiciona ao total
    this.score += pontosGanhos;

    return pontosGanhos;
  }

  resetarAcertos() {
    this.correctSequence = 0;
  }

  async isFinished() {
    if (this.answeredQuestions.length < this.questions.length) return false;

    return {
      id: this.id,
      difficulty: this.difficulty,
      score: this.score,
    };
  }

  /**
   * Cria uma instância de Partida a partir de um registro do banco de dados.
   * @param {object} item - Registro do banco (ex: DynamoDB)
   * @returns {Partida}
   */
  static fromDatabase(item) {
    if (!item) throw new Error("Item inválido para criar Partida.");

    const partida = new Partida(
      item.id_user,
      item.id,
      item.difficulty,
      item.questions,
      item.answeredQuestions,
      item.correctSequence,
      item.score
    );

    // Popula campos opcionais se existirem
    partida.answeredQuestions = item.answeredQuestions || [];
    partida.correctSequence = item.correctSequence || 0;
    partida.score = item.score || 0;

    return partida;
  }

  /**
   * ✅ Retorna uma versão pública da partida
   * (ocultando dados internos ou sensíveis)
   */
  toPublicObject() {
    return {
      id: this.id,
      id_user: this.id_user,
      difficulty: this.difficulty,
      questions: this.questions,
      answeredQuestions: this.answeredQuestions,
      correctSequence: this.correctSequence,
      score: this.score,
    };
  }
}
