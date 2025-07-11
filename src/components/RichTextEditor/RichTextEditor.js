import React from 'react';
import classNames from 'classnames/bind';
import styles from './RichTextEditor.module.scss';
import Placeholder from '@tiptap/extension-placeholder';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

// use rich text editor css
import '@mantine/tiptap/styles.css';

const cx = classNames.bind(styles);

// Default change function if none is provided
const funcChange = (data) => {
    console.log('Content changed:', data);
};

function SimpleRichTextEditor({ value = '', placeholder = 'Enter something here', onChange = funcChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        onUpdate: ({ editor }) => {
            // Ensure onChange is a function before calling it
            if (typeof onChange === 'function') {
                onChange(editor.getHTML());
            }
        },
    });
    // Update editor content when `value` changes externally
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '', false); // false = no history record
        }
    }, [value, editor]);

    return (
        <RichTextEditor
            editor={editor}
            classNames={{
                root: cx('my-root'), // root container
                toolbar: cx('my-toolbar'), // thanh toolbar
                content: cx('my-content'), // vùng soạn thảo nội dung
                control: cx('my-control'), // các nút điều khiển
                controlsGroup: cx('controls-group'),
            }}
        >
            <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
        </RichTextEditor>
    );
}

export default SimpleRichTextEditor;
