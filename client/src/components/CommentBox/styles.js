import styled from 'styled-components';

export const CommentBoxStyle = styled.div`
    color: #fff;
    background-color: #fff;
    border-radius: 0.875rem;
    padding: 0.2rem 1rem 2rem;
`
export const ButtonPostComment = styled.button`
    border: none;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.75em; // 12px/16px
    display: inline-block;
    text-decoration: none;

    &:hover {
    cursor: pointer;
    }
    &:focus {
    text-decoration: none;
    outline: none;
    }
`

export const CommentFormStyle = styled.form`
    background-color: #fff;
    border-radius: 0.25rem;
    margin-bottom: 2rem;
    padding: 1rem;  
`;

export const CommentFormField= styled.div`
    margin-bottom: 0.25rem;
`
export const InputComment = styled.input`
    border: none;
    border-bottom: 1px solid #404040;
    font-size: 0.85rem;
    padding: 0.25rem 0;
    width: 99%;
    &:focus {
      border-bottom-color: #00BDFC;
      outline: none;
    }
`
export const TextAreaComment = styled.textarea`
    border: none;
    border-bottom: 1px solid #404040;
    font-size: 0.85rem;
    padding: 0.25rem 0;
    width: 99%;
    font-style: italic;
    &:focus {
      border-bottom-color: #00BDFC;
      outline: none;
    }
`

export const CommentFormAction = styled.div`
    
`
export const ButtonShowComment = styled(ButtonPostComment)`
    float: right;
    background-color: #00BDFC;
    color: #fff;
`
export const CommentCount = styled.h4`
    color: #404040;
`
export const H3 = styled(CommentCount)``
