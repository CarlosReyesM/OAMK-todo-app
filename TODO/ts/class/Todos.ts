import { Task } from "./Task.js";

class Todos {
  tasks: Array<Task> = [];
  #backendUrl = "";

  constructor(url: string) {
    this.#backendUrl = url;
  }

  getTask = async (): Promise<Task[]> => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backendUrl)
        .then((response) => response.json())
        .then(
          (response) => {
            this.#readJson(response);
            resolve(this.tasks);
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  #readJson(taskAsJson: any): void {
    taskAsJson.forEach((node: any) => {
      const task = new Task(node.id, node.description);
      this.tasks.push(task);
    });
  }

  #addToArray(id: number, text: string) {
    const task = new Task(id, text);
    this.tasks.push(task);
    return task;
  }

  addTask = async (text: string): Promise<Task> => {
    return new Promise(async (resolve, reject) => {
      const json = JSON.stringify({ description: text });
      fetch(`${this.#backendUrl}/new`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
        .then((response) => response.json())
        .then((response) => {
          resolve(this.#addToArray(response.id, text));
        }),
        (error: any) => {
          reject(error);
        };
    });
  };
}

export { Todos };
