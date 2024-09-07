// src/External/Infra/Dto/ClienteDb.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes') // Nome da tabela no banco de dados
export class ClienteDb {
    @PrimaryGeneratedColumn('uuid') // Define que o ID é um UUID gerado automaticamente
    id: string;

    @Column({ type: 'varchar', length: 50 })
    nome: string = '';

    @Column({ type: 'varchar', length: 100, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 11 })
    cpf: string = '';

    @Column({ type: 'boolean', default: true })
    ativo: boolean;
}
