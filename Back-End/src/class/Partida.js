import { uuidv7 } from "uuidv7";

export class Partida {
    constructor(id, usuario) {
        this.id = id || uuidv7();
        this.usuario = usuario;
        this.questoesRespondidas = [];
        this.sequenciaAcertos = 0;
    }

    adicionarQuestão(questao) {
        this.questoesRespondidas.push(questao);
    }

    incremetarAcertos() {
        this.sequenciaAcertos++;
    }

    resetarAcertos() {
        this.sequenciaAcertos = 0;
    }
}