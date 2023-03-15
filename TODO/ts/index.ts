const list = <HTMLUListElement>document.querySelector('#todolist');
const input = <HTMLInputElement>document.querySelector('#newtodo');

input.addEventListener('keypress', (event) => {
  if (event.key !== 'Enter') {
    return;
  }
  event.preventDefault();
  const text = input.value.trim();
  if (!text.length) {
    return;
  }
  const listItem = document.createElement('li');
  listItem.setAttribute('class', 'list-group-item');
  const itemText =  document.createTextNode(text);
  listItem.append(itemText);
  list.append(listItem);
  input.value = '';
});
