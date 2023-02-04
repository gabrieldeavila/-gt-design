/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Icon from "react-feather";
import { useTranslation } from "react-i18next";
import { useGTPageStateContextSetters } from "../../../context/pageState";
import useInputValues from "../../../hooks/pageState/useInputValues";
import useMask from "../../../hooks/pageState/useMask";
import useValidateMask from "../../../hooks/validation/useValidateMask";
import useValidateState from "../../../hooks/validation/useValidateState";
import Loader from "../../Loader";
import GTTooltip from "../../Tooltip/Tooltip";
import Input from "../Input";
import { IGTInputMask } from "./interface";

const defaultValidationObj = ["required"];
function GTInputMask({
  name,
  label,
  validations,
  defaultValidation,
  onChange,
  onChangeValidate,
  text,
  title,
  row,
  mask,
  onBlurValidate,
  isGuided,
}: IGTInputMask) {
  const { t } = useTranslation();

  const { isLoading } = useGTPageStateContextSetters();
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [localeErrorsParams, setLocaleErrorsParams] = useState({});

  const inputValidations = useMemo(() => {
    if (defaultValidation) {
      return [...defaultValidationObj, ...validations];
    }

    return validations;
  }, [defaultValidation, validations]);

  const { validateState } = useValidateState(name, inputValidations);

  const {
    isLabelUp,
    value,
    isValidatingOnBlur,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
  } = useInputValues(
    name,
    validateState,
    setIsValid,
    setErrorMessage,
    setLocaleErrorsParams,
    onBlurValidate,
    onChangeValidate
  );

  const inpRef = useRef<HTMLInputElement>(null);

  const { maskedValue, unMask } = useMask(value, mask, inpRef, isGuided);

  const { validateMask } = useValidateMask(mask);

  useEffect(() => {
    const chars = value.toString();
    if (chars.length === 0) return;

    const { isValid, invalidMessage } = validateMask(chars, inputValidations);

    setIsValid(isValid);
    setErrorMessage(invalidMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      const { value: iVal } = e.target;
      const unMaskedVal = unMask(iVal);
      const { isValid, invalidMessage, errorsVar } = validateMask(
        unMaskedVal.toString(),
        inputValidations
      );

      handleInputChange(unMaskedVal, isValid, invalidMessage, errorsVar);

      onChange?.(e);
    },
    [unMask, validateMask, inputValidations, handleInputChange, onChange]
  );

  const handleFocus = useCallback(() => {
    const { type } = mask;

    handleInputFocus();

    if (inpRef.current == null) return;

    if (type === "numeric_mask") {
      // selection range is in the end of the input
      inpRef.current.setSelectionRange(
        inpRef.current.value.length,
        inpRef.current.value.length
      );
      return;
    }

    if (type === "non_numeric_mask") {
      inpRef.current.setSelectionRange(0, 0);
    }
  }, [handleInputFocus, mask]);

  const containerRef = useRef<HTMLDivElement>(null);

  const isUp = useMemo(() => {
    if (isGuided) return true;

    return isLabelUp;
  }, [isGuided, isLabelUp]);

  if (isLoading ?? false) {
    return <Input.Container row={row} isLoading />;
  }

  return (
    <>
      <Input.Container row={row}>
        <Input.FieldWrapper>
          <Input.Label isWrong={false} up={isUp} htmlFor={name}>
            {t(label)}
          </Input.Label>
          <Input.Field
            ref={inpRef}
            type="text"
            value={maskedValue}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleFocus}
            id={name}
            name={name}
            autoComplete="off"
          />
        </Input.FieldWrapper>

        {!isValid && (
          <Input.Error>{t(errorMessage, localeErrorsParams)}</Input.Error>
        )}

        <Input.FeedbackWrapper>
          {(title != null || text != null) && (
            <Input.IconWrapper ref={containerRef}>
              <Icon.Info size={15} className="svg-no-active" />
            </Input.IconWrapper>
          )}

          {isValidatingOnBlur && (
            <Input.IconWrapper showOpacity>
              <Loader.Simple size="sm" />
            </Input.IconWrapper>
          )}
        </Input.FeedbackWrapper>
      </Input.Container>

      {(title != null || text != null) && (
        <GTTooltip parentRef={containerRef} title={title} text={text} />
      )}
    </>
  );
}

export default GTInputMask;

GTInputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  validations: PropTypes.arrayOf(PropTypes.string),
  defaultValidation: PropTypes.bool,
};

GTInputMask.defaultProps = {
  onChange: () => {},
  validations: defaultValidationObj,
  defaultValidation: true,
};
