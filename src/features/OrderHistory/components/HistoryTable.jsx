import PropTypes from 'prop-types';
import 'moment/locale/vi';
import { LinearProgress } from '@mui/material';
import HistoryItem from './HistoryItem';

const HistoryTable = ({ historyList, loading }) => {
  return (
    <>
      {!loading ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-700 tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-700 tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-700 tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-700 tracking-wider">
                Địa điểm
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-700 tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-700 tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-700 tracking-wider">
                Chi tiết
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300" />
            </tr>
          </thead>
          <tbody className="bg-white">
            {historyList?.map((history, index) => (
              <HistoryItem key={history._id} index={index} history={history} />
            ))}
          </tbody>
        </table>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

HistoryTable.propTypes = {
  historyList: PropTypes.array,
  loading: PropTypes.bool,
};

export default HistoryTable;
