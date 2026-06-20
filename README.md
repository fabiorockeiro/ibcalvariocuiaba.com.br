# Igreja Batista Calvário Cuiabá

Site institucional estático da Igreja Batista Calvário, preparado para publicação no GitHub Pages.

## Estrutura

- `index.html` — página inicial
- `pages/` — páginas institucionais, agenda, contato e declaração doutrinária
- `pages/ministerios/` — páginas individuais dos ministérios
- `assets/css/` — identidade visual e responsividade
- `assets/js/` — navegação, componentes compartilhados e interações
- `assets/images/brand/` — logos otimizadas para a web
- `assets/images/church/` — fotografias otimizadas da igreja
- `assets/images/originals/` — arquivos originais preservados
- `scripts/sync-doctrine.ps1` — sincroniza o texto oficial da declaração doutrinária da CBB

## Publicação no GitHub Pages

1. Envie todo o conteúdo deste diretório para a raiz do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve e aguarde a publicação.

O projeto não usa PHP, banco de dados ou etapa de compilação. Todos os links foram construídos para funcionar tanto em domínio próprio quanto em um repositório de projeto do GitHub Pages.

## Atualizar a declaração doutrinária

No PowerShell, execute:

```powershell
.\scripts\sync-doctrine.ps1
```

O script busca somente o bloco da declaração na página oficial da Convenção Batista Brasileira e atualiza o conteúdo entre os marcadores do arquivo `pages/declaracao-doutrinaria.html`.
