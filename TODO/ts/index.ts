const BACKEND_ROOT_URL = "http://localhost:3001";
import { Task } from "./class/Task.js";
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL);


const list = <HTMLUListElement>document.querySelector("#todolist");
const input = <HTMLInputElement>document.querySelector("#newtodo");

input.disabled = true;

todos
  .getTask()
  .then((tasks: Array<Task>) => {
    tasks.forEach((task: any) => {
      renderTask(task);
    });
    input.disabled = false;
  })
  .catch((error) => alert(error));

input.addEventListener("keypress", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  const text = input.value.trim();
  if (!text.length) {
    return;
  }
  todos
    .addTask(text)
    .then((task) => {
      input.value = "";
      input.focus();
      renderTask(task);
    })
    .catch((error) => alert(error));
});

const renderTask = (task: Task) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "list-group-item");
  const itemText = document.createTextNode(task.text);
  listItem.append(itemText);
  list.append(listItem);
};
