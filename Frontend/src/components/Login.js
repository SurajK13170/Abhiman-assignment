import React, { useState } from 'react'
import { loginUser } from '../api/api'
import { useNavigate } from 'react-router-dom'
import './auth.css'

function Login() {
    const [form, setForm] = useState({ name: "", password: "" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await loginUser(form);
            localStorage.setItem('token', data.token,);
            localStorage.setItem('userId', data.userId);
            navigate(`/profile/${data.userId}`);
        } catch (error) {
            alert('Login failed!');
        }

    }
    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    )
}

export default Login
