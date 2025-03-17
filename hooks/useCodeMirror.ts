// hooks/useCodeMirror.ts
import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";

export function useCodeMirror(container: React.RefObject<HTMLDivElement>) {
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const view = new EditorView({
      parent: container.current,
      extensions: [basicSetup, javascript()],
      doc: `console.log("Hello, world!");`,
    });
    editorViewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [container]);

  return { editorView: editorViewRef.current };
}