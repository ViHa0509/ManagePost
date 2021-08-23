import React, { useEffect } from 'react';
import { CommentBoxStyle } from './styles';
import CommentForm from './CommentForm';
import ListComment from './ListComment';
import { useDispatch, useSelector } from 'react-redux';
import { commentsState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions';

export default function CommentBox() {
}
