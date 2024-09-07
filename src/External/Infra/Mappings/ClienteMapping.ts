// src/External/Infra/Mappings/ClienteMapping.ts

import { EntitySchema } from 'typeorm';
import { ClienteDb } from '../Dto/ClienteDb';
import { ClienteSeedData } from '../Mappings/SeedData/ClienteSeedData';

export const ClienteMapping = new EntitySchema<ClienteDb>({
    name: 'Cliente',
    tableName: 'dbo.Clientes',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        nome: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        email: {
            type: 'varchar',
            length: 100,
            nullable: true,
        },
        cpf: {
            type: 'varchar',
            length: 11,
            nullable: false,
        },
        ativo: {
            type: 'boolean',
            default: true,
        },
    },
    indices: [
        {
            name: 'IDX_UNIQUE_EMAIL',
            columns: ['email'],
            unique: true,
        },
        {
            name: 'IDX_UNIQUE_CPF',
            columns: ['cpf'],
            unique: true,
        },
        {
            name: 'IDX_UNIQUE_EMAIL_CPF',
            columns: ['email', 'cpf'],
            unique: true,
        },
    ],
    // Seed data (to be used in migrations)
    schema: 'dbo',
    data: ClienteSeedData.getSeedData(),
});
