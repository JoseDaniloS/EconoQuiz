import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "../config/database.js";
import { verificarSeUsuarioExiste } from "../validations/userValidation.js";

import { logMessage } from "../utils/logs.js";

const TABLE_NAME_RANKING = process.env.DYNAMO_DB_TABLE_RANKING;
export class Ranking {
  constructor(id_user, id_match, bestScore, bestStreak, difficulty) {
    this.id_user = id_user;
    this.id_match = id_match;
    this.bestScore = bestScore;
    this.bestStreak = bestStreak;
    this.difficulty = difficulty;
    this.createdAt = new Date().toLocaleString("pt-BR")
  }

  static async getRanking() {
    try {
      const command = new ScanCommand({
        TableName: TABLE_NAME_RANKING,
      });
      const result = await docClient.send(command);
      const rankingArray = await Promise.all(
        result.Items.map(async (item) => {
          const user = await verificarSeUsuarioExiste(item?.id_user);
          return user
            ? {
                ranking: item,
                user: user.username,
              }
            : null;
        }).filter(Boolean)
      );

      const validRanking = rankingArray.filter(Boolean);

      validRanking.sort((a, b) => b.ranking.bestScore - a.ranking.bestScore);

      return validRanking;
    } catch (error) {
      throw new Error("Erro ao obter lista de Ranking" + error.message);
    }
  }

  static async updateToRanking(
    id_user,
    id_match,
    bestScore,
    bestStreak,
    difficulty
  ) {
    const rankingItem = new Ranking(
      id_user,
      id_match,
      bestScore,
      bestStreak,
      difficulty
    );
    try {
      const command = new GetCommand({
        TableName: TABLE_NAME_RANKING,
        Key: { id_user: id_user },
      });
      const result = await docClient.send(command);
      const rankingItemDatabase = result.Item;
      if (rankingItem?.bestScore < rankingItemDatabase?.bestScore)
        return new Error("Score atual menor que o melhor score");

      const updateCommand = new PutCommand({
        TableName: TABLE_NAME_RANKING,
        Item: rankingItem.toPublicObject(),
      });
      await docClient.send(updateCommand);
      logMessage("Partida " + id_match + " Adicionada com sucesso!");
    } catch (error) {
      throw new Error("Erro ao adicionar ao ranking: " + error.message);
    }
  }

  toPublicObject() {
    return {
      id_user: this.id_user,
      id_match: this.id_match,
      bestScore: this.bestScore,
      bestStreak: this.bestStreak,
      difficulty: this.difficulty,
    };
  }
}
