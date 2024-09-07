// src/Core/Domain/Entities/PedidoListaItens.ts

export class PedidoListaItens {
    public produtoId: string;
    public quantidade: number;

    /**
     * Construtor para criar uma instância de PedidoListaItens.
     * @param produtoId - O ID do produto.
     * @param quantidade - A quantidade do produto.
     */
    constructor(produtoId: string, quantidade: number) {
        this.produtoId = produtoId;
        this.quantidade = quantidade;
    }
}