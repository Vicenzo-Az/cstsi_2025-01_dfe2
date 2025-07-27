import React, { useEffect, useState } from 'react';
import styles from './DataSourcePage.module.css';

export default function DataSourceForm({ editing, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('csv');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setType(editing.type);
      setUrl(editing.url || '');
      setFile(null);
    } else {
      setName('');
      setType('csv');
      setUrl('');
      setFile(null);
    }
  }, [editing]);

  const handleSubmit = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('type', type);
    if (type === 'csv' && file) fd.append('file', file);
    if (type === 'googlesheet') fd.append('url', url);
    onSave(fd);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da fonte"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="csv">CSV / XLSX</option>
        <option value="googlesheet">Google Sheets</option>
      </select>
      {type === 'csv' ? (
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={e => setFile(e.target.files[0])}
          required={!editing}
        />
      ) : (
        <input
          type="url"
          placeholder="URL público do Google Sheets"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
      )}
      <div className={styles.buttons}>
        <button type="submit">{editing ? 'Salvar' : 'Adicionar'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
