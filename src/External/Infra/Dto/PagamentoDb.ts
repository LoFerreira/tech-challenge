// src/External/Infra/Dto/PagamentoDb.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PedidoDb } from './PedidoDb';

@Entity('pagamentos') // Nome da tabela no banco de dados
export class PagamentoDb {
    @PrimaryGeneratedColumn('uuid') // Define que o ID do pagamento é gerado automaticamente como UUID
    id: string;

    @Column({ type: 'uuid' })
    pedidoId: string;

    @Column({ type: 'varchar', length: 50 })
    status: string = '';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valor: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    qrCodePix?: string;

    @Column({ type: 'timestamp' })
    dataPagamento: Date;

    // Relação muitos-para-um com a entidade PedidoDb
    @ManyToOne(() => PedidoDb, pedido => pedido.pagamentos)
    @JoinColumn({ name: 'pedidoId' }) // Faz a junção da coluna 'pedidoId'
    pedido: PedidoDb;
}
