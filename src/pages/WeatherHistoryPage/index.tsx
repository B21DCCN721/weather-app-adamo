import React, { useEffect, useState } from 'react';
import { Table, Typography, Select, DatePicker, Space, Tag, Card, message, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

interface HistoricalWeather {
  datetime: string;
  temp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  description: string;
  city: string;
}

const WeatherHistoryPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Hà Nội');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [data, setData] = useState<HistoricalWeather[]>([]);
  const [, setSearchParams] = useSearchParams("");
  const unit = localStorage.getItem('unit') ?? 'metric';
  const { t } = useTranslation(['history', 'message']);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://final-6e524-default-rtdb.asia-southeast1.firebasedatabase.app/weatherHistory.json');
        if (res.status === 200) {
          setData(Object.values(res.data));
          message.success(`${t('message:success')}`);
        }
      } catch (error) {
        message.success(`${t('message:error')}`);
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
      title: `${t('titleTable.time')}`,
      dataIndex: 'datetime',
      render: (val) => dayjs(val).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: `${t('titleTable.temp')} ${unit === 'metric' ? '(°C)' : '(°F)'}`,
      dataIndex: 'temp',
      render: (val) => <Tag color="red">{val}{`${unit === 'metric' ? '°C' : '°F'}`}</Tag>,
    },
    {
      title: `${t('titleTable.humidity')} (%)`,
      dataIndex: 'humidity',
    },
    {
      title: `${t('titleTable.pressure')} (hPa)`,
      dataIndex: 'pressure',
    },
    {
      title: `${t('titleTable.windSpeed')} (m/s)`,
      render: (record) => `${record.windSpeed} m/s - ${record.windDeg}°`,
    },
    {
      title: `${t('titleTable.description')}`,
      dataIndex: 'description',
    },
  ];

  return (
    <Card>
      <Title level={3}>{t('titlePage')}</Title>
      <Space style={{ marginBottom: 16 }} size="large">
        <Select value={selectedCity} onChange={(value) => {
          setSelectedCity(value); setSearchParams(prev => {
            // const updated = new URLSearchParams(prev);
            // updated.set("city", value);
            // return updated;
            return{
              ...prev,
              city: value
            }
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
          placeholder={`${t('placeholderDatePicker')}`}
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
