"use clinet";
import { FC, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  Link,
  List,
  ListOrdered,
  Image,
  Strikethrough,
  Heading,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  Table,
  X,
  BadgeCent,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Button, Divider } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface ToolbarProps {
  editor: Editor | null;
}
const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className=" transition-all ease-soft-spring   rounded-lg flex flex-wrap p-4   justify-start items-center gap-4 ">
      <div className="border-r pr-4 flex gap-2">
        <button
          type="button"
          onClick={() => editor.commands.undo()}
          className=" hover:opacity-50"
        >
          <Undo2 className=" w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.commands.redo()}
          className=" hover:opacity-50"
        >
          <Redo2 className=" w-5 h-5" />
        </button>
      </div>
      <div className="border-r pr-4 flex justify-start items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full hover:opacity-60">
            <Heading className=" w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" z-[2000]">
            <DropdownMenuLabel>Headings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Toggle
                className="w-full flex justify-start items-center gap-2 text-2xl"
                size={"sm"}
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                Heading 1
              </Toggle>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Toggle
                className="w-full flex justify-start items-center gap-2 text-xl "
                size={"sm"}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                Heading 2
              </Toggle>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Toggle
                className="w-full flex justify-start items-center gap-2 text-lg "
                size={"sm"}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                Heading 3
              </Toggle>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Toggle
                className="w-full flex justify-start items-center gap-2 text-lg "
                size={"sm"}
                pressed={editor.isActive("heading", { level: 4 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
              >
                Heading 4
              </Toggle>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-r pr-4">
        <Toggle
          size={"sm"}
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className=" w-5 h-5" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className=" w-5 h-5" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className=" w-5 h-5" />
        </Toggle>
      </div>

      <div className="border-r pr-4">
        <Toggle
          size={"sm"}
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        >
          <AlignLeft className=" w-5 h-5" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        >
          <AlignCenter className=" w-5 h-5" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        >
          <AlignRight className=" w-5 h-5" />
        </Toggle>

        <Toggle
          size={"sm"}
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
        >
          <AlignJustify className=" w-5 h-5" />
        </Toggle>
      </div>

      <div className="border-r pr-4 ">
        <Toggle
          size={"sm"}
          pressed={editor.isActive("highlight")}
          onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className=" w-5 h-5" />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className=" w-5 h-5" />
        </Toggle>
        <button
          type="button"
          onClick={setLink}
          className={`ml-2 hover:opacity-50 ${
            editor.isActive("link") ? " text-blue-500" : ""
          }`}
        >
          <Link className="w-5 h-5" />
        </button>
      </div>

      <div className="border-r pr-4 ">
        <Toggle
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <List className=" w-5 h-5" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <ListOrdered className=" w-5 h-5" />
        </Toggle>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent({ type: "block", name: "googleAds" })
              .run()
          }
          type="button"
        >
          <BadgeCent className="w-6 h-6" />
        </button>
        <button onClick={addImage} type="button">
          <Image className="w-6 h-6" />
        </button>

        <Toggle
          pressed={editor.isActive("table")}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Table className="w-6 h-6" />
        </Toggle>
        {editor.isActive("table") ? (
          <button
            type="button"
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="text-sm flex justify-start items-center gap-1 bg-red-500 hover:bg-red-700 rounded-lg text-white px-2"
          >
            <X className="w-4 h-4" /> DeleteTable
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Toolbar;
