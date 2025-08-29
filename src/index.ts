import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || 'mi_base',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'clave_usuario',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || '3307'),
    dialect: 'mariadb',
    logging: false,
  }
);

app.get('/health', async (_req, res) => {
  try { await sequelize.authenticate(); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ ok: false, error: (e as Error).message }); }
});

const port = Number(process.env.PORT || '3000');
app.listen(port, () => console.log(`API running on http://localhost:${port}`));