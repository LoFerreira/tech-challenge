// src/External/Infra/Migrations/ApplicationDbContextModel.ts

import { DataSource } from 'typeorm';
import { ClienteDb } from '../Dto/ClienteDb';
import { PagamentoDb } from '../Dto/PagamentoDb';
import { PedidoDb } from '../Dto/PedidoDb';
import { PedidoItemDb } from '../Dto/PedidoItemDb';
import { ProdutoDb } from '../Dto/ProdutoDb';
import { ClienteSeedData } from '../Mappings/SeedData/ClienteSeedData';
import { ProdutoSeedData } from '../Mappings/SeedData/ProdutoSeedData';

export const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 1433,
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydatabase',
    synchronize: true, // Pode ser desativado se usar migrações manuais
    logging: true,
    entities: [ClienteDb, PagamentoDb, PedidoDb, PedidoItemDb, ProdutoDb],
    migrations: ['src/migrations/*.ts'],
    seeds: ['src/External/Infra/Mappings/SeedData/*.ts'],
});

// Exemplo de seed com TypeORM para ClienteDb e ProdutoDb
AppDataSource.initialize().then(async () => {
    const clienteRepository = AppDataSource.getRepository(ClienteDb);
    const produtoRepository = AppDataSource.getRepository(ProdutoDb);

    // Inserindo dados de seed
    await clienteRepository.save(ClienteSeedData.getSeedData());
    await produtoRepository.save(ProdutoSeedData.getSeedData());
}).catch((error) => console.log(error));
