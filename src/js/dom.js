function createActionButton(label, action, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  button.className = className;
  return button;
}

function createTaskItem(task) {
  const item = document.createElement("li");
  item.className = "task";
  item.dataset.id = task.id;

  if (task.completed) {
    item.classList.add("completed");
  }

  const toggleButton = createActionButton(
    task.completed ? "Reabrir" : "Concluir",
    "toggle",
    "btn-toggle",
  );

  const content = document.createElement("div");
  content.className = "task-content";

  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = task.title;
  editInput.className = "task-edit-input";
  editInput.dataset.role = "edit-input";
  editInput.hidden = true;

  const status = document.createElement("span");
  status.className = task.completed ? "status is-done" : "status is-open";
  status.textContent = task.completed ? "Concluida" : "Pendente";

  content.append(title, editInput, status);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = createActionButton("Editar", "edit", "btn-edit");
  const removeButton = createActionButton("Remover", "remove", "btn-remove");

  actions.append(editButton, removeButton);
  item.append(toggleButton, content, actions);

  return item;
}

export function renderTasks(listElement, tasks) {
  const fragment = document.createDocumentFragment();

  if (tasks.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "Nenhuma tarefa por enquanto.";
    fragment.append(emptyState);
  } else {
    tasks.forEach((task) => {
      fragment.append(createTaskItem(task));
    });
  }

  listElement.replaceChildren(fragment);
}

export function showMessage(messageElement, text, type = "error") {
  messageElement.textContent = text;
  messageElement.classList.remove("is-error");

  if (type === "error" && text) {
    messageElement.classList.add("is-error");
  }
}

export function clearMessage(messageElement) {
  messageElement.textContent = "";
  messageElement.classList.remove("is-error");
}

export function startTaskEdit(taskItem) {
  const title = taskItem.querySelector(".task-title");
  const input = taskItem.querySelector("[data-role='edit-input']");

  if (!title || !input) {
    return;
  }

  taskItem.classList.add("is-editing");
  title.hidden = true;
  input.hidden = false;
  input.focus();

  const end = input.value.length;
  input.setSelectionRange(end, end);
}
