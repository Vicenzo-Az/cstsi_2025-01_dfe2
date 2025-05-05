import React, { useRef } from 'react';
import Step from './Step';
import '../App.css';

export default function Task({ task, removeTask, updateTask }) {
  const { id, title, steps } = task;
  const stepRef = useRef();
  const allDone = steps.length > 0 && steps.every(s => s.done);

  const addStep = () => {
    const text = stepRef.current.value.trim();
    if (!text) return;
    const newStep = { id: Date.now(), text, done: false };
    updateTask({ ...task, steps: [...steps, newStep] });
    stepRef.current.value = '';
    stepRef.current.focus();
  };

  const removeStep = (stepId) => {
    updateTask({ ...task, steps: steps.filter(s => s.id !== stepId) });
  };

  const toggleStep = (stepId) => {
    const updatedSteps = steps.map(s => s.id === stepId ? { ...s, done: !s.done } : s);
    updateTask({ ...task, steps: updatedSteps });
  };

  return (
    <div className={`task-card ${allDone ? 'completed-task' : ''}`}>  
      <div className="task-header">
        <h2 className="task-title" style={{ textDecoration: allDone ? 'line-through' : 'none' }}>{title}</h2>
        <button onClick={() => removeTask(id)} className="delete-task-btn">×</button>
      </div>
  
      <div className="step-input-container">
        <input
          ref={stepRef}
          className="step-input"
          placeholder="Nova etapa"
        />
        <button onClick={addStep} className="add-step-btn">Adicionar Etapa</button>
      </div>
  
      <ul className="steps-list">
        {steps.map(step => (
          <Step
            key={step.id}
            step={step}
            toggleStep={toggleStep}
            removeStep={removeStep}
          />
        ))}
      </ul>
    </div>
  );
}