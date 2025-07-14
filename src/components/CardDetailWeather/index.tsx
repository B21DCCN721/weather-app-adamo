import { Card, Descriptions } from "antd"
import type { WeatherData } from "../../types/weather";
interface CardDetaiInfoWeatherProps {
    weather: WeatherData;
}
const CardDetaiInfoWeather:React.FC<CardDetaiInfoWeatherProps> = ({weather}) => {
    return (
        <Card title={`Thời tiết tại ${weather.city}`}>
            <Descriptions title='Tình Trạng'>
                <Descriptions.Item label="Nhiệt độ">{weather.temp} °C</Descriptions.Item>
                <Descriptions.Item label="Độ ẩm">{weather.humidity}%</Descriptions.Item>
                <Descriptions.Item label="Áp suất">{weather.pressure} hPa</Descriptions.Item>
                <Descriptions.Item label="Tốc độ gió">{weather.windSpeed} m/s</Descriptions.Item>
                <Descriptions.Item label="Hướng gió">{weather.windDeg}°</Descriptions.Item>
                <Descriptions.Item label="Tình trạng">
                    {weather.description}
                    {/* <Image src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon" width={40} preview={false} /> */}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default CardDetaiInfoWeather;