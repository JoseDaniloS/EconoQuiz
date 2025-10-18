import { GetCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "../config/database.js";

const TABLE_NAME_PARTIDAS = process.env.DYNAMO_DB_TABLE_PARTIDA;

/**
 * Verifica se uma partida já existe no banco de dados.
 * @param {string} id - ID da partida
 * @returns {Promise<Object|null>} Retorna a partida ou null se não encontrada
 */
export async function alreadyPlay(id) {
  if (!id) throw new Error("ID da partida é obrigatório!");

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME_PARTIDAS,
      Key: { id },
    });

    const result = await docClient.send(command);

    if (!result.Item) {
      return null; // partida não existe
    }

    return result.Item; // retorna os dados da partida
  } catch (error) {
    console.error("Erro ao buscar partida:", error);
    throw new Error("Erro ao buscar partida: " + error.message);
  }
}
