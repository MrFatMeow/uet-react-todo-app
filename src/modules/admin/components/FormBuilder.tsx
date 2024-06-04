import { Button } from "antd";
import { ComponentWrapper } from "./ComponentWrapper";
import { Title } from "./Title";
import { useState } from "react";

export enum PageContentType {
  FORM = "form",
  LIST = "list",
}

export enum FormElementType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  TABLE = "TABLE",
}

type StringValidationEntry = {
  minCharactersMustBe?: number;
  maxCharactersMustBe?: number;
  firstLetterMustBeUpperCase?: boolean;
  elseError?: string;
};

type StringValidationScheme = {
  string?: Array<StringValidationEntry>;
}

type NumberValidationEntry = {
  minMustBe?: number;
  maxMustBe?: number;
  elseError?: string;
};

type NumberValidationScheme = {
  number?: Array<NumberValidationEntry>;
}

type InvalidTypeValidationScheme = {
  elseError?: string;
}

export type ValidationScheme = StringValidationScheme & NumberValidationScheme & InvalidTypeValidationScheme;

/**
 * 
 * @param scheme 
 * @param name
 * @param value 
 * @returns error messages
 */
function validate(scheme: ValidationScheme, name: string, value: any): string[] {
  const errorMessages: string[] = [];

  if (scheme.number && (typeof value === "number" || (
    typeof value === "string" && !isNaN(Number(value))
  ))) {
    // If possible, number matches first
    value = Number(value);
    for (const validationEntry of scheme.number) {
      if (validationEntry.minMustBe !== undefined && value < validationEntry.minMustBe) {
        errorMessages.push(validationEntry.elseError || `${name || "value"} must be at least ${validationEntry.minMustBe}`);
      }
      if (validationEntry.maxMustBe !== undefined && value > validationEntry.maxMustBe) {
        errorMessages.push(validationEntry.elseError || `${name || "value"} must be at most ${validationEntry.maxMustBe}`);
      }
    }
  } else if (scheme.string && typeof value === "string") {
    for (const validationEntry of scheme.string) {
      if (validationEntry.minCharactersMustBe !== undefined && value.length < validationEntry.minCharactersMustBe) {
        errorMessages.push(validationEntry.elseError || `${name || "value"} must be at least ${validationEntry.minCharactersMustBe} characters`);
      }
      if (validationEntry.maxCharactersMustBe !== undefined && value.length > validationEntry.maxCharactersMustBe) {
        errorMessages.push(validationEntry.elseError || `${name || "value"} Value must be at most ${validationEntry.maxCharactersMustBe} characters`);
      }
      if (validationEntry.firstLetterMustBeUpperCase && !(value[0].toLocaleUpperCase() == value[0] /*&& value[0].toLocaleLowerCase() != value[0]*/)) {
        errorMessages.push(validationEntry.elseError || `${name || "value"} must start with an uppercase letter`);
      }
    }
  } else {
    if (scheme.elseError) {
      errorMessages.push(scheme.elseError);
    } else {
      const allowedTypes: string[] = [];
      if (scheme.number) allowedTypes.push("number");
      if (scheme.string) allowedTypes.push("string");
      errorMessages.push(`${name || "value"} must be of type ${allowedTypes.join(" or ")}`);
    }
  }

  return errorMessages;
}

export interface FormElementProps {
  name: string;
  label: string;
  type: FormElementType;
  validation?: ValidationScheme;
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
  const [
    errorMessagesOfElementWithName,
    setErrorMessagesOfElementWithName
  ] = useState<{ [key: string]: string[] }>({});
  const {
    pageTitle,
    pageDescription,
    addNewText,
    content,
    showPrimaryButton = true,
    showSecondaryButton,
    footerExtra = [],
  } = formSettings;

  console.log("Store::", store);

  const handleOnChangeValue = (name: any, value: any) => {
    onStoreUpdate({
      ...store,
      [name]: value,
    });
  };

  const runValidators = () => {
    let isValid = true;
    const newErrorMessagesOfElementWithName: typeof errorMessagesOfElementWithName = {};

    content && content.elements.forEach((element: FormElementProps) => {
      if (element.validation) {
        const errorMessages = validate(element.validation, element.name, store[element.name] || undefined);
        if (errorMessages.length > 0) {
          if (newErrorMessagesOfElementWithName[element.name]) {
            newErrorMessagesOfElementWithName[element.name].push(...errorMessages);
          } else {
            newErrorMessagesOfElementWithName[element.name] = errorMessages;
          }
          isValid = false;
        }
      }
    });

    setErrorMessagesOfElementWithName(newErrorMessagesOfElementWithName);
    return isValid;
  }

  const handleOnClickSubmit = () => {
    runValidators() && onSubmit && onSubmit(store);
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
                  {errorMessagesOfElementWithName[element.name] &&
                    errorMessagesOfElementWithName[element.name].length > 0 &&
                    errorMessagesOfElementWithName[element.name].map((error: string, k: number) => (
                      <p key={k} className="text-red-500 text-sm">{error}</p>
                    )) || <></>}
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
