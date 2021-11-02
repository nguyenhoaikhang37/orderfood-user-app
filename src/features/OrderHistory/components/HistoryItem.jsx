import { useState } from 'react';
import moment from 'moment';
import Popup from 'components/Popup';
import HistoryPopup from './HistoryPopup';

moment.locale('vi');

const HistoryItem = ({ history, index }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <div>
              <div className="text-sm leading-5 text-gray-800">{index + 1}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="text-sm leading-5 text-gray-900 font-bold">{history?._id}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-gray-900 border-gray-500 text-sm leading-5">
          {moment(history?.createdAt).format('LLLL')}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-gray-900 border-gray-500 text-sm leading-5">
          <div className="font-bold">{history?.restaurant?.name}</div>
          {history?.restaurant?.location.street}, {history?.restaurant?.location.ward},{' '}
          {history?.restaurant?.location.district},{history?.restaurant?.location.city}.
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-green-700 text-sm leading-5">
          {(history?.total + history?.ship).toLocaleString()} đ
        </td>
        <td className="px-3 py-4 whitespace-no-wrap border-b text-gray-900 border-gray-500 text-xs leading-5">
          {history?.status === 0 ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
              />
              <span className="relative text-xs">Đang giao</span>
            </span>
          ) : (
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
              <span className="relative text-xs">Đã giao</span>
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
          <button
            onClick={handleOpen}
            className="px-2 py-2 border-blue-500 border text-indigo-700 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
          >
            Chi tiết đơn hàng
          </button>
        </td>
      </tr>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <HistoryPopup history={history} />
      </Popup>
    </>
  );
};

export default HistoryItem;
