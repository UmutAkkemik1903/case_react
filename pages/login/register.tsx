import React, {useState} from "react";
import Link from "next/link";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { notification } from 'antd';
import { useRouter } from 'next/router';
import usersData from '../../utils/users.json';
const RegisterPage:React.FC = () => {
    const router = useRouter();

    const openNotification = (type) => {
        notification[type]({
            message: 'Kayıt',
            description: 'Kayıt Başarılı',
            duration: 0,
        });
    };
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [birtday, setBirtday] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {  id: usersData.users.length + 1,email,name,surname,gender,birtday,password };
            const response = await axios.post('/api/users', newUser );
            openNotification('success')
            router.push("/login")
        } catch (error) {
            console.error('Kullanıcı eklenirken hata oluştu:', error);
        }
    }
    return(
        <div>
            <main
                style={{backgroundImage: '../img/login-background.jpg', width: '100%', maxWidth: '450px', padding: '30px', marginTop: '50px', margin: 'auto', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px'}}
                className="form-signin text-center mt-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Kayıt Ol</h1>

                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="text" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Ad</label>
                    </div>
                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="text" className="form-control" value={surname} onChange={(e)=>setSurname(e.target.value)} placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Soyad</label>
                    </div>
                    <div style={{padding: '5px'}} className="form-floating">
                        <select value={gender} onChange={(e)=>setGender(e.target.value)} className="form-control">
                            <option selected>Cinsiyet</option>
                            <option key="1" value="1">Erkek</option>
                            <option key="2" value="2">kadın</option>
                        </select>
                    </div>
                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="date" className="form-control" value={birtday} onChange={(e)=>setBirtday(e.target.value)} placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Doğum Tarihi</label>
                    </div>
                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                        <label htmlFor="floatingPassword">Şifre</label>
                    </div>

                    <div className="mb-3">
                        <label style={{float: 'right', padding: '5px'}}>
                            <Link href="/login">Giriş Yap</Link>
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Kayıt Ol</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </main>
        </div>
    )

}
export default RegisterPage;