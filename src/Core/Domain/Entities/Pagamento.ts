// src/Core/Domain/Entities/Pagamento.ts

import { Entity } from './Entity';
import { IAggregateRoot } from './IAggregateRoot';
import { StatusPagamento } from '../../Domain/ValueObjects/StatusPagamento';

export class Pagamento extends Entity implements IAggregateRoot {
    public pedidoId: string;
    public status: StatusPagamento;
    public valor: number;
    public qrCodePix?: string;
    public dataPagamento: Date;

    constructor(pedidoId: string, valor: number);
    constructor(id: string, pedidoId: string, status: StatusPagamento, valor: number, qrCodePix?: string, dataCriacao?: Date);
    constructor(
        idOrPedidoId: string,
        pedidoIdOrValor: string | number,
        statusOrValor?: StatusPagamento | number,
        valorOrQrCodePix?: number | string,
        qrCodePixOrDataCriacao?: string | Date,
        dataCriacao?: Date
    ) {
        super();

        if (typeof pedidoIdOrValor === 'string') {
            // Construtor completo
            this.id = idOrPedidoId;
            this.pedidoId = pedidoIdOrValor;
            this.status = statusOrValor as StatusPagamento;
            this.valor = valorOrQrCodePix as number;
            this.qrCodePix = qrCodePixOrDataCriacao as string | undefined;
            this.dataPagamento = dataCriacao || new Date();
        } else {
            // Construtor simples
            this.pedidoId = idOrPedidoId;
            this.valor = pedidoIdOrValor;
            this.status = StatusPagamento.Pendente; // Status inicial
            this.dataPagamento = new Date();
        }
    }

    /**
     * Atribui um QR Code Pix ao pagamento.
     * @param qrCodePix - O código QR do pagamento via Pix.
     */
    public AtribuirQrCodePix(qrCodePix: string): void {
        this.qrCodePix = qrCodePix;
    }

    /**
     * Altera o status do pagamento para "Pendente".
     */
    public AlterarStatusPagamentoParaPendente(): void {
        this.status = StatusPagamento.Pendente;
    }

    /**
     * Altera o status do pagamento para "Pago".
     */
    public AlterarStatusPagamentoParaPago(): void {
        this.status = StatusPagamento.Pago;
    }
}
