// src/External/Infra/Mappings/PedidoItemMapping.ts

import { EntitySchema } from 'typeorm';
import { PedidoItemDb } from '../Dto/PedidoItemDb';

export const PedidoItemMapping = new EntitySchema<PedidoItemDb>({
    name: 'PedidoItem',
    tableName: 'dbo.PedidosItens',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        valorUnitario: {
            type: 'decimal',
            precision: 18,
            scale: 2, // Define precisão de 18 dígitos com 2 casas decimais
        },
        quantidade: {
            type: 'int',
            nullable: false,
        },
        produtoId: {
            type: 'uuid',
            nullable: false,
        },
        pedidoId: {
            type: 'uuid',
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
        produto: {
            type: 'many-to-one',
            target: 'ProdutoDb',
            joinColumn: {
                name: 'produtoId',
            },
            onDelete: 'CASCADE',
        },
    },
});
