import { ACCESS_TOKEN } from 'constants/global';

const Sidebar = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem('food_cart');
    window.location.reload();
  };
  return (
    <div className="h-full p-3 space-y-2 w-60 bg-coolGray-50 text-coolGray-800">
      <div className="flex items-center p-2 space-x-4">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt
          className="w-12 h-12 rounded-full bg-coolGray-500"
        />
        <div style={{ minWidth: 200 }}>
          <h2 className="text-lg font-semibold">{user?.profile?.fullName}</h2>
          <span className="flex items-center space-x-1">
            <a href="#" className="text-xs hover:underline text-coolGray-600">
              View profile
            </a>
          </span>
        </div>
      </div>
      <div className="divide-y divide-coolGray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <li className="bg-coolGray-100 text-coolGray-900">
            <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
              <span className="text-yellow-600 text-xl">
                <i className="fas fa-coins"></i>
              </span>
              <span>
                Điểm:{' '}
                <strong>
                  {user?.myCoin} ({(user?.myCoin * 1000).toLocaleString()}đ)
                </strong>
              </span>
            </a>
          </li>
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            <a
              onClick={handleLogout}
              className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current text-coolGray-600"
              >
                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" />
                <rect width={32} height={64} x={256} y={232} />
              </svg>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
