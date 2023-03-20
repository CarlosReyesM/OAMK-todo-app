"use strict";
const BACKEND_ROOT_URL = "http://localhost:3001";
const list = document.querySelector("#todolist");
const input = document.querySelector("#newtodo");
input.disabled = true;
fetch(BACKEND_ROOT_URL)
    .then((response) => response.json())
    .then((response) => {
    response.forEach((task) => {
        renderTask(task.description);
    });
    input.disabled = false;
}, (error) => {
    alert(error);
});
input.addEventListener("keypress", (event) => {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();
    const text = input.value.trim();
    if (!text.length) {
        return;
    }
    const json = JSON.stringify({ description: text });
    fetch(`${BACKEND_ROOT_URL}/new`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: json,
    })
        .then((response) => response.json())
        .then(() => {
        renderTask(text);
        input.value = "";
    }, (error) => {
        alert(error);
    });
});
const renderTask = (text) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "list-group-item");
    const itemText = document.createTextNode(text);
    listItem.append(itemText);
    list.append(listItem);
};
