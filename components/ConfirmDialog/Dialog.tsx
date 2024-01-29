import ExitIcon from "./ExitIcon";
import IconButton from "./IconButton";

type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
};

const Dialog = ({ open, onClose, children }: DialogProps) => {
  if (!open) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-sm flex">
      <div className="relative p-8 bg-black w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>{children}</div>
        <span className="absolute top-0 right-0 p-4">
          <IconButton onClick={() => onClose()}>
            <ExitIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
};

export default Dialog;
