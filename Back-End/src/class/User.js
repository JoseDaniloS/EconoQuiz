import { uuidv7 } from "uuidv7";
import bcrypt from "bcrypt";

export class User {
  constructor(
    id,
    username,
    email,
    password,
    createdAt,
    isHashed = false
  ) {
    this.id = id || uuidv7();
    this.username = username;
    this.email = email;
    this.password = isHashed ? password : bcrypt.hashSync(password, 8);
    this.createdAt = createdAt || new Date().toLocaleString("pt-BR");
  }

  getID() {
    return this.id;
  }
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  toPublicObject() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  //Metodo estatioc para criar um novo usuario
  static createNewUser(username, email, password) {
    return new User(null, username, email, password, null, false);
  }

  //Metodo estatico para criar um usuario a partir do banco de dados
  static fromDatabase(item) {
    return new User(
      item.id,
      item.username,
      item.email,
      item.password,
      item.createdAt,
      true
    );
  }
}
