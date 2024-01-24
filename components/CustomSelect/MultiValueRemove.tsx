import { MultiValueRemoveProps, components } from "react-select";
import CloseIcon from "../common/svg/CloseIcon";

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;
