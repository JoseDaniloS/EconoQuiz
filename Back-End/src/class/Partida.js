import { uuidv7 } from "uuidv7";
import { deleteMatch } from "../utils/matchUtils.js";
import { Difficulty } from "./Difficulty.js";
import { Ranking } from "./Ranking.js";

export class Partida {
  constructor(
    id_user,
    matchId = null,
    difficulty,
    questions,
    answeredQuestions = [],
    currentStreak = 0,
    score = 0
  ) {
    this.id_user = id_user;
    this.id = matchId || uuidv7();
    this.difficulty = difficulty;
    this.questions = questions;
    this.answeredQuestions = answeredQuestions;
    this.currentStreak = currentStreak;
    this.maxStreak = 0;
    this.score = score;
    this.createdAt = new Date().toLocaleString("pt-BR");
  }
  getCurrentStreak() {
    return this.currentStreak;
  }

  static async deleteMatch() {
    await deleteMatch(this.id);
  }

  getCurrentQuestion() {
    return this.questions[this.answeredQuestions.length];
  }

  nextQuestion() {
    const question = this.getCurrentQuestion();
    const alreadyAnswered = this.answeredQuestions.some(
      (q) => q.id === question.id
    );
    if (alreadyAnswered) {
      console.warn(`Questão ${question} já foi respondida.`);
      return;
    }

    // Adiciona à lista de respondidas
    this.answeredQuestions.push(question);
  }

  incrementCorrectStreak() {
    this.currentStreak++; 

    // Atualiza maxStreak apenas se currentStreak for maior
    this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
  }

  addScore() {
    const basePoints = Math.floor(Math.random() * (1000 - 700 + 1)) + 700;

    const multiplier = Difficulty.getWeights(this.difficulty);

    const bonus = 1 + this.currentStreak * 0.1;

    const earnedPoints = Math.floor(basePoints * multiplier * bonus);

    this.score += earnedPoints;

    return earnedPoints;
  }

  resetStreak() {
    this.currentStreak = 0;
  }

  async isFinished() {
    try {
      //Verifica se ainda há questões pendentes
      if (this.answeredQuestions.length < this.questions.length) {
        return false;
      }

      //Atualiza o ranking
      await Ranking.updateToRanking(
        this.id_user,
        this.id,
        this.score,
        this.maxStreak,
        this.difficulty
      );

      //Retorna resumo da partida finalizada
      return {
        id: this.id,
        id_user: this.id_user,
        difficulty: this.difficulty,
        score: this.score,
        maxStreak: this.maxStreak,
        totalAnswered: this.answeredQuestions.length,
        totalQuestions: this.questions.length,
        finished: true,
      };
    } catch (error) {
      console.error("Erro ao finalizar partida:", error);
      throw new Error("Erro ao finalizar partida: " + error.message);
    }
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
      item.currentStreak,
      item.score,
    );

    // Popula campos opcionais se existirem
    partida.answeredQuestions = item.answeredQuestions || [];
    partida.currentStreak = item.currentStreak || 0;
    partida.maxStreak = item.maxStreak || 0;
    partida.score = item.score || 0;
    partida.createdAt = item?.createdAt

    return partida;
  }
  toPublicObject() {
    return {
      id: this.id,
      id_user: this.id_user,
      difficulty: this.difficulty,
      questions: this.questions,
      answeredQuestions: this.answeredQuestions,
      currentStreak: this.currentStreak,
      score: this.score,
      maxStreak: this.maxStreak
    };
  }
}
