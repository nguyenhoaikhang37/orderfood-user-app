import PropTypes from 'prop-types';

const HistoryPopup = ({ history }) => {
  console.log('🚀 ~ file: HistoryPopup.jsx ~ line 4 ~ HistoryPopup ~ history', history);
  return (
    <div>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Chi tiết đơn hàng
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Món
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Số lượng
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Giá
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Giảm
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Tổng cộng
              </th>
            </tr>
          </thead>
          <tbody>
            {history?.cartFood?.map((food, idx) => (
              <tr key={idx}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={food?.idFood?.photo}
                    />
                    <div>
                      <p className="font-bold">{food?.idFood?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {food?.quantityFood}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {food?.idFood?.price.toLocaleString()} đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  0 đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-500 font-bold">
                  {food?.amount.toLocaleString()} đ
                </td>
              </tr>
            ))}
            {history?.cartCombo?.map((combo) => (
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={combo?.idCombo?.photo}
                    />
                    <div>
                      <p className="font-bold">{combo?.idCombo?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {combo?.quantityCombo}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-green-600">
                  {(combo?.amount * (100 / (100 - combo?.idCombo?.discountCombo))).toLocaleString()}{' '}
                  đ
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  -
                  {(
                    combo?.amount * (100 / (100 - combo?.idCombo?.discountCombo)) -
                    combo?.amount
                  ).toLocaleString()}{' '}
                  đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-500 font-bold">
                  {combo?.amount.toLocaleString()} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-base mr-8 mt-2 text-right ">
          <span className="text-green-600 font-bold">Tiền ship:</span>{' '}
          {history?.ship.toLocaleString()} đ
        </div>
        <div className="text-base mr-8 mt-2 text-right ">
          <span className="text-red-500 font-bold">Tổng cộng:</span>{' '}
          {(history?.total + history?.ship).toLocaleString()} đ
        </div>
      </div>
    </div>
  );
};

HistoryPopup.propTypes = {
  history: PropTypes.object,
};

export default HistoryPopup;
