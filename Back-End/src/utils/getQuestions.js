import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Question } from "../class/Question.js";
import docClient from "../config/database.js";

const TABLE_NAME_QUESTIONS = process.env.DYNAMO_DB_TABLE_QUESTIONS;

/**
 * Busca todas as questões de uma determinada dificuldade.
 * @param {string} difficulty - "easy" | "medium" | "hard"
 * @returns {Promise<Array>} Lista de questões públicas
 */
export async function getQuestions(difficulty) {
  if (!difficulty) throw new Error("Dificuldade obrigatória!");

  try {
    const command = new QueryCommand({
      TableName: TABLE_NAME_QUESTIONS,
      IndexName: "difficulty-index", // ✅ só se realmente existir esse GSI criado manualmente
      KeyConditionExpression: "difficulty = :difficulty",
      ExpressionAttributeValues: {
        ":difficulty": difficulty,
      },
    });

    const response = await docClient.send(command);

    if (!response.Items || response.Items.length === 0) {
      return [];
    }

    return response.Items.map((item) => {
      const question = new Question(
        item.id,
        item.statement,
        item.options,
        item.correctOption,
        item.tip,
        item.difficulty
      );
      return question.toPublicObject();
    });
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    throw new Error("Erro ao buscar questões: " + error.message);
  }
}

/**
 * Busca uma única questão pelo ID e dificuldade
 * @param {string} id - ID da questão
 */
export async function getQuestion(id, difficulty) {
  try {
    if (!id || !difficulty) {
      throw new Error("Campos obrigatórios: id e difficulty.");
    }

    const command = new GetCommand({
      TableName: TABLE_NAME_QUESTIONS,
      Key: {
        id: String(id),
        difficulty: String(difficulty)
      },
    });

    const response = await docClient.send(command);

    if (!response.Item || response.Item.length === 0) {
      throw new Error("Questão não encontrada.");
    }

    const item = response.Item;
    return new Question(
      item.id,
      item.statement,
      item.options,
      item.correctOption,
      item.tip,
      item.difficulty
    );
  } catch (error) {
    console.error("Erro ao buscar questão:", error);
    throw new Error("Erro ao buscar questão: " + error.message);
  }
}
