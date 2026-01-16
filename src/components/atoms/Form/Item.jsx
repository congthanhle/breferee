import { Form } from 'antd';

const  FormItem = ({ label,  children, required = false, ...rest }) => {
  return (
    <Form.Item
      label={
        <span className="text-xs text-gray-600 font-semibold leading-none">{label}</span>
      }
      colon={false}
      rules={[{ required: required, message: `Vui lòng nhập ${label}` }]}
      {...rest}
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;