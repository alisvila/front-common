import {useRef, useState} from "react";
import {SelectProps} from "..";

function useSelectContainer({onQuery}: Pick<SelectProps, 'onQuery'>) {

  const [query, setQuery] = useState('')

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  console.log('hereeee!')
  function inputOnClickHandler() {
    if (!buttonRef.current) return
    buttonRef.current!.click()
  }

  function setQueryHandler(value:string) {
    setQuery(value)
    if (onQuery) {
      onQuery(value)
    }
  }

  return {
    query, setQuery: setQueryHandler, buttonRef, inputOnClickHandler
  }
}

export default useSelectContainer;