"use client";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useMemo } from "react";
import { Label } from "../label";

interface FormSelectProps {
  name: string;
  label?: string;
  className?: string;
  options: { label: string; value: string }[];
}

export default function FormSelect({
  name,
  label,
  className,
  options,
}: FormSelectProps) {
  const { setValue, watch } = useFormContext();

  const currentItem = useMemo(() => {
    return options.find((option) => option.value === watch()[name]);
  }, [watch()]);

  return (
    <div className={cn("space-y-4", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        onValueChange={(value) => setValue(name, value)}
        defaultValue={currentItem ? currentItem.value : options[0].value}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={currentItem ? currentItem.label : options[0].label}
          />
        </SelectTrigger>
        <SelectContent id={name}>
          {options.map((option, key) => (
            <SelectItem key={key} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
