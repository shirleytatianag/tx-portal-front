"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {X} from "lucide-react";
import React from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Modal({open, onOpenChange, title = "Título del modal", description, children}: ModalProps) {

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40"/>
        <Dialog.Content
          className="z-50 fixed top-1/2 left-1/2 w-[400px] max-w-full bg-white p-6 rounded-2xl shadow-lg
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex justify-between items-start">
            <Dialog.Title className="text-base text-[#384461] font-bold">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X size={20}/>
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="mb-4 text-[#5C5C5C] text-sm">
              {description}
            </Dialog.Description>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}