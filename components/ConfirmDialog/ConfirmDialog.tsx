import ChoiceButton from "./ChoiceButton";
import Dialog from "./Dialog";

type ConfirmDialogProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
};

const ConfirmDialog = ({
  open,
  onClose,
  title,
  children,
  onConfirm,
}: ConfirmDialogProps) => {
  if (!open) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <ChoiceButton
            onClick={() => onClose()}
            className="bg-white text-boxdark"
          >
            No
          </ChoiceButton>
        </div>
        <div className="p-1">
          <ChoiceButton
            className="bg-danger"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Yes
          </ChoiceButton>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
