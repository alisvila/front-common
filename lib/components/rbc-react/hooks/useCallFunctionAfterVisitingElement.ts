import {useEffect, useRef} from "react";

function useCallFunctionAfterVisitingElement(callback:() => void, dependencies:any[]) { 
  const elementRef = useRef<any>(document.createElement('div'))

  useEffect(function () {
    console.log("very deep use Effect")
    if (!elementRef?.current) return

    const observer = new IntersectionObserver(entries => {
      const wasSeen = entries.every(item => item.isIntersecting)
      if (wasSeen) callback()
    }, {threshold: 0.5})

    observer.observe(elementRef.current)

    return () => {
      if (!elementRef.current) return
      observer.unobserve(elementRef.current)
    }
  }, dependencies)

  return elementRef
}

export default useCallFunctionAfterVisitingElement;