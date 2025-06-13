import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const langStyles = {
  html: "bg-pink-50 border-pink-400 text-pink-800",
  css: "bg-indigo-50 border-indigo-400 text-indigo-800",
  js: "bg-yellow-50 border-yellow-400 text-yellow-800",
  javascript: "bg-yellow-50 border-yellow-400 text-yellow-800",
  jsx: "bg-blue-50 border-blue-400 text-blue-800",
  tsx: "bg-blue-100 border-blue-500 text-blue-900",
  bash: "bg-yellow-50 border-yellow-400 text-yellow-800",
  sh: "bg-yellow-50 border-yellow-400 text-yellow-800",
  shell: "bg-yellow-50 border-yellow-400 text-yellow-800",
  cmd: "bg-gray-100 border-gray-400 text-gray-800",
  bat: "bg-gray-100 border-gray-400 text-gray-800",
  powershell: "bg-blue-50 border-blue-400 text-blue-800",
  ps1: "bg-blue-50 border-blue-400 text-blue-800",
  python: "bg-green-50 border-green-400 text-green-800",
  py: "bg-green-50 border-green-400 text-green-800",
  java: "bg-red-50 border-red-400 text-red-800",
  c: "bg-gray-50 border-gray-400 text-gray-800",
  cpp: "bg-gray-50 border-gray-400 text-gray-800",
  "c++": "bg-gray-50 border-gray-400 text-gray-800",
  csharp: "bg-purple-50 border-purple-400 text-purple-800",
  cs: "bg-purple-50 border-purple-400 text-purple-800",
  go: "bg-cyan-50 border-cyan-400 text-cyan-800",
  rust: "bg-orange-50 border-orange-400 text-orange-800",
  ruby: "bg-rose-50 border-rose-400 text-rose-800",
  rb: "bg-rose-50 border-rose-400 text-rose-800",
  php: "bg-indigo-50 border-indigo-400 text-indigo-800",
  swift: "bg-red-100 border-red-500 text-red-900",
  kotlin: "bg-purple-100 border-purple-500 text-purple-900",
  ts: "bg-blue-100 border-blue-500 text-blue-900",
  typescript: "bg-blue-100 border-blue-500 text-blue-900",
  json: "bg-green-50 border-green-400 text-green-800",
  yaml: "bg-yellow-50 border-yellow-400 text-yellow-800",
  yml: "bg-yellow-50 border-yellow-400 text-yellow-800",
  xml: "bg-pink-50 border-pink-400 text-pink-800",
  markdown: "bg-gray-50 border-gray-400 text-gray-800",
  md: "bg-gray-50 border-gray-400 text-gray-800",
  toml: "bg-gray-100 border-gray-400 text-gray-800",
  ini: "bg-gray-100 border-gray-400 text-gray-800",
  sql: "bg-indigo-50 border-indigo-400 text-indigo-800",
  graphql: "bg-purple-50 border-purple-400 text-purple-800",
  mongodb: "bg-green-100 border-green-500 text-green-900",
  diff: "bg-red-50 border-red-400 text-red-800",
  dockerfile: "bg-blue-50 border-blue-400 text-blue-800",
  makefile: "bg-gray-100 border-gray-400 text-gray-800",
  git: "bg-gray-100 border-gray-400 text-gray-800",
  text: "bg-gray-50 border-gray-400 text-gray-800",
  plaintext: "bg-gray-50 border-gray-400 text-gray-800",
  log: "bg-gray-50 border-gray-400 text-gray-800",
};

marked.use({
  renderer: {
    code(code, infostring) {
      const lang = (infostring || "plaintext").toLowerCase();
      const baseClasses =
        "rounded-md p-4 my-4 font-mono text-sm overflow-x-auto border-l-4";
      const style = langStyles[lang] || langStyles["plaintext"];
      return `<pre class="${baseClasses} ${style}"><code>${code}</code></pre>`;
    },
  },
});

function ReactMarkdown({ markdownContent }) {
  const rawHTML = marked(markdownContent);
  const cleanHTML = DOMPurify.sanitize(rawHTML);

  return (
    <div
      className="prose max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}

export default ReactMarkdown;
