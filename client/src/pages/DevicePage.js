import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice, putMark} from "../http/deviceAPI";
import Style from './CSS/rating.module.css'
import baseImg from '../assets/baseImage.jpg'
import {createMark} from "../http/ratingAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {createBasketItem} from "../http/basketAPI";
import MessageComponent from "../components/MessageComponent";

const DevicePage = observer(() => {
    const {basket, user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const [message, setMessage] = useState('')
    const {id} = useParams()
    const markValue = [5, 4, 3, 2, 1]
    const imageURL = process.env.REACT_APP_API_URL + device.img

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))

        putMark(id).then(data => setMessage(data))
    }, [id])

    useEffect(() => {
        if(message) {
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }, [message])

    const postMark = (mark) => {
        try {
            createMark(user.user.id, id, mark).then(message => {
                setMessage(message.message)
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container className="mt-3">
            {
                message ? <MessageComponent message={message}/> : null
            }
            <Row className='d-flex justify-content-center'>
                <Col md={4}>

                    <Image width={'100%'} height={300} src={device.img === undefined ? baseImg : imageURL}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 215,
                                height: 215,
                                backgroundSize: 'cover',
                                fontSize: 50
                            }}
                        >
                            <p>{device.rating}</p>
                        </div>
                        <form className={Style.MarksForm}>
                            <div className={Style.MarksDiv}>
                                {markValue.map(mark => (
                                    <div key={mark}>
                                        <input className={Style.Marks} value={mark}
                                               type="radio"/>
                                        <label onClick={() => {
                                            postMark(mark)
                                        }} className={Style.MarksLabel}> </label>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </Row>
                </Col>
                <Col className='d-flex justify-content-center' md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button onClick={() => {
                            createBasketItem(id, basket.basketId).then(data => {
                                setMessage(data.message)
                            })
                        }} variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;
