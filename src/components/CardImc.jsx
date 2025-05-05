import React, { useState, useEffect } from 'react';

function calcImc(peso, altura) {
  return peso / (altura * altura);
}

function getCor(imc) {
  if (imc <= 24.5) return 'green';
  if (imc < 30) return 'yellow';
  return 'red';
}

export default function CardImc() {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.7);
  const [imc, setImc] = useState(() => calcImc(peso, altura));
  const [cor, setCor] = useState(() => getCor(calcImc(peso, altura)));

  useEffect(() => {
    const novoImc = calcImc(peso, altura);
    setImc(novoImc);
    setCor(getCor(novoImc));
  }, [peso, altura]);

  return (
    <div style={{ 
      border: `2px solid ${cor}`, 
      borderRadius: '8px', 
      padding: '1rem', 
      maxWidth: '300px', 
      textAlign: 'center'
    }}>
      <h2 style={{ color: cor }}>Seu IMC: {imc.toFixed(2)}</h2>
      <div style={{ margin: '0.5rem 0' }}>
        <button onClick={() => setPeso(p => p - 1)}>-</button>
        <span style={{ margin: '0 1rem' }}>Peso: {peso} kg</span>
        <button onClick={() => setPeso(p => p + 1)}>+</button>
      </div>
      <div>
        <label>
          Altura (m):{' '}
          <input
            type="number"
            step="0.01"
            value={altura}
            onChange={e => setAltura(parseFloat(e.target.value) || 0)}
          />
        </label>
      </div>
    </div>
  );
}
