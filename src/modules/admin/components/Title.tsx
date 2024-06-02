import { Button } from "antd";

export const Title = (props: any) => {
  const { title = "", description = "", addNewText = "Add new" } = props;
  return (
    <>
      <div className="py-5 flex justify-between items-center">
        <div>
          <div className="text-3xl font-bold">{title}</div>
          <div>{description}</div>
        </div>
        <div>
          <Button>{addNewText}</Button>
        </div>
      </div>
    </>
  );
};
