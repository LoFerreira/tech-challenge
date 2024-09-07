// src/Application/UseCases/PagamentoUseCase.ts

import { injectable, inject } from 'tsyringe';
import { IPedidoGateway } from '../Gateways/IPedidoGateway';
import { IPagamentoGateway } from '../Gateways/IPagamentoGateway';
import { INotificador } from '../Core/Domain/Notificacoes/INotificador';
import { BaseUseCase } from '../Core/Domain/Base/BaseUseCase';
import { IPagamentoUseCase } from '../Interfaces/IPagamentoUseCase';
import { Pagamento } from '../Domain/Entities/Pagamento';

@injectable()
export class PagamentoUseCase extends BaseUseCase implements IPagamentoUseCase {

    // Construtor que injeta as dependências necessárias
    constructor(
        @inject('IPedidoGateway') private pedidoGateway: IPedidoGateway,
        @inject('IPagamentoGateway') private pagamentoGateway: IPagamentoGateway,
        @inject('INotificador') notificador: INotificador
    ) {
        super(notificador); // Chama o construtor da classe base (BaseUseCase)
    }

    /**
     * Realiza o processo de checkout para um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async efetuarCheckoutAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean> {
        // Obtém o pedido pelo ID
        const pedido = await this.pedidoGateway.obterPedidoAsync(pedidoId, cancellationToken);

        // Verifica se o pedido foi encontrado
        if (!pedido) {
            this.notificar(`Pedido ${pedidoId} não encontrado.`);
            return false;
        }

        // Tenta realizar o checkout do pedido
        if (!pedido.efetuarCheckout()) {
            this.notificar('Não foi possível realizar o checkout do pedido.');
            return false;
        }

        // Verifica se já existe um pagamento para o pedido
        const pagamentoExistente = await this.pagamentoGateway.obterPagamentoPorPedido(pedidoId, cancellationToken);

        if (pagamentoExistente) {
            this.notificar('Pagamento já existente para o pedido, aguarde a confirmação do seu Pix.');
            return false;
        }

        // Atualiza o pedido e cria um novo pagamento se o pedido foi atualizado com sucesso
        if (await this.pedidoGateway.atualizarPedidoAsync(pedido, cancellationToken)) {
            const pagamento = new Pagamento(pedidoId, pedido.valorTotal);

            // Gera o QR Code para o pagamento via Pix
            const qrCodePix = this.pagamentoGateway.gerarQrCodePixGatewayPagamento(pagamento);

            // Atribui o QR Code ao pagamento e altera o status para pendente
            pagamento.atribuirQrCodePix(qrCodePix);
            pagamento.alterarStatusPagamentoParaPendente();

            // Cadastra o pagamento e retorna o resultado
            return await this.pagamentoGateway.cadastrarPagamentoAsync(pagamento, cancellationToken);
        }

        return false;
    }

    /**
     * Notifica o sistema sobre o pagamento de um pedido.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em um booleano indicando sucesso ou falha.
     */
    public async notificarPagamentoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<boolean> {
        // Obtém o pagamento associado ao pedido
        const pagamento = await this.pagamentoGateway.obterPagamentoPorPedido(pedidoId, cancellationToken);

        // Verifica se o pagamento foi encontrado
        if (!pagamento) {
            this.notificar(`Pagamento inexistente para o pedido ${pedidoId}, verifique se o pedido foi efetuado corretamente.`);
            return false;
        }

        // Obtém o pedido pelo ID
        const pedido = await this.pedidoGateway.obterPedidoAsync(pedidoId, cancellationToken);

        // Verifica se o pedido foi encontrado
        if (!pedido) {
            this.notificar(`Pedido ${pedidoId} não encontrado.`);
            return false;
        }

        // Altera o status do pagamento e do pedido
        pagamento.alterarStatusPagamentoParaPago();
        pedido.alterarStatusParaRecebido();

        // Atualiza o pedido e notifica o pagamento
        return await this.pedidoGateway.atualizarPedidoAsync(pedido, cancellationToken) &&
            await this.pagamentoGateway.notificarPagamentoAsync(pagamento, cancellationToken);
    }

    /**
     * Obtém o pagamento associado a um pedido específico.
     * @param pedidoId - O ID do pedido.
     * @param cancellationToken - Sinal para cancelar a operação assíncrona.
     * @returns Uma promessa que resolve em uma string com os detalhes do pagamento.
     */
    public async obterPagamentoPorPedidoAsync(pedidoId: string, cancellationToken: AbortSignal): Promise<string> {
        return await this.pagamentoGateway.obterPagamentoPorPedidoAsync(pedidoId, cancellationToken);
    }
}
