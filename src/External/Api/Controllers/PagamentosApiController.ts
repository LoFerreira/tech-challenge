// src/api/Controllers/PagamentosApiController.ts

import { Request, Response, Router } from 'express';
import { IPagamentoController } from './IPagamentoController';
import { Notificador } from '../Core/Notificacoes/Notificador';
import { validate } from 'class-validator';

export class PagamentosApiController {
    public router: Router;
    private pagamentoController: IPagamentoController;
    private notificador: Notificador;

    constructor(pagamentoController: IPagamentoController, notificador: Notificador) {
        this.router = Router();
        this.pagamentoController = pagamentoController;
        this.notificador = notificador;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/pagamentos/:pedidoId', this.obterPagamentoPorPedido.bind(this));
        this.router.post('/pagamentos/checkout/:pedidoId', this.checkout.bind(this));
        this.router.post('/pagamentos/notificacoes/:pedidoId', this.notificacoes.bind(this));
    }

    private async obterPagamentoPorPedido(req: Request, res: Response) {
        const { pedidoId } = req.params;
        const result = await this.pagamentoController.obterPagamentoPorPedidoAsync(pedidoId, req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async checkout(req: Request, res: Response) {
        const { pedidoId } = req.params;

        if (!req.body) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const result = await this.pagamentoController.efetuarCheckoutAsync(pedidoId, req.cancelToken);
        return this.customResponsePutPatch(res, pedidoId, result);
    }

    private async notificacoes(req: Request, res: Response) {
        const { pedidoId } = req.params;

        if (!req.body) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const result = await this.pagamentoController.notificarPagamentoAsync(pedidoId, req.cancelToken);
        return this.customResponsePutPatch(res, pedidoId, result);
    }

    // Métodos de resposta customizados

    private customResponseGet(res: Response, result: any) {
        return res.status(200).json(result);
    }

    private customResponsePutPatch(res: Response, id: string, result: any) {
        return res.status(200).json({ id, result });
    }

    private customResponseDelete(res: Response, id: string, result: any) {
        return res.status(200).json({ id, result });
    }
}
