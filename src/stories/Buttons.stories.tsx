/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import { Button, Space, Text } from "../components";
import SectionContainer from "../components/Text/Template/SectionContainer";
import { GTBasic } from "../gt";

export default {
  title: "GTDesign/Buttons",
};

const Template = function BoxStory() {
  return (
    <GTBasic>
      <Space.Horizontal>
        <SectionContainer title="Buttons" subtitle="STORIES.BUTTONS.SUBTITLE" />

        <Text.Divider>
          {/* <Text.Modifiers addOns={["bold"]}>Normal</Text.Modifiers> */}
          Normal
        </Text.Divider>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Normal>Normal</Button.Normal>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.H2>Contrast</Text.H2>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Contrast>Contrast</Button.Contrast>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.H2>Transparent</Text.H2>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Transparent>Transparent</Button.Transparent>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.H2>Success</Text.H2>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Success>Success</Button.Success>
          </Space.Modifiers>
        </Space.Modifiers>

        <Text.H2>Error</Text.H2>
        <Space.Modifiers
          addOns={["center", "pd-1", "middle", "flex-wrap", "gap-1"]}
        >
          <Space.Modifiers addOns={["w-20", "mobile-100"]}>
            <Button.Error>Error</Button.Error>
          </Space.Modifiers>
        </Space.Modifiers>
      </Space.Horizontal>
    </GTBasic>
  );
};

export const GTButton = Template.bind({});
