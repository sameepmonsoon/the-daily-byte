"use client";

import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

interface SanitizedHTMLProps {
  html: string;
}

export function SanitizedHTML({ html }: SanitizedHTMLProps) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    setSanitized(DOMPurify.sanitize(html));
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
