import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export const CommentDiv = styled.div`
    border-top: 0.125rem solid #404040;  
`

export const CommentHeader = styled.div`
    box-sizing: border-box;
    &:after {
        content: "";
        display: table;
        clear: both;  
    }
`
export const CommonDiv = styled.div`
    float: left;
    display: table-row;
`
export const CommentTime = styled(AccessTimeIcon)`
    fontsize: small;
`
export const CommonDivOne = styled(CommonDiv)`
    float: right;
`
export const AuthorComment = styled.p`
    display: inline-block;
    color: #404040;
`
export const DeleteButton = styled(IconButton)`
`

export const CommentBody = styled.p`
    font-style: italic;
    color: #404040;
    margin-left: 1rem;
`