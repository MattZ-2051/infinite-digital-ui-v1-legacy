import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as tictocIcon } from 'assets/svg/logos/tiktok.svg';
import { ReactComponent as twitterIcon } from 'assets/svg/logos/twitter.svg';
import { ReactComponent as instagramIcon } from 'assets/svg/logos/instagram.svg';
import { ReactComponent as facebookIcon } from 'assets/svg/logos/facebook.svg';
import MediaButton from './MediaButton';

const FacebookIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={facebookIcon} />
);

const InstagramIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={instagramIcon} />
);
const TwitterIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={twitterIcon} />
);
const TicTocIcon = () => (
  <SvgIcon viewBox="0 -1 14 19" component={tictocIcon} />
);

export enum Social {
  Facebook,
  Twitter,
  Instagram,
  TicTok,
}

interface IProps {
  socialNetwork: Social;
}

const url = {
  [Social.Facebook]: 'https://www.facebook.com/infinitebysuku',
  [Social.Instagram]: 'https://www.instagram.com/infinitebysuku/',
  [Social.TicTok]: 'https://www.tiktok.com/@_goinfinite',
  [Social.Twitter]: 'https://twitter.com/infinitebysuku',
};

const icon = {
  [Social.Facebook]: FacebookIcon,
  [Social.Instagram]: InstagramIcon,
  [Social.TicTok]: TicTocIcon,
  [Social.Twitter]: TwitterIcon,
};

export const SocialMediaButton = ({ socialNetwork }: IProps) => {
  return <MediaButton url={url[socialNetwork]} icon={icon[socialNetwork]} />;
};

export default SocialMediaButton;
