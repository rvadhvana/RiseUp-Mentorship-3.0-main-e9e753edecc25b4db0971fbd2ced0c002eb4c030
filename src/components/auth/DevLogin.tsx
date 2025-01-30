import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function DevLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('testpassword');

  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-yellow-800 mb-2">Dev Login</h3>
      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded"
          placeholder="Password"
        />
        <button
          onClick={() => login(email, password)}
          className="w-full px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Dev Login
        </button>
      </div>
    </div>
  );
} 