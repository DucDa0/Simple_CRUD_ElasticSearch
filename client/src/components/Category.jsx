/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext, Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu, Col, Skeleton, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddCategoryModal } from '../components';
import { GlobalContext } from '../context/GlobalState';
import queryString from 'query-string';
import api from '../api';
const Category = () => {
  const history = useHistory();
  const location = useLocation();
  let tab = queryString.parse(location.search).cat;
  const { getCategories, categories } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await api.get('/categories');
      getCategories(res.data);
      setIsLoading(false);
    }
    getData();
  }, []);
  const showModalAdd = () => {
    setVisible(true);
  };
  return (
    <Fragment>
      <AddCategoryModal visible={visible} setVisible={setVisible} />
      <Col lg={6}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Menu defaultSelectedKeys={tab || '/'} mode='inline'>
            {categories.map(({ _id, _source }) => (
              <Menu.Item onClick={() => history.push(`/?cat=${_id}`)} key={_id}>
                {_source.categoryName}
              </Menu.Item>
            ))}
          </Menu>
        )}
        <Button
          onClick={showModalAdd}
          style={{ marginTop: '1rem' }}
          block
          icon={<PlusOutlined />}
          type='dashed'
        >
          Add category
        </Button>
      </Col>
    </Fragment>
  );
};
export default Category;
