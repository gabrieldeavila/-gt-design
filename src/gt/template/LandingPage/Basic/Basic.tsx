import React, { memo, useMemo } from "react";
import { Space, Text } from "../../../../components";
import LandingPage from "../LandingPage";
import {
  IGTLandingBenefit,
  IGTLandingFeature,
  IGTLandingPageBasic,
} from "../interface";
import BasicNavbar from "./BasicNavbar";
import Benefit from "./Benefit";
import Feature from "./Feature";

function GTBasicLandingPage({
  title,
  description,
  benefitDescription,
  benefits,
  features,
  footerDescription,
  ...navbar
}: IGTLandingPageBasic) {
  return (
    <>
      <BasicNavbar {...navbar} />

      <LandingPage.Wrapper>
        <LandingPage.Header>
          <Text.Title>{title}</Text.Title>
          <Text.Subtitle>{description}</Text.Subtitle>
        </LandingPage.Header>

        <LandingPage.Benefits.Wrapper>
          <LandingPage.Benefits.Content>
            <Space.Modifiers maxWidth="30rem">
              <Text.H2
                fontWeight="400"
                fontSize="1.4rem"
                color="var(--contrast)"
                backgroundImage="none"
                textAlign="center"
              >
                {benefitDescription}
              </Text.H2>
            </Space.Modifiers>

            <Space.Center alignItems="flex-start" gridGap="2rem">
              {benefits.map((benefit, index) => (
                <BenefitComponent key={index} {...benefit} />
              ))}
            </Space.Center>
          </LandingPage.Benefits.Content>
        </LandingPage.Benefits.Wrapper>

        <LandingPage.Features.Wrapper>
          {features.map((feature, index) => (
            <FeatureComponent key={index} index={index} {...feature} />
          ))}
        </LandingPage.Features.Wrapper>

        <LandingPage.Footer.Wrapper>
          <LandingPage.Footer.Content>
            <Space.Modifiers flexDirection="column" width="15rem">
              <Text.P fontSize="1.5rem">{navbar.logo}</Text.P>
              <Text.P textAlign="left">
                {footerDescription}
              </Text.P>
            </Space.Modifiers>
          </LandingPage.Footer.Content>
        </LandingPage.Footer.Wrapper>
      </LandingPage.Wrapper>
    </>
  );
}

export default GTBasicLandingPage;

const BenefitComponent = memo((props: IGTLandingBenefit) => {
  return <Benefit {...props} />;
});

BenefitComponent.displayName = "BenefitComponent";

const FeatureComponent = memo(
  ({ index, ...props }: IGTLandingFeature & { index: number }) => {
    const orientation = useMemo(
      () => (index % 2 === 0 ? "left" : "right"),
      [index]
    );

    return <Feature orientation={orientation} {...props} />;
  }
);

FeatureComponent.displayName = "FeatureComponent";