import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'


function Login(props) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser)
        {
            props.setComponent(props.Component.USERPAGE);
        } else {
            //
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            props.setComponent(props.Component.USERPAGE);
        } catch {
            setError('Failed to log in');
        }
    }

    return (

        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>

                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">
                            Log In
                        </h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control type="email" ref={emailRef} required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control type="password" ref={passwordRef} required>
                                </Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Log In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <a className="links" onClick={() => props.setComponent(props.Component.REGISTER)}>
                        Need an account?
                    </a>
                </div>

            </div>
        </Container>
    );
}

export default Login;
