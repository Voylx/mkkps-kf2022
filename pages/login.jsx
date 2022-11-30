import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import { Button, Container, Form, Alert } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAppContext } from '@/context/AppContext';

function Login() {
    const { state, dispatch } = useAppContext();

    const user = state.user;

    useEffect(() => {
        const isLogin = localStorage.getItem('login');
        if (isLogin) location = './home';
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    function handelLogin() {
        Axios.post('/api/login', {
            username,
            password,
        })
            .then((res) => {
                console.log(res.data);
                setErrMsg('');
                if (res.data.user) {
                    localStorage.setItem('login', true);
                    dispatch({ type: 'setUser', payload: res.data.user });
                    window.location = '../home';
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                // setisError(true);
                setErrMsg(
                    err?.response?.data?.message ??
                        'Could not connect to the server.'
                );
            });
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            handelLogin();
        }
    };

    return (
        <>
            <Head>
                <title>MK-KPS for KASET FAIR : Login</title>
            </Head>
            {/* <HeaderPreLogin /> */}

            <Container fluid="md">
                <Form
                    className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
                    style={{ borderRadius: '11px' }}
                >
                    <h2 className="ms-7 ">Login</h2>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="test"
                            placeholder="Username"
                            onChange={(event) => {
                                setUsername(
                                    event.target.value?.toLocaleLowerCase()
                                );
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            onKeyPress={handleKeypress}
                        />
                    </Form.Group>
                    {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                    <Button
                        variant="primary"
                        type="button"
                        className="mb-2 w-100"
                        onClick={handelLogin}
                    >
                        Login
                    </Button>
                    <div className="linetext mb-2 text-muted">
                        &ensp; Or &ensp;{' '}
                    </div>
                    <Button
                        variant="success"
                        type="button"
                        className="mb-2 w-100"
                        as={Link}
                        href="/register"
                        disabled={true}
                    >
                        Create New Account
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default Login;
