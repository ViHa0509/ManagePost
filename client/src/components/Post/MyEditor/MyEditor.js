import React from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import './MyEditor.css';
export default function MyEditor (props) {

    const [editorState, setEditorState] = React.useState(
        ()=> EditorState.createEmpty()
    )
    const [editorName, setEditorName] = React.useState('');
    const onChange = (editorState) => {
        setEditorState(editorState);
        const currentContent = editorState.getCurrentContent();
        const text = currentContent.getPlainText();
        const html = stateToHTML(currentContent);
        setEditorName(...editorName, text);
        
        console.log('text', text);
        props.handleChange(text, editorName, html);
    };

    return (
        <Editor 
            editorState={editorState} 
            placeholder='Post now...' 
            onChange={onChange}
            stripPastedStyles={true}
        />
    );
}