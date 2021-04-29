/*
 * How to use: <PrivateComponent roles={['admin', 'studio']}>
 */
import { useAppSelector } from 'store/hooks';

export interface IProps {}

const PrivateComponent: React.FC<IProps> = (props: any) => {
  //const userRole = useAppSelector((state) => state.session.userRole);
  const userRole = 'logged';
  const hasRole = () => props.roles.some((role: any) => userRole === role);

  if (hasRole()) return props.children;
  return null;
};

export default PrivateComponent;
