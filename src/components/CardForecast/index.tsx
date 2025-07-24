import { FireOutlined, CloudOutlined, CompassOutlined, DashboardOutlined, LoadingOutlined } from "@ant-design/icons"
import { Card, Col, Row } from "antd"
import { useTranslation } from "react-i18next";
interface CardForecastProps {
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  midday: any;
}
const CardForecast: React.FC<CardForecastProps> = ({ date, midday }) => {
  const unit = localStorage.getItem('unit') ?? 'metric';
  const language = localStorage.getItem('language') ?? 'vi'
  const { t } = useTranslation('forecast');
  return (
    <Card
      title={`📅 ${new Date(date).toLocaleDateString(`${language === 'vi' ? 'vi-VN' : 'en-EN'}`, {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
      })}`}
      hoverable
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
    >
      <Row gutter={[8, 8]}>
        <Col span={24} style={{ fontSize: 20, fontWeight: 'bold' }}>
          <FireOutlined /> {midday.temp} {unit === 'metric' ? '°C' : '°F'}
        </Col>

        <Col span={12}>
          <CloudOutlined /> {t('cardForecast.humidity')}: {midday.humidity} %
        </Col>
        <Col span={12}>
          <CompassOutlined /> {t('cardForecast.windDeg')}: {midday.windDeg}°
        </Col>

        <Col span={12}>
          <DashboardOutlined /> {t('cardForecast.pressure')}: {midday.pressure} hPa
        </Col>
        <Col span={12}>
          <LoadingOutlined /> {t('cardForecast.windSpeed')}: {midday.windSpeed} m/s
        </Col>
      </Row>
    </Card>
  )
}
export default CardForecast;