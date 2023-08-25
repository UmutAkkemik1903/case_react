import React, {useState} from 'react';
import { Button, Form, Select,DatePicker,Table,Alert   } from 'antd';
import type { FormInstance } from 'antd/es/form';
const { Option } = Select;
import cityData  from "../utils/city.json";
import tripCityData from '../utils/tripCity.json';
import tripData from '../utils/trip.json';
import BusSeatData from '../utils/bus_seat.json';
import moment from 'moment';
import OrderModal from "../pages/order/orderModal";
import { useFilterContext } from '../context/Context';
const Filter: React.FC = () => {
    const openModal = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null);
        setOpen(false);
    };
    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            const formattedDate = date.format('YYYY/MM/DD');
            setTripDate(formattedDate);
        } else {
            setTripDate(undefined);
        }
    };
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const dateFormat = 'YYYY/MM/DD';
    const { startingCity, setStartingCity, destinationCity, setDestinationCity, tripDate, setTripDate } = useFilterContext();
    const [showNoDataAlert, setShowNoDataAlert] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const formRef = React.useRef<FormInstance>(null);
    const startingFilter = cityData.city.filter((item) => item.starting === 1);
    const destinationFilter = cityData.city.filter((item) => item.starting === 0);
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
    const columns = [
        { title: 'Başlangıç Şehri', dataIndex: 'startingCity', key: 'startingCity' },
        { title: 'Varış Şehri', dataIndex: 'destinationCity', key: 'destinationCity' },
        { title: 'Sefer Tarihi', dataIndex: 'trip_date', key: 'trip_date' },
        { title: 'Sefer Saati', dataIndex: 'hour', key: 'hour' },
        { title: 'Boş Koltuk Sayısı', dataIndex: 'busSeat', key: 'busSeat' },
        { title: 'Sefer Fiyatı', dataIndex: 'price', key: 'price', render: (price) => `${price}₺`},
        { title: '', dataIndex: '', key: '', render: (record) => <Button onClick={() => openModal(record.trip_id)} style={{backgroundColor:'#20b2aa', color:'white'}}>Satın Al</Button>},
    ];

    const handleFilterSubmit = () => {
        let filteredData = combinedData;

        if (startingCity !== null) {
            filteredData = filteredData.filter(tripCity => tripCity.starting_city_id === startingCity);
        }

        if (destinationCity !== null) {
            filteredData = filteredData.filter(tripCity => tripCity.destination_city_id === destinationCity);
        }

        if (tripDate !== null) {
            filteredData = filteredData.filter(tripCity => tripCity.trip_date === tripDate);
        }
        if (filteredData.length === 0) {
            setShowNoDataAlert(true);
        } else {
            setShowNoDataAlert(false);
        }
        console.log(combinedData)
        setFilteredData(filteredData);
    };
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };


    return (
        <div>
            <OrderModal visible={open} onCancel={closeModal} id={selectedId} />
            <Form
                ref={formRef}
                name="control-ref"
                style={{marginLeft:'250px' ,maxWidth: 2000, justifyContent:'center' }}
            >
                <Form.Item style={{ display: 'inline-block', width: 'calc(25% - 25px)' }} name="Başlangıç Şehir" label="Kalkış Yeri" rules={[{ required: true }]}>
                    <Select
                        placeholder="Başlangıç şehrini seçiniz!"
                        allowClear
                        onChange={(value) => setStartingCity(value)}
                    >
                        {startingFilter.map((startingCity)=>(

                            <Option key={startingCity.id} value={startingCity.id} >{startingCity.city_name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', width: 'calc(25% - 25px)',marginLeft:'5px' }} name="Hedef Şehir " label="Varış Yeri" rules={[{ required: true }]}>
                    <Select
                        placeholder="Hedef şehri seçiniz"
                        allowClear
                        onChange={(value) => setDestinationCity(value)}
                    >
                        {destinationFilter.map((desnitionCity)=>(
                            <Option key={desnitionCity.id} value={desnitionCity.id}>{desnitionCity.city_name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item style={{ display: 'inline-block',width: 'calc(25% - 25px)',marginLeft:'5px' }} name="Sefer Tarihi" label="Sefer Tarihi" rules={[{ required: true }]}>
                    <DatePicker onChange={handleDateChange} format={dateFormat} />
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', width: 'calc(25% - 5px)' }}>
                    <Button onClick={handleFilterSubmit} type="primary" htmlType="submit">
                        Sefer Ara
                    </Button>
                    <Button onClick={logout} style={{float:'right',marginLeft:'50px'}}>Çıkış Yap</Button>
                </Form.Item>
            </Form>
            {showNoDataAlert && (
                <Alert
                    message="Sefer bulunamadı."
                    type="warning"
                    showIcon
                    closable
                    onClose={() => setShowNoDataAlert(false)}
                />
            )}
            <Table style={{marginTop:'15px'}} dataSource={filteredData} columns={columns} />
        </div>

    );
};

export default Filter;