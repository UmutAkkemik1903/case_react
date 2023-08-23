import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode
  title?: string
}
const layout:  React.FC = ({children}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#000000'
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb>
                <div style={{ padding: 24, minHeight: 720, background: colorBgContainer }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2023 Created by Umut Akkemik</Footer>
        </Layout>
    );
};

export default layout
