// Simple game state manager using localStorage
const STORAGE_KEY = 'health_escape_progress_v1';

const defaultState = {
  solved: {
    room1: false,
    room2: false,
    room3: false,
    room4: false
  },
  codes: {
    room1: null,
    room2: null,
    room3: null,
    room4: null
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

window.GameState = {
  _state: loadState(),
  markSolved(room, code) {
    this._state.solved[room] = true;
    this._state.codes[room] = code;
    saveState(this._state);
  },
  isSolved(room) {
    return !!this._state.solved[room];
  },
  getCode(room) {
    return this._state.codes[room];
  },
  solvedRooms() {
    return Object.entries(this._state.solved)
      .filter(([_, v]) => v)
      .map(([k]) => k);
  },
  reset() {
    this._state = { ...defaultState };
    saveState(this._state);
  }
};
