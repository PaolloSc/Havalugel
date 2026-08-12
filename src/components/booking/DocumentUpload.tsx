"use client";

import { useState } from "react";
import { UploadCloud, FileCheck } from "lucide-react";

interface DocumentUploadProps {
  label: string;
  onFile: (fileName: string | null) => void;
}

export function DocumentUpload({ label, onFile }: DocumentUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <label className="flex cursor-pointer items-center gap-3 border border-dashed border-hava-line px-4 py-4 transition-colors hover:border-hava-orange">
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const name = e.target.files?.[0]?.name ?? null;
          setFileName(name);
          onFile(name);
        }}
      />
      {fileName ? (
        <FileCheck size={20} className="shrink-0 text-hava-orange" />
      ) : (
        <UploadCloud size={20} className="shrink-0 text-hava-gray" />
      )}
      <span className="text-sm">
        <span className="block text-hava-white">{label}</span>
        <span className="block text-xs text-hava-gray">
          {fileName ?? "Clique para enviar (simulado — nada é armazenado)"}
        </span>
      </span>
    </label>
  );
}
