import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './auth.css'

const Register = () => {
  const [form, setForm] = useState({ deviceId: '', name: '', phone: '', password: '', role: 'non-prime' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate('/login');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="deviceId" placeholder="Device ID" value={form.deviceId} onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="prime">Prime</option>
          <option value="non-prime">Non-Prime</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
