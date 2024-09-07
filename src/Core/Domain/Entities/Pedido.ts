// src/Core/Domain/Entities/Pedido.ts

import { Entity } from './Entity';
import { IAggregateRoot } from './IAggregateRoot';
import { PedidoStatus } from '../../Domain/ValueObjects/PedidoStatus';
import { PedidoItem } from './PedidoItem';
import { validate, IsNotEmpty, IsUUID, IsNumber, IsDate } from 'class-validator';

export class Pedido extends Entity implements IAggregateRoot {
    @IsNumber()
    public numeroPedido: number;

    @IsUUID()
    public clienteId?: string;

    @IsNotEmpty()
    public status: PedidoStatus;

    @IsNumber()
    public valorTotal: number;

    @IsDate()
    public dataPedido: Date;

    private readonly pedidoItems: PedidoItem[] = [];

    public get PedidoItems(): ReadonlyArray<PedidoItem> {
        return this.pedidoItems;
    }

    constructor(id: string, clienteId?: string);
    constructor(id: string, numeroPedido: number, clienteId: string | undefined, status: PedidoStatus, valorTotal: number, dataCriacao: Date);
    constructor(
        id: string,
        numeroPedidoOrClienteId: number | string | undefined,
        clienteIdOrStatus?: string | PedidoStatus,
        statusOrValorTotal?: PedidoStatus | number,
        valorTotalOrDataCriacao?: number | Date,
        dataCriacao?: Date
    ) {
        super();

        if (typeof numeroPedidoOrClienteId === 'number') {
            // Construtor completo
            this.id = id;
            this.numeroPedido = numeroPedidoOrClienteId;
            this.clienteId = clienteIdOrStatus as string | undefined;
            this.status = statusOrValorTotal as PedidoStatus;
            this.valorTotal = valorTotalOrDataCriacao as number;
            this.dataPedido = dataCriacao || new Date();
        } else {
            // Construtor simples
            this.id = id;
            this.clienteId = numeroPedidoOrClienteId as string | undefined;
            this.status = PedidoStatus.Rascunho;
            this.dataPedido = new Date();
            this.valorTotal = 0;
        }
    }

    /**
     * Adiciona um item ao pedido.
     * Se o item já existir, apenas incrementa a quantidade.
     * @param item - O item a ser adicionado.
     */
    public AdicionarItem(item: PedidoItem): void {
        const itemExistente = this.pedidoItems.find(p => p.produtoId === item.produtoId);

        if (itemExistente) {
            itemExistente.AdicionarUnidades(item.quantidade);
        } else {
            this.pedidoItems.push(item);
        }

        item.CalcularValor();
        this.CalcularValorPedido();
    }

    /**
     * Calcula o valor total do pedido somando o valor de todos os itens.
     */
    private CalcularValorPedido(): void {
        this.valorTotal = this.pedidoItems.reduce((sum, item) => sum + item.CalcularValor(), 0);
    }

    /**
     * Altera o status do pedido para "PendentePagamento" se estiver no status "Rascunho".
     * @returns Verdadeiro se o status foi alterado, falso caso contrário.
     */
    public EfetuarCheckout(): boolean {
        if (this.status === PedidoStatus.Rascunho) {
            this.status = PedidoStatus.PendentePagamento;
            return true;
        }
        return false;
    }

    /**
     * Altera o status do pedido para "Recebido" se estiver no status "PendentePagamento".
     * @returns Verdadeiro se o status foi alterado, falso caso contrário.
     */
    public AlterarStatusParaRecebibo(): boolean {
        if (this.status === PedidoStatus.PendentePagamento) {
            this.status = PedidoStatus.Recebido;
            return true;
        }
        return false;
    }

    /**
     * Altera o status do pedido para o novo status, conforme as regras de transição.
     * @param novoStatus - O novo status desejado.
     * @returns Verdadeiro se o status foi alterado, falso caso contrário.
     */
    public AlterarStatus(novoStatus: PedidoStatus): boolean {
        switch (this.status) {
            case PedidoStatus.Recebido:
                if (novoStatus === PedidoStatus.EmPreparacao) {
                    this.status = novoStatus;
                    return true;
                }
                break;
            case PedidoStatus.EmPreparacao:
                if (novoStatus === PedidoStatus.Pronto) {
                    this.status = novoStatus;
                    return true;
                }
                break;
            case PedidoStatus.Pronto:
                if (novoStatus === PedidoStatus.Finalizado) {
                    this.status = novoStatus;
                    return true;
                }
                break;
        }
        return false;
    }
}

/**
 * Função para validar uma instância de Pedido usando as regras definidas nos decorators.
 * @param pedido - A instância de Pedido a ser validada.
 * @returns Uma promessa com os erros de validação ou um array vazio se estiver tudo correto.
 */
export async function validarPedido(pedido: Pedido): Promise<string[]> {
    const errors = await validate(pedido);
    if (errors.length > 0) {
        return errors.map(err => Object.values(err.constraints || {}).join(', '));
    }
    return [];
}
