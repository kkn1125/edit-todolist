import styled, { css } from 'styled-components';
import { useTodoState } from './TodoContext';

const animationHeight = '36px';

const TodoHeadBlock = styled.div`
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;

    h1 {
        color: #555555;
        margin-bottom: 0;
        font-size: 36px;
    }

    .day {
        color: #999;
        font-weight: bold;
        margin-bottom: 36px;
        font-size: 24px;
    }

    .left-tasks {
        color: #25ca80;
        font-weight: bold;
        font-size: 20px;
    }
`;

const GaugeWrap = styled.div`
    background: gray;
    height: ${animationHeight};
    margin-top: 16px;
    border-radius: 8px;
    overflow: hidden;
    transition: 300ms all ease-in;
    ${(props) =>
        props.gauge === 100 &&
        css`
            box-shadow: 0 0 0 5px #257eca60;
        `}
`;

const GaugeBar = styled.div`
    background-color: #25ca80;
    background-image: linear-gradient(
        45deg,
        #ffffff33 25%,
        transparent 25%,
        transparent 50%,
        #ffffff33 50%,
        #ffffff33 75%,
        transparent 75%,
        transparent
    );
    background-size: ${animationHeight} ${animationHeight};

    ${'' /* top left fixed */}
    width: ${(props) => props.gauge || 0}%;
    height: inherit;
    ${'' /* border-radius: inherit; */}
    ${(props) =>
        props.gauge === 100 &&
        css`
            background-color: #257eca;
        `}
    ${(props) =>
        props.gauge <= 30 &&
        css`
            background-color: #ca2555;
        `}

    transition: 300ms all ease-in;

    animation: movegauge 1s linear infinite;
    @keyframes movegauge {
        0% {
            background-position-x: ${animationHeight};
        }
    }
`;

// todo 날짜 및 완료 상태
export default function TodoHead() {
    // toso state
    const todos = useTodoState();
    // 완료된 todo
    const done  = todos.filter((todo) => todo.done);
    // todo 전체 길이
    const total = todos.length;

    // 오늘 날짜
    const today = new Date();
    // 지역 날짜 형식 지정
    const localeDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    // 요일명 가져오기
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
    // 현재 완료된 todo 퍼센트 값
    const gauge = parseFloat((done.length / total) * 100);

    return (
        <TodoHeadBlock>
            <h1>{localeDate}</h1>
            <div className="day">{dayName}</div>
            <div className="left-tasks">
                {done.length === total
                    ? `모두 완료! (${done.length}/${total})`
                    : `할 일 ${total}개 중 ${total - done.length}개 남음`}
            </div>
            <GaugeWrap gauge={gauge}>
                <GaugeBar className="gauge-bar" gauge={gauge} />
            </GaugeWrap>
        </TodoHeadBlock>
    );
}
