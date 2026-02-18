import {
  addTask,
  getMessage,
  getTasks,
  initializeTasks,
  removeTask,
  toggleTask,
  updateTaskTitle,
} from "./tasks.js";
import { clearMessage, renderTasks, showMessage } from "./dom.js";
import { bindTaskForm, bindTaskList } from "./events.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const messageElement = document.querySelector("#message");

if (!form || !input || !list || !messageElement) {
  throw new Error("Elementos obrigatorios da interface nao foram encontrados.");
}

function refreshView() {
  renderTasks(list, getTasks());

  const message = getMessage();

  if (message) {
    showMessage(messageElement, message, "error");
  } else {
    clearMessage(messageElement);
  }
}

function handleAddTask(title) {
  const result = addTask(title);

  if (result.ok) {
    input.value = "";
    input.focus();
  }

  refreshView();
}

function handleToggleTask(taskId) {
  toggleTask(taskId);
  refreshView();
}

function handleRemoveTask(taskId) {
  removeTask(taskId);
  refreshView();
}

function handleEditTask(taskId, title) {
  updateTaskTitle(taskId, title);
  refreshView();
}

initializeTasks();
refreshView();

bindTaskForm({
  form,
  input,
  onSubmit: handleAddTask,
});

bindTaskList({
  list,
  onToggle: handleToggleTask,
  onRemove: handleRemoveTask,
  onEdit: handleEditTask,
});
