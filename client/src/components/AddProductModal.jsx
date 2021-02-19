/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Modal, Button, Form, Input, message, InputNumber, Select } from 'antd';
import queryString from 'query-string';
import api from '../api';
const { Option } = Select;
const AddProductModal = ({ visible, setVisible, edit, item }) => {
  const [form] = Form.useForm();
  let tab = queryString.parse(window.location.search).cat;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {
    createProducts,
    editProducts,
    removeProducts,
    categories,
  } = useContext(GlobalContext);
  useEffect(() => {
    if (edit) {
      form.resetFields();
    }
  }, [item]);
  const onFinish = async (values) => {
    const { productName, price, categoryId } = values;
    if (edit) {
      try {
        setConfirmLoading(true);
        const res = await api.put(`/products/${item._id}`, {
          productName,
          price,
          categoryId,
        });
        editProducts(res.data.data);
        if (item._source.categoryId !== categoryId) {
          removeProducts(item._id);
        }
        setConfirmLoading(false);
        setVisible(false);
        return message.success(res.data.message);
      } catch (err) {
        return message.error(err.response.data.errors.message);
      }
    }
    try {
      setConfirmLoading(true);
      const res = await api.post('/products', {
        productName,
        price,
        categoryId,
      });
      if (tab === categoryId) {
        createProducts(res.data.data);
      }
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
      title={!edit ? 'Add product' : 'Edit product'}
      visible={visible}
      onOk={onFinish}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        size='large'
        layout='vertical'
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={edit && item ? item._source.productName : ''}
          name='productName'
          label='Product name'
          rules={[
            {
              required: true,
              message: 'Please type product name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={edit && item ? item._source.price : ''}
          name='price'
          label='Price'
          rules={[
            {
              required: true,
              message: 'Please type price!',
            },
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          initialValue={edit && item ? item._source.categoryId : ''}
          name='categoryId'
          label='Category'
          rules={[
            {
              required: true,
              message: 'Please select category!',
            },
          ]}
        >
          <Select>
            <Option value={''}>Select category</Option>
            {categories.map(({ _id, _source }) => (
              <Option key={_id} value={_id}>
                {_source.categoryName}
              </Option>
            ))}
          </Select>
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
            {!edit ? 'Add' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddProductModal;
