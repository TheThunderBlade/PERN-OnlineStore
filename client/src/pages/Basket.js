import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAllBasketItem, getBasketId, removeBasketItem, shoppingCartPayment} from "../http/basketAPI";
import {useHistory} from "react-router-dom";

const Basket = observer(() => {
    const {user, basket} = useContext(Context)
    const [order, setOrder] = useState([])
    const history = useHistory()
    let totalCost = 0

    useEffect(() => {
        if (basket.basketId === null) {
            getBasketId(user.user.id).then(basketId => {
                basket.setBasketId(basketId)
            })
        }
    }, [user.user.id, basket])

    useEffect(() => {
        if (basket.basketId !== null) {
            fetchAllBasketItem(basket.basketId).then(data => {
                setOrder(data)
            })
        }
    }, [basket.basketId])

    return (
        <Container>
            <h1>Моя корзина</h1>
            <Row className='d-flex flex-row justify-content-around'>
                {
                    order && order.map((item, index) => {
                            totalCost += item.price
                            return (
                                <Card key={index} className='m-1' style={{width: '19rem'}}>
                                    <Card.Img width={'100%'} height={200} variant="top"
                                              src={process.env.REACT_APP_API_URL + item.img}/>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <div className='d-flex flex-column'>
                                            <p>Рейтинг: <b>{item.rating}</b></p>
                                            <p>Цена: <b>{item.price}</b></p>
                                        </div>
                                        <Button onClick={() => {
                                            removeBasketItem(item.id, basket.basketId).then(data => {
                                                console.log(data)
                                            })

                                            history.push(`/basket/${basket.basketId}`)

                                        }} variant='outline-danger'>Удалить</Button>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    )
                }
            </Row>
            {
                order.length !== 0 ? <Row className='d-flex justify-content-around'>
                    <h4>Общая стоимость: {totalCost}</h4>
                    <Button onClick={() => {
                        shoppingCartPayment(basket.basketId).then(data => {
                            console.log(data)
                        })
                        history.push('/')
                    }} className='btn-lg'
                            variant={'outline-dark'}>Оплата</Button>
                </Row> : <Row className='d-flex justify-content-center'>
                    <h3>Корзина пуста</h3>
                </Row>
            }

        </Container>
    );
});

export default Basket;
