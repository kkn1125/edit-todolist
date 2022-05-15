import styled, { css } from 'styled-components';
import { MdDelete, MdCheck } from 'react-icons/md';
import { BiCheck, BiEdit } from 'react-icons/bi';
import { useTodoDispatch } from './TodoContext';
import React, { useState } from 'react';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #bfbfbf;
    &:hover {
        color: #df6c6c;
    }
    cursor: pointer;
    display: none;
`;

const EditMode = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #bfbfbf;
    &:hover {
        color: #6c97df;
    }
    cursor: pointer;
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    padding-top: 16px;
    padding-bottom: 16px;
    align-items: center;

    user-select: none;

    font-size: 18px;

    &:hover {
        ${Remove} {
            display: initial;
        }
    }
    &:hover {
        ${EditMode} {
            display: initial;
        }
    }
`;

const Text = styled.div`
    flex: 1;
    color: #bbbbbb;
    ${(props) =>
        !props.done &&
        css`
            color: #495057;
            border-color: #495057;
        `}
    ${(props) =>
        props.done &&
        css`
            text-decoration-line: line-through;
        `}
    ${(props) =>
        props.editable &&
        css`
            display: none;
        `}
`;

const CheckCircle = styled.div`
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 32px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bbbbbb;
    border: 2px solid #bbbbbb;
    ${(props) =>
        !props.done &&
        css`
            color: #3e89ec;
            border-color: #3e89ec;
        `}
`;

const ContentEdit = styled.input`
    border: none;
    outline: none;
    padding: 0;
    display: none;
    font-size: 18px;
    flex: 1;
    color: #495057;
    ${(props) =>
        props.editable &&
        css`
            display: block;
        `}
`;

export default function TodoItem({ id, text, done, children }) {
    const dispatch = useTodoDispatch();
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(text);
    
    const onEdit = () => {
        setEditable(!editable);
        if (text !== value) {
            dispatch({ type: 'EDIT', id: id, text: value });
        }
    };
    const onEditText = (e) => setValue(e.target.value);
    const onToggle = () => dispatch({ type: 'TOGGLE', id: id });
    const onRemove = () => dispatch({ type: 'REMOVE', id: id });

    const CheckCircleAttrs = {
        done: done,
        onClick: onToggle
    }
    const TextAttrs = {
        done,
        editable
    }
    const ContentEditAttrs = {
        autoFocus: true,
        value,
        onChange: onEditText,
        editable
    }

    return (
        <TodoItemBlock>
            <CheckCircle {...CheckCircleAttrs}>
                {!done && <MdCheck />}
            </CheckCircle>
            <Text {...TextAttrs}>
                {value}
            </Text>
            {editable && <ContentEdit
                {...ContentEditAttrs}
            />}
            <EditMode onClick={onEdit}>
                {editable ? <BiCheck /> : <BiEdit />}
            </EditMode>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}
