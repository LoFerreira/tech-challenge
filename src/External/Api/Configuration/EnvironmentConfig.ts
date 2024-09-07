// src/api/EnvironmentConfig.ts

import { plainToInstance } from 'class-transformer';
import { validateSync, IsString } from 'class-validator';

export class EnvironmentConfig {
    /**
     * Configura o ambiente carregando as variáveis de configuração.
     * @param configuration - Objeto contendo as variáveis de configuração (geralmente `process.env`).
     * @returns Uma instância da classe Settings configurada.
     */
    public static configureEnvironment(configuration: NodeJS.ProcessEnv): Settings {
        const settings = plainToInstance(Settings, configuration, { excludeExtraneousValues: true });

        // Validar se a configuração está correta
        const errors = validateSync(settings);
        if (errors.length > 0) {
            throw new Error(`Config validation error: ${errors.toString()}`);
        }

        return settings;
    }
}

export class Settings {
    @IsString()
    public connectionStrings: ConnectionStrings;

    constructor() {
        this.connectionStrings = new ConnectionStrings();
    }
}

export class ConnectionStrings {
    @IsString()
    public defaultConnection: string;

    constructor() {
        this.defaultConnection = process.env.DB_CONNECTION_STRING || '';
    }
}
