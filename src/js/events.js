import { startTaskEdit } from "./dom.js";

function getTaskIdFromElement(element) {
  const taskItem = element.closest(".task");
  return taskItem?.dataset.id ?? null;
}

function commitEdit(input, onEdit) {
  const taskItem = input.closest(".task");

  if (!taskItem || !taskItem.classList.contains("is-editing")) {
    return;
  }

  const taskId = taskItem.dataset.id;

  if (!taskId) {
    return;
  }

  onEdit(taskId, input.value);
}

export function bindTaskForm({ form, input, onSubmit }) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(input.value);
  });
}

export function bindTaskList({ list, onToggle, onRemove, onEdit }) {
  list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const taskId = getTaskIdFromElement(button);

    if (!taskId) {
      return;
    }

    if (action === "toggle") {
      onToggle(taskId);
      return;
    }

    if (action === "remove") {
      onRemove(taskId);
      return;
    }

    if (action === "edit") {
      const taskItem = button.closest(".task");
      if (taskItem) {
        startTaskEdit(taskItem);
      }
    }
  });

  list.addEventListener("keydown", (event) => {
    const input = event.target.closest("[data-role='edit-input']");

    if (!input) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      commitEdit(input, onEdit);
    }
  });

  list.addEventListener(
    "blur",
    (event) => {
      const input = event.target.closest("[data-role='edit-input']");

      if (!input) {
        return;
      }

      commitEdit(input, onEdit);
    },
    true,
  );
}
