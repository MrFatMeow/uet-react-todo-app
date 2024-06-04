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
        validation: {
          string: [
            { minCharactersMustBe: 10, elseError: "Title must be at least 10 characters" },
            { maxCharactersMustBe: 100, elseError: "Title must be at most 100 characters" },
            { firstLetterMustBeUpperCase: true, elseError: "Title must start with an uppercase letter" }
          ],
          // In all cases, elseError is optional !
          elseError: "Title must be a string",
        },
        customProps: {
          placeHolder: "Enter Post Title",
        },
      },
      {
        name: "description",
        type: FormElementType.INPUT,
        label: "Post short description",
        validation: {
          string: [
            { minCharactersMustBe: 10, elseError: "Description must be at least 10 characters" },
            { maxCharactersMustBe: 200, elseError: "Description must be at most 200 characters" },
            { firstLetterMustBeUpperCase: true, elseError: "Description must start with uppercase letter" },
          ],
          elseError: "Description must be a string"
        }
      },
      {
        name: "content",
        type: FormElementType.INPUT,
        label: "Post content",
        validation: {
          number: [{
            minMustBe: 1,
            elseError: "Content, when being a number, must be at least 1",
          }],
          string: [{
            minCharactersMustBe: 10,
            elseError: "Content, when being a string, must be at least 10 characters",
          }, {
            firstLetterMustBeUpperCase: true,
            elseError: "Content, when being a string, must start with an uppercase letter",
          }],
        }
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
