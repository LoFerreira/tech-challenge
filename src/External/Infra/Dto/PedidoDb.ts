// src/External/Infra/Dto/PedidoDb.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PedidoItemDb } from './PedidoItemDb';

@Entity('pedidos') // Nome da tabela no banco de dados
export class PedidoDb {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int' })
    numeroPedido: number;

    @Column({ type: 'uuid', nullable: true })
    clienteId?: string;

    @Column({ type: 'varchar', length: 50 })
    status: string = '';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorTotal: number;

    @Column({ type: 'timestamp' })
    dataPedido: Date;

    // Relação um-para-muitos com PedidoItemDb
    @OneToMany(() => PedidoItemDb, item => item.pedido, { cascade: true })
    itens: PedidoItemDb[];

    constructor() {
        this.itens = [];
    }
}
