/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import queryString from 'query-string';
import api from '../api';
import { Col, Row, Card, message, Button, Input } from 'antd';
import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Loader, AddProductModal } from '../components';
const { Search } = Input;
const Product = () => {
  const location = useLocation();
  let tab = queryString.parse(location.search).cat;
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const { getProducts, removeProducts, products } = useContext(GlobalContext);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await api.get(`/products/cat/${tab}`);
      getProducts(res.data);
      setIsLoading(false);
    }
    if (tab) {
      getData();
    }
  }, [tab, refresh]);
  const removeProduct = async (id) => {
    try {
      setIsProcessing(true);
      const res = await api.delete(`/products/${id}`);
      removeProducts(id);
      setIsProcessing(false);
      return message.success(res.data.message);
    } catch (err) {
      setIsProcessing(false);
      return message.error(err.response.data.errors.message);
    }
  };
  const onSearch = async (value) => {
    if (!value) {
      return message.error('Must not be empty string!');
    }
    try {
      setIsLoading(true);
      const res = await api.get(`/products/search?q=${value}`);
      getProducts(res.data);
      setIsLoading(false);
    } catch (err) {}
  };

  return (
    <Fragment>
      <Col lg={18}>
        <AddProductModal
          edit={edit}
          item={item}
          setVisible={setVisible}
          visible={visible}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              width: '300px',
              display: 'flex',
            }}
          >
            <Search
              placeholder='input search text'
              onSearch={onSearch}
              loading={isLoading}
              enterButton
            />
            <Button
              onClick={() => setRefresh(!refresh)}
              style={{ marginLeft: '1rem' }}
              type='text'
              icon={<RedoOutlined />}
            />
          </div>
          <Button
            onClick={() => {
              setEdit(false);
              setVisible(true);
            }}
            icon={<PlusOutlined />}
            type='primary'
          >
            Add product
          </Button>
        </div>

        <Row gutter={[8, 8]}>
          {isLoading ? (
            <Loader />
          ) : (
            products.map(({ _id, _source }) => (
              <Col key={_id} lg={8}>
                <Card
                  actions={[
                    <EditOutlined
                      onClick={() => {
                        setEdit(true);
                        setItem({ _id, _source });
                        setVisible(true);
                      }}
                      style={{ color: 'var(--mainstream-color)' }}
                      key='edit'
                    />,
                    <CloseOutlined
                      disabled={isProcessing}
                      onClick={() => removeProduct(_id)}
                      style={{ color: 'var(--danger-color)' }}
                      key='remove'
                    />,
                  ]}
                  cover={
                    <img
                      src={`https://picsum.photos/seed/${_id}/200/100`}
                      alt='avt'
                    />
                  }
                  hoverable
                  loading={isLoading}
                >
                  <p style={{ fontSize: '1.2rem' }}>{_source.productName}</p>
                  <p style={{ color: 'var(--mainstream-color)' }}>
                    {parseInt(_source.price).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Fragment>
  );
};
export default Product;
