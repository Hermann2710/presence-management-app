"use client";

import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { LucideProps } from "lucide-react";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  Icon,
}: FormInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            )}
            <FormControl>
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={Icon ? "pl-10" : ""}
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
