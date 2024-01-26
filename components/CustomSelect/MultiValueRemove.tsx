import { MultiValueRemoveProps, components } from "react-select";
import CloseIcon from "../common/svg/CloseIcon";

const MultiValueRemove = <TOptions,>(
  props: MultiValueRemoveProps<TOptions, true>,
) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;
