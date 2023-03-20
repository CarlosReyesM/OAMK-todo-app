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
    const itemText = document.createTextNode(task.text);
    listItem.append(itemText);
    list.append(listItem);
};
