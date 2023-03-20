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
  listItem.setAttribute("data-key", task.id.toString());
  const itemText = document.createTextNode(task.text);
  listItem.append(itemText);
  renderSpan(listItem, task.text);
  renderLink(listItem, task.id);
  list.append(listItem);
};

const renderSpan = (listItem: HTMLLIElement, text: string) => {
  const span = listItem.appendChild(document.createElement("span"));
  span.append(document.createTextNode(text));
};

const renderLink = (listItem: HTMLLIElement, id: number) => {
  const link = listItem.appendChild(document.createElement("a"));
  link.innerHTML = '<i class="bi bi-trash"></i>';
  link.setAttribute("style", "float: right");
  link.addEventListener("click", (event) => {
    todos
      .removeTask(id)
      .then((id) => {
        const elementToRemove: HTMLLIElement | null = document.querySelector(
          `[data-key='${id}']`
        );
        if (!elementToRemove) {
          return;
        }
        list.removeChild(elementToRemove);
      })
      .catch((error: any) => alert(error));
  });
};
