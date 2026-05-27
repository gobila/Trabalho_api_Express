import { DataSource } from 'typeorm';
import { Penalty } from './entities/penaltyEntity';

export const appDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'database.sqlite',
  synchronize: true, // Cria e atualiza as tabelas no SQLite automaticamente (ótimo para desenvolvimento)
  logging: false,
  entities: [Penalty],
});

// Inicializa a conexão com o banco
appDataSource.initialize()
  .then(() => console.log('✅ TypeORM Database connected successfully!'))
  .catch((error) => console.error('❌ Error during TypeORM initialization:', error));
