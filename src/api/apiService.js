import axios from 'axios';

const API_URL = 'https://interviewtesting.onrender.com';

export const getEmployeeList = async () => {
  return axios.get(`${API_URL}/v1/users/employee/list`);
};

export const getEmployee = async (id) => {
  return axios.get(`${API_URL}/v1/users/employee/${id}`);
};

export const updateEmployee = async (id, employeeData) => {
  return axios.put(`${API_URL}/v1/users/employee-update/${id}`, employeeData);
};

export const deleteEmployee = async (id) => {
  return axios.delete(`${API_URL}/v1/users/employee-remove/${id}`);
};
