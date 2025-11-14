import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "./config/database.js";
import { Ranking } from "./class/Ranking.js";
import { Partida } from "./class/Partida.js";


const TABLE_NAME_PARTIDAS = process.env.DYNAMO_DB_TABLE_PARTIDA;

/**
 * Percorre todas as partidas no banco e atualiza o ranking de cada jogador.
 */
export async function syncAllMatchesToRanking() {
  try {
    console.log("🔍 Buscando todas as partidas...");

    const command = new ScanCommand({ TableName: TABLE_NAME_PARTIDAS });
    const response = await docClient.send(command);

    if (!response.Items || response.Items.length === 0) {
      console.log("⚠️ Nenhuma partida encontrada.");
      return;
    }

    console.log(`📊 Encontradas ${response.Items.length} partidas.`);

    for (const item of response.Items) {
      try {
        const partida = Partida.fromDatabase(item);

        // Ignora partidas incompletas
        if (!partida.answeredQuestions?.length) {
          console.log(`⏩ Partida ${partida.id} ignorada (sem progresso).`);
          continue;
        }

        // Atualiza o ranking do jogador
        await Ranking.updateToRanking(
          partida.id_user,
          partida.id,
          partida.score,
          partida.maxStreak,
          partida.difficulty
        );

        console.log(
          `✅ Ranking atualizado para o usuário ${partida.id_user} (Partida ${partida.id}).`
        );
      } catch (err) {
        console.error(
          `❌ Erro ao processar partida ${item.id}: ${err.message}`
        );
      }
    }

    console.log("🏁 Sincronização concluída com sucesso!");
  } catch (error) {
    console.error("💥 Erro ao sincronizar partidas:", error);
    throw new Error("Falha ao atualizar o ranking das partidas.");
  }
}