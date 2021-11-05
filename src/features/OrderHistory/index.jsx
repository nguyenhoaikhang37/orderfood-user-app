import orderApi from 'apis/orderApi';
import React, { useEffect, useState } from 'react';
import HistoryTable from './components/HistoryTable';

const OrderHistory = () => {
  const [historyList, setHistoryList] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await orderApi.getHistoryCXN();
      setLoading(false);
      setHistoryList(res.data.order);
    })();
  }, []);

  const handleChoXacNhanClick = async () => {
    setIsActive(0);
    setLoading(true);
    const res = await orderApi.getHistoryCXN();
    setLoading(false);
    setHistoryList(res.data.order);
  };

  const handleDangGiaoClick = async () => {
    setIsActive(1);
    setLoading(true);
    const res = await orderApi.getHistoryDG();
    setLoading(false);
    setHistoryList(res.data.order);
  };

  const handleHoanTatClick = async () => {
    setIsActive(2);
    setLoading(true);
    const res = await orderApi.getHistoryHT();
    setLoading(false);
    setHistoryList(res.data.order);
  };

  return (
    <div className="my-20 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <h3 className="mb-6 text-2xl text-gray-700 flex items-center justify-center">
        Lịch sử đơn hàng <i className="fas fa-history ml-2 text-indigo-700"></i>
      </h3>

      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <div className="flex items-center mb-8 justify-end">
          <div>
            <div
              onClick={handleChoXacNhanClick}
              className={`py-2 px-6 cursor-pointer ${
                isActive === 0 && 'bg-indigo-100 text-indigo-700 rounded-full'
              }`}
            >
              <p>Chờ xác nhận</p>
            </div>
          </div>
          <div>
            <div
              onClick={handleDangGiaoClick}
              className={`py-2 px-6 cursor-pointer ${
                isActive === 1 && 'bg-indigo-100 text-indigo-700 rounded-full'
              }`}
            >
              <p>Đang giao</p>
            </div>
          </div>
          <div>
            <div
              onClick={handleHoanTatClick}
              className={`py-2 px-6 cursor-pointer ${
                isActive === 2 && 'bg-indigo-100 text-indigo-700 rounded-full'
              }`}
            >
              <p>Giao hoàn tất</p>
            </div>
          </div>
        </div>
        <HistoryTable historyList={historyList} loading={loading} />
      </div>
    </div>
  );
};

export default OrderHistory;
