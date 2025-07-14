import { FireOutlined, CloudOutlined, CompassOutlined, DashboardOutlined, LoadingOutlined } from "@ant-design/icons"
import { Card, Col, Row } from "antd"
interface CardForecastProps {
    date: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    midday: any;
}
const CardForecast:React.FC<CardForecastProps> = ({date, midday})=> {
    return(
                      <Card
                title={`📅 ${new Date(date).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  day: '2-digit',
                  month: '2-digit',
                })}`}
                hoverable
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              >
                <Row gutter={[8, 8]}>
                  <Col span={24} style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <FireOutlined /> {midday.temp} °C
                  </Col>

                  <Col span={12}>
                    <CloudOutlined /> Độ ẩm: {midday.humidity} %
                  </Col>
                  <Col span={12}>
                    <CompassOutlined /> Hướng gió: {midday.windDeg}°
                  </Col>

                  <Col span={12}>
                    <DashboardOutlined /> Áp suất: {midday.pressure} hPa
                  </Col>
                  <Col span={12}>
                    <LoadingOutlined /> Tốc độ gió: {midday.windSpeed} m/s
                  </Col>
                </Row>
              </Card>
    )
}
export default CardForecast;