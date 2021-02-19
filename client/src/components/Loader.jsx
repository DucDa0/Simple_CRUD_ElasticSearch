/* eslint-disable import/no-anonymous-default-export */
import { Spin } from 'antd';
import './styles.css';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;
export default () => {
  return (
    <section id='loader'>
      <Spin indicator={antIcon} />
    </section>
  );
};
