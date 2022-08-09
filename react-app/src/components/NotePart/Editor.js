import React from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import './NotePart.css';


function Editor({ content, setContent }) {

    const modules = {
        toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'font': [] }],
            ["bold", "italic", "underline", "strike"],
            [{ 'color': [] },
            { 'background': [] }],
            [{ list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] }],
            ["clean"]
        ]
    };


    return (
        <ReactQuill
            modules={modules}
            theme="snow"
            type="text"
            value={content}
            onChange={setContent}
            placeholder="Start writing..." />
    )
}

export default Editor;