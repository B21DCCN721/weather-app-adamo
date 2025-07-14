import { Form, Radio, Select, Switch, Button } from 'antd';

interface FormSettingProps {
  unit: 'metric' | 'imperial';
  setUnit: (unit: 'metric' | 'imperial') => void;
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const FormSetting: React.FC<FormSettingProps> = ({ unit, setUnit, language, setLanguage, darkMode, setDarkMode }) => (
  <Form layout="vertical">
    <Form.Item label="Chọn đơn vị nhiệt độ">
      <Radio.Group value={unit} onChange={(e) => setUnit(e.target.value)}>
        <Radio value="metric">°C</Radio>
        <Radio value="imperial">°F</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item label="Ngôn ngữ">
      <Select value={language} onChange={setLanguage}>
        <Select.Option value="vi">Vietnamese</Select.Option>
        <Select.Option value="en">English</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Giao diện tối">
      <Switch checked={darkMode} onChange={setDarkMode} />
    </Form.Item>
    <Button type="primary">Lưu</Button>
  </Form>
);

export default FormSetting;
