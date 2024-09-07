// src/External/Infra/Mappings/SeedData/ProdutoSeedData.ts

import { ProdutoDb } from '../../Dto/ProdutoDb';
import { v4 as uuidv4 } from 'uuid'; // Biblioteca para gerar UUIDs

export class ProdutoSeedData {
    /**
     * Retorna os dados iniciais de produtos para o seed no banco de dados.
     */
    public static getSeedData(): ProdutoDb[] {
        return [
            // Lanches
            {
                id: 'efee2d79-ce89-479a-9667-04f57f9e2e5e',
                nome: 'X-SALADA',
                descricao: 'Pão brioche, hambúrguer (150g), queijo prato, pepino, tomate italiano e alface americana.',
                preco: 30,
                categoria: 'Lanche',
                ativo: true,
            },
            {
                id: 'fdff63d2-127f-49c5-854a-e47cae8cedb9',
                nome: 'X-BACON',
                descricao: 'Pão brioche, hambúrguer (150g), queijo prato, bacon, pepino, tomate italiano e alface americana.',
                preco: 33,
                categoria: 'Lanche',
                ativo: true,
            },
            {
                id: 'eee57eb1-1dde-4162-998f-d7148d0c2417',
                nome: 'X-BURGUER',
                descricao: 'Pão brioche, hambúrguer (150g) e queijo prato.',
                preco: 28,
                categoria: 'Lanche',
                ativo: true,
            },
            {
                id: '719bc73f-b90a-4bb0-b6d0-8060ea9f1d4c',
                nome: 'X-DUPLO BACON',
                descricao: 'Pão smash, 2 hambúrgueres (150g cada), maionese do feio ,2 queijos cheddar e muito bacon.',
                preco: 36,
                categoria: 'Lanche',
                ativo: true,
            },

            // Acompanhamentos
            {
                id: '50ba333a-c804-4d2a-a284-9ff1d147df4e',
                nome: 'BATATA FRITA',
                descricao: 'Porção individual de batata frita (100g)',
                preco: 9,
                categoria: 'Acompanhamento',
                ativo: true,
            },
            {
                id: '1bb2aef8-97d7-4fb0-94f5-53bff2f3a618',
                nome: 'ONION RINGS',
                descricao: 'Anéis de cebola (100g)',
                preco: 10,
                categoria: 'Acompanhamento',
                ativo: true,
            },

            // Bebidas
            {
                id: '111cb598-2df6-41bf-b51b-d4e0f292bda3',
                nome: 'PEPSI LATA',
                descricao: '350ml',
                preco: 7,
                categoria: 'Bebida',
                ativo: true,
            },
            {
                id: 'c0eab3dc-2ddf-4dde-a64f-392f2412201f',
                nome: 'GUARANÁ ANTARCTICA LATA',
                descricao: '350ml',
                preco: 7,
                categoria: 'Bebida',
                ativo: true,
            },
            {
                id: '3de0c5e7-787b-4885-8ec8-020866971d3b',
                nome: 'ÁGUA',
                descricao: '500ml',
                preco: 5,
                categoria: 'Bebida',
                ativo: true,
            },

            // Sobremesas
            {
                id: 'b17f425e-e0ff-41cd-92a6-00d78172d7a5',
                nome: 'BROWNIE CHOCOLATE',
                descricao: '70g',
                preco: 10,
                categoria: 'Sobremesa',
                ativo: true,
            },
            {
                id: 'e206c795-d6d6-491e-90ed-fdc08e057939',
                nome: 'BROWNIE CHOCOLATE BRANCO',
                descricao: '70g',
                preco: 10,
                categoria: 'Sobremesa',
                ativo: true,
            },
            {
                id: 'c398d290-d1a1-4f2e-a907-ef55e92beef6',
                nome: 'SORVETE DE CHOCOLATE',
                descricao: '100g',
                preco: 12,
                categoria: 'Sobremesa',
                ativo: true,
            },
            {
                id: '782725ea-70a5-49db-95b2-c4eea841ebca',
                nome: 'SORVETE DE CREME',
                descricao: '100g',
                preco: 12,
                categoria: 'Sobremesa',
                ativo: true,
            },
        ];
    }
}
