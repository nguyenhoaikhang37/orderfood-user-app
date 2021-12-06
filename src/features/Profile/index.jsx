import { ACCESS_TOKEN } from 'constants/global';
import { Redirect } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import Sidebar from './components/Sidebar';

const Profile = () => {
  const isLogin = Boolean(localStorage.getItem(ACCESS_TOKEN));

  if (!isLogin) {
    return <Redirect to="/auth/signin" />;
  }
  return (
    <div className="flex space-x-10" style={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Sidebar />
      <ProfileForm />
    </div>
  );
};

export default Profile;
