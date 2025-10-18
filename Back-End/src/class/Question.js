export class Question {
  constructor(id, statement, options, correctOption, tip, difficulty) {
    this.id = id;
    this.statement = statement; // Enunciado da questão
    this.options = options; // Ex: { A: "Opção 1", B: "Opção 2", C: "Opção 3", D: "Opção 4" }
    this.correctOption = correctOption; // Ex: "A"
    this.tip = tip; // Dica opcional
    this.difficulty = difficulty; // Ex: "easy" | "medium" | "hard"
  }

  /**
   * Verifica se a resposta fornecida está correta.
   * @param {string} answer - Ex: "A", "B", "C" ou "D"
   * @returns {boolean}
   */
  isCorrect(answer) {
    return answer?.toUpperCase() === this.correctOption?.toUpperCase();
  }

  /**
   * Retorna a dica (se existir).
   * @returns {string|null}
   */
  getTip() {
    return this.tip || null;
  }

  /**
   * Retorna uma versão pública da questão,
   * ocultando a resposta correta.
   */
  toPublicObject() {
    return {
      id: this.id,
      statement: this.statement,
      options: this.options,
      difficulty: this.difficulty,
    };
  }
}
