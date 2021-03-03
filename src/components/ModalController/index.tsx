import { useAppDispatch, useAppSelector } from 'hooks/store';
import { closeModal } from 'store/global/globalSlice';
import Modal from '../Modal';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

const modals = {
  LOGIN: <SignInForm />,
  SIGN_UP: <SignUpForm />,
};

interface IModalProps {
  name: string;
  data: object;
}

const ModalController = () => {
  const activeModals: any = useAppSelector((state) => state.global.modals);
  const dispatch = useAppDispatch();

  const modalFactory = (modal: IModalProps): JSX.Element => (
    <Modal
      key={modal.name}
      open
      onClose={() => {
        dispatch(closeModal({ name: modal.name }));
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEnforceFocus
      disableAutoFocus
    >
      {modals[modal.name] || <div>No content found</div>}
    </Modal>
  );

  // Modals to render
  const ModalComponents: any = [];

  if (activeModals.length) {
    activeModals.forEach((modal: IModalProps) => {
      if (modal.name) {
        ModalComponents.push(modalFactory(modal));
      }
    });
  }

  return ModalComponents;
};

export default ModalController;
