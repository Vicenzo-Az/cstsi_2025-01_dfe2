// src/components/Step.jsx
import React from 'react';
import '../App.css';

export default function Step({ step, toggleStep, removeStep }) {
  return (
    <li className={`step-item ${step.done ? 'completed-step' : ''}`}>  
      <input
        type="checkbox"
        checked={step.done}
        onChange={() => toggleStep(step.id)}
      />
      <span
        className={`step-text ${step.done ? 'completed-step' : ''}`}
        onClick={() => toggleStep(step.id)}
      >
        {step.text}
      </span>
      <button onClick={() => removeStep(step.id)} className="delete-step-btn">×</button>
    </li>
  );
}