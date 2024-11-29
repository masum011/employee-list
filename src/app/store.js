import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '../features/employees/employeeSlice'
const store = configureStore({
  reducer: {
    employees: employeeSlice,
  },
});

export default store;
