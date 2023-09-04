import React, {useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { Dashboard } from '../../actions/auth';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<LaptopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined />}>
            Option 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Content goes here
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;