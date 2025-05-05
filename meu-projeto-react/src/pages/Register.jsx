import React, { useRef } from 'react';
import '../App.css';

export default function Register() {
  const emailRef = useRef();
  const passRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Register: ${emailRef.current.value}`);
  };
  return (
    <form className="task-input-container" onSubmit={handleSubmit}>
      <input ref={emailRef} className="task-input" type="email" placeholder="Email" />
      <input ref={passRef} className="task-input" type="password" placeholder="Senha" />
      <button type="submit" className="add-task-btn">Registrar</button>
    </form>
  );
}