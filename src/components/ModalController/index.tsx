import Modal from "../Modal";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { closeModal } from "store/global/globalSlice";

const modals = {
  LOGIN: <SignInForm />,
  SIGN_UP: <SignUpForm />,
};

const ModalController: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeModals: any = useAppSelector((state) => state.global.modals);

  const modalFactory = (modal: any) => (
    <Modal
      open
      onClose={() => { dispatch(closeModal({ name: modal.name })) }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEnforceFocus
      disableAutoFocus
    >
      {modals[modal.name] || <div>No content found</div>}
    </Modal>
  );

  const ModalComponents: any = []; // Modals to render

  if (activeModals.length) {
    activeModals.forEach(modal => {
      ModalComponents.push(
        modalFactory(modal)
      );
    });
  }

  return (ModalComponents);
};

export default ModalController;
