import { useState } from 'react';
import moment from 'moment';
import Popup from 'components/Popup';
import HistoryPopup from './HistoryPopup';
import { Button } from '@mui/material';
import orderApi from '../../../apis/orderApi';
import Swal from 'sweetalert2';

moment.locale('vi');

const HistoryItem = ({ history, index }) => {
  console.log('🚀 ~ file: HistoryItem.jsx ~ line 12 ~ HistoryItem ~ history', history);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteOrder = (id) => {
    try {
      Swal.fire({
        title: 'Bạn chắn chắn muốn xoá đơn hàng này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await orderApi.deleteOrder(id);

          Swal.fire('Deleted!', 'Bạn đã xoá đơn hàng thành công.', 'success');
          window.location.reload();
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: HistoryItem.jsx ~ line 33 ~ handleDeleteOrder ~ error', error);
    }
  };

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
          {history?.restaurant?.location}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-green-700 text-sm leading-5">
          {(history?.total + history?.ship).toLocaleString()} đ
        </td>
        <td className="px-3 py-4 whitespace-no-wrap border-b text-gray-900 border-gray-500 text-xs leading-5">
          {history?.status === 0 ? (
            <div className="flex flex-col space-y-4 items-center">
              <span className="text-center relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                />
                <span className="relative text-xs">Chờ xác nhận</span>
              </span>
              <Button
                onClick={() => handleDeleteOrder(history?._id)}
                sx={{ marginTop: '10px' }}
                color="secondary"
                variant="outlined"
              >
                Huỷ đơn hàng <i class="fas fa-trash-alt"></i>
              </Button>
            </div>
          ) : history?.status === 1 ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-indigo-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"
              />
              <span className="relative text-xs">Đang giao</span>
            </span>
          ) : (
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
              <span className="relative text-xs">Đã nhận</span>
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
