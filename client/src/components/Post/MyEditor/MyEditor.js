import React from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import './MyEditor.css';
export default function MyEditor (props) {

    const [editorState, setEditorState] = React.useState(
        ()=> EditorState.createEmpty()
    )

    const onChange = (editorState) => {
        setEditorState(editorState);
        const currentContent = editorState.getCurrentContent();
        const text = currentContent.getPlainText();
        props.handleChange(text);
    };

    React.useEffect(() => {
        const editerState = EditorState.push(editorState, ContentState.createFromText(props.title));
        setEditorState(editerState);
    }, [props.title]);

    return (
        <Editor 
            editorState={editorState} 
            placeholder='Post now...' 
            onChange={onChange}
            stripPastedStyles={true}
        />
    );
}