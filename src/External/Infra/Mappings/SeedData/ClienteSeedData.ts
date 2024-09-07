// src/External/Infra/Mappings/SeedData/ClienteSeedData.ts

import { ClienteDb } from '../../Dto/ClienteDb';
import { v4 as uuidv4 } from 'uuid'; // Biblioteca para gerar UUIDs

export class ClienteSeedData {
    /**
     * Retorna os dados iniciais de clientes para o seed no banco de dados.
     */
    public static getSeedData(): ClienteDb[] {
        return [
            {
                id: 'efee2d79-ce89-479a-9667-04f57f9e2e5e',
                nome: 'João',
                email: 'joao@gmail.com',
                cpf: '08062759016',
                ativo: true,
            },
            {
                id: 'fdff63d2-127f-49c5-854a-e47cae8cedb9',
                nome: 'Maria',
                email: 'maria@gmail.com',
                cpf: '05827307084',
                ativo: true,
            },
        ];
    }
}
