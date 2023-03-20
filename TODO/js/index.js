const BACKEND_ROOT_URL = "http://localhost:3001";
import { Todos } from "./class/Todos.js";
const todos = new Todos(BACKEND_ROOT_URL);
const list = document.querySelector("#todolist");
const input = document.querySelector("#newtodo");
input.disabled = true;
todos
    .getTask()
    .then((tasks) => {
    tasks.forEach((task) => {
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
const renderTask = (task) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "list-group-item");
    listItem.setAttribute("data-key", task.id.toString());
    const itemText = document.createTextNode(task.text);
    listItem.append(itemText);
    renderSpan(listItem, task.text);
    renderLink(listItem, task.id);
    list.append(listItem);
};
const renderSpan = (listItem, text) => {
    const span = listItem.appendChild(document.createElement("span"));
    span.append(document.createTextNode(text));
};
const renderLink = (listItem, id) => {
    const link = listItem.appendChild(document.createElement("a"));
    link.innerHTML = '<i class="bi bi-trash"></i>';
    link.setAttribute("style", "float: right");
    link.addEventListener("click", (event) => {
        todos
            .removeTask(id)
            .then((id) => {
            const elementToRemove = document.querySelector(`[data-key='${id}']`);
            if (!elementToRemove) {
                return;
            }
            list.removeChild(elementToRemove);
        })
            .catch((error) => alert(error));
    });
};
