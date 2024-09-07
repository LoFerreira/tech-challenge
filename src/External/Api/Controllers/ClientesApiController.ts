// src/api/Controllers/ClientesApiController.ts

import { Request, Response, Router } from 'express';
import { ClientesController } from './ClientesController';
import { Notificador } from '../Core/Notificacoes/Notificador';
import { IdentifiqueSeRequestDto, ClienteRequestDto } from '../Gateways/Dtos/Request';
import { validate } from 'class-validator';

export class ClientesApiController {
    public router: Router;
    private clientesController: ClientesController;
    private notificador: Notificador;

    constructor(clientesController: ClientesController, notificador: Notificador) {
        this.router = Router();
        this.clientesController = clientesController;
        this.notificador = notificador;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/clientes', this.obterTodosClientes.bind(this));
        this.router.get('/clientes/identifique-se', this.identificarClienteCpf.bind(this));
        this.router.post('/clientes', this.cadastrarCliente.bind(this));
        this.router.put('/clientes/:id', this.atualizarCliente.bind(this));
        this.router.delete('/clientes/:id', this.deletarCliente.bind(this));
    }

    private async obterTodosClientes(req: Request, res: Response) {
        const result = await this.clientesController.obterTodosClientesAsync(req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async identificarClienteCpf(req: Request, res: Response) {
        const requestDto = new IdentifiqueSeRequestDto();
        requestDto.cpf = req.query.cpf as string;
        
        const errors = await validate(requestDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await this.clientesController.identificarClienteCpfAsync(requestDto.cpf, req.cancelToken);
        return this.customResponseGet(res, result);
    }

    private async cadastrarCliente(req: Request, res: Response) {
        const clienteRequestDto = Object.assign(new ClienteRequestDto(), req.body);

        const errors = await validate(clienteRequestDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const result = await this.clientesController.cadastrarClienteAsync(clienteRequestDto, req.cancelToken);
        return this.customResponsePost(res, `clientes/${clienteRequestDto.id}`, clienteRequestDto, result);
    }

    private async atualizarCliente(req: Request, res: Response) {
        const id = req.params.id;
        const clienteRequestDto = Object.assign(new ClienteRequestDto(), req.body);

        const errors = await validate(clienteRequestDto);
        if (errors.length > 0 || id !== clienteRequestDto.id) {
            return res.status(400).json({ errors: errors.length > 0 ? errors : 'Id mismatch' });
        }

        const result = await this.clientesController.atualizarClienteAsync(clienteRequestDto, req.cancelToken);
        return this.customResponsePutPatch(res, clienteRequestDto, result);
    }

    private async deletarCliente(req: Request, res: Response) {
        const id = req.params.id;
        const result = await this.clientesController.deletarClienteAsync(id, req.cancelToken);
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
