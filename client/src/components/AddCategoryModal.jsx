/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Modal, Button, Form, Input, message } from 'antd';
import api from '../api';
const AddCategoryModal = ({ visible, setVisible }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { createCategories } = useContext(GlobalContext);
  const onFinish = async (values) => {
    if (!values) {
      return message.error('Must not be empty string!');
    }
    const { categoryName } = values;
    setConfirmLoading(true);
    try {
      const res = await api.post('/categories', { categoryName });
      createCategories(res.data.data);
      setConfirmLoading(false);
      setVisible(false);
      return message.success(res.data.message);
    } catch (err) {
      return message.error(err.response.data.errors.message);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      maskClosable={!confirmLoading}
      closable={false}
      title={'Add category'}
      visible={visible}
      onOk={onFinish}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        size='large'
        layout='vertical'
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          name='categoryName'
          label='Category name'
          rules={[
            {
              required: true,
              message: 'Please type category name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type='primary' loading={confirmLoading} htmlType='submit'>
            {'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddCategoryModal;
