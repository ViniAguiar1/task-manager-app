# Sistema de Gerenciamento de Tarefas

Uma aplicação moderna e robusta para gerenciamento de projetos e tarefas, desenvolvida com React Native e Expo. Oferece uma experiência de usuário excepcional com interface elegante e funcionalidades completas.

![Captura de Tela do Aplicativo](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=400&fit=crop)

## Funcionalidades Principais

- 📱 Multiplataforma (iOS, Android, Web)
- 🎨 Interface moderna e intuitiva
- 📊 Gestão visual de projetos com tracking de progresso
- ✅ Sistema completo de gerenciamento de tarefas
- 📅 Integração com calendário
- 📍 Organização de tarefas por localização
- 🎯 Filtros por categorias
- 👤 Perfis de usuário personalizáveis
- 🌙 Temas customizáveis

## Stack Tecnológica

### Frontend
- [Expo](https://expo.dev/) - Framework de desenvolvimento React Native
- [Expo Router](https://docs.expo.dev/router/introduction/) - Sistema de roteamento baseado em arquivos
- [React Native](https://reactnative.dev/) - Framework para desenvolvimento multiplataforma
- [Lucide Icons](https://lucide.dev/) - Biblioteca de ícones vetoriais
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) - Efeitos de gradiente
- [React Native SVG](https://github.com/react-native-svg/react-native-svg) - Suporte a SVG

### Animações e Gestos
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animações de alta performance
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) - Sistema de gestos nativo

## Arquitetura do Projeto

```
app/
├── _layout.tsx              # Configuração do layout principal
├── (tabs)/                  # Navegação por tabs
│   ├── _layout.tsx         # Configuração das tabs
│   ├── index.tsx           # Tela inicial
│   ├── tasks.tsx           # Visão geral de tarefas
│   ├── profile.tsx         # Perfil do usuário
│   └── settings/           # Configurações
├── task/                   # Rotas relacionadas a tarefas
│   └── [id].tsx           # Visualização individual de tarefa
├── project/                # Rotas relacionadas a projetos
│   └── [id].tsx           # Visualização individual de projeto
└── new-project.tsx        # Criação de projeto

components/
├── card-projects.tsx      # Componente de card de projetos
├── card-task.tsx         # Componente de card de tarefas
├── invite-user.tsx       # Componente de convite de usuários
└── status-bar.tsx        # Componente de barra de status
```

## Configuração do Ambiente

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ViniAguiar1/task-manager-app.git
```

2. Instale as dependências:
```bash
cd task-manager-app
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Executando em Dispositivos Móveis

1. Instale o aplicativo Expo Go no seu dispositivo
2. Escaneie o QR code exibido no terminal
3. O aplicativo será carregado no seu dispositivo

## Guia de Desenvolvimento

### Criação de Novas Rotas

Crie novos arquivos no diretório `app` seguindo a convenção de roteamento do Expo Router:

```typescript
// app/nova-rota.tsx
export default function NovaRota() {
  return (
    <View>
      <Text>Nova Rota</Text>
    </View>
  );
}
```

### Diretrizes de Estilo

- Utilize `StyleSheet.create` para todos os estilos
- Siga o esquema de cores estabelecido:
  - Primária: #324646
  - Secundária: #E8E8E8
  - Texto: #666666
  - Branco: #FFFFFF

### Criação de Componentes

Crie componentes reutilizáveis no diretório `components`:

```typescript
// components/MeuComponente.tsx
export default function MeuComponente() {
  return (
    <View style={styles.container}>
      <Text>Componente Reutilizável</Text>
    </View>
  );
}
```

## Contribuição

1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Qualidade de Código

### Padrões de Código

- ESLint para padronização de código
- Prettier para formatação consistente
- TypeScript para tipagem estática
- Jest para testes unitários
- Testing Library para testes de componentes

### Convenções de Commit

Seguimos o padrão Conventional Commits:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alteração em documentação
- `style`: Formatação de código
- `refactor`: Refatoração de código
- `test`: Adição ou modificação de testes
- `chore`: Alterações em configurações

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos

- Design inspirado em aplicativos modernos de gerenciamento de tarefas
- Ícones fornecidos por [Lucide Icons](https://lucide.dev/)
- Componentes UI construídos com React Native e Expo

## Suporte

Para suporte, envie um email para vinicius.aguiar1@icloud.com ou abra uma issue no GitHub.

---

Desenvolvido por Vinicius Aguiar.
