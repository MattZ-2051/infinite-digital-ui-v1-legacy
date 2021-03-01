import Modal from "../Modal";
import SignInForm from "../SignInForm";
import { useAppSelector } from "hooks/store";

const ModalController: React.FC = () => {
  const storeModals = useAppSelector(state => state.global.modals);
  const modalsLength = Object.entries(storeModals).length;

  const modals = {
    LOGIN: <SignInForm />,
  };

  return (
    <Modal
      open={true}
      onClose={() => {}}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableEnforceFocus
      disableAutoFocus
    >
      {modals.LOGIN}
    </Modal>
  );
};

export default ModalController;
