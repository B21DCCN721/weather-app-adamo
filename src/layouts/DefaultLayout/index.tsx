import { FieldTimeOutlined, HomeOutlined, RiseOutlined, RobotOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Drawer, Layout, Menu, theme as antdTheme } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Link, Outlet, useLocation } from "react-router-dom"
import FormSetting from "../../components/FormSetting";
import { useState } from "react";
import ChatBotMessenger from "../../components/ChatBotMessenger";

const DefaultLayout = () => {
    const location = useLocation();
    const darkMode = JSON.parse(localStorage.getItem('darkMode') ?? 'false');
    const { token } = antdTheme.useToken();
    // drawer setting
    const [openSetting, setOpenSetting] = useState(false);
    const [openBot, setOpenBot] = useState(false);
    const showDrawer = () => {
        setOpenSetting(true);
    };
    const onClose = () => {
        setOpenSetting(false);
    };
    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    colorBgContainer: darkMode ? '#141414' : '#ffffff',
                },
            }}

        >
            <Layout style={{ minHeight: "100vh" }}>
                <Header style={{backgroundColor: token.colorBgContainer, width: "100%", paddingInline: 0}}>
                    <Menu mode="horizontal" theme={darkMode ? 'dark' : 'light'} selectedKeys={[location.pathname]}>
                        <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Trang chủ</Link></Menu.Item>
                        <Menu.Item key="/forecast" icon={<RiseOutlined />}><Link to="/forecast">Dự báo</Link></Menu.Item>
                        <Menu.Item key="/history" icon={<FieldTimeOutlined />}><Link to="/history">Lịch sử</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div style={{ minHeight: '100vh', position: 'relative' }}>
                        <Outlet />
                    </div>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SettingOutlined style={{ fontSize: "20px" }} />}
                        size="large"
                        style={{
                            position: 'fixed',
                            right: 30,
                            bottom: 100,
                            zIndex: 900,
                            transition: 'transform 0.3s ease',
                            width: "40px",
                            height: "40px",
                        }}
                        onClick={showDrawer}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<RobotOutlined style={{ fontSize: "20px" }} />}
                        size="large"
                        style={{
                            position: 'fixed',
                            right: 30,
                            bottom: 50,
                            zIndex: 900,
                            transition: 'transform 0.3s ease',
                            width: "40px",
                            height: "40px",
                        }}
                        onClick={() => setOpenBot(true)}
                    />
                    <ChatBotMessenger open={openBot} setOpen={setOpenBot} />
                    <Drawer
                        title="Cài đặt"
                        closable={{ 'aria-label': 'Close Button' }}
                        onClose={onClose}
                        open={openSetting}
                    >
                        <FormSetting closeDrawer={onClose} />
                    </Drawer>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Powered by OpenWeatherMap</Footer>
            </Layout>
        </ConfigProvider>
    )
}
export default DefaultLayout;
