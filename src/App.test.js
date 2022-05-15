import { render, screen } from '@testing-library/react';
import App from './App';
import {TodoHead} from './components/TodoHead';

describe('test', () => {
    test('renders learn react link', () => {
        render(<App />);
        const linkElement = screen.getAllByText(/일/i)[0];
        expect(linkElement).toBeInTheDocument();
    });

    test('개체 테스트', () => {
      render(<TodoHead />);
      const todoHead = screen.getByText(/2022/i);
    });
});
