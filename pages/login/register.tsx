import React, {useState} from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useRouter } from 'next/router';
import usersData from '../../utils/users.json';
import {Form, Input, Button, notification, DatePicker, Select} from 'antd';
const { Option } = Select;

const RegisterPage:React.FC = () => {
    const dateFormat = 'YYYY/MM/DD';
    const router = useRouter();

    const successNotification = (type) => {
        notification[type]({
            message: 'Kayıt',
            description: 'Kayıt Başarılı',
            duration: 0,
        });
    };
    const errorNotification = (type) => {
        notification[type]({
            message: 'Kayıt Başarısız',
            description: 'Lütfen bilgileri eksiksiz girin!',
            duration: 0,
        });
    };
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [birtday, setBirtday] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        try {
            if (email){
                const newUser = {  id: usersData.users.length + 1,email,name,surname,gender,birtday,password };
                const response = await axios.post('/api/users', newUser );
                successNotification('success')
                router.push("/login")
            } else {
                errorNotification('error')
            }
        } catch (error) {
            console.error('Kullanıcı eklenirken hata oluştu:', error);
        }
    }
    return(
        <div>
            <main
                style={{backgroundImage: '../img/login-background.jpg', width: '100%', maxWidth: '450px', padding: '30px', marginTop: '50px', margin: 'auto', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px'}}
                className="form-signin text-center mt-5">
                <Form onFinish={handleSubmit} name="form_item_path" layout="vertical" >
                        <Form.Item name="Email alanı" label="Email" rules={[{ required: true }]}>
                            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item name="Ad alanı" label="Ad" rules={[{ required: true }]}>
                            <Input value={name} onChange={(e)=>setName(e.target.value)} />
                        </Form.Item>
                    <Form.Item name="Soyad alanı" label="Soyad" rules={[{ required: true }]}>
                        <Input value={surname} onChange={(e)=>setSurname(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="Cinsiyet alanı" label="Cinsiyet" rules={[{ required: true }]}>
                        <Select
                            placeholder=""
                            value={gender}
                            onChange={(value) => setGender(value)}
                            allowClear
                        >
                            <Option value="1">Erkek</Option>
                            <Option value="2">Kadın</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="Doğum tarihi alanı" label="Doğum Tarihi" rules={[{ required: true }]}>
                        <DatePicker value={birtday} onChange={(date, dateString) => setBirtday(dateString)} className="form-control" format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="Şifre alanı" label="Ad" rules={[{ required: true }]}>
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Item>
                    <Button style={{height:'50px'}} className="w-100 btn btn-lg btn-primary" type="primary" htmlType="submit">
                        Kayıt Ol
                    </Button>
                </Form>
            </main>
        </div>
    )

}
export default RegisterPage;