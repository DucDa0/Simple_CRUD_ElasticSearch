import { Category, Product } from '../components';
import { Row } from 'antd';
const Home = () => {
  return (
    <div className='home'>
      <Row gutter={[16, 16]}>
        <Category />
        <Product />
      </Row>
    </div>
  );
};
export default Home;
