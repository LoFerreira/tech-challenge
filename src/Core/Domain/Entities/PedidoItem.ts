// src/Core/Domain/Entities/PedidoItem.ts

import { Entity } from './Entity';
import { IsNotEmpty, IsUUID, IsInt, Min, IsDecimal, validate } from 'class-validator';

export class PedidoItem extends Entity {
    @IsUUID('4', { message: 'O ProdutoId deve ser um UUID válido.' })
    public produtoId: string;

    @IsInt({ message: 'A Quantidade deve ser um número inteiro.' })
    @Min(1, { message: 'A Quantidade deve ser maior do que zero.' })
    public quantidade: number;

    @IsDecimal({}, { message: 'O ValorUnitario deve ser um valor decimal válido.' })
    @Min(0.01, { message: 'O ValorUnitario deve ser maior do que zero.' })
    public valorUnitario: number;

    constructor(produtoId: string, quantidade: number, valorUnitario: number) {
        super();
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.valorUnitario = valorUnitario;
    }

    /**
     * Adiciona unidades ao item do pedido.
     * @param unidades - O número de unidades a serem adicionadas.
     * @throws {Error} Se o número de unidades for menor ou igual a zero.
     */
    public AdicionarUnidades(unidades: number): void {
        if (unidades <= 0) {
            throw new Error('O número de unidades a serem adicionadas deve ser maior que zero.');
        }
        this.quantidade += unidades;
    }

    /**
     * Calcula o valor total do item do pedido.
     * @returns O valor total do item.
     */
    public CalcularValor(): number {
        return this.quantidade * this.valorUnitario;
    }
}

/**
 * Função para validar uma instância de PedidoItem usando as regras definidas nos decorators.
 * @param pedidoItem - A instância de PedidoItem a ser validada.
 * @returns Uma promessa com os erros de validação ou um array vazio se estiver tudo correto.
 */
export async function validarPedidoItem(pedidoItem: PedidoItem): Promise<string[]> {
    const errors = await validate(pedidoItem);
    if (errors.length > 0) {
        return errors.map(err => Object.values(err.constraints || {}).join(', '));
    }
    return [];
}
