import React, { useState } from 'react';
import { useDataSources } from '../../context/DataSourceContext';
import DataSourceForm from './DataSourceForm';
import styles from './DataSourcePage.module.css';

export default function DataSourcePage() {
  const { dataSources, loading, error, save, remove } = useDataSources();
  const [editing, setEditing] = useState(null);

  if (loading) return <p>Carregando fontes…</p>;
  if (error) return <p className={styles.error}>Erro ao carregar</p>;

  return (
    <div className={styles.container}>
      <h1>Fontes de Dados</h1>
      <DataSourceForm
        editing={editing}
        onSave={save}
        onCancel={() => setEditing(null)}
      />
      <ul className={styles.list}>
        {dataSources.map(ds => (
          <li key={ds.id} className={styles.item}>
            <span>
              <strong>{ds.name}</strong> <em>({ds.type})</em>
            </span>
            <div className={styles.actions}>
              <button onClick={() => setEditing(ds)}>✎</button>
              <button onClick={() => remove(ds.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
