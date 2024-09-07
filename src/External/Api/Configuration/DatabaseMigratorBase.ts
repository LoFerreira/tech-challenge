
// src/api/Configuration/HealthCheckConfig.ts

import { DataSource } from 'typeorm';

export class DatabaseMigratorBase {
    /**
     * Realiza a migração do banco de dados utilizando o contexto fornecido.
     * @param dataSource - Instância do TypeORM DataSource.
     */
    public static async migrateDatabase(dataSource: DataSource): Promise<void> {
        try {
            // Executa a migração do banco de dados
            await dataSource.runMigrations();
            console.log('Database migration completed successfully.');
        } catch (error) {
            console.error('Error during database migration:', error);
            throw error; // Lança o erro para ser tratado por um handler global de erros.
        }
    }
}