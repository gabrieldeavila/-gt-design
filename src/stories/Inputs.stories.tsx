import React, { useState } from "react";
import { GTInput, Input, Space } from "../components";
import {
  INonNumericMask,
  INumericMask,
} from "../components/Input/Fields/interface";
import GTPageStateProvider from "../context/pageState";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Inputs",
};

const moneyMask: INumericMask = {
  suffix: "",
  prefix: "US$  ",
  thousandsSeparatorSymbol: ",",
  decimalSymbol: ".",
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: true,
  type: "numeric_mask",
};

const percentMask: INumericMask = {
  suffix: "%",
  prefix: "",
  thousandsSeparatorSymbol: ",",
  decimalSymbol: ".",
  decimalLimit: 2,
  integerLimit: 4,
  allowNegative: false,
  type: "numeric_mask",
};

const phoneMask: INonNumericMask = {
  options: ["(99) 9999-9999", "(99) 99999-9999"],
  type: "non_numeric_mask",
};

const docMask: INonNumericMask = {
  options: ["999.999.999-99", "99.999.999/9999-99"],
  type: "non_numeric_mask",
};

const Template = function InputsStory() {
  const options = [
    { value: "B", label: "Bananas 🍌" },
    { value: "F", label: "Figs 🥝" },
    { value: "G", label: "Grapes 🍇" },
    { value: "H", label: "Honeydew melons 🍈" },
    { value: "I", label: "Ice cream 🍦" },
  ];

  const [pageState, setPageState] = useState({});
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <GTBasic>
      <GTPageStateProvider
        pageState={pageState}
        setPageState={setPageState}
        errors={errors}
        setErrors={setErrors}
      >
        <Space.Horizontal>
          <Input.Group>
            <GTInput.Select
              row={6}
              title="wow such charm 🐲"
              text="what"
              label="Select"
              name="select"
              options={options}
            />

            <GTInput.Text
              row={6}
              text="change"
              defaultValidation
              validations={["noSpaces"]}
              name="nickname"
              label="TEMPLATE.LOGIN.NICKNAME_LABEL"
            />

            <GTInput.Email
              row={21}
              title="EXAMPLE.TITLE"
              text="HEHEHE"
              name="email"
              label="TEMPLATE.LOGIN.EMAIL_LABEL"
            />

            <GTInput.Password
              row={5}
              text="EXAMPLE.TEXT"
              title="EXAMPLE.TITLE"
              name="password"
              label="TEMPLATE.LOGIN.PASSWORD_LABEL"
            />

            <GTInput.Number
              min={1}
              max={5.2}
              row={5}
              text="EXAMPLE.TEXT"
              title="EXAMPLE.TITLE"
              name="NUMBER"
              label="És uno numero!"
            />

            <GTInput.NumericMask
              text="EXAMPLE.TEXT"
              title="EXAMPLE.TITLE"
              row={5}
              name="price"
              label="Money"
              mask={moneyMask}
            />

            <GTInput.NumericMask
              row={5}
              name="percent"
              title="wowww"
              label="Percent"
              mask={percentMask}
            />

            <GTInput.NumericMask
              row={5}
              name="doc"
              label="CPF/CNPJ"
              mask={docMask}
            />

            <GTInput.NumericMask
              row={5}
              name="phone"
              label="Phone"
              mask={phoneMask}
            />
          </Input.Group>
        </Space.Horizontal>
      </GTPageStateProvider>
    </GTBasic>
  );
};

export const GTInputs = Template.bind({});
