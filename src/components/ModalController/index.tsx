import { useAppDispatch, useAppSelector } from 'hooks/store';
import { closeModal } from 'store/global/globalSlice';
import Modal from '../Modal';
import SignInForm from '../SignInModal';
import SignUpForm from '../SignUpModal';

const modals = {
  LOGIN: <SignInForm />,
  SIGN_UP: <SignUpForm />,
};

type ModalProps = {
  name: string;
  data: object;
}

const ModalController = (): JSX.Element => {
  const activeModals: any = useAppSelector((state) => state.global.modals);
  const dispatch = useAppDispatch();

  const modalFactory = (modal: ModalProps): JSX.Element => (
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
  const ModalComponents: JSX.Element[] = [];

  if (activeModals.length) {
    activeModals.forEach((modal: ModalProps) => {
      if (modal.name) {
        ModalComponents.push(modalFactory(modal));
      }
    });
  }

  // A component in TS needs to return a single root element
  return <>{ModalComponents}</>;
};

export default ModalController;
