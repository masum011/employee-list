import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteEmployee, getEmployee, getEmployeeList, updateEmployee } from '../../api/apiService';

const initialState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await getEmployeeList();
  return response.data;
});

export const fetchEmployee = createAsyncThunk('employees/fetchEmployee', async (id) => {
  const response = await getEmployee(id);
  return response.data;
});


export const updateExistingEmployee = createAsyncThunk('employees/updateExistingEmployee', async ({ id, employeeData }) => {
  const response = await updateEmployee(id, employeeData);
  return response.data;
});

export const removeEmployee = createAsyncThunk('employees/removeEmployee', async (id) => {
  await deleteEmployee(id);
  fetchEmployees()
  return id;
});

// Slice
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch employees
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload.data;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch single employee
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.selectedEmployee = action.payload;
    });

    // Update employee
    builder.addCase(updateExistingEmployee.fulfilled, (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    });

    // Remove employee
    builder.addCase(removeEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    });
  },
});

export default employeeSlice.reducer;
