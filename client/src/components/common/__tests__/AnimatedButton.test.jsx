import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedButton from '../AnimatedButton';

jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, whileHover, whileTap, ...props }) => (
      <button {...props}>{children}</button>
    ),
  },
}));

describe('AnimatedButton', () => {
  it('renders children correctly', () => {
    render(<AnimatedButton>Click me</AnimatedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<AnimatedButton onClick={handleClick}>Click me</AnimatedButton>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<AnimatedButton disabled>Click me</AnimatedButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with correct type attribute', () => {
    render(<AnimatedButton type="submit">Submit</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    render(<AnimatedButton className="my-custom-class">Click</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });
});
