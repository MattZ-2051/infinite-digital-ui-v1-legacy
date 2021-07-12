import IconButton from 'components/Buttons/IconButton';

interface IProps {
  icon: any;
  url: string;
}

const MediaButton = ({ icon, url }: IProps) => {
  return (
    <IconButton
      icon={icon}
      color="grey"
      radius={20}
      onClick={() => window.open(url, '_blank')}
    />
  );
};

export default MediaButton;
