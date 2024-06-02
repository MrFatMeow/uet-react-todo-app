import { Layout } from "antd";
import { useState } from "react";
import {
  FormBuilder,
  FormElementType,
  FormSettingProps,
  PageContentType,
} from "../components/FormBuilder";

const settings: FormSettingProps = {
  pageTitle: "Article Manager",
  pageDescription: "You need to create an article to publish it.",
  addNewText: "Create Article",
  showSecondaryButton: true,
  content: {
    type: PageContentType.FORM,
    elements: [
      {
        name: "title",
        type: FormElementType.INPUT,
        label: "Post title",
        customProps: {
          placeHolder: "Enter Post Title",
        },
      },
      {
        name: "description",
        type: FormElementType.INPUT,
        label: "Post short description",
      },
      {
        name: "content",
        type: FormElementType.INPUT,
        label: "Post content",
      },
      {
        name: "status",
        type: FormElementType.SELECT,
        label: "Status",
        customProps: {
          options: [
            {
              label: "Draft",
              value: "draft",
            },
            {
              label: "Published",
              value: "published",
            },
          ],
        },
      },
    ],
  },
  footerExtra: [],
};

export const PostCreate = () => {
  const [formState, setFormState] = useState({});

  return (
    <Layout className="p-6">
      <FormBuilder
        store={formState}
        onStoreUpdate={setFormState}
        formSettings={settings}
      />
    </Layout>
  );
};
