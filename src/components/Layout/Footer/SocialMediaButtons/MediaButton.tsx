import IconButton from 'components/Buttons/IconButton';

interface IProps {
  icon: any;
  url: string;
  footerTheme: string;
}

const MediaButton = ({ icon, url, footerTheme }: IProps) => {
  return (
    <IconButton
      icon={icon}
      color={footerTheme === 'green' ? 'lightgrey' : 'grey'}
      radius={20}
      onClick={() => window.open(url, '_blank')}
    />
  );
};

export default MediaButton;
