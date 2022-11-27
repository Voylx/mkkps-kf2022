import React, { use, useEffect } from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { useAppContext } from '@/context/AppContext';
import { getHistoryData } from '@/api/api';
import Head from 'next/head';

function History() {
    const { state, dispatch } = useAppContext();
    const { user, histories, thaiMenu } = state;

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear().toString().slice(2);
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min;
        return time;
    }

    useEffect(() => {
        const isLogin = localStorage.getItem('login');
        if (!isLogin) location = './login';
    }, []);

    useEffect(() => {
        if (user.userName) {
            getHistoryData({ user }).then((data) => {
                // console.log(data);
                dispatch({ type: 'setHistories', payload: data });
            });
        }
    }, [user.userName]);

    useEffect(() => {
        const abc = document.querySelector('body');
        abc.className = 'bg-y';
    }, []);

    return (
        <>
            <Head>
                <title>MK-KPS for KASET FAIR : History</title>
            </Head>

            <Container>
                <div style={{ maxWidth: '400px' }} className="mx-auto bg-y">
                    <br />
                    <h3 className="text-center">History</h3>
                    <Alert variant="" className="p-2 m-0">
                        {/* <Row className="space-between text-center pe-2"> */}
                        <div className="text-end">บาท</div>
                        {/* </Row> */}
                    </Alert>

                    {histories.map((history) => {
                        history.info = ['', ''];
                        if (history.to_user === user.userName) {
                            history.info = ['ได้รับจาก', history.from_user];
                            history.color = 'success';
                        }
                        if (history.from_user === user.userName) {
                            history.info = ['จ่ายให้', history.to_user];
                            history.color = 'danger';
                        }
                        return (
                            <Alert
                                variant="light"
                                className="p-2 mb-2 border-y"
                                key={history.id}
                            >
                                <Row className="space-between text-center pe-2">
                                    <Col className="">
                                        {timeConverter(history.ts)}
                                    </Col>
                                    <Col className={'text-' + history.color}>
                                        {history?.info[0]}
                                    </Col>
                                    <Col className="">
                                        {thaiMenu[history.info[1]]}
                                    </Col>
                                    <Col className="text-end">
                                        {history.amt}{' '}
                                    </Col>
                                </Row>
                            </Alert>
                        );
                    })}
                    {!histories[0] ? (
                        <Alert variant="secondary" className="p-2 mb-2">
                            <Row className="space-between text-center pe-2 text-secondary">
                                <Col> There's nothing here ... </Col>
                            </Row>
                        </Alert>
                    ) : (
                        <></>
                    )}
                </div>
            </Container>
        </>
    );
}

export default History;
