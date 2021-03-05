import { UpdateUser } from 'services/api/userService';
export interface IProps {}

const Landing: React.FC<IProps> = () => {
  return (
    <div>
      <h1>Landing view</h1>
      <button
        onClick={() => {
          UpdateUser();
        }}
      >
        Update user test
      </button>
    </div>
  );
};

export default Landing;
