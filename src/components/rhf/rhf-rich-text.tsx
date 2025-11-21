import "ckeditor5/ckeditor5.css";
import "@/app/ck-editor.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Bookmark,
  ClassicEditor,
  Code,
  CodeBlock,
  EditorConfig,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PageBreak,
  Paragraph,
  RemoveFormat,
  SourceEditing,
  SpecialCharacters,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
} from "ckeditor5";
import { useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = "GPL"; // or <YOUR_LICENSE_KEY>.

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
};

export default function RHFRichtextEditor<T extends FieldValues>({
  name,
  formLabel,
  required,
  placeholder,
}: Props<T>) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertImage",
            "mediaEmbed",
            "insertTable",
            "highlight",
            "blockQuote",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          AutoLink,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          Indent,
          IndentBlock,
          Italic,
          Link,
          Paragraph,
          RemoveFormat,
          SourceEditing,
          SpecialCharacters,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          Underline,
          List,
          ListProperties,
          Alignment,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          PageBreak,
          Paragraph,
          RemoveFormat,
          SpecialCharacters,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          Underline,
        ],
        balloonToolbar: ["bold", "italic", "|", "link"],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        initialData: "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        menuBar: {
          isVisible: true,
        },
        placeholder: placeholder,
        style: {
          definitions: [
            {
              name: "Article category",
              element: "h3",
              classes: ["category"],
            },
            {
              name: "Title",
              element: "h2",
              classes: ["document-title"],
            },
            {
              name: "Subtitle",
              element: "h3",
              classes: ["document-subtitle"],
            },
            {
              name: "Info box",
              element: "p",
              classes: ["info-box"],
            },
            {
              name: "Side quote",
              element: "blockquote",
              classes: ["side-quote"],
            },
            {
              name: "Marker",
              element: "span",
              classes: ["marker"],
            },
            {
              name: "Spoiler",
              element: "span",
              classes: ["spoiler"],
            },
            {
              name: "Code (dark)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-dark"],
            },
            {
              name: "Code (bright)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-bright"],
            },
          ],
        },
        image: {
          toolbar: [
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "|",
            "imageTextAlternative",
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);

  const { control, setValue, getValues } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="w-full">
              <FormLabel className="text-base font-medium text-black!">
                {formLabel}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <div className="main-container rounded-md border">
                  <div
                    className="editor-container editor-container_classic-editor editor-container_include-style"
                    ref={editorContainerRef}
                  >
                    <div className="editor-container__editor">
                      <div ref={editorRef}>
                        {editorConfig && (
                          <CKEditor
                            editor={ClassicEditor}
                            config={editorConfig as EditorConfig}
                            onChange={(_, editor) => {
                              const data = editor.getData();

                              setValue(field.name as string, data);

                              return;
                            }}
                            data={getValues(field.name)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
