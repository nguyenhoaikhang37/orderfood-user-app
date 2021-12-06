import Testimoni from './Testimoni';

const ListStep = () => {
  return (
    <div className="flex flex-col text-center w-full my-16" id="testimoni">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-5/12 mx-auto">
        Được hàng ngàn khách hàng tin cậy{' '}
      </h3>
      <p className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12">
        Đây là những feedback của những khách hàng đã tham gia cùng chúng tôi vô cùng thích thú khi
        sử dụng ứng dụng này.
      </p>
      <div className="w-full flex flex-col py-12">
        <Testimoni />
      </div>
    </div>
  );
};

export default ListStep;
