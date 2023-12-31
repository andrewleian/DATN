import { Person } from '@mui/icons-material'
import { Grid, Paper, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {

    const [message, setMessage] = useState('')
    const login = (event) => {
        event.preventDefault()
        let username = event.target.username.value
        let password = event.target.password.value
        authen(username, password)
    }

    async function authen(username, password) {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/authenticate/login',
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        Accept: 'application/json',
                    }
                }
            )
            localStorage.setItem("username", username)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.role)
            if (response.data.role === 'CUSTOMER') {
                window.location.href = '/'
            }
            else window.location.href = '/traCuuDonHang'
            setMessage("")
        } catch (error) {
            if (error.response.status === 403 || error.response.status === 401) {
                setMessage("Tài khoản hoặc mật khẩu không chính xác")
            } else {
                setMessage("Lỗi hệ thống " + error.response.status)
            }
        }
    }
    return (
        <React.Fragment>
            <Grid
                container
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
            >
                <Grid
                    item
                    sx={4}
                >
                    <Paper
                        component='form'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '15px'
                        }}
                        noValidate
                        autoComplete='off'
                        onSubmit={login}
                    >
                        <Person sx={{ fontSize: 40 }} />
                        <h1>LOGIN</h1>
                        <TextField
                            sx={{ width: '300px' }}
                            label='username'
                            type='text'
                            required
                            name='username'
                        /><br />
                        <TextField
                            sx={{ width: '300px' }}
                            label='password'
                            type='password'
                            required
                            name='password'
                        /><br />
                        <span style={{ color: 'red' }}>{message}</span>
                        <Button type='submit' variant='contained'>LOGIN</Button>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
