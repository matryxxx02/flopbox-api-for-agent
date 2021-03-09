import { Drash } from "./deps.ts";

let todos = [
  {
    "id": 1,
    "title": "Passer à Typescript",
    "completed": false,
  },
  {
    "id": 2,
    "title": "Créer une API REST",
    "completed": false,
  },
  {
    "id": 3,
    "title": "M'abonner à Devtheory",
    "completed": false,
  },
];

export class TodoList extends Drash.Http.Resource {
  static paths = ["/todos"];

  public GET(): Drash.Http.Response {
    this.response.body = todos;
    return this.response;
  }
}
