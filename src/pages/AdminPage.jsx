// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Table, Button, Spinner, Alert, 
  Form, Modal, Badge
} from 'react-bootstrap';
import { 
  PersonPlus, PersonX, PersonCheck, PersonDash 
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { 
  fetchUsers, createUser, updateUser, deleteUser 
} from '../services/userService';

const AdminPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const loadUsers = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (err) {
        setError('Falha ao carregar usuários');
        console.error('Erro ao carregar usuários:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode) {
        // Atualizar usuário existente
        const updatedUser = await updateUser(currentUser.id, {
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role
        });
        setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      } else {
        // Criar novo usuário
        if (currentUser.password !== currentUser.confirmPassword) {
          setError('As senhas não coincidem');
          return;
        }

        const newUser = await createUser({
          name: currentUser.name,
          email: currentUser.email,
          password: currentUser.password,
          role: currentUser.role
        });
        setUsers([...users, newUser]);
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Erro ao salvar usuário');
      console.error('Erro no formulário:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userData) => {
    setCurrentUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      password: '',
      confirmPassword: ''
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        setError('Falha ao excluir usuário');
        console.error('Erro ao excluir:', err);
      }
    }
  };

  const resetForm = () => {
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      role: 'user',
      password: '',
      confirmPassword: ''
    });
    setEditMode(false);
    setError('');
  };

  if (user?.role !== 'admin') {
    return (
      <Container className="my-5">
        <Card className="border-danger">
          <Card.Body className="text-center py-5">
            <PersonDash size={48} className="text-danger mb-3" />
            <h3>Acesso Restrito</h3>
            <p className="text-muted">
              Você não tem permissão para acessar esta área administrativa
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2">Gerenciamento de Usuários</h1>
              <p className="text-muted">
                Administre os usuários e permissões da plataforma
              </p>
            </div>
            <Button 
              variant="primary"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <PersonPlus size={20} className="me-1" />
              Adicionar Usuário
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {loading ? (
        <Row className="mb-4">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Função</th>
                      <th>Status</th>
                      <th>Último Acesso</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userItem) => (
                      <tr key={userItem.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {userItem.role === 'admin' ? (
                              <PersonCheck className="text-primary me-2" />
                            ) : (
                              <PersonDash className="text-secondary me-2" />
                            )}
                            <span>
                              {userItem.name}
                              {userItem.id === user.id && ' (Você)'}
                            </span>
                          </div>
                        </td>
                        <td>{userItem.email}</td>
                        <td>
                          <Badge bg={userItem.role === 'admin' ? 'primary' : 'secondary'}>
                            {userItem.role === 'admin' ? 'Administrador' : 'Usuário'}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={userItem.is_active ? 'success' : 'danger'}>
                            {userItem.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </td>
                        <td>
                          {userItem.last_login 
                            ? new Date(userItem.last_login).toLocaleString('pt-BR') 
                            : 'Nunca acessou'}
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleEdit(userItem)}
                            disabled={userItem.id === user.id}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(userItem.id)}
                            disabled={userItem.id === user.id}
                          >
                            <PersonX size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Modal para adicionar/editar usuário */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formRole">
                  <Form.Label>Função</Form.Label>
                  <Form.Select
                    name="role"
                    value={currentUser.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {!editMode && (
                <>
                  <Col md={6}>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={currentUser.password}
                        onChange={handleInputChange}
                        required={!editMode}
                      />
                    </Form.Group>
                  </Col>
                </>
              )}
            </Row>

            {!editMode && (
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={currentUser.confirmPassword}
                      onChange={handleInputChange}
                      required={!editMode}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : editMode ? (
                'Atualizar Usuário'
              ) : (
                'Criar Usuário'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminPage;