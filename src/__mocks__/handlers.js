import { rest } from 'msw';

export const handlers = [
  // Mock para login
  rest.post('http://localhost:8000/api/v1/auth/login/', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'mock-jwt-token',
        user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' }
      })
    );
  }),

  // Mock para fontes de dados
  rest.get('http://localhost:8000/api/v1/data-sources/', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Sales Data', type: 'CSV', created_at: '2025-01-15' },
        { id: 2, name: 'Customer API', type: 'API', created_at: '2025-01-10' }
      ])
    );
  }),
];