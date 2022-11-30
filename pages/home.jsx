import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Image,
    Row,
    Col,
    Form,
    Button,
    Modal,
} from 'react-bootstrap';

import { useAppContext } from '@/context/AppContext';
import Head from 'next/head';

const initValue = { payto: '', amt: '' };

function Home() {
    const { state } = useAppContext();
    const { user, img, allMenu, thaiMenu } = state;

    useEffect(() => {
        const isLogin = localStorage.getItem('login');
        if (!isLogin) location = './login';
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState(initValue);

    function handleSetValue(event) {
        const { name, id, value } = event.target;
        setValue((prev) => {
            if (name === 'payto') return { ...prev, [name]: id };
            if (name === 'amt') return { ...prev, [name]: value };
        });
    }

    async function handlesubmit(event) {
        event.preventDefault();
        try {
            const result = await axios.post('/api/txn', {
                from_user: user.userName,
                ...value,
            });
            // console.log(result.data);
            // console.log(value);
            setValue(initValue);
            handleShow();
            setTimeout(handleClose, 1200);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            <Head>
                <title>MK-KPS for KASET FAIR : Home</title>
            </Head>
            <Container>
                <div style={{ maxWidth: '400px' }} className="mx-auto">
                    <div className="text-center m-2 mt-4">
                        <h2>{thaiMenu[user.userName]}</h2>
                        <Image
                            src={img[user.userName]}
                            alt={user.userName}
                            className="logo"
                            height={'150'}
                        />
                    </div>

                    <div className="linetext mb-2 text-muted">
                        <h5>&ensp;จ่ายให้&ensp;</h5>
                    </div>

                    <Row>
                        {allMenu.map((menu) => {
                            if (menu !== user.userName)
                                return (
                                    <Col
                                        key={menu}
                                        onClick={() => handleSetValue(event)}
                                    >
                                        <Image
                                            src={img[menu]}
                                            alt={menu}
                                            id={menu}
                                            className={`logo w-100 ${
                                                value?.payto === menu
                                                    ? 'paySelected'
                                                    : ''
                                            }`}
                                            height={'120'}
                                            name="payto"
                                        />
                                        <h5 className="text-center">
                                            {thaiMenu[menu]}
                                        </h5>
                                    </Col>
                                );
                        })}
                    </Row>

                    <Form
                        onSubmit={() => {
                            handlesubmit(event);
                        }}
                    >
                        <Form.Group className="mb-3" controlId="formPayAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Amount"
                                pattern="[0-9]*"
                                disabled={!value?.payto}
                                name="amt"
                                value={value?.amt}
                                onChange={(event) => handleSetValue(event)}
                            />
                            <Form.Text className="text-muted">
                                {value?.payto
                                    ? `จ่ายให้ ${thaiMenu[value?.payto]} ${
                                          value.amt ? value.amt : 0
                                      } บาท`
                                    : 'ต้องเลือกก่อนว่าจะจ่ายให้ใคร'}
                            </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!value?.payto || !value?.amt}
                            className="w-100"
                        >
                            ยืนยัน
                        </Button>
                    </Form>
                </div>
            </Container>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Complete!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Saved successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;
