import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { confirmState$ } from "../../redux/selectors";
import { deletePost, hideConfirm } from "../../redux/actions";
export default function DeleteConfirm() {
    const dispatch = useDispatch();
    const { isShow, data } = useSelector(confirmState$);

    const onClose = React.useCallback(() => {
        dispatch(hideConfirm());
    }, [dispatch]);
    
    const onDeletePost = React.useCallback((data) => {
        dispatch(deletePost.deletePostRequest(data));
        onClose();
    }, [onClose]);

    return (
        <Dialog
            open={isShow}
            onClose={onClose}
        >
            <DialogContent>
                Are you Sure? Your post would be permanently lost
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={()=> onDeletePost({...data})}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}