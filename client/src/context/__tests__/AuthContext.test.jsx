import React, { useContext } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import api from '../../services/api';
import { AuthContext, AuthProvider } from '../AuthContext';

jest.mock('../../services/api', () => ({
  post: jest.fn(),
}));

const TestConsumer = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <span data-testid="authenticated">{isAuthenticated.toString()}</span>
      <span data-testid="user">{user ? user.email : 'null'}</span>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('provides unauthenticated state by default', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('authenticated')).toHaveTextContent('false'));
    expect(screen.getByTestId('user')).toHaveTextContent('null');
  });

  it('restores user from localStorage on mount', async () => {
    const mockUser = { email: 'test@example.com', username: 'test' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'fake-token');

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('authenticated')).toHaveTextContent('true'));
    expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
  });

  it('login stores token and user on success', async () => {
    const mockUser = { email: 'test@example.com', username: 'test' };
    api.post.mockResolvedValueOnce({
      data: { token: 'jwt-token', user: mockUser },
    });

    const LoginButton = () => {
      const { login, isAuthenticated } = useContext(AuthContext);
      return (
        <>
          <button onClick={() => login({ email: 'test@example.com', password: 'pass' })}>
            Login
          </button>
          <span data-testid="auth">{isAuthenticated.toString()}</span>
        </>
      );
    };

    render(
      <AuthProvider>
        <LoginButton />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    await waitFor(() => expect(localStorage.getItem('token')).toBe('jwt-token'));
    expect(screen.getByTestId('auth')).toHaveTextContent('true');
  });

  it('login returns error on failure', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    const LoginTest = () => {
      const { login } = useContext(AuthContext);
      const [error, setError] = React.useState('');
      return (
        <>
          <button
            onClick={async () => {
              const result = await login({ email: 'bad@example.com', password: 'wrong' });
              if (!result.success) setError(result.error);
            }}
          >
            Login
          </button>
          <span data-testid="error">{error}</span>
        </>
      );
    };

    render(
      <AuthProvider>
        <LoginTest />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    await waitFor(() =>
      expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials')
    );
  });
});
