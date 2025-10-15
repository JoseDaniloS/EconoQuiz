import { uuidv7 } from "uuidv7";
import bcrypt from "bcrypt";

export class User {
  constructor(
    id,
    username,
    email,
    password,
    points,
    level,
    createdAt,
    isHashed = false
  ) {
    this.id = id || uuidv7();
    this.username = username;
    this.email = email;
    this.password = isHashed ? password : bcrypt.hashSync(password, 8);
    this.points = points ?? 0;
    this.level = level ?? 1;
    this.createdAt = createdAt || new Date().toISOString();
  }

  getID() {
    return this.id;
  }
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  setLevel(level) {
    this.level = level;
  }

  setPoints(points) {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }

  toPublicObject() {
    return {
      id: this.id,
      username: this.username,
      points: this.points,
      email: this.email,
      level: this.level,
      createdAt: this.createdAt,
    };
  }

  //Metodo estatioc para criar um novo usuario
  static createNewUser(username, email, password) {
    return new User(null, username, email, password, 0, 1, null, false);
  }

  //Metodo estatico para criar um usuario a partir do banco de dados
  static fromDatabase(item) {
    return new User(
      item.id,
      item.username,
      item.email,
      item.password,
      item.points,
      item.level,
      item.createdAt,
      true
    );
  }
}
