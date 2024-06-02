import { Layout } from "antd";
import { useState } from "react";
import {
  FormBuilder,
  FormElementType,
  FormSettingProps,
  PageContentType,
} from "../components/FormBuilder";

const settings: FormSettingProps = {
  pageTitle: "User Manager",
  pageDescription: "You are creating a new user.",
  addNewText: "Create New User",
  content: {
    type: PageContentType.FORM,
    elements: [
      {
        name: "username",
        type: FormElementType.INPUT,
        label: "Username",
        customProps: {
          size: "large",
          placeHolder: "Enter Post Title",
        },
      },
      {
        name: "password",
        type: FormElementType.INPUT,
        label: "User password",
        customProps: {
          size: "large",
          type: "password",
        },
      },
    ],
  },
  footerExtra: [],
};

export const UserCreate = () => {
  const [userStore, setUserStore] = useState<any>({});
  return (
    <Layout className="p-6">
      <FormBuilder
        formSettings={settings}
        store={userStore}
        onStoreUpdate={setUserStore}
      />
    </Layout>
  );
};
