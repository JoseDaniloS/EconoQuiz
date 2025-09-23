import { uuidv7 } from "uuidv7";
import bcrypt from "bcrypt";

export class User {
  constructor(
    id,
    username,
    password,
    pontos,
    nivel,
    createdAt,
    isHashed = false
  ) {
    this.id = id || uuidv7();
    this.username = username;
    this.password = isHashed ? password : bcrypt.hashSync(password, 8);
    this.pontos = pontos ?? 0;
    this.nivel = nivel ?? 1;
    this.createdAt = createdAt || new Date().toISOString();
  }

  getID() {
    return this.id;
  }
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  setNivel(nivel) {
    this.nivel = nivel;
  }

  setPontos(pontos) {
    this.pontos = pontos;
  }

  getPontos() {
    return this.pontos;
  }

  toPublicObject() {
    return {
      id: this.id,
      username: this.username,
      pontos: this.pontos,
      nivel: this.nivel,
      createdAt: this.createdAt,
    };
  }

  static createNewUser(username, password) {
    return new User(null, username, password, 0, 1, null, false);
  }

  static fromDatabase(item) {
    return new User(
      item.id,
      item.username,
      item.password,
      item.pontos,
      item.nivel,
      item.createdAt,
      true
    );
  }
}
