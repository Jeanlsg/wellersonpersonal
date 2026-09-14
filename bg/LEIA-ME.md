# Fundos

## O que já está aqui

Três texturas geradas por código para este projeto — originais, sem licença de
terceiros envolvida, 23 KB no total.

| Arquivo | O que é | Onde |
| --- | --- | --- |
| `grao.png` | Ruído fino de 64px, sem emenda | Fundo do `body` e das seções alternadas. Tira o aspecto chapado e mata o listrado que gradiente em tela escura costuma criar. |
| `chapa.png` | Chapa xadrez de 48px, sem emenda | Seções alternadas |
| `anilhas.png` | Silhuetas de anilha em anéis concêntricos | Hero, antes e depois, e contato |

Não usei foto de banco de imagem. Para site de personal trainer isso costuma
sair pela culatra: a página inteira argumenta "alunos reais" e "quem monta é
quem acompanha", e uma foto de academia genérica com modelo desconhecido
enfraquece exatamente esse argumento. Foto de verdade do lugar onde ele atende
vale mais — e o encaixe para ela já está pronto.

## Encaixes para foto de verdade

O CSS já procura por estes arquivos. **Se não existirem, o navegador
simplesmente não pinta a camada** e a textura embaixo continua valendo — não
quebra nada e não aparece erro.

| Arquivo | Onde entra | Como deve ser |
| --- | --- | --- |
| `hero.jpg` | Fundo do topo da home | Horizontal, 1920×1080 ou maior. O texto fica à esquerda, então deixe o lado esquerdo mais vazio. |

Sobre a legibilidade: há um véu escuro por cima (`.hero__bg::before`) fechando
mais do lado do texto, e no celular ele fecha quase por inteiro, porque lá o
texto passa por cima da imagem toda. Se a foto que você escolher for clara,
aumente a opacidade desse gradiente em vez de escurecer a imagem no editor —
assim dá para trocar a foto depois sem refazer o tratamento.

Comprima antes de commitar. Uma foto de fundo acima de 300 KB atrasa o
carregamento no 4G, que é de onde vem a maior parte das visitas.
