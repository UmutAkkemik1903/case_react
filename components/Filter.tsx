import React from 'react';
import { Button, Form, Input, Select,DatePicker } from 'antd';
import type { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Filter: React.FC = () => {
    const dateFormat = 'YYYY/MM/DD';
    const formRef = React.useRef<FormInstance>(null);

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                formRef.current?.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
                break;
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            style={{ maxWidth: 2000, justifyContent:'center' }}
        >
            <Form.Item style={{ display: 'inline-block', width: 'calc(25% - 25px)' }} name="gender" label="Kalkış Yeri" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(25% - 25px)',marginLeft:'5px' }} name="gender" label="Varış Yeri" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block',width: 'calc(25% - 25px)',marginLeft:'5px' }} name="gender" label="Varış Yeri" rules={[{ required: true }]}>
                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(25% - 5px)' }} {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Sefer Ara
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Filter;