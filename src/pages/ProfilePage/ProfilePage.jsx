import React, { useEffect, useState } from 'react';
import { fetchProfile, updateProfile } from '../../services/api';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchProfile();
        setProfile(res.data);
        setDisplayName(res.data.display_name || '');
        setPreview(res.data.foto || '');
      } catch (err) {
        setError('Erro ao carregar perfil');
        console.error(err);
      }
    }
    load();
  }, []);

  const handleFileChange = e => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('display_name', displayName);
    if (file) fd.append('foto', file);
    try {
      const res = await updateProfile(profile.id, fd);
      setProfile(res.data);
      setDisplayName(res.data.display_name);
      setPreview(res.data.foto);
      setFile(null);
      setError('');
    } catch (err) {
      setError('Erro ao atualizar perfil');
      console.error(err);
    }
  };

  if (!profile) return <p>Carregando perfil…</p>;

  return (
    <div className={styles.container}>
      <h1>Meu Perfil</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Nome de Exibição</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Foto de Perfil</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {preview && (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
