import orderApi from 'apis/orderApi';
import React, { useEffect, useState } from 'react';
import HistoryTable from './components/HistoryTable';

const OrderHistory = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await orderApi.getHistory();
      setLoading(false);
      setHistoryList(res.data.order);
    })();
  }, []);

  return (
    <div className="my-20 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <h3 className="mb-6 text-2xl text-gray-700 flex items-center justify-center">
        Lịch sử đơn hàng <i className="fas fa-history ml-2 text-indigo-700"></i>
      </h3>

      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <div className="flex items-center mb-8 justify-end">
          <a href="javascript:void(0)">
            <div className="py-2 px-6 bg-indigo-100 text-indigo-700 rounded-full">
              <p>Tất cả</p>
            </div>
          </a>
          <a href="javascript:void(0)">
            <div className="py-2 px-6 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 ">
              <p>Đang giao</p>
            </div>
          </a>
          <a href="javascript:void(0)">
            <div className="py-2 px-6 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 ">
              <p>Giao hoàn tất</p>
            </div>
          </a>
        </div>
        <HistoryTable historyList={historyList} loading={loading} />
      </div>
    </div>
  );
};

export default OrderHistory;
