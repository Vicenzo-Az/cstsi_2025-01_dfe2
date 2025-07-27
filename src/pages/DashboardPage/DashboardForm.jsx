import { useEffect, useState } from 'react';

export default function DashboardForm({ editing, onSave, onCancel }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(editing?.title || '');
  }, [editing]);

  const submit = e => {
    e.preventDefault();
    onSave({ id: editing?.id, title });
  };

  return (
    <form onSubmit={submit} className="d-flex gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Título do dashboard"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button className="btn btn-primary">{editing ? 'Atualizar' : 'Criar'}</button>
      {editing && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
