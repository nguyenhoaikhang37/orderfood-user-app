import userApi from 'apis/userApi';
import { ACCESS_TOKEN } from 'constants/global';
import { selectAuthUser } from 'features/Auth/authSlice';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import Sidebar from './components/Sidebar';

const Profile = () => {
  const isLogin = Boolean(localStorage.getItem(ACCESS_TOKEN));
  const user = useSelector(selectAuthUser);

  if (!isLogin) {
    return <Redirect to="/auth/signin" />;
  }

  const handleUpdateProfile = async ({ formValues, addressUpdate }) => {
    const { phoneNumber, fullName, address } = formValues;
    const formatRequest = {
      phoneNumber,
      profile: {
        fullName,
        address: addressUpdate ? addressUpdate.name : address,
        lat: addressUpdate ? addressUpdate.lat : user.profile.lat,
        lng: addressUpdate ? addressUpdate.lng : user.profile.lng,
      },
    };

    await userApi.doiThongTinTaiKhoan(formatRequest);
  };

  return (
    <div className="flex space-x-16" style={{ margin: '100px auto', maxWidth: '1000px' }}>
      <Sidebar user={user} />
      {user.phoneNumber && <ProfileForm user={user} onUpdateProfile={handleUpdateProfile} />}
    </div>
  );
};

export default Profile;
