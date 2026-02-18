const STORAGE_KEY = "todo_tasks";

function isObject(value) {
  return value !== null && typeof value === "object";
}

function normalizeCreatedAt(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isValidRawTask(rawTask) {
  if (!isObject(rawTask)) {
    return false;
  }

  return (
    typeof rawTask.id === "string" &&
    typeof rawTask.title === "string" &&
    typeof rawTask.completed === "boolean" &&
    "createdAt" in rawTask
  );
}

function toTask(rawTask) {
  const title = rawTask.title.trim();
  const createdAt = normalizeCreatedAt(rawTask.createdAt);

  if (title.length === 0 || createdAt === null) {
    return null;
  }

  return {
    id: rawTask.id,
    title,
    completed: rawTask.completed,
    createdAt,
  };
}

function clearCorruptedStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignora erro de escrita no storage para manter o app funcional.
  }
}

export function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    return { tasks: [], error: "" };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    clearCorruptedStorage();
    return {
      tasks: [],
      error: "Dados locais invalidos. A lista foi reiniciada.",
    };
  }

  if (!Array.isArray(parsed)) {
    clearCorruptedStorage();
    return {
      tasks: [],
      error: "Formato invalido no armazenamento local. A lista foi reiniciada.",
    };
  }

  const tasks = parsed
    .filter((item) => isValidRawTask(item))
    .map((item) => toTask(item))
    .filter((item) => item !== null);

  if (tasks.length !== parsed.length) {
    try {
      saveTasks(tasks);
    } catch {
      // Se nao for possivel salvar, ainda retornamos os dados validos em memoria.
    }

    return {
      tasks,
      error: "Algumas tarefas invalidas foram descartadas.",
    };
  }

  return { tasks, error: "" };
}

export function saveTasks(tasks) {
  const serializable = tasks.map((task) => ({
    ...task,
    createdAt:
      task.createdAt instanceof Date
        ? task.createdAt.toISOString()
        : new Date(task.createdAt).toISOString(),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}

export { STORAGE_KEY };
