import * as React from "react";
import * as ReactDOM from "react-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
type Props = {
  title: string;
  modalDisplay: any;
  modal: boolean;
  toggleModal: () => void;
};
const GlobalModalContainer: React.FC<Props> = ({
  title,
  toggleModal,
  modal,
  modalDisplay,
}) => {
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>{modalDisplay}</ModalBody>
      </Modal>
    </div>
  );
};
function GlobalModal(props: Props) {
  return ReactDOM.createPortal(
    <GlobalModalContainer {...props} />,
    (document.getElementById("modal") as HTMLElement) ||
      document.createElement("div") // for testing purposes
  );
}
export default GlobalModal;