import { createSlice } from "@reduxjs/toolkit";
import employeesData from "../data/employeesData.json";

// Création d'une slice Redux pour gérer les employés
export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: employeesData, // Le tableau initial des employés
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
