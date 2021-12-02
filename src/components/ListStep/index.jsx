import Testimoni from './Testimoni';

const ListStep = () => {
  return (
    <div className="flex flex-col text-center w-full my-16" id="testimoni">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
        Trusted by Thousands of Happy Customer{' '}
      </h3>
      <p className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12">
        These are the stories of our customers who have joined us with great pleasure when using
        this crazy feature.
      </p>
      <div className="w-full flex flex-col py-12">
        <Testimoni />
      </div>
    </div>
  );
};

export default ListStep;
