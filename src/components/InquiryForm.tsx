"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";

interface InquiryFormProps {
  inquiringForm?: string;
}

export function InquiryForm({ inquiringForm }: InquiryFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      number: "",
      email: "",
      inquiry: "",
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      console.log("Form submitted:", { value, inquiringForm });
      // TODO: Implement actual submission logic
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6 md:gap-10"
    >
      <form.Field
        name="name" //*
        validators={{
          onChange: ({ value }) => (!value ? "Name is required" : undefined),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={field.name}
              className="text-sm tracking-wide uppercase"
            >
              NAME
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border border-[#444] bg-transparent px-2 py-1 text-sm transition-colors focus:border-[#ededed] focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-xs text-red-400">
                {field.state.meta.errors[0]}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="number"
        validators={{
          onChange: ({ value }) => (!value ? "Number is required" : undefined),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={field.name}
              className="text-sm tracking-wide uppercase"
            >
              NUMBER
            </label>
            <input
              id={field.name}
              name={field.name}
              type="tel"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border border-[#444] bg-transparent px-2 py-1 text-sm transition-colors focus:border-[#ededed] focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-xs text-red-400">
                {field.state.meta.errors[0]}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Email is required";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
              return "Invalid email address";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={field.name}
              className="text-sm tracking-wide uppercase"
            >
              EMAIL
            </label>
            <input
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border border-[#444] bg-transparent px-2 py-1 text-sm transition-colors focus:border-[#ededed] focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-xs text-red-400">
                {field.state.meta.errors[0]}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="inquiry"
        validators={{
          onChange: ({ value }) => (!value ? "Inquiry is required" : undefined),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={field.name}
              className="text-sm tracking-wide uppercase"
            >
              INQUIRY
            </label>
            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
              className="resize-none border border-[#444] bg-transparent px-2 py-1 text-sm transition-colors focus:border-[#ededed] focus:outline-none"
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-xs text-red-400">
                {field.state.meta.errors[0]}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <div className="flex justify-between">
        <Link
          href="tel:16170"
          className="ml-1 flex flex-col items-center justify-center"
        >
          <p className="font-bold">
            CALL US AT: <span className="underline">16170</span>
          </p>
        </Link>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-auto border border-[#444] px-8 py-2.5 text-sm tracking-wide uppercase transition-colors hover:bg-[#ededed] hover:text-[#141414] disabled:cursor-not-allowed disabled:opacity-50 md:px-12 md:py-3"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
