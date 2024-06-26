import { Button } from "antd";
import { useState } from "react";
import { ComponentWrapper } from "./ComponentWrapper";
import { Title } from "./Title";

export enum PageContentType {
  FORM = "form",
  LIST = "list",
}

export enum FormElementType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  TABLE = "TABLE",
}

export interface FormElementProps {
  name?: string;
  label: string;
  type: FormElementType;
  customProps?: any;
}

export interface FormSettingProps {
  pageTitle: string;
  pageDescription?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  addNewText?: string;
  content?: {
    type: PageContentType;
    elements: FormElementProps[];
    validations?: any;
  };
  footerExtra?: any[];
}
interface FormBuilderProps {
  formSettings: FormSettingProps;
  store?: any;
  onStoreUpdate?: any;
  onSubmit?: any;
  onCancel?: any;
}

export const FormBuilder = (props: FormBuilderProps) => {
  const { formSettings, store, onStoreUpdate, onSubmit, onCancel } = props;
  const [errors, setErrors] = useState<any>({});
  const {
    pageTitle,
    pageDescription,
    addNewText,
    content,
    showPrimaryButton = true,
    showSecondaryButton,
    footerExtra = [],
  } = formSettings;

  const validationRules: any = {
    string: (a: any, storeKey: any) => {
      const storeValue = store[storeKey];
      const ruleKeys = Object.keys(a);
      ruleKeys.forEach((key: any) => {
        const valueToValidate = a[key];
        if (key === "min" && storeValue?.length < valueToValidate) {
          setErrors({
            ...errors,
            [key]: false,
          });
        }
      });
    },
  };

  console.log("errors", errors);

  const handleOnChangeValue = (name: any, value: any) => {
    onStoreUpdate({
      ...store,
      [name]: value,
    });
  };

  const checkValidation = () => {
    const validationObj = formSettings.content?.validations;
    const validationKeys = Object.keys(validationObj);
    validationKeys.forEach((key) => {
      const elementValidation = validationObj[key];
      console.log("Validation::", elementValidation);
      const elementRule = validationRules[elementValidation.type];
      elementRule(elementValidation, key);
    });
  };

  const handleOnClickSubmit = () => {
    checkValidation();
    onSubmit && onSubmit(store);
  };

  const handleOnClickCancel = () => {
    onCancel && onCancel(store);
  };

  return (
    <>
      <Title
        title={pageTitle}
        description={pageDescription}
        addNewText={addNewText}
      />
      <div className="p-4 bg-white rounded-xl mt-5">
        <form className="flex flex-col gap-4">
          {content?.elements &&
            content.elements.map((element: any, index: number) => {
              return (
                <div className="flex flex-col gap-4">
                  <ComponentWrapper
                    data={element}
                    value={store?.[element.name]}
                    onChange={(val: any) =>
                      handleOnChangeValue(element?.name, val)
                    }
                  />
                </div>
              );
            })}

          <div className="flex gap-4 justify-end">
            {footerExtra.length > 0 && footerExtra.map((el: any) => <>{el}</>)}
            {showSecondaryButton && (
              <Button onClick={handleOnClickCancel}>Cancel</Button>
            )}
            {showPrimaryButton && (
              <Button type="primary" onClick={handleOnClickSubmit}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
