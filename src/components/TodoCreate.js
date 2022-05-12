import { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from './TodoContext';

const CircleButton = styled.button`
    outline: none;
    border: none;
    display: block;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 60px;
    background: #38d9a9;
    border-radius: 80px;
    width: 80px;
    height: 80px;
    cursor: pointer;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    transition: all 0.125s ease-in;

    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    ${(props) =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            &:active {
                background: #fa5252;
            }
            transform: translate(-50%, 50%) rotate(45deg); ;
        `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    outline: none;
    width: 100%;
    font-size: 18px;
    box-sizing: border-box;
`;

export default function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const nextId = useTodoNextId();
    const dispatch = useTodoDispatch();

    const onToggle = () => setOpen(!open);
    const onChange = (e) => setValue(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            },
        });
        nextId.current += 1;
        setValue('');
        setOpen(false);
    };
    // 함수 방식으로 하면 인자 값으로 이전 state를 받아와 사용 가능하다.
    // const onToggle = () => setOpen(prev => {
    //     console.log(prev);
    //     return !prev;
    // });

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                            autoFocus
                            placeholder="할 일을 입력 ✏️ 후, Enter 를 누르세요 !"
                            value={value}
                            onChange={onChange}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}
