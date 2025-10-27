import { uuidv7 } from "uuidv7";

export class Partida {
  constructor(id, difficulty, questions = []) {
    this.id = id || uuidv7();
    this.difficulty = difficulty;
    this.questions = questions;
    this.answeredQuestions = [];
    this.correctSequence = 0;
    this.score = 0;
  }

  getCorrectSequence() {
    return this.correctSequence;
  }

  proximaQuestao(questao) {
    const jaRespondida = this.answeredQuestions.includes(questao);

    if (jaRespondida) {
      console.warn(`Questão ${questao} já foi respondida.`);
      return;
    }

    // Adiciona à lista de respondidas
    this.answeredQuestions.push(questao);

    // Remove do array de questões disponíveis
    this.questions = this.questions.filter((q) => q === questao);
  }

  incrementarAcertos() {
    this.correctSequence++;
  }

  resetarAcertos() {
    this.correctSequence = 0;
  }

  isFinished() {
    if (this.answeredQuestions.length >= this.questions.length) {
      return {
        id: this.id,
        difficulty: this.difficulty,
        score: this.score,
      };
    }
  }

  /**
   * Cria uma instância de Partida a partir de um registro do banco de dados.
   * @param {object} item - Registro do banco (ex: DynamoDB)
   * @returns {Partida}
   */
  static fromDatabase(item) {
    if (!item) throw new Error("Item inválido para criar Partida.");

    const partida = new Partida(item.id, item.difficulty, item.questions || []);

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
      difficulty: this.difficulty,
      questions: this.questions,
      answeredQuestions: this.answeredQuestions,
      correctSequence: this.correctSequence,
      score: this.score,
    };
  }
}
