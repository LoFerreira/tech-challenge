// src/api/Configuration/HealthCheckConfig.ts

import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule],
    providers: [HealthCheckService, TypeOrmHealthIndicator],
})
export class HealthCheckConfig {
    /**
     * Configura o health check da aplicação utilizando a conexão com o banco de dados.
     * @param app - A instância do Express ou NestJS app para configurar o health check endpoint.
     * @param dbConnectionString - String de conexão com o banco de dados.
     */
    public static addHealthCheckConfig(app: any, dbConnectionString: string): void {
        // Configurando o health check usando uma biblioteca do NestJS Terminus para checks
        app.use('/health', async (req, res) => {
            const healthCheckService = new HealthCheckService();
            const dbHealth = new TypeOrmHealthIndicator();

            const dbCheck = await dbHealth.pingCheck('database', { timeout: 300 });

            if (dbCheck.status === 'up') {
                res.status(200).send('OK');
            } else {
                res.status(503).send('Service Unavailable');
            }
        });
    }
}
