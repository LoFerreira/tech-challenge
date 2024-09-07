// src/External/Infra/DependencyInjection/ServiceCollectionExtensions.ts

import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import { ApplicationDbContext } from '../Context/ApplicationDbContext';
import { ProdutoRepository } from '../Repositories/ProdutoRepository';
import { ClienteRepository } from '../Repositories/ClienteRepository';
import { PedidoRepository } from '../Repositories/PedidoRepository';
import { PagamentoRepository } from '../Repositories/PagamentoRepository';

export class ServiceCollectionExtensions {
    /**
     * Configura os serviços de infraestrutura e injeção de dependências.
     * @param connectionString - A string de conexão para o banco de dados.
     */
    public static async addInfraDependencyServices(connectionString: string): Promise<void> {
        // Configuração do banco de dados com TypeORM
        const dataSource = new DataSource({
            type: 'mssql',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 1433,
            username: process.env.DB_USERNAME || 'sa',
            password: process.env.DB_PASSWORD || 'yourpassword',
            database: process.env.DB_NAME || 'mydatabase',
            synchronize: false,
            logging: false,
            entities: [__dirname + '/../Entities/*.ts'], // Path para as entidades
            migrations: [__dirname + '/../Migrations/*.ts'],
            retryAttempts: 3,
            retryDelay: 5000,
        });

        // Inicializa a conexão com o banco de dados
        await dataSource.initialize();

        // Registra o contexto do banco de dados no container
        container.register('ApplicationDbContext', {
            useValue: new ApplicationDbContext(),
        });

        // Registra os repositórios no container
        container.register('IProdutoRepository', {
            useClass: ProdutoRepository,
        });
        container.register('IClienteRepository', {
            useClass: ClienteRepository,
        });
        container.register('IPedidoRepository', {
            useClass: PedidoRepository,
        });
        container.register('IPagamentoRepository', {
            useClass: PagamentoRepository,
        });
    }
}
