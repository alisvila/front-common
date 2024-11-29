import { useController, useFormContext } from "react-hook-form";
import withSeparator from "../../../../../rbc-utils/separator/withSeparator";
import convertPersianNumberToEnglish from "../../../../../rbc-utils/convertPersianNumberToEnglish";
import removeSeparator from "../../../../../rbc-utils/separator/removeSeparator";
import { InputFormPropsType } from "../InputForm";

function useInputForm({
  fieldName,
  rules,
  maxLength,
  bySeparator,
  justNumber,
  onEnter,
  defaultValue,
}: InputFormPropsType) {
  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: defaultValue || "",
  });

  function onKeyDownJustNumber(e: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = Number(e.code);
    const allowedKeys = [8, 13, 46];

    if (
      !(keyCode > 47 && keyCode < 58) &&
      !(keyCode > 1775 && keyCode < 1786) &&
      !allowedKeys.includes(keyCode)
    ) {
      e.preventDefault();
    }
  }

  function setSeparator(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = withSeparator(e.target.value);
  }

  function changePersianNumberToEnglish(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    e.target.value = convertPersianNumberToEnglish(e.target.value);
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = removeSeparator(e.target.value);
    if (maxLength && value.length > maxLength) return;
    if (bySeparator) setSeparator(e);
    if (justNumber) changePersianNumberToEnglish(e);

    onChange(e);
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!justNumber) return;

    onKeyDownJustNumber(e);

    const keyCode = Number(e.code);
    const isEnterKey = keyCode === 13;

    if (isEnterKey && onEnter) {
      onEnter();
      e.preventDefault();
    }
  }

  return {
    name,
    onChangeHandler,
    onBlur,
    onKeyDownHandler,
    value,
    ref,
  };
}

export default useInputForm;
