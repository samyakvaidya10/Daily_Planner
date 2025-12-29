const KEY = "dailyTodoData";

export function loadData() {
  return JSON.parse(localStorage.getItem(KEY)) || {
    tasksByDate: {},
    history: {}
  };
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
