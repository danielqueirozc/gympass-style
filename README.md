## RFs (Requesitos funcionais) funcionalidades da aplicacao (oque vai ser possivel o usuario fazer na aplicacao)
- [] Deve ser possivel...
- [  ] Deve ser possivel se cadastrar
- [  ] Deve ser possivel de autenticar
- [  ] Deve ser possivel obter o perfil de um usuario logado
- [  ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado
- [  ] Deve ser possivel o usuario obter seu historico de check-ins
- [  ] Deve ser possivel o usuario buscar academias proximas
- [  ] Deve ser possivel o usuario buscar academias pelo nome
- [  ] Deve ser possivel o usuario realizar check-in em uma academia
- [  ] Deve ser possivel validar i check-in de um usuario'
- [  ] Deve ser possivel cadastrar uma academia

## RNs (Regras de negocio) Caminhos que cada requesito pode tomar (condicoes que vai ser aplicada para cada regra de negocio, a RNs sempre associada a RFs)

- O usuario nao deve poder se cadastrar com um e-mail duplicado
- O usuario nao de pode fazer 2 check-ins no mesmo dia
- O usuario nao pode fazer check-in se nao estiver perto (100m) da academia
- O check-in so pode ser validado apos 20 minutos apos criado
- O check-in so pode ser validado por administradores
- A academia so pode ser cadastrada por administradores

## RNFs (Requesitos nao funcionais) ex: qual banco de dados vou utilizar, estrategia de paginacao...

- [  ] A senha do usuario precisa estar criptografada
- [  ] Os dados da aplicacao precisam estar persistidosem um banco PostgreSQL
- [  ] Todas listas de dados precisam estar paginadas com 20 itens por pagina
- [  ] O usuario deve ser identificado por um JWT (JSON Web Token)