import React from "react";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/utils";

const authFormSchema = formSchema('sign-up')

interface CustomInput {
  name: FieldPath<z.infer<typeof authFormSchema>>;
  control: Control<z.infer<typeof authFormSchema>>;
  label: string;
  placeholder: string;
  type: string;
  disabled:boolean
}

const CustomInput = ({
  label,
  name,
  placeholder,
  control,
  type,
  disabled
}: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          {/* <div className="flex w-full flex-col"> */}
          <FormControl>
            <Input
              className="input-class"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage className="form-message mt-2" />
          {/* </div> */}
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
