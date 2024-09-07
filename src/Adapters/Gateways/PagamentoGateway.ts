// src/Adapters/Gateways/PagamentoGateway.ts

import { injectable } from 'tsyringe';
import { Pagamento } from '../../Core/Domain/Entities/Pagamento';
import { StatusPagamento } from '../../Core/Domain/ValueObjects/StatusPagamento';
import { PagamentoDb } from '../../External/Infra/Dto/PagamentoDb';
import { IPagamentoRepository } from '../../External/Infra/Repositories/IPagamentoRepository';
import { IPagamentoGateway } from './IPagamentoGateway';

@injectable()
export class PagamentoGateway implements IPagamentoGateway {
    constructor(private pagamentoRepository: IPagamentoRepository) {}

    /**
     * Cadastra um novo pagamento no sistema.
     * @param pagamento - A entidade Pagamento a ser cadastrada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async CadastrarPagamentoAsync(pagamento: Pagamento, cancellationToken?: AbortSignal): Promise<boolean> {
        const pagamentoDto = new PagamentoDb();
        pagamentoDto.id = pagamento.id;
        pagamentoDto.pedidoId = pagamento.pedidoId;
        pagamentoDto.status = pagamento.status.toString();
        pagamentoDto.qrCodePix = pagamento.qrCodePix;
        pagamentoDto.valor = pagamento.valor;
        pagamentoDto.dataPagamento = pagamento.dataPagamento;

        // Insere o pagamento no repositório e comita a transação
        await this.pagamentoRepository.insert(pagamentoDto, cancellationToken);
        return await this.pagamentoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Notifica o sistema sobre um pagamento realizado e atualiza seu status.
     * @param pagamento - A entidade Pagamento que será notificada.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns Um booleano indicando se a operação foi bem-sucedida.
     */
    async NotificarPagamentoAsync(pagamento: Pagamento, cancellationToken?: AbortSignal): Promise<boolean> {
        const pagamentoDto = new PagamentoDb();
        pagamentoDto.id = pagamento.id;
        pagamentoDto.pedidoId = pagamento.pedidoId;
        pagamentoDto.status = pagamento.status.toString();
        pagamentoDto.qrCodePix = pagamento.qrCodePix;
        pagamentoDto.valor = pagamento.valor;
        pagamentoDto.dataPagamento = pagamento.dataPagamento;

        // Atualiza o pagamento no repositório e comita a transação
        await this.pagamentoRepository.update(pagamentoDto, cancellationToken);
        return await this.pagamentoRepository.unitOfWork.commit(cancellationToken);
    }

    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pagamento correspondente ao pedido ou null, se não existir.
     */
    ObterPagamentoPorPedido(pedidoId: string, cancellationToken?: AbortSignal): Pagamento | null {
        const pagamentoDto = this.pagamentoRepository.find(e => e.pedidoId === pedidoId, cancellationToken).shift();

        if (!pagamentoDto) {
            return null;
        }

        const statusPagamento = StatusPagamento[pagamentoDto.status as keyof typeof StatusPagamento] || StatusPagamento.Pendente;

        return new Pagamento(
            pagamentoDto.id,
            pagamentoDto.pedidoId,
            statusPagamento,
            pagamentoDto.valor,
            pagamentoDto.qrCodePix,
            pagamentoDto.dataPagamento
        );
    }

    /**
     * Gera o QR Code para o pagamento via Pix.
     * @param pagamento - A entidade Pagamento para a qual o QR Code será gerado.
     * @returns O QR Code em formato string.
     */
    GerarQrCodePixGatewayPagamento(pagamento: Pagamento): string {
        // Simula a integração com gateway de pagamento para gerar o QR Code do Pix
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: 100 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    /**
     * Obtém o pagamento associado a um pedido específico de forma assíncrona.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Token de cancelamento opcional.
     * @returns O pagamento em formato string (ex.: JSON) correspondente ao pedido.
     */
    async ObterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken?: AbortSignal): Promise<string> {
        return await this.pagamentoRepository.ObterPagamentoPorPedidoAsync(pedidoId, cancellationToken);
    }
}
