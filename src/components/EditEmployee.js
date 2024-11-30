import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployee, fetchEmployees, updateExistingEmployee } from '../features/employees/employeeSlice';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state) =>state?.employees?.selectedEmployee?.data);
  console.log(id,'empDetails')
  const [fullName, setFullName] = useState(employee ? employee.fullName : '');
  const [age, setAge] = useState(employee ? employee.age : '');
  const [email, setEmail] = useState(employee ? employee.email : '');
  const [phone, setPhone] = useState(employee ? employee.phone : '');
  const [salary, setSalary] = useState(employee ? employee.salary : '');  
  const [image, setImage] = useState(employee ? employee.image : '');
  const [btnLoading,setBtnLoading]=useState(false)
  console.log(btnLoading)
  useEffect(() => {
    if (!employee || employee._id !== id) {
      dispatch(fetchEmployee(id));  // Fetch the employee if not already loaded
    } else {
      // Populate form fields when employee data is available
      setFullName(employee.fullName);
      setAge(employee.age);
      setEmail(employee.email);
      setPhone(employee.phone);
      setSalary(employee.salary);
      setImage(employee.image || '');  // Optional image field
    }
  }, [dispatch, id, employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true)
   await dispatch(updateExistingEmployee({ id, employeeData: { fullName, age, email, phone, salary,image } })).unwrap();
    dispatch(fetchEmployees());
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4">Edit Employee</Typography>
      {image && <img src={image} alt='user' width="150" height="150" />}
      <form onSubmit={handleSubmit}>
        <TextField
          label="FullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Photo URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          {btnLoading? 'loading...' : 'Update'}
        </Button>
      </form>
    </Container>
  );
};

export default EditEmployee;
