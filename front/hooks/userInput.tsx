import { useState, useCallback } from "react";
import { InputType } from "../types";

export default (initialValue:string = null):InputType => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  return [value, handler]
}