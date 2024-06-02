import { Input } from "antd";

export const InputWrapper = (props: any) => {
  const { onChange } = props;
  return <Input {...props} onChange={(e: any) => onChange(e.target.value)} />;
};
