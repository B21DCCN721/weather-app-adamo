/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, message, Row, Col, } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import type { WeatherData } from '../../types/weather';
import MapView from '../../components/MapView';
import CardDetaiInfoWeather from '../../components/CardDetailWeather';
import { LatLng } from 'leaflet';
import useFetchWeather from '../../hooks/useFetchWeather';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addWeather } from '../../features/shareInfoWeather';
import type { AppDispatch } from '../../store';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

const HomePage: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState<LatLng | null>(null);
    const [, setSearchParams] = useSearchParams("");
    const dispatch = useDispatch<AppDispatch>();
    const fetchWeather = useFetchWeather();
    const { t } = useTranslation(['home', 'message']);

    const fetchWeatherByCity = async (cityName: string) => {
        setLoading(true);
        try {
            const res = await fetchWeather.fetchData(`q=${cityName}`);
            setWeather({
                temp: res.main.temp,
                humidity: res.main.humidity,
                pressure: res.main.pressure,
                windSpeed: res.wind.speed,
                windDeg: res.wind.deg,
                description: res.weather[0].description,
                icon: res.weather[0].icon,
                city: res.name,
            });
            dispatch(addWeather({
                temp: res.main.temp,
                humidity: res.main.humidity,
                pressure: res.main.pressure,
                windSpeed: res.wind.speed,
                windDeg: res.wind.deg,
                description: res.weather[0].description,
                icon: res.weather[0].icon,
                city: res.name,
            }))
            setPosition(new LatLng(res.coord.lat, res.coord.lon));
            setSearchParams({
                city: res.name
            })
            message.success(`${t('message:success')}`);
        } catch (error) {
            message.error(`${t('message:error')}`);
        } finally {
            setLoading(false);
        }
    };
    const fetchWeatherByLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const res = await fetchWeather.fetchData(`lat=${coords.latitude}&lon=${coords.longitude}`);
                    setWeather({
                        temp: res.main.temp,
                        humidity: res.main.humidity,
                        pressure: res.main.pressure,
                        windSpeed: res.wind.speed,
                        windDeg: res.wind.deg,
                        description: res.weather[0].description,
                        icon: res.weather[0].icon,
                        city: res.name,
                    });
                    dispatch(addWeather({
                        temp: res.main.temp,
                        humidity: res.main.humidity,
                        pressure: res.main.pressure,
                        windSpeed: res.wind.speed,
                        windDeg: res.wind.deg,
                        description: res.weather[0].description,
                        icon: res.weather[0].icon,
                        city: res.name,
                    }))
                    setPosition(new LatLng(coords.latitude, coords.longitude));
                    setSearchParams({
                        city: res.name
                    })
                    message.success(`${t('message:success')}`);
                } catch (error) {
                    message.success(`${t('message:success')}`);
                } finally {
                    setLoading(false);
                }
            },
            () => {
                message.error('Bạn cần cho phép truy cập vị trí.');
                setLoading(false);
            }
        );
    };
    const fetchWeatherByClickMap = async (lat: number, lng: number) => {
        setLoading(true);
        try {
            const res = await fetchWeather.fetchData(`lat=${lat}&lon=${lng}`);

            if (!res || !res.main || !res.wind || !res.weather) {
                message.error("Dữ liệu API không hợp lệ.");
                return;
            }
            setWeather({
                temp: res.main.temp,
                humidity: res.main.humidity,
                pressure: res.main.pressure,
                windSpeed: res.wind.speed,
                windDeg: res.wind.deg,
                description: res.weather[0].description,
                icon: res.weather[0].icon,
                city: res.name,
            });
            dispatch(addWeather({
                temp: res.main.temp,
                humidity: res.main.humidity,
                pressure: res.main.pressure,
                windSpeed: res.wind.speed,
                windDeg: res.wind.deg,
                description: res.weather[0].description,
                icon: res.weather[0].icon,
                city: res.name,
            }))
            setSearchParams({
                city: res.name
            })
            message.success(`${t('message:success')}`);
        } catch (error) {
            message.success(`${t('message:error')}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const getLocationAndFetchWeather = async () => {
            setLoading(true);
            try {
                const { coords } = await new Promise<GeolocationPosition>((resolve, reject) =>
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                );
                const latlng = new LatLng(coords.latitude, coords.longitude);
                setPosition(latlng);
                await fetchWeatherByClickMap(latlng.lat, latlng.lng);
            } catch (error) {
                console.warn("Không lấy được vị trí:", error);
                message.error(`${t('error.notFound')}`);
            } finally {
                setLoading(false);
            }
        };

        getLocationAndFetchWeather();
    }, []);

    return (
        <Row>
            <Col span={12}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>
                    <Title level={3}>{t('home:titleSearch')}</Title>
                    <Input.Search
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onSearch={fetchWeatherByCity}
                        placeholder={t('home:placeholderSearch')}
                        loading={loading}
                        enterButton={t('home:searchButton')}
                        style={{ marginBottom: 16 }}
                    />
                    <Button icon={<AimOutlined />} onClick={fetchWeatherByLocation} loading={loading} style={{ marginBottom: 24 }}>
                        {t('home:positionButton')}
                    </Button>

                    {weather && (
                        <CardDetaiInfoWeather weather={weather} />
                    )}
                </div>
            </Col>
            <Col span={12}>
                <MapView
                    position={position}
                    setPosition={setPosition}
                    fetchWeather={fetchWeatherByClickMap}
                />
            </Col>

        </Row>
    );
};

export default HomePage;
