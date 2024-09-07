// src/Application/DependencyInjection/ServiceCollectionExtensions.ts

// Importa o contêiner de injeção de dependências do tsyringe
import { container } from 'tsyringe';

// Importa as interfaces e implementações dos casos de uso (use cases)
import { IProdutoUseCase } from '../IProdutoUseCase';
import { ProdutoUseCase } from '../UseCases/ProdutoUseCase';
import { IClienteUseCase } from '../IClienteUseCase';
import { ClienteUseCase } from '../UseCases/ClienteUseCase';
import { IPedidoUseCase } from '../IPedidoUseCase';
import { PedidoUseCase } from '../UseCases/PedidoUseCase';
import { IPagamentoUseCase } from '../IPagamentoUseCase';
import { PagamentoUseCase } from '../UseCases/PagamentoUseCase';

export class ServiceCollectionExtensions {
    /**
     * Registra os serviços de casos de uso (use cases) no contêiner de injeção de dependências.
     * Isso permite que os casos de uso sejam injetados onde necessário.
     */
    public static addUseCasesDependencyServices(): void {
        // Registra a implementação de ProdutoUseCase para a interface IProdutoUseCase
        container.register<IProdutoUseCase>('IProdutoUseCase', {
            useClass: ProdutoUseCase
        });

        // Registra a implementação de ClienteUseCase para a interface IClienteUseCase
        container.register<IClienteUseCase>('IClienteUseCase', {
            useClass: ClienteUseCase
        });

        // Registra a implementação de PedidoUseCase para a interface IPedidoUseCase
        container.register<IPedidoUseCase>('IPedidoUseCase', {
            useClass: PedidoUseCase
        });

        // Registra a implementação de PagamentoUseCase para a interface IPagamentoUseCase
        container.register<IPagamentoUseCase>('IPagamentoUseCase', {
            useClass: PagamentoUseCase
        });
    }
}
