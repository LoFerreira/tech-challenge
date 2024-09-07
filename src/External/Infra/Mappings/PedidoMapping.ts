// src/External/Infra/Mappings/PedidoMapping.ts

import { EntitySchema } from 'typeorm';
import { PedidoDb } from '../Dto/PedidoDb';
import { PedidoItemDb } from '../Dto/PedidoItemDb';

export const PedidoMapping = new EntitySchema<PedidoDb>({
    name: 'Pedido',
    tableName: 'dbo.Pedidos',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        numeroPedido: {
            type: 'int',
            generated: 'increment', // Substituto para UseIdentityColumn
        },
        valorTotal: {
            type: 'decimal',
            precision: 18,
            scale: 2, // Define precisão de 18 dígitos com 2 casas decimais
        },
        status: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
    },
    relations: {
        itens: {
            type: 'one-to-many',
            target: 'PedidoItemDb',
            inverseSide: 'pedido',
            joinColumn: {
                name: 'pedidoId',
            },
        },
    },
});
