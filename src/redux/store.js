import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";

// Fonction pour charger l'état depuis le localStorage
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load state from localStorage", e);
        return undefined;
    }
}

// Fonction pour sauvegarder l'état dans le localStorage (pour gérer la persistence des données de notre state)
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.warn("Could not save state to localStorage", e);
    }
}

// On charge l'état précédemment sauvegardé dans localStorage
// On s'en servira comme état initial avec preloadedState
const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  preloadedState: persistedState,
});

// On subscribe une fonction au store, qui se déclenchera à chaque fois que l'état du store est mis à jour
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;