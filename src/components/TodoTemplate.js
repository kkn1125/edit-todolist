import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 512px;
    height: 768px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 36px;
    background: #fff;
    border-radius: 16px;
    box-sizing: border-box;
    box-shadow: 0 0 24px 0 rgba(0 0 0 / 30%);
    position: relative;
`;

export default function TodoTemplate({children}) {
    return (
        <>
            <TodoTemplateBlock>
            {children}
            </TodoTemplateBlock>
        </>
    );
}
