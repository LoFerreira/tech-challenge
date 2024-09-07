// src/Controllers/DependencyInjection/ServiceCollectionExtensions.ts

import { container } from 'tsyringe';
import { ClientesController } from '../ClientesController';
import { ProdutosController } from '../ProdutosController';
import { PedidoController } from '../PedidoController';
import { PagamentoController } from '../PagamentoController';
import { ServiceCollectionExtensions as UseCasesServiceCollectionExtensions } from '../../../Core/UseCases/DependencyInjection/ServiceCollectionExtensions';

export class ServiceCollectionExtensions {
    /**
     * Registra as dependências dos controladores no contêiner de injeção de dependências.
     * Isso garante que os controladores possam ser injetados onde necessário.
     */
    public static addControllerDependencyServices(): void {
        // Registra os controladores no contêiner
        container.register('IClientesController', { useClass: ClientesController });
        container.register('IProdutosController', { useClass: ProdutosController });
        container.register('IPedidoController', { useClass: PedidoController });
        container.register('IPagamentoController', { useClass: PagamentoController });

        // Chama o método para registrar as dependências dos casos de uso
        UseCasesServiceCollectionExtensions.addUseCasesDependencyServices();
    }
}
