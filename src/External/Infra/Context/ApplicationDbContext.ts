// src/External/Infra/Context/ApplicationDbContext.ts

import { DataSource, EntityManager } from 'typeorm';
import { injectable } from 'tsyringe';
import * as path from 'path';
import * as fs from 'fs';

@injectable()
export class ApplicationDbContext {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = new DataSource({
            type: 'mssql', // Substitua por seu tipo de banco de dados (mssql, postgres, mysql, etc.)
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 1433,
            username: process.env.DB_USERNAME || 'sa',
            password: process.env.DB_PASSWORD || 'yourpassword',
            database: process.env.DB_NAME || 'mydatabase',
            synchronize: false, // Mude para true em desenvolvimento para sincronizar entidades
            entities: [path.join(__dirname, '../Entities/*.ts')],
            migrations: [path.join(__dirname, '../Migrations/*.ts')],
            retryAttempts: 3,
            retryDelay: 5000,
        });
    }

    /**
     * Inicia a conexão com o banco de dados.
     */
    public async connect(): Promise<void> {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
            console.log('Database connection initialized');
        }
    }

    /**
     * Commit manual para salvar transações.
     */
    public async commitTransaction(manager: EntityManager): Promise<boolean> {
        try {
            await manager.save(); // Salva as mudanças na transação
            return true;
        } catch (error) {
            console.error('Transaction failed', error);
            return false;
        }
    }

    /**
     * Obtém uma entidade pelo seu nome.
     */
    public getRepository<T>(entity: new () => T): EntityManager {
        return this.dataSource.manager.getRepository(entity);
    }

    /**
     * Obtém a conexão do banco de dados.
     */
    public getDbConnection(): any {
        return this.dataSource.driver;
    }

    /**
     * Aplica as configurações de entidades.
     */
    public applyMigrations(): void {
        this.dataSource.runMigrations();
    }
}
