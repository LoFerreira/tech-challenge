// src/Core/Domain/Entities/Produto.ts

import { Entity } from './Entity';
import { IAggregateRoot } from './IAggregateRoot';
import { Categoria } from '../ValueObjects/Categoria';
import { IsNotEmpty, IsString, Length, IsDecimal, Min, Max, IsEnum, IsBoolean, validate } from 'class-validator';

export class Produto extends Entity implements IAggregateRoot {
    @IsString({ message: 'O Nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O Nome não pode ser nulo.' })
    @Length(2, 40, { message: 'O Nome precisa ter entre 2 e 40 caracteres.' })
    public nome: string;

    @IsString({ message: 'A Descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'A Descrição não pode ser nula.' })
    @Length(5, 200, { message: 'A Descrição precisa ter entre 5 e 200 caracteres.' })
    public descricao: string;

    @IsDecimal({}, { message: 'O Preço deve ser um valor decimal.' })
    @Min(1, { message: 'O Preço precisa ser maior ou igual a 1.' })
    @Max(9999, { message: 'O Preço precisa ser menor ou igual a 9999.' })
    public preco: number;

    @IsEnum(Categoria, { message: 'A Categoria é inválida.' })
    public categoria: Categoria;

    @IsBoolean({ message: 'O status deve ser um valor booleano.' })
    public ativo: boolean;

    constructor(id: string, nome: string, descricao: string, preco: number, categoria: Categoria, ativo: boolean) {
        super();
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.ativo = ativo;
    }
}

/**
 * Função para validar uma instância de Produto usando as regras definidas nos decorators.
 * @param produto - A instância de Produto a ser validada.
 * @returns Uma promessa com os erros de validação ou um array vazio se estiver tudo correto.
 */
export async function validarProduto(produto: Produto): Promise<string[]> {
    const errors = await validate(produto);
    if (errors.length > 0) {
        return errors.map(err => Object.values(err.constraints || {}).join(', '));
    }
    return [];
}