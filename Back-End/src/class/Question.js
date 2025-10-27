export class Question {
  constructor(id, statement, options, correctOption, tip, difficulty) {
    this.id = id;
    this.statement = statement; // Enunciado da questão
    this.options = options; // Array de opções
    this.correctOption = correctOption; // Resposta correta
    this.tip = tip; // Dica opcional
    this.difficulty = difficulty; // "easy" | "medium" | "hard"
  }

  /**
   * ✅ Verifica se a resposta do usuário está correta.
   * @param {string} answer - Resposta selecionada
   * @returns {boolean}
   */
  isCorrect(answer) {
    return (
      answer?.trim().toLowerCase() === this.correctOption?.trim().toLowerCase()
    );
  }

  /**
   * ✅ Cria uma instância de Question a partir do registro do banco (DynamoDB).
   * @param {object} item - Item retornado do DynamoDB
   * @returns {Question}
   */
  static fromDatabase(item) {
    if (!item) throw new Error("Item inválido para criar Question.");

    const { id, statement, options, correctOption, tip, difficulty } = item;
    return new Question(id, statement, options, correctOption, tip, difficulty);
  }

  /**
   * ✅ Retorna a dica (se existir)
   */
  getTip() {
    return this.tip || null;
  }

  /**
   * ✅ Retorna a versão pública da questão (sem a resposta correta)
   */
  toPublicObject() {
    return {
      id: this.id,
      statement: this.statement,
      options: this.options,
      difficulty: this.difficulty,
      tip: this.tip,
    };
  }
}
