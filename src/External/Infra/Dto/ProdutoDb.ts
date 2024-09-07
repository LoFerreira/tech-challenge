// src/External/Infra/Dto/ProdutoDb.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos') // Nome da tabela no banco de dados
export class ProdutoDb {
    @PrimaryGeneratedColumn('uuid') // Define que o ID do produto é gerado automaticamente como UUID
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string = '';

    @Column({ type: 'varchar', length: 255 })
    descricao: string = '';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number;

    @Column({ type: 'varchar', length: 50 })
    categoria: string = '';

    @Column({ type: 'boolean', default: true })
    ativo: boolean;
}
