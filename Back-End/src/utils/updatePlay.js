import { PutCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "../config/database.js";

const TABLE_NAME_PARTIDAS = process.env.DYNAMO_DB_TABLE_PARTIDA;

/**
 * Atualiza todos os dados de uma partida no DynamoDB (mantendo o ID).
 *
 * @param {object} partida - Objeto completo da partida a ser salva.
 * @returns {Promise<object>} - Retorna os dados atualizados da partida.
 */
export async function updatePartida(partida) {
  if (!partida || !partida.id) {
    throw new Error("Partida inválida ou sem ID");
  }

  try {
    // Remove qualquer campo que não deve ser persistido (ex: métodos de classe)
    const partidaToSave = JSON.parse(JSON.stringify(partida));

    const command = new PutCommand({
      TableName: TABLE_NAME_PARTIDAS,
      Item: partidaToSave,
    });

    await docClient.send(command);

    return partidaToSave;
  } catch (error) {
    console.error("Erro ao atualizar partida:", error);
    throw new Error("Erro ao atualizar partida: " + error.message);
  }
}
