import {useFormContext} from "react-hook-form";

function useGetFormErrorMessage() {
  const {formState} = useFormContext()

  function getMessageByName(name: string) {
    return formState?.errors[name]?.message
  }

  function getErrorMessage(name:string, extraErrorMessageFieldName?: string) {
    let finalMessage = getMessageByName(name)

    if (extraErrorMessageFieldName) {
      finalMessage = finalMessage || getMessageByName(extraErrorMessageFieldName)
    }
    return finalMessage ? String(finalMessage) : ''
  }

  return getErrorMessage
}

export default useGetFormErrorMessage;