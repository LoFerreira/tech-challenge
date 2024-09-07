// src/External/Infra/Mappings/ProdutoMapping.ts

import { EntitySchema } from 'typeorm';
import { ProdutoDb } from '../Dto/ProdutoDb';
import { ProdutoSeedData } from '../Mappings/SeedData/ProdutoSeedData';

export const ProdutoMapping = new EntitySchema<ProdutoDb>({
    name: 'Produto',
    tableName: 'dbo.Produtos',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        nome: {
            type: 'varchar',
            length: 40,
            nullable: false,
        },
        descricao: {
            type: 'varchar',
            length: 200,
            nullable: false,
        },
        categoria: {
            type: 'varchar',
            length: 20,
            nullable: false,
        },
        preco: {
            type: 'decimal',
            precision: 18,
            scale: 2, // Define precisão de 18 dígitos com 2 casas decimais
        },
        ativo: {
            type: 'boolean',
            default: true,
        },
    },
    indices: [
        {
            name: 'IDX_UNIQUE_PRODUTO_NOME',
            columns: ['nome'],
            unique: true,
        },
    ],
    // Seed data (to be used in migrations)
    schema: 'dbo',
    data: ProdutoSeedData.getSeedData(), // Populando a tabela com dados iniciais
});
