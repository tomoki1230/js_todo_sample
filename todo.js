const addButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

const addTodo = () => {
  // 空欄ならタスクを追加しない
  if (todoInput.value === '') return;

  const newTodo = document.createElement('li');

  // タスク名
  const todoContent = document.createElement('span');
  todoContent.innerText = todoInput.value;
  todoContent.addEventListener('click', editTodo);
  todoContent.classList.add('todo-content');
  newTodo.appendChild(todoContent);

  // 完了 未着手ボタン
  todoList.appendChild(newTodo);
  const checkButton = document.createElement('button');
  checkButton.addEventListener('click', switchState);
  checkButton.innerHTML = '<i class="far fa-square"></i>';
  checkButton.classList.add('check-button');
  newTodo.appendChild(checkButton);

  // 削除ボタン
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', deleteTodo);
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add('delete-button');
  newTodo.appendChild(deleteButton);

  // 上記内容をlistへ追加
  todoList.appendChild(newTodo);

  // 入力フォームの値を消去
  todoInput.value = '';
};

const switchState = (e) => {
  const checkButton = e.target.closest('.check-button');

  if (checkButton.dataset.state !== 'complete') {
    checkButton.innerHTML = '<i class="far fa-check-square"></i>';
    checkButton.dataset.state = 'complete';
  } else {
    checkButton.innerHTML = '<i class="far fa-square"></i>';
    checkButton.dataset.state = '';
  }
};

const deleteTodo = (e) => {
  const todoList = e.target.closest('li');
  todoList.remove();
};

// フォーカスが外れた際（編集完了後）にフィールドを消去する関数
const saveTodoContent = (e) => {
  const itemToSave = e.target;
  const textValue = itemToSave.value;
  if (textValue !== '') {
    itemToSave.parentNode.textContent = textValue;
  }
};

const editTodo = (e) => {
  const itemToEdit = e.target;

  // 編集用のテキストフィールドに置き換える
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.classList.add('editbox');
  input.setAttribute('value', itemToEdit.textContent);
  itemToEdit.textContent = '';
  itemToEdit.appendChild(input);

  // 編集後にフィールドを除去するイベントを追加
  const editContent = itemToEdit.querySelector('.editbox');

  editContent.addEventListener('blur', saveTodoContent);
};

addButton.addEventListener('click', addTodo);
