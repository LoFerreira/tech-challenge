// src/Core/Domain/ValueObjects/PedidoStatus.ts

/**
 * Enum que representa os diferentes status de um pedido.
 */
export enum PedidoStatus {
    Rascunho = 'Rascunho',
    PendentePagamento = 'PendentePagamento',
    Recebido = 'Recebido',
    EmPreparacao = 'EmPreparacao',
    Pronto = 'Pronto',
    Finalizado = 'Finalizado'
}