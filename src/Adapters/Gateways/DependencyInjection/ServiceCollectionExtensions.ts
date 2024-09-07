// src/Adapters/Gateways/DependencyInjection/ServiceCollectionExtensions.ts

import { container } from 'tsyringe';
import { ClienteGateway } from '../ClienteGateway';
import { ProdutoGateway } from '../ProdutoGateway';
import { PedidoGateway } from '../PedidoGateway';
import { PagamentoGateway } from '../PagamentoGateway';
import { AddInfraDependencyServices } from '../../../External/Infra/DependencyInjection/ServiceCollectionExtensions';

/**
 * Registra os serviços de gateway e as dependências da camada de infraestrutura.
 * @param connectionString - A string de conexão com o banco de dados.
 */
export function AddGatewayDependencyServices(connectionString: string): void {
    // Registra os gateways no contêiner de injeção de dependências.
    container.register('IClienteGateway', { useClass: ClienteGateway });
    container.register('IProdutoGateway', { useClass: ProdutoGateway });
    container.register('IPedidoGateway', { useClass: PedidoGateway });
    container.register('IPagamentoGateway', { useClass: PagamentoGateway });

    // Registra as dependências da camada de infraestrutura.
    AddInfraDependencyServices(connectionString);
}
