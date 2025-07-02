import ReactMarkdown from "react-markdown";
import { Toolbar, Box, Container } from '@mui/material';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function MarkdownComponent() {

    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
      fetch("/pageInMarkdown.md")
        .then((response) => response.text())
        .then((text) => setMarkdownContent(text));
    }, []);


  return (
<Container maxWidth="md">
<Box sx={{ my: 4, p: 3, color: '#fff' }}>
  
      <ReactMarkdown
            remarkPlugins={[ remarkMath ]}
            rehypePlugins={[ rehypeKatex ]}
                  components={{
                    code({ className, children, ...rest }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          PreTag="div"
                          language={match[1]}
                          style={dark}
                          {...rest}
                        >
                          {children}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
          >{markdownContent}</ReactMarkdown>
      </Box>
      </Container>
  );
}

