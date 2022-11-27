import React, { useEffect } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { getSummaryData } from '@/api/api';
import { useAppContext } from '@/context/AppContext';
import Head from 'next/head';

function Summary() {
    const { state, dispatch } = useAppContext();
    const { summary, thaiMenu } = state;
    useEffect(() => {
        const isLogin = localStorage.getItem('login');
        if (!isLogin) location = './login';
    }, []);
    useEffect(() => {
        getSummaryData().then((data) => {
            dispatch({ type: 'setSummary', payload: data });
        });
    }, []);
    return (
        <>
            <Head>
                <title>MK-KPS for KASET FAIR : Summary</title>
            </Head>
            <Container clasename="">
                <div style={{ maxWidth: '400px' }} className="mx-auto ">
                    <br />
                    <h3 className="text-center">Summary</h3>
                    {Object.entries(summary).map(([day, V]) => {
                        return (
                            <Alert variant="warning" key={day}>
                                <h6>{day}</h6>

                                {Object.entries(V).map(([payer, v]) => {
                                    return (
                                        <div className=" m-1 ms-3" key={payer}>
                                            {thaiMenu[payer]}
                                            <div className=" m-1 ms-2">
                                                {Object.entries(v).map(
                                                    ([taker, amt]) => {
                                                        return (
                                                            <div key={taker}>
                                                                <span className="text-danger">
                                                                    ⌙{' '}
                                                                </span>
                                                                {
                                                                    thaiMenu[
                                                                        taker
                                                                    ]
                                                                }{' '}
                                                                : {amt}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <div className="line"></div>
                                        </div>
                                    );
                                })}
                            </Alert>
                        );
                    })}
                    {Object.keys(summary).length === 0 ? (
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

export default Summary;
