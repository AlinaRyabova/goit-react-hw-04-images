import { ColorRing } from 'react-loader-spinner';
import { LodeWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LodeWrapper>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#f4dbf3', '#7b0b92', '#f1aaf1', '#8f0e8b', '#f59bf5']}
      />
    </LodeWrapper>
  );
};

export default Loader;
