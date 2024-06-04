import { Select } from "antd";
import { FormElementProps, FormElementType } from "./FormBuilder";
import { InputWrapper } from "./core/InputWrapper";

interface ComponentWrapperProps {
  data: FormElementProps;
  value: any;
  onChange: any;
}
export const ComponentWrapper = (props: ComponentWrapperProps) => {
  const { data, value, onChange } = props;
  const { type, label, customProps } = data;


  const elementRender = () => {
    let T = null;

    switch (type) {
      case FormElementType.INPUT:
        T = InputWrapper;
        break;
      case FormElementType.SELECT:
        T = Select;
        break;
      default:
        return <>Component does not exist</>;
    }

    return <T {...customProps} value={value} onChange={onChange} />;
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {elementRender()}
    </div>
  );
};
