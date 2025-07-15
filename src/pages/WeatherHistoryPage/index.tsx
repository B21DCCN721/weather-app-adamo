// src/pages/WeatherHistoryPage.tsx
import React, { useEffect, useState } from 'react';
import { Table, Typography, Select, DatePicker, Space, Tag, Card, message, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

interface HistoricalWeather {
  datetime: string; // ISO format
  temp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  description: string;
  city: string;
}

// Giả lập dữ liệu 5 ngày gần đây cho 3 thành phố
// const mockData: HistoricalWeather[] = [
//   {
//     city: 'Hà Nội',
//     datetime: dayjs().subtract(1, 'day').hour(12).toISOString(),
//     temp: 32,
//     humidity: 60,
//     pressure: 1010,
//     windSpeed: 3,
//     windDeg: 90,
//     description: 'Nắng',
//   },
//   {
//     city: 'Hồ Chí Minh',
//     datetime: dayjs().subtract(2, 'day').hour(14).toISOString(),
//     temp: 34,
//     humidity: 58,
//     pressure: 1009,
//     windSpeed: 2,
//     windDeg: 180,
//     description: 'Nắng nóng',
//   },
//   {
//     city: 'Đà Nẵng',
//     datetime: dayjs().subtract(3, 'day').hour(9).toISOString(),
//     temp: 30,
//     humidity: 70,
//     pressure: 1008,
//     windSpeed: 4,
//     windDeg: 135,
//     description: 'Âm u',
//   },
//   // thêm bản ghi cho mỗi thành phố và mỗi ngày trong 5 ngày gần nhất nếu cần
// ];

const WeatherHistoryPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Hà Nội');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [data, setData] = useState<HistoricalWeather[]>([]);
  const [, setSearchParams] = useSearchParams("");
  const unit = localStorage.getItem('unit') ?? 'metric';
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://final-6e524-default-rtdb.asia-southeast1.firebasedatabase.app/weatherHistory.json');
        if (res.status === 200) {
          message.success("Lấy dữ liệu thành công")
          setData(res.data);
        }
      } catch (error) {
        message.error("Không thể lấy dữ liệu lịch sử")
        console.log(error);
      }
    }
    getData();
  }, [])
  const filteredData = data.filter(
    (item) =>
      item.city === selectedCity &&
      (!selectedDate || dayjs(item.datetime).isSame(selectedDate, 'day'))
  );

  const columns: ColumnsType<HistoricalWeather> = [
    {
      title: 'Thời gian',
      dataIndex: 'datetime',
      render: (val) => dayjs(val).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: `Nhiệt độ ${unit === 'metric' ? '(°C)' : '(°F)'}`,
      dataIndex: 'temp',
      render: (val) => <Tag color="red">{val}{`${unit === 'metric' ? '°C' : '°F'}`}</Tag>,
    },
    {
      title: 'Độ ẩm (%)',
      dataIndex: 'humidity',
    },
    {
      title: 'Áp suất (hPa)',
      dataIndex: 'pressure',
    },
    {
      title: 'Gió',
      render: (record) => `${record.windSpeed} m/s - ${record.windDeg}°`,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
  ];

  return (
    <Card>
      <Title level={3}>Lịch sử thời tiết 5 ngày gần đây</Title>
      <Space style={{ marginBottom: 16 }} size="large">
        <Select value={selectedCity} onChange={(value) => {
          setSelectedCity(value); setSearchParams(prev => {
            const updated = new URLSearchParams(prev);
            updated.set("city", value);
            return updated;
          });
        }} style={{ width: 200 }}>
          <Option value="Hà Nội">Hà Nội</Option>
          <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
          <Option value="Đà Nẵng">Đà Nẵng</Option>
        </Select>
        <DatePicker
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date); setSearchParams(prev => {
              const updated = new URLSearchParams(prev);
              updated.set("date", date?.toISOString() ?? "");
              return updated;
            });
          }}
          disabledDate={(current: Dayjs): boolean => {
            if (!current) return false;
            const today = dayjs().endOf('day');
            // const fiveDaysAgo = dayjs().subtract(5, 'day').startOf('day');
            // return current > today || current < fiveDaysAgo;
            return current > today
          }}
          placeholder="Chọn ngày"
          format="DD/MM/YYYY"
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.datetime + record.city}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default WeatherHistoryPage;
