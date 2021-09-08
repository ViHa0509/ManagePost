import React from "react";
import { Dialog, DialogContent, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/actions";
import deleteImage from "../../assets/deleteImage.jpg";
import "./ConfirmDialog.css";
import { DialogAction } from "./styles";
export default function DeleteConfirm(props) {
    const dispatch = useDispatch();

    const onClose = () => {
        props.onClose(false);
    };
    
    const onDeletePost = React.useCallback(() => {
        dispatch(deletePost.deletePostRequest(props.data));
        onClose();
    }, [props.data, dispatch, onClose]);

    return (
        <Dialog
            open={props.isShow}
            onClose={onClose}
        >
            <img src={deleteImage} className="delete-img" />
            <DialogContent>
                Are you Sure? Your post would be permanently lost
            </DialogContent>
            <DialogAction >
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onDeletePost}>Delete</Button>
            </DialogAction>
        </Dialog>
    )
}