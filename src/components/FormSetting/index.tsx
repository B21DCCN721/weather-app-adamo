import { Form, Radio, Switch, Button } from 'antd';
import { useState } from 'react';

interface FormSettingProps {
  closeDrawer: () => void;
}
const FormSetting: React.FC<FormSettingProps> = ({closeDrawer}) => {
  const [unit, setUnit] = useState<string>(localStorage.getItem('unit')??'metric');
  const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));
  const handleSave = () => {
    localStorage.setItem('unit', unit);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    closeDrawer();
  }
  return (
    <Form layout="vertical">
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
