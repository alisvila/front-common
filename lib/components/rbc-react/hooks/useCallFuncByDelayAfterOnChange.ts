import { useState } from 'react';

type Props = {
  callAfterTypingHandler: (value:any) => void,
  time?: number
}

function useCallFuncWithDelayAfterOnChange({ callAfterTypingHandler, time = 1000 }: Props) {

  const [typingTimer, setTypingTimer] = useState<any>(null)

  const onChangeHandler = (value:any) => {
    clearTimeout(typingTimer)
    const typingTimerIns = setTimeout(function () {
      callAfterTypingHandler(value)
    }, time || 1000)
    setTypingTimer(typingTimerIns)
  }

  return onChangeHandler
}

export default useCallFuncWithDelayAfterOnChange;