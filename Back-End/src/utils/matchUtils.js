import { DeleteCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "../config/database.js";

const TABLE_NAME_PARTIDAS = process.env.DYNAMO_DB_TABLE_PARTIDA;

/**
 * Atualiza todos os dados de uma partida no DynamoDB (mantendo o ID).
 *
 * @param {object} partida - Objeto completo da partida a ser salva.
 * @returns {Promise<object>} - Retorna os dados atualizados da partida.
 */
export async function updateMatch(match) {
  if (!match|| !match.id) {
    throw new Error("Partida inválida ou sem ID");
  }

  try {
    // Remove qualquer campo que não deve ser persistido (ex: métodos de classe)
    const matchToSave = JSON.parse(JSON.stringify(match));

    const command = new PutCommand({
      TableName: TABLE_NAME_PARTIDAS,
      Item: matchToSave,
    });

    await docClient.send(command);

    return matchToSave;
  } catch (error) {
    console.error("Erro ao atualizar partida:", error);
    throw new Error("Erro ao atualizar partida: " + error.message);
  }
}

export async function deleteMatch(matchId) {
  try {
    const command = new DeleteCommand({
      TableName: TABLE_NAME_PARTIDAS,
      Key: { id: matchId },
    });

    await docClient.send(command);
    console.log(`Partida ${matchId} deletada com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar partida:", error);
  }
}

/**
 * Verifica se uma partida já existe no banco de dados.
 * @param {string} id - ID da partida
 * @returns {Promise<Object|null>} Retorna a partida ou null se não encontrada
 */
export async function existsMatch(id) {
  if (!id) throw new Error("ID da partida é obrigatório!");

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME_PARTIDAS,
      Key: { id },
    });

    const result = await docClient.send(command);

    if (!result.Item) {
      throw new Error("Partida não encontrada.");
    }

    return result.Item; // retorna os dados da partida
  } catch (error) {
    console.error("Erro ao buscar partida:", error);
    throw new Error("Erro ao buscar partida: " + error.message);
  }
}
