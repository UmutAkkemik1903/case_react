import { useAuth} from '../path/to/auth';
import React, {useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import { useRouter } from 'next/router';

const IndexPage:React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [isAuthenticated]);
  return (
      <div>
        {isAuthenticated ? (
            <Layout>
              <div className="container">
                <h1 style={{textAlign:'center'}}>Otobüs Bilet Satış</h1>
              </div>
              <Filter />
            </Layout>
        ) : (
            <p>asdsad</p>
        )}
      </div>
  )
}

export default IndexPage
