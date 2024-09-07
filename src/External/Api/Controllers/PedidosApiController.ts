// src/api/Controllers/PedidosApiController.ts

import { Request, Response, Router } from 'express';
import { IPedidoController } from './IPedidoController';
import { Notificador } from '../Core/Notificacoes/Notificador';
import { PedidoRequestDto, PedidoStatusRequestDto } from '../Gateways/Dtos/Request';
import { validate } from 'class-validator';

export class PedidosApiController {
    public router: Router;
    private pedidoController: IPedidoController;
    private notificador: Notificador;

    constructor(pedidoController: IPedidoController, notificador: Notificador) {
        this.router = Router();
        this.pedidoController = pedidoController;
        this.notificador = notificador;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/pedidos', this.obterTodosPedidos.bind(this));
        this.router.get('/pedidos/ordenados', this.obterTodosPedidosOrdenados.bind(this));
        this.router.post('/pedidos', this.cadastrarPedido.bind(this));
        this.router.patch('/pedidos/status/:pedidoId', this.alterarStatus.bind(this));
    }

    private async obterTodosPedidos(req: Request, res: Response) {
        const result = await this.pedidoController.obterTodosPedidosAsync(req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async obterTodosPedidosOrdenados(req: Request, res: Response) {
        const result = await this.pedidoController.obterTodosPedidosOrdenadosAsync(req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async cadastrarPedido(req: Request, res: Response) {
        const requestDto = Object.assign(new PedidoRequestDto(), req.body);

        const errors = await validate(requestDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await this.pedidoController.cadastrarPedidoAsync(requestDto, req.cancelToken);
        return this.customResponsePost(res, `pedidos/${requestDto.pedidoId}`, requestDto, result);
    }

    private async alterarStatus(req: Request, res: Response) {
        const { pedidoId } = req.params;
        const pedidoStatusDto = Object.assign(new PedidoStatusRequestDto(), req.body);

        const errors = await validate(pedidoStatusDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await this.pedidoController.alterarStatusAsync(pedidoId, pedidoStatusDto, req.cancelToken);
        return this.customResponsePutPatch(res, pedidoStatusDto, result);
    }

    // Métodos de resposta customizados

    private customResponseGet(res: Response, result: any) {
        return res.status(200).json(result);
    }

    private customResponsePost(res: Response, location: string, requestDto: any, result: any) {
        return res.status(201).location(location).json(result);
    }

    private customResponsePutPatch(res: Response, requestDto: any, result: any) {
        return res.status(200).json(result);
    }
}
