'use client';

import { useState } from 'react';

const algorithms = [
  {
    id: 'Contagem',
    name: 'Contagem',
    desc: 'Conta quantos valores inteiros existem entre o primeiro dado e N.',
    inputs: [
      { name: 'n', label: 'Valor de N', type: 'number', placeholder: 'Ex: 5' },
      { name: 'dados', label: 'Dados (separados por espaço)', type: 'text', placeholder: 'Ex: 1 2 3 4 5' }
    ]
  },
  {
    id: 'Fibonacci',
    name: 'Fibonacci',
    desc: 'Gera os N primeiros termos da sequência de Fibonacci.',
    inputs: [
      { name: 'n', label: 'Quantidade de termos (N > 1)', type: 'number', placeholder: 'Ex: 10' }
    ]
  },
  {
    id: 'MDC',
    name: 'Máximo Divisor Comum',
    desc: 'Calcula o MDC entre dois números usando o Algoritmo de Euclides.',
    inputs: [
      { name: 'a', label: 'Primeiro número (A)', type: 'number', placeholder: 'Ex: 48' },
      { name: 'b', label: 'Segundo número (B)', type: 'number', placeholder: 'Ex: 18' }
    ]
  },
  {
    id: 'NumeroPrimo',
    name: 'Número Primo',
    desc: 'Verifica se um número inteiro positivo é primo.',
    inputs: [
      { name: 'n', label: 'Número', type: 'number', placeholder: 'Ex: 17' }
    ]
  },
  {
    id: 'Quicksort',
    name: 'Quicksort',
    desc: 'Ordena um array de números utilizando o método Quicksort.',
    inputs: [
      { name: 'n', label: 'Quantidade de elementos', type: 'number', placeholder: 'Ex: 5' },
      { name: 'arr', label: 'Elementos (separados por espaço)', type: 'text', placeholder: 'Ex: 9 3 7 1 5' }
    ]
  },
  {
    id: 'Somatorio',
    name: 'Somatório',
    desc: 'Realiza a soma de um conjunto de números.',
    inputs: [
      { name: 'n', label: 'Quantidade de números', type: 'number', placeholder: 'Ex: 4' },
      { name: 'arr', label: 'Números (separados por espaço)', type: 'text', placeholder: 'Ex: 1.5 2.5 3 4' }
    ]
  },
  {
    id: 'TrocaDeVariaveis',
    name: 'Troca de Variáveis',
    desc: 'Troca os valores de duas variáveis.',
    inputs: [
      { name: 'a', label: 'Variável A', type: 'number', placeholder: 'Ex: 10' },
      { name: 'b', label: 'Variável B', type: 'number', placeholder: 'Ex: 20' }
    ]
  }
];

export default function Home() {
  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);
  const [engine, setEngine] = useState('JavaScript');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleAlgoSelect = (algo) => {
    setSelectedAlgo(algo);
    setFormData({});
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    // Build args array
    let args = [];
    try {
      if (selectedAlgo.id === 'Contagem') {
        args.push(formData.n);
        args = args.concat(formData.dados.trim().split(/\s+/));
      } else if (selectedAlgo.id === 'Fibonacci' || selectedAlgo.id === 'NumeroPrimo') {
        args.push(formData.n);
      } else if (selectedAlgo.id === 'MDC' || selectedAlgo.id === 'TrocaDeVariaveis') {
        args.push(formData.a, formData.b);
      } else if (selectedAlgo.id === 'Quicksort' || selectedAlgo.id === 'Somatorio') {
        args.push(formData.n);
        args = args.concat(formData.arr.trim().split(/\s+/));
      }
      
      // Basic validation
      if (args.some(a => a === undefined || a === '')) {
         throw new Error("Por favor, preencha todos os campos.");
      }

      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          algorithm: selectedAlgo.id,
          engine,
          args
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro na execução');
      }

      setResult(JSON.stringify(data.result, null, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-title">Algoritmos</div>
        {algorithms.map(algo => (
          <button
            key={algo.id}
            className={`nav-button ${selectedAlgo.id === algo.id ? 'active' : ''}`}
            onClick={() => handleAlgoSelect(algo)}
          >
            {algo.name}
          </button>
        ))}
      </aside>

      <main className="main-content">
        <div className="glass-card">
          <h1 className="card-title">{selectedAlgo.name}</h1>
          <p className="card-desc">{selectedAlgo.desc}</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Motor de Execução</label>
              <select 
                className="form-select"
                value={engine} 
                onChange={(e) => setEngine(e.target.value)}
              >
                <option value="JavaScript">Node.js (JavaScript)</option>
                <option value="Java">JVM (Java)</option>
              </select>
            </div>

            {selectedAlgo.inputs.map(input => (
              <div className="form-group" key={input.name}>
                <label className="form-label">{input.label}</label>
                <input
                  type={input.type === 'number' ? 'text' : 'text'}
                  className="form-input"
                  placeholder={input.placeholder}
                  value={formData[input.name] || ''}
                  onChange={(e) => handleInputChange(e, input.name)}
                />
              </div>
            ))}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Executando...' : 'Executar Algoritmo'}
            </button>
          </form>

          {(result || error) && (
            <div className="result-box">
              <div className="result-title">
                {error ? 'Erro na Execução' : 'Resultado'}
              </div>
              <div className={`result-content ${error ? 'error-content' : ''}`}>
                {error ? error : result}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
