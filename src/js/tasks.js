import { loadTasks, saveTasks } from "./storage.js";

const state = {
  tasks: [],
  message: "",
};

function setMessage(message) {
  state.message = message;
}

function clearMessage() {
  setMessage("");
}

function syncTasks() {
  try {
    saveTasks(state.tasks);
    return true;
  } catch {
    setMessage("Nao foi possivel salvar as tarefas no navegador.");
    return false;
  }
}

function findTaskIndex(taskId) {
  return state.tasks.findIndex((task) => task.id === taskId);
}

export function initializeTasks() {
  const { tasks, error } = loadTasks();
  state.tasks = tasks;
  setMessage(error);
}

export function getTasks() {
  return state.tasks.map((task) => ({ ...task }));
}

export function getMessage() {
  return state.message;
}

export function addTask(title) {
  const cleanTitle = title.trim();

  if (cleanTitle.length === 0) {
    setMessage("Digite uma tarefa antes de adicionar.");
    return { ok: false };
  }

  const task = {
    id: crypto.randomUUID(),
    title: cleanTitle,
    completed: false,
    createdAt: new Date(),
  };

  state.tasks = [...state.tasks, task];

  const ok = syncTasks();
  if (ok) {
    clearMessage();
  }

  return { ok, task };
}

export function toggleTask(taskId) {
  const index = findTaskIndex(taskId);

  if (index < 0) {
    setMessage("Tarefa nao encontrada para alterar status.");
    return { ok: false };
  }

  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  );

  const ok = syncTasks();
  if (ok) {
    clearMessage();
  }

  return { ok };
}

export function updateTaskTitle(taskId, title) {
  const cleanTitle = title.trim();

  if (cleanTitle.length === 0) {
    setMessage("O titulo da tarefa nao pode ficar vazio.");
    return { ok: false };
  }

  const index = findTaskIndex(taskId);

  if (index < 0) {
    setMessage("Tarefa nao encontrada para edicao.");
    return { ok: false };
  }

  state.tasks = state.tasks.map((task) =>
    task.id === taskId ? { ...task, title: cleanTitle } : task,
  );

  const ok = syncTasks();
  if (ok) {
    clearMessage();
  }

  return { ok };
}

export function removeTask(taskId) {
  const index = findTaskIndex(taskId);

  if (index < 0) {
    setMessage("Tarefa nao encontrada para remocao.");
    return { ok: false };
  }

  state.tasks = state.tasks.filter((task) => task.id !== taskId);

  const ok = syncTasks();
  if (ok) {
    clearMessage();
  }

  return { ok };
}
