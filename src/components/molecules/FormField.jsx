import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const FormField = ({ label, error, className, ...inputProps }) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <Input {...inputProps} />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;