import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, placeholder = "Write your blog content here..." }) => {
    const [editorHtml, setEditorHtml] = useState(value || '');
    const quillRef = useRef(null);

    useEffect(() => {
        if (value !== undefined && value !== editorHtml) {
            setEditorHtml(value);
        }
    }, [value]);

    const handleChange = (html) => {
        setEditorHtml(html);
        onChange(html);
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'dropcap': 'dropcap' }]
            ],
            handlers: {
                dropcap: function () {
                    const range = this.quill.getSelection();
                    if (range) {
                        const [text] = this.quill.getText(range.index, range.length);
                        if (text) {
                            this.quill.formatText(range.index, 1, 'dropcap', true);
                        }
                    }
                }
            }
        },
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
        'list', 'bullet', 'check', 'indent', 'align', 'blockquote', 'code-block',
        'link', 'image', 'video', 'dropcap'
    ];

    return (
        <div className="rich-text-editor">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorHtml}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                style={{ height: '500px', marginBottom: '50px' }}
            />
        </div>
    );
};

export default RichTextEditor;