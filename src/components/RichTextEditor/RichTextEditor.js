import React from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import classNames from 'classnames/bind';
import styles from './RichTextEditor.module.scss';
import Placeholder from '@tiptap/extension-placeholder';

// use rich text editor css
import '@mantine/tiptap/styles.css';

const cx = classNames.bind(styles);

function SimpleRichTextEditor({
    placeholder,
    onChange = (data) => {
        console.log(data);
    },
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: true,
                orderedList: true,
                listItem: true,
                // tắt các extension khác không cần thiết
                heading: false,
                blockquote: false,
                codeBlock: false,
                horizontalRule: false,
                // ...
            }),
            Underline,
            LinkExtension,
            Placeholder.configure({
                placeholder: placeholder || 'Enter something here',
            }),
        ],
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
    });

    return (
        <RichTextEditor
            editor={editor}
            classNames={{
                root: cx('my-root'), // root container
                toolbar: cx('my-toolbar'), // thanh toolbar
                content: cx('my-content'), // vùng soạn thảo nội dung
                controlsGroup: cx('controls-group'),
            }}
        >
            <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
        </RichTextEditor>
    );
}

export default SimpleRichTextEditor;
