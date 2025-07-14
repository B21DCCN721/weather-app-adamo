import { FieldTimeOutlined, HomeOutlined, RiseOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Link, Outlet, useLocation } from "react-router-dom"
import FormSetting from "../../components/FormSetting";
import { useState } from "react";

const DefaultLayout = () => {
    const location = useLocation();
    // drawer setting
    const [openSetting, setOpenSetting] = useState(false);
    const showDrawer = () => {
        setOpenSetting(true);
    };
    const onClose = () => {
        setOpenSetting(false);
    };
    // prop của form
    const [unit, setUint] = useState<'metric' | 'imperial'>('metric');
    const [language, setLanguage] = useState<string>('vi');
    const [darkMode, setDarkMode] = useState<boolean>(false);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ backgroundColor: 'white', width: "100%", paddingLeft: "8px", paddingRight: "8px" }}>
                <Menu mode="horizontal" theme="light" selectedKeys={[location.pathname]}>
                    <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Trang chủ</Link></Menu.Item>
                    <Menu.Item key="/forecast" icon={<RiseOutlined />}><Link to="/forecast">Dự báo</Link></Menu.Item>
                    <Menu.Item key="/history" icon={<FieldTimeOutlined />}><Link to="/history">Lịch sử</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ margin: '16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: '100vh', position: 'relative' }}>
                    <Outlet />
                </div>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<SettingOutlined style={{fontSize:"20px"}}/>}
                    size="large"
                    style={{
                        position: 'fixed',
                        right: 30,
                        bottom: 100,
                        zIndex: 1000,
                        transition: 'transform 0.3s ease',
                        width:"40px",
                        height:"40px",
                    }}
                    className="floating-setting-btn"
                    onClick={showDrawer}
                />
                <Drawer
                    title="Cài đặt"
                    closable={{ 'aria-label': 'Close Button' }}
                    onClose={onClose}
                    open={openSetting}
                >
                    <FormSetting 
                        unit={unit} setUnit={setUint} 
                        language={language} setLanguage={setLanguage}
                        darkMode={darkMode} setDarkMode={setDarkMode}
                    />
                </Drawer>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Powered by OpenWeatherMap</Footer>
        </Layout>
    )
}
export default DefaultLayout;
