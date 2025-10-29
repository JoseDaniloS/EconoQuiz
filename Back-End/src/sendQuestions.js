import { PutCommand } from "@aws-sdk/lib-dynamodb";
import fs from "fs";
import docClient from "./config/database.js"; // ✅ verifique se termina com .js

const TABLE_NAME_QUESTIONS = process.env.DYNAMO_DB_TABLE_QUESTIONS;

// ✅ Lê e combina todos os arquivos JSON corretamente
const easy = JSON.parse(fs.readFileSync("./quiz_ods8_easy.json", "utf-8"));
const medium = JSON.parse(fs.readFileSync("./quiz_ods8_medium.json", "utf-8"));
const hard = JSON.parse(fs.readFileSync("./quiz_ods8_hard.json", "utf-8"));

const questions = [...easy, ...medium, ...hard]; // ✅ união correta dos arrays

async function sendAllQuestions() {
  console.log(
    `📘 Inserindo ${questions.length} questões na tabela ${TABLE_NAME_QUESTIONS}...`
  );

  for (const question of questions) {
    try {
      const command = new PutCommand({
        TableName: TABLE_NAME_QUESTIONS,
        Item: {
          ...question,
        },
      });

      await docClient.send(command);
      console.log(`✅ Inserida: ${question.id} - ${question.statement}`);
    } catch (error) {
      console.error(`❌ Erro ao inserir questão ${question.id}:`, error);
    }
  }

  console.log("🎉 Todas as questões foram inseridas com sucesso!");
}

// Executa o script
sendAllQuestions();
