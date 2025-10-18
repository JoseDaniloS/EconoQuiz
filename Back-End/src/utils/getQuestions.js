import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Question } from "../class/Question.js";
import docClient from "../config/database.js";

const TABLE_NAME_QUESTIONS = process.env.DYNAMO_DB_TABLE_QUESTIONS;

/**
 * Busca todas as questões de uma determinada dificuldade.
 * @param {string} difficulty - "easy" | "medium" | "hard"
 * @returns {Promise<Array>} Lista de questões públicas
 */
export async function getQuestions(difficulty) {
  if (!difficulty) {
    throw new Error("Dificuldade obrigatória!");
  }

  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME_QUESTIONS,
      IndexName: "difficulty-index",
      KeyConditionExpression: "difficulty = :difficulty",
      ExpressionAttributeValues: {
        ":difficulty": difficulty,
      },
    });

    const response = await docClient.send(command);

    if (!response.Items || response.Items.length === 0) {
      return [];
    }

    // Normaliza dados e converte para objetos públicos
    return response.Items.map((item) => {
      const q = typeof item.id === "object" ? item.id : item; // 🔹 evita aninhamento incorreto
      const question = new Question(
        q.id,
        q.statement,
        q.options,
        q.correctOption,
        q.tip,
        q.difficulty
      );
      return question.toPublicObject();
    });
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    throw new Error("Erro ao buscar questões: " + error.message);
  }
}
