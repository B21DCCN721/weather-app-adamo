/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  Tabs,
  Spin,
  message,
  Input,
  Space,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Card,
} from 'antd';
import {
  DashboardOutlined,
  CloudOutlined,
  CompassOutlined,
  LoadingOutlined,
  AimOutlined,
  SearchOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ForecastItem } from '../../types/forecast';
import CardForecast from '../../components/CardForecast';
import { useSearchParams } from 'react-router-dom';
import useFetchWeatherForecast from '../../hooks/useFetchWeatherForecast';

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

const ForecastPage: React.FC = () => {
  const [data, setData] = useState<ForecastItem[]>([]);
  const [fullData, setFullData] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState<string>('Hà Nội');
  const [forecastMode, setForecastMode] = useState<'today' | '5days'>('today');
  const [locationName, setLocationName] = useState<string>('');
  const [, setSearchParams] = useSearchParams("");
  const fetchForecast = useFetchWeatherForecast();
  const unit = localStorage.getItem('unit')??'metric';

  const processData = (rawList: any[]): ForecastItem[] => {
    return rawList.map((item: any) => ({
      date: item.dt_txt.slice(0, 10),           // "2025-07-14"
      time: item.dt_txt.slice(5, 16),          // "12:00"
      temp: item.main.temp,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: item.wind.speed,
      windDeg: item.wind.deg,
    }));
  };

  const applyFilter = (all: ForecastItem[]) => {
    if (forecastMode === 'today') {
      const today = new Date().toISOString().split('T')[0]; // e.g. "2025-07-14"
      return all.filter((item) => item.date === today);
    }
    return all;
  };

  const fetchByCity = async (cityName: string) => {
    setLoading(true);
    try {
      const res = await fetchForecast.fetchData(`q=${encodeURIComponent(
        cityName
      )}`)
      const all = processData(res.list);
      setFullData(all);
      setData(applyFilter(all));
      setLocationName(res.city.name || res.name);
      setSearchParams({ "city": cityName });
      message.success("Lấy dữ liệu thành công")
    } catch (err) {
      message.error('Không thể lấy dữ liệu dự báo cho thành phố đã nhập.');
    } finally {
      setLoading(false);
    }
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      message.error('Trình duyệt không hỗ trợ lấy vị trí.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetchForecast.fetchData(`lat=${latitude}&lon=${longitude}`)
          const all = processData(res.list);
          setFullData(all);
          setData(applyFilter(all));
          setLocationName(res.city.name || res.name);
          setSearchParams({
                lat: String(latitude),
                lng: String(longitude)
            })
          message.success("Lấy dữ liệu thành công")
        } catch (err) {
          message.error('Không thể lấy dữ liệu thời tiết từ vị trí.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        message.error('Lỗi khi lấy vị trí người dùng.');
      }
    );
  };

  useEffect(() => {
    fetchByCity(city);
  }, []);

  useEffect(() => {
    setData(applyFilter(fullData));
  }, [forecastMode]);

  const renderChart = (
    dataKey: keyof ForecastItem,
    color: string,
    unit: string,
    label: string
  ) => {
    const columns = [
      {
        title: 'Thời gian',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: label,
        dataIndex: dataKey,
        key: dataKey,
        render: (value: number) => `${value} ${unit}`,
      },
    ];

    return (
      <>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis unit={unit} />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} />
          </LineChart>
        </ResponsiveContainer>

        <Table
          style={{ marginTop: 24 }}
          dataSource={data}
          columns={columns}
          rowKey={(record, index) => index !== undefined ? index.toString() : `${record.time}`}
          pagination={{ pageSize: 8 }}
        />
      </>
    );
  };
  const renderCards = () => {
    // Gom nhóm dữ liệu theo ngày
    const grouped = fullData.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {} as Record<string, ForecastItem[]>);

    return (
      <Row justify="center" gutter={[16, 16]}>
        {Object.entries(grouped).map(([date, items]) => {
          const midday = items.find(i => i.time.includes('12:00')) || items[0];
          return (
            <Col span={12} key={date}>
              <CardForecast date={date} midday={midday} />
            </Col>
          );
        })}
      </Row>
    );
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={['today']}
          onClick={({ key }) => setForecastMode(key as 'today' | '5days')}
          selectedKeys={[forecastMode]}
        >
          <Menu.Item key="today" icon={<ClockCircleOutlined />}>
            Dự báo hôm nay
          </Menu.Item>
          <Menu.Item key="5days" icon={<CalendarOutlined />}>
            Dự báo 5 ngày tới
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Nhập tên thành phố"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onPressEnter={() => {
                fetchByCity(city);
              }}
              style={{ width: 240 }}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={() => {
              fetchByCity(city);
            }}>
              Tìm kiếm
            </Button>
            <Button icon={<AimOutlined />} onClick={fetchByLocation}>
              Vị trí hiện tại
            </Button>
          </Space>
          <Typography.Title level={4}>
            Thời tiết tại: {locationName || 'Không rõ'}
          </Typography.Title>

          {loading ? (
            <Spin size="large" style={{ display: 'block', marginTop: 100 }} />
          ) : (
            <>
              {forecastMode === 'today' ? (
                <Tabs defaultActiveKey="1" size="large">
                  <TabPane tab={<span><FireOutlined /> Nhiệt độ</span>} key="1">
                    {renderChart('temp', '#ff4d4f', `${unit === 'metric' ? '°C':'°F'}`, 'Nhiệt độ')}
                  </TabPane>
                  <TabPane tab={<span><CloudOutlined /> Độ ẩm</span>} key="2">
                    {renderChart('humidity', '#1890ff', '%', 'Độ ẩm')}
                  </TabPane>
                  <TabPane tab={<span><DashboardOutlined /> Áp suất</span>} key="3">
                    {renderChart('pressure', '#722ed1', 'hPa', 'Áp suất')}
                  </TabPane>
                  <TabPane tab={<span><LoadingOutlined /> Tốc độ gió</span>} key="4">
                    {renderChart('windSpeed', '#fa8c16', 'm/s', 'Tốc độ gió')}
                  </TabPane>
                  <TabPane tab={<span><CompassOutlined /> Hướng gió</span>} key="5">
                    {renderChart('windDeg', '#13c2c2', '°', 'Hướng gió')}
                  </TabPane>
                </Tabs>
              ) : (
                renderCards()
              )}

            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ForecastPage;
