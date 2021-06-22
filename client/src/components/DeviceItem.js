import React, {useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchOneBrands} from "../http/deviceAPI";

const DeviceItem = ({device, deviceBrandId}) => {
    const history = useHistory()
    const [brandName, setBrandName] = useState('')


    useEffect(() => {
        fetchOneBrands(deviceBrandId).then(data => {
            setBrandName(data.name)
        })

    }, [deviceBrandId])

    return (
        <Col md={3} className={"d-flex justify-content-center mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: '100%', cursor: 'pointer'}} border={"dark"}>
                <Image width={'100%'} height={200} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{brandName}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
