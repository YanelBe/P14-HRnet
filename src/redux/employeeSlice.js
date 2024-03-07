import { createSlice } from "@reduxjs/toolkit";

// Création d'une slice Redux pour gérer les employés
export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [], // Le tableau initial des employés est vide  
  },
  reducers: {
    addEmployee: (state, action) => {
      // console.log("Before adding:", state.employees.length);
      state.employees.push(action.payload);
      // console.log("After adding:", state.employees.length);
    },
  },
});

// On exporte les actions générées par createSlice
export const { addEmployee } = employeeSlice.actions;

// On exporte les reducers à utiliser dans le store Redux
export default employeeSlice.reducer;
