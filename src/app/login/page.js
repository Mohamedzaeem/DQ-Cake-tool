'use client';

import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { login} = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        console.log(formData);
        await login(
            formData.get('email'),
            formData.get('password')
        );

        form.reset();
    };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login to DQ Cake Tool</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" className="login-input" />
          <input type="password" placeholder="Password" name="password" className="login-input" />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}
