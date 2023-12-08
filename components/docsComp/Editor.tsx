"use client";

import React, { FC, useEffect, useState } from "react";
import { Editor, Extension } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";
import ListItem from "@tiptap/extension-list-item";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Gapcursor from "@tiptap/extension-gapcursor";
import { ScrollShadow } from "@nextui-org/react";
import CharacterCount from "@tiptap/extension-character-count";
import { getCookie, setCookie } from "cookies-next";
import { useFileName, useWords } from "@states/editor";

interface TextEditorProps {
  payload?: any;
}

const TextEditor: FC<TextEditorProps> = ({ payload }) => {
  const [text, setText] = useState<any>("");

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      handleChangeBody(editor.getHTML());
    },
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes = {
            1: "text-3xl",
            2: "text-2xl",
            3: "text-xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              //@ts-ignore
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      CharacterCount,
      Text,
      Underline,
      Image,
      Highlight,
      Paragraph,
      Gapcursor,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "underline text-blue-500 cursor-pointer",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc  pl-8 ",
        },
        itemTypeName: "listItem",
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: " list-decimal ml-8 ",
        },

        keepAttributes: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Placeholder.configure({
        placeholder: "Let your words flow...",
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "table-auto min-w-full max-w-full",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: " font-medium dark:border-neutral-500 ",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: " text-lg font-semibold uppercase text-gray-400 bg-gray-50",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border p-2",
        },
      }),
    ],

    editorProps: {
      attributes: {
        class:
          " rounded-md min-h-screen min-w-full  p-6 border-none outline-none",
      },
    },
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const updateWordCount = useWords((state) => state.updateWordCount);
  const updateCharCount = useWords((state) => state.updateCharCount);

  const handleChangeBody = async (data: any) => {
    setText(data);
    setCookie("txt_editor_332211", text, { maxAge: 360000 });
    updateWordCount(editor?.storage.characterCount.words());
    updateCharCount(editor?.storage.characterCount.characters());
    const promptIndex = data.trim().lastIndexOf("/brain:");
    if (promptIndex !== -1 && data.trim().endsWith("\n")) {
      const prompt = data.trim().substring(promptIndex + 7);
      try {
        const reponse = "hello";
        const newContent = data.trim() + "\n" + reponse;
        setText(newContent);
        editor?.commands.setContent(newContent);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }
  };

  // Function to load editor content from a cookie
  const loadFromCookie = () => {
    const editorContent = getCookie("txt_editor_332211");
    if (editorContent) {
      editor?.commands.setContent(editorContent);
    }
  };

  // Load editor content from cookie when the component mounts
  useEffect(() => {
    loadFromCookie();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // You can adjust the threshold based on when you want the toolbar to become fixed
      const threshold = 190;

      if (scrollPosition > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollPosition <= threshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const fileName = useFileName((state) => state.fileName);
  const updateFileName = useFileName((state) => state.updateFileName);
  const handleSave = () => {
    const data = new Blob([text], { type: "application/html" });
    const filename = `${fileName?.replace(/\s+$/, "")}.tabs`;
    const aTag = document.createElement("a");

    aTag.href = URL.createObjectURL(data);
    aTag.download = filename;
    aTag.click();
    URL.revokeObjectURL(aTag.href); // Clean up the URL.createObjectURL
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      const indexOfLastDot = file.name.lastIndexOf(".");
      const fileNameWithoutExtension =
        indexOfLastDot !== -1
          ? file.name.substring(0, indexOfLastDot)
          : file.name;

      setCookie("_fileName", fileNameWithoutExtension);
      updateFileName(fileNameWithoutExtension);
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        editor?.commands.setContent(fileContent);
        updateWordCount(editor?.storage.characterCount.words());
        updateCharCount(editor?.storage.characterCount.characters());
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className=" ">
      <div className="flex flex-col justify-start gap-6  px-6 pt-6 transition-all ease-soft-spring  rounded-lg   ">
        <div
          className={` bg-[#1c1c1c] sticky top-0 w-full transition-all ease-soft-spring  rounded-lg ${
            isScrolled
              ? "shadow-[rgba(149,157,165,0.2)_0px_8px_24px] border  "
              : "shadow-none "
          } z-[999]`}
        >
          <div className=" flex justify-start items-center gap-6 p-2">
            <button
              onClick={handleSave}
              className=" bg-[#121212] px-4 py-2 rounded-lg "
            >
              Save as local file
            </button>
            <input
              type="file"
              accept=".tabs" // Specify accepted file types if needed
              onChange={handleFileChange}
            />
          </div>
          <Toolbar editor={editor} />
        </div>
        <ScrollShadow className="max-w-full  h-full  ">
          <EditorContent
            editor={editor}
            onChange={handleChangeBody}
            content={text}
            className=""
          />
        </ScrollShadow>
      </div>
    </div>
  );
};

export default TextEditor;
