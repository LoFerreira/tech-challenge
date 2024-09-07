// src/api/Controllers/ProdutosApiController.ts

import { Request, Response, Router } from 'express';
import { IProdutosController } from './IProdutosController';
import { Notificador } from '../Core/Notificacoes/Notificador';
import { ProdutoRequestDto } from '../Gateways/Dtos/Request';
import { validate } from 'class-validator';

export class ProdutosApiController {
    public router: Router;
    private produtosController: IProdutosController;
    private notificador: Notificador;

    constructor(produtosController: IProdutosController, notificador: Notificador) {
        this.router = Router();
        this.produtosController = produtosController;
        this.notificador = notificador;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/produtos', this.obterTodosProdutos.bind(this));
        this.router.get('/produtos/categoria', this.obterProdutosCategoria.bind(this));
        this.router.post('/produtos', this.cadastrarProduto.bind(this));
        this.router.put('/produtos/:id', this.atualizarProduto.bind(this));
        this.router.delete('/produtos/:id', this.deletarProduto.bind(this));
    }

    private async obterTodosProdutos(req: Request, res: Response) {
        const result = await this.produtosController.obterTodosProdutosAsync(req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async obterProdutosCategoria(req: Request, res: Response) {
        const { categoria } = req.query as { categoria: string };
        const result = await this.produtosController.obterProdutosCategoriaAsync(categoria, req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async cadastrarProduto(req: Request, res: Response) {
        const requestDto = Object.assign(new ProdutoRequestDto(), req.body);

        const errors = await validate(requestDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await this.produtosController.cadastrarProdutoAsync(requestDto, req.cancelToken);
        return this.customResponsePost(res, `produtos/${requestDto.id}`, requestDto, result);
    }

    private async atualizarProduto(req: Request, res: Response) {
        const { id } = req.params;
        const requestDto = Object.assign(new ProdutoRequestDto(), req.body);

        const errors = await validate(requestDto);
        if (errors.length > 0 || id !== requestDto.id) {
            return res.status(400).json({ errors: errors.length > 0 ? errors : 'Id mismatch' });
        }

        const result = await this.produtosController.atualizarProdutoAsync(requestDto, req.cancelToken);
        return this.customResponsePutPatch(res, requestDto, result);
    }

    private async deletarProduto(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.produtosController.deletarProdutoAsync(id, req.cancelToken);
        return this.customResponseDelete(res, id, result);
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

    private customResponseDelete(res: Response, id: string, result: any) {
        return res.status(200).json({ id, result });
    }
}
