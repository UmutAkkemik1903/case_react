import React, { useState } from 'react';
import {Modal, Steps, theme, Checkbox, List, notification,Button, Spin , DatePicker, Form, Input,message} from 'antd';
import tripCityData from "../../utils/tripCity.json";
import tripData from "../../utils/trip.json";
import cityData from "../../utils/city.json";
import BusSeatData from "../../utils/bus_seat.json";
import { ArrowRightOutlined,WomanOutlined,ManOutlined,LoadingOutlined   } from '@ant-design/icons';
type SizeType = Parameters<typeof Form>[0]['size'];
import {useRouter} from "next/router";
const Order = ({visible,onCancel,id}) => {
    const router = useRouter();
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const openNotification = (type) => {
        notification[type]({
            message: 'İşlem Hatası',
            description: '5 biletten fazla satın alamazsınız!',
            duration: 3,
        });
    };
    const genderNotification = (type) => {
        notification[type]({
            message: 'İşlem Hatası',
            description: 'Karşı cinsin yanına oturulamaz',
            duration: 3,
        });
    };
    const orderNotification = (type) => {
        notification[type]({
            message: 'Siparişiniz alındı',
            description: 'Bilet işleminiz gerçekleşti.',
            duration: 3,
        });
    };
    const priceNotification = (type) => {
        notification[type]({
            message: 'Koltuk seçilmedi',
            description: 'Lütfen koltuk seçin!',
            duration: 3,
        });
    };
    const [total,setTotalPrice] = useState(null);
    const combinedData = tripCityData.trip_city.map((tripCity, index) => {
        const trip = tripData.trip.find(trip => trip.id === tripCity.trip_id);
        const startingCity = cityData.city.find(city => city.id === trip.starting_city_id);
        const destinationCity = cityData.city.find(city => city.id === trip.destination_city_id);
        const busSeat = BusSeatData.bus_seat.find(bus_seat =>tripCity.id === bus_seat.trip_city_id )

        return {
            ...tripCity,
            trip_id: tripCity.id,
            trip_price:tripCity.price,
            startingCity: startingCity ? startingCity.city_name : "",
            destinationCity: destinationCity ? destinationCity.city_name : "",
            starting_city_id: startingCity ? startingCity.id : undefined,
            destination_city_id: destinationCity ? destinationCity.id : undefined,
            busSeat: busSeat ? busSeat.empty_bus_seat_count : undefined
        };
    });
    const listDataById = (data, idToFind) => {
        return data.find(item => item.id === idToFind);
    };

    const specificTripCityId = id;

    const specificTripCity = listDataById(combinedData, specificTripCityId);

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const jwt = require('jsonwebtoken');
    const handleCheckboxChange = (e) => {
        const checkboxValue = e.target.value;
        const user =  localStorage.getItem('token');
        const decoded = jwt.verify(user, 'mysecretkey');
        if (e.target.checked) {
            if (checkboxValue === "checkbox1" && "2" !== decoded.user.gender) {
                genderNotification('error');
            } else if (checkboxValue === "checkbox6" && "1" !== decoded.user.gender) {
                genderNotification('error');
            } else if (selectedCheckboxes.length < 5) {
                setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
                setTotalPrice((prevPrice) => prevPrice + 950);
            } else {
                openNotification('error');
            }
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== checkboxValue));
            setTotalPrice((prevPrice) => prevPrice - 950);
        }
    }
    const done = (e) => {

    }
    const handleSubmit = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            orderNotification('success');
            onCancel(false);
        }, 1000);
    };
    const steps = [
        {
            title: 'Sefer Bilgileri',
            content: [
                <div style={{minHeight:'200px',minWidth:'700px',backgroundColor:'white',display: 'flex'}}>
                    <div style={{display: 'flex',border: `1px ridge`,margin:'20px 20px 20px 40px',minWidth:'200px',minHeight:'100',alignContent:'center'}}>
                        <div style={{marginLeft:'50px',marginTop:'50px',float:'left'}}>
                            <div style={{display:'flex'}}>
                                <WomanOutlined  onChange={() => handleCheckboxChange("2")} />
                                <Checkbox value="checkbox1" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox1')} ></Checkbox>
                            </div>
                            <div style={{display:'flex'}}>
                                <Checkbox value="checkbox2" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox2')} ></Checkbox>
                                <Checkbox value="checkbox3" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox3')} ></Checkbox>
                            </div>
                            <div style={{display:'flex'}}>
                                <Checkbox value="checkbox4" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox4')}></Checkbox>
                                <Checkbox value="checkbox5" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox5')}></Checkbox>
                            </div>
                        </div>
                        <div style={{marginLeft:'15px',marginTop:'50px',float:'left'}}>
                            <div style={{display:'flex'}}>
                                <ManOutlined  onChange={() => handleCheckboxChange("1")} checked={selectedCheckboxes.includes("1")} />
                                <Checkbox value="checkbox6" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox6')}></Checkbox>
                            </div>
                            <div style={{display:'flex'}}>
                                <Checkbox value="checkbox7" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox7')}></Checkbox>
                                <Checkbox value="checkbox8" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox8')}></Checkbox>
                            </div>
                            <div style={{display:'flex'}}>
                                <Checkbox value="checkbox9" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox9')}></Checkbox>
                                <Checkbox value="checkbox10" onChange={(value)=>handleCheckboxChange(value)} checked={selectedCheckboxes.includes('checkbox10')}></Checkbox>
                            </div>
                        </div>
                    </div>
                    <div style={{float:'left', minWidth:'600px'}}>
                        <List
                            style={{}}
                            itemLayout="horizontal">
                                <List.Item>
                                    <List.Item.Meta
                                        title={<p>{visible ? specificTripCity.startingCity : null} <ArrowRightOutlined /> {visible ? specificTripCity.destinationCity : null}</p>}
                                        description={<p>{visible ? specificTripCity.trip_date : null} <ArrowRightOutlined /> {visible ? specificTripCity.hour : null } <ArrowRightOutlined /> {visible ? specificTripCity.trip_price+'₺' : null }</p>}
                                    />
                                </List.Item>
                            <hr/>
                            <p>Toplam Ücret : {total} ₺ </p>
                        </List>
                    </div>
                </div>
            ]
        },
        {
            title: 'Ödeme',
            content: [
                <div style={{minHeight:'150px',backgroundColor:'white'}}>
                    <Form
                        onFinish={handleSubmit}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        layout="horizontal"
                        initialValues={{ size: componentSize }}
                        onValuesChange={onFormLayoutChange}
                        size="large"
                        style={{marginLeft:'25px', maxWidth: 600, marginTop:'25px',backgroundColor:'white' }}
                    >
                        <Form.Item name="Kart Numarası" rules={[{ required: true }]} label="Kart Numarası :">
                            <Input  maxLength={16} />
                        </Form.Item>
                        <Form.Item name="Kart Sahibi" rules={[{ required: true }]} label="Kart Sahibi :">
                            <Input />
                        </Form.Item>
                        <div style={{display:'flex',marginLeft:'85px'}}>
                            <Form.Item name="SKT" rules={[{ required: true }]} label="SKT :" >
                                <DatePicker picker="month" />
                            </Form.Item>
                            <Form.Item name="CVV" rules={[{ required: true }]} style={{marginRight:'75px'}} label="CVV">
                                <Input maxLength={3} />
                            </Form.Item>
                        </div>
                        <hr/>
                        <p>İşlem Tutaı : {total}₺</p>
                        <Form.Item style={{marginLeft:'800px'}}>

                                <Button htmlType="submit" type="primary" style={{float:'right'}}>Ödeme yap</Button>


                        </Form.Item>

                    </Form>
                </div>
            ],
        }
    ];
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        if(total > 0){
            setCurrent(current + 1);
        } else {
            priceNotification('warning')
        }

    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        color: token.colorTextTertiary,
        backgroundColor: 'white',
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <>
            <Modal
                title={ <p>{visible ? specificTripCity.startingCity : null} <ArrowRightOutlined /> {visible ? specificTripCity.destinationCity : null}</p>}
                style={{minHeight:'250px'}}
                centered
                okButtonProps={null}
                visible={visible}
                onCancel={onCancel}
                width={1000}
                footer={(
                    <Button onClick={onCancel}>
                        Vazgeç
                    </Button>
                )}
            >
                <Spin spinning={loading} indicator={<LoadingOutlined />} tip="Loading...">
                <Steps current={current} items={items} />
                <div style={contentStyle}>{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button style={{float:'left'}} type="primary" onClick={() => next()}>
                            İleri
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Geri
                        </Button>
                    )}
                </div>
                </Spin>
            </Modal>
        </>
    );
};

export default Order;