import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/actions";
export default function DeleteConfirm(props) {
    const dispatch = useDispatch();

    const onClose = () => {
        props.onClose(false);
;    };
    
    const onDeletePost = React.useCallback(() => {
        dispatch(deletePost.deletePostRequest(props.data));
        onClose();
    }, [props.data, dispatch, onClose]);

    return (
        <Dialog
            open={props.isShow}
            onClose={onClose}
        >
            <DialogContent>
                Are you Sure? Your post would be permanently lost
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
<<<<<<< HEAD
                <Button onClick={()=> onDeletePost()}>Delete</Button>
=======
                <Button onClick={()=> onDeletePost({...data})}>Delete</Button>
>>>>>>> 461d3f6099fe766d3cac2e37349efa3e670cd77d
            </DialogActions>
        </Dialog>
    )
}