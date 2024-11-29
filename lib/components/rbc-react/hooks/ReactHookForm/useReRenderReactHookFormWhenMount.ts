import { useEffect } from "react";
import { UseFormGetValues } from "react-hook-form";
import rerenderReactHookForm from "@lib/components/rbc-utils/ReactHookForm/rerenderReactHookForm";

type Props = {
  getValues: UseFormGetValues<any>;
};

function useReRenderReactHookFormWhenMount({ getValues }: Props) {
  useEffect(function () {
    rerenderReactHookForm({ getValues });
  }, []);
}

export default useReRenderReactHookFormWhenMount;
