import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingInfo = (props) => {
  return (
    <ContentLoader viewBox="0 0 1300 300" height={400} width={1300} {...props}>
      <rect x="20" y="15" rx="20" ry="20" width="300" height="320" />
      <rect x="361" y="17" rx="10" ry="10" width="420" height="33" />
      <rect x="361" y="71" rx="10" ry="10" width="315" height="33" />
      <rect x="361" y="125" rx="10" ry="10" width="233" height="20" />
      <rect x="361" y="216" rx="5" ry="5" width="195" height="13" />
      <rect x="361" y="251" rx="5" ry="5" width="195" height="13" />
      <rect x="367" y="311" rx="8" ry="8" width="130" height="38" />
      <rect x="515" y="311" rx="8" ry="8" width="130" height="38" />
    </ContentLoader>
  );
};

export default LoadingInfo;
