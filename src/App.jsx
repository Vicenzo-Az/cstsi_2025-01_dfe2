// // Atividade 1

// import React from 'react';
// import CardImc from './components/CardImc';

// function App() {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
//       <CardImc />
//     </div>
//   );
// }

// export default App;


// Atividade 3
import React from 'react';
import TodoApp from './components/TodoApp';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>
      <TodoApp />
    </div>
  );
}