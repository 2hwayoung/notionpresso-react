import { useState, useEffect } from "react";
import copyToClipboard from "clipboard-copy";
import RichText from "../internal/rich-text";
import Prisim from "prismjs";
import "prismjs/themes/prism.css";
import loadDart from "./support-language/dart";
import loadElixir from "./support-language/elixir";
import loadGo from "./support-language/go";
import loadJava from "./support-language/java";
import loadKotlin from "./support-language/kotlin";
import loadMarkdown from "./support-language/markdown";
import loadPython from "./support-language/python";
import loadSql from "./support-language/sql";
import loadTypescript from "./support-language/typescript";
import type { CodeArgs } from "../../types";

[
  loadDart,
  loadTypescript,
  loadElixir,
  loadGo,
  loadJava,
  loadKotlin,
  loadMarkdown,
  loadPython,
  loadSql,
].forEach((load) => load(Prisim));

const Code = ({ ...props }: CodeArgs) => {
  const {
    code: { caption, rich_text: texts, language },
  } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const content = texts.map(({ plain_text }) => plain_text).join("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showTooltip) {
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showTooltip]);

  const handleCopy = () => {
    copyToClipboard(content);
    setShowTooltip(true);
  };

  return (
    <figure className="notion-block notion-code">
      <div className="notion-code-content">
        <div className="notion-code-meta">
          <div className="notion-code-language">
            {language.replace(/^[a-z]/, (char: string) => char.toUpperCase())}
          </div>
          <button className="notion-code-copy" onClick={handleCopy}>
            <svg
              stroke="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368c1.125 1.126 1.757 2.652 1.757 4.243V112z"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
        <code>
          <div
            dangerouslySetInnerHTML={{
              __html: Prisim.highlight(
                content,
                Prisim.languages[language] || Prisim.languages["plain"],
                language,
              ),
            }}
          />
        </code>
      </div>
      {caption.length !== 0 && (
        <figcaption className="notion-asset-caption">
          <RichText props={caption} />
        </figcaption>
      )}
      <div
        aria-hidden={!showTooltip}
        className={`notion-code-copy-tooltip notion-${showTooltip ? "visible" : "hidden"}`}
      >
        <div>{"Copied"}</div>
      </div>
    </figure>
  );
};

export default Code;
