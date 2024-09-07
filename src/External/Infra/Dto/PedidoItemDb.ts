// src/External/Infra/Dto/PedidoItemDb.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PedidoDb } from './PedidoDb';

@Entity('pedido_itens') // Nome da tabela no banco de dados
export class PedidoItemDb {
    @PrimaryGeneratedColumn('uuid') // Define que o ID do item é gerado automaticamente como UUID
    id: string;

    @Column({ type: 'uuid' }) // Referência ao ID do pedido
    pedidoId: string;

    @Column({ type: 'uuid' }) // Referência ao ID do produto
    produtoId: string;

    @Column({ type: 'int' }) // Quantidade do produto
    quantidade: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 }) // Valor unitário do produto
    valorUnitario: number;

    // Relação muitos-para-um com a entidade PedidoDb
    @ManyToOne(() => PedidoDb, pedido => pedido.itens)
    @JoinColumn({ name: 'pedidoId' }) // Relaciona com a coluna 'pedidoId'
    pedido: PedidoDb;
}
