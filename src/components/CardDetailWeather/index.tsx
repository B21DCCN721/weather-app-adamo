import { Alert, Card, Descriptions } from "antd"
import type { WeatherData } from "../../types/weather";
import { useTranslation } from "react-i18next";
interface CardDetaiInfoWeatherProps {
    weather: WeatherData;
}
const CardDetaiInfoWeather: React.FC<CardDetaiInfoWeatherProps> = ({ weather }) => {
    const unit = localStorage.getItem('unit') ?? 'metric';
    const { t } = useTranslation('home');
    return (
        <Card title={`${t('currentWeather')} ${weather.city}`}>
            <Descriptions title={`${t('state')}`}>
                <Descriptions.Item label={`${t('cardDetail.temp')}`}>{weather.temp} {unit === 'metric' ? '°C' : '°F'}</Descriptions.Item>
                <Descriptions.Item label={`${t('cardDetail.humidity')}`}>{weather.humidity}%</Descriptions.Item>
                <Descriptions.Item label={`${t('cardDetail.pressure')}`}>{weather.pressure} hPa</Descriptions.Item>
                <Descriptions.Item label={`${t('cardDetail.windSpeed')}`}>{weather.windSpeed} m/s</Descriptions.Item>
                <Descriptions.Item label={`${t('cardDetail.windDeg')}`}>{weather.windDeg}°</Descriptions.Item>
                <Descriptions.Item label={`${t('cardDetail.description')}`}>
                    {weather.description}
                    {/* <Image src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon" width={40} preview={false} /> */}
                </Descriptions.Item>
            </Descriptions>
            <Alert
                message={`${t('noti')}`}
                description="Thời tiết khắc nghiệt cần bla bla..."
                type="warning"
                showIcon
                closable
            />
        </Card>
    )
}

export default CardDetaiInfoWeather;