import React from "react";

interface AccordionItemProps {
  id: string;
  name: string;
  value: string | number;
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  id,
  name,
  value,
  isOpen,
  title,
  content,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <div className="border border-gray-300 rounded-lg mb-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isOpen}
        defaultChecked={defaultOpen} // This makes the accordion open by default if true
        className="peer hidden"
      />

      {/* HEADER */}
      <label
        htmlFor={id}
        className="cursor-pointer bg-gray-100 p-4 flex justify-between items-center"
      >
        <h2 className="text-lg font-medium">{title}</h2>
        <span className="peer-checked:rotate-180 transform transition-transform duration-300">
          &#9650;
        </span>
      </label>

      {/* CONTENT */}
      <div className="p-4 bg-white max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
        <p>{content}</p>
      </div>
    </div>
  );
}
