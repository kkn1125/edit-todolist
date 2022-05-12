import styled from 'styled-components';
import TodoItem from './TodoItem';
import React from 'react';
import { useTodoState } from './TodoContext';

const TodoListBlock = styled.div`
    /** background: #eee; */
    flex: 1;
    padding: 16px;
    overflow-y: auto;
`;

// 동적 import를 사용할 때 lazy로 import한다.
// const OtherComponent = React.lazy(() => import('./Test'));

export default function TodoList() {
    const state = useTodoState();
    return (
        <TodoListBlock>
            {state.map(({ id, text, done }) => (
                <TodoItem key={id} id={id} text={text} done={done} />
            ))}
            {/* 동적 import를 사용하면 Suspense로 감싼 후
            위의 변수 명으로 컴포넌트를 사용한다.
            fallback은 예약어이고 로딩 중의 내용을 출력한다. */}
            {/* <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent></OtherComponent>
            </Suspense> */}
        </TodoListBlock>
    );
}
