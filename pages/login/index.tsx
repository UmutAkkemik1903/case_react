import React, {useState} from "react";
import Link from "next/link";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { notification } from 'antd';
import {useAuth} from '../../path/to/auth';
import { useRouter } from 'next/router';
import usersData from '../../utils/users.json'
const LoginPage:React.FC = () => {
    const router = useRouter();

    const openNotification = (type) => {
        notification[type]({
            message: 'Giriş Hatası',
            description: 'Lütfen kullanıcı adınızı veya şifrenizi kontrol edininz!',
            duration: 0,
        });
    };
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = usersData.users.find(
            (user) => user.email === username && user.password === password
        );

        if (user) {
            login(user);
            router.push('/');
        } else {
            openNotification('error');
        }
    };
    return(
        <div>
            <main
                style={{backgroundImage: '../img/login-background.jpg', width: '100%', maxWidth: '450px', padding: '30px', marginTop: '50px', margin: 'auto', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px'}}
                className="form-signin text-center mt-5">
                <form onSubmit={handleLogin}>
                    <h1 className="h3 mb-3 fw-normal">Lürfen giriş yapın</h1>

                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="email" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Kullanıcı Adı</label>
                    </div>
                    <div style={{padding: '5px'}} className="form-floating">
                        <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                        <label htmlFor="floatingPassword">Şifre</label>
                    </div>

                    <div className="mb-3">
                        <label style={{float: 'right', padding: '5px'}}>
                            <Link href="/login/register">Kayıt Ol</Link>
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Giriş Yap</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </main>
        </div>
        )

}
export default LoginPage;