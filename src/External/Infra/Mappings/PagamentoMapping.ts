// src/External/Infra/Mappings/PagamentoMapping.ts

import { EntitySchema } from 'typeorm';
import { PagamentoDb } from '../Dto/PagamentoDb';

export const PagamentoMapping = new EntitySchema<PagamentoDb>({
    name: 'Pagamento',
    tableName: 'dbo.Pagamentos',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        valor: {
            type: 'decimal',
            precision: 18,
            scale: 2, // Define precisão de 18 dígitos com 2 casas decimais
        },
        status: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        qrCodePix: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        dataPagamento: {
            type: 'timestamp',
            nullable: false,
        },
    },
    relations: {
        pedido: {
            type: 'many-to-one',
            target: 'PedidoDb',
            joinColumn: {
                name: 'pedidoId',
            },
            onDelete: 'CASCADE',
        },
    },
});
