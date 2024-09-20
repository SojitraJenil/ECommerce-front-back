import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import { FaRegEye } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { fetchProduct } from '../../reducers/productSlice';
import { fetchUsers } from '../../reducers/userSlice';
import { fetchOrder } from '../../reducers/orderSlice';
import { fetchInquiry } from '../../reducers/inquiriesSlice';

const ECommerce: React.FC = () => {
  const dispatch = useDispatch<any>();
  const users = useSelector((state: RootState) => state.users.users);
  const Product = useSelector((state: RootState) => state.product.product);
  const Inquiries = useSelector((state: RootState) => state.inquiry.inquiry);
  const order = useSelector((state: RootState) => state.order.order);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchUsers());
    dispatch(fetchOrder());
    dispatch(fetchInquiry());
  }, [dispatch]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total views"
          total={`${users.length}`}
          rate="0.43%"
          levelUp
        >
          <FaRegEye className="text-xl" />
        </CardDataStats>
        <CardDataStats
          title="Total Profit"
          total={`${Product.length}`}
          rate="4.35%"
          levelUp
        >
          <FaCartArrowDown />
        </CardDataStats>
        <CardDataStats
          title="Total Inquiries"
          total={`${Inquiries.length}`}
          rate="2.59%"
          levelUp
        >
          <FaCartArrowDown />
        </CardDataStats>
        <CardDataStats
          title="Total order"
          total={`${order.length}`}
          rate="0.95%"
          levelDown
        >
          <FaCartArrowDown />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
      </div>
    </>
  );
};

export default ECommerce;
