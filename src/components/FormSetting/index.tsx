import { Form, Radio, Switch, Button, Select } from 'antd';
import { useState } from 'react';
import i18n from '../../i18n';

interface FormSettingProps {
  closeDrawer: () => void;
}
const FormSetting: React.FC<FormSettingProps> = ({ closeDrawer }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') ?? 'vi');
  const [unit, setUnit] = useState<string>(localStorage.getItem('unit') ?? 'metric');
  const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handleSave = () => {
    localStorage.setItem('unit', unit);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('language', language);
    changeLanguage(language);
    closeDrawer();
  }
  return (
    <Form layout="vertical">
      <Form.Item label="Ngôn ngữ">
        <Select value={language} onChange={setLanguage}>
          <Select.Option value="vi">Vietnamese</Select.Option>
          <Select.Option value="en">English</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Chọn đơn vị nhiệt độ">
        <Radio.Group value={unit} onChange={(e) => setUnit(e.target.value)}>
          <Radio value="metric">°C</Radio>
          <Radio value="imperial">°F</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Giao diện tối">
        <Switch checked={darkMode} onChange={setDarkMode} />
      </Form.Item>
      <Button type="primary" onClick={handleSave}>Lưu</Button>
    </Form>
  )
};

export default FormSetting;
