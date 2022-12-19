/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useCallback, useMemo } from "react";
import { INumericMask } from "../../components/Input/Fields/interface";

const createMask = (value: string | number, mask: INumericMask) => {
  const {
    prefix,
    decimalLimit,
    decimalSymbol,
    thousandsSeparatorSymbol,
    suffix,
  } = mask;
  const currValue = !value ? "0" : value.toString();

  const [currIntegerValue, currDecimalValue = "0"] = currValue.split(".");

  const newDecimal = currDecimalValue.padEnd(decimalLimit, "0");

  // adds the thousands separator symbol
  const newInteger = currIntegerValue.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparatorSymbol
  );

  const newValue = `${prefix}${newInteger}${decimalSymbol}${newDecimal}${suffix}`;

  return newValue;
};

function useMask(value: string | number, mask: INumericMask) {
  // masks the value, example: 1234567.89 => $1,234,567.89
  const maskedValue = useMemo(() => {
    return createMask(value, mask);
  }, [mask, value]);

  // it receives the masked value and returns the unmasked value
  // example: $1,234,567.89 => 1234567.89
  const unMask = useCallback(
    (valToUnMask: number | string) => {
      const { decimalLimit, integerLimit } = mask;
      valToUnMask = valToUnMask.toString();

      // only accepts numbers
      let currValue = valToUnMask.replace(/[^\d]/g, "");

      let newValue = "0";

      // if it reaches both limits, removes the first digit
      if (currValue.length > decimalLimit + integerLimit) {
        // removes the first digit
        currValue = currValue.slice(1);
      }

      // adds the decimal symbol, ex.: 00010 => 0.0010, using splice based on the decimal limit
      const currInt = currValue.slice(0, -decimalLimit) || "0";
      const currDec = currValue.slice(-decimalLimit) || "0";

      newValue = `${currInt}.${currDec}`;
      return parseFloat(newValue || "0");
    },
    [mask]
  );

  return { maskedValue, unMask };
}

export default useMask;
