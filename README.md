# Wellerson Silva — site e avaliação

Site institucional e ficha de avaliação da WS Consultoria (Wellerson Silva,
personal trainer): consultoria online, personal presencial e avaliação física.

São **duas páginas estáticas**, sem build e sem `node_modules` no front. Todo o
CSS e o JS de cada uma vivem dentro do próprio arquivo.

## Arquivos

| Caminho | O que é |
| --- | --- |
| `index.html` | O site. É a home e o que precisa ser editado no dia a dia. |
| `avaliacao.html` | O formulário de avaliação em 7 etapas. **Era a home até agora** — ver abaixo. |
| `alunos/` | Fotos de antes e depois. Ver `alunos/LEIA-ME.md`. |
| `bg/` | Texturas de fundo e o encaixe para a foto do topo. Ver `bg/LEIA-ME.md`. |
| `foto-wellerson.jpg` | Foto da seção "Quem é". **Ainda não existe.** |
| `netlify/functions/send.js` | Função que recebe o formulário e manda por e-mail (Resend). |
| `package.json` | Dependências só da função serverless. O site não usa nenhuma. |

## ⚠️ O formulário mudou de endereço

Até agora `index.html` **era** o formulário. Agora é o site, e o formulário virou
`avaliacao.html`.

Quem já recebeu o link da raiz esperando o formulário vai cair no site e precisa
de um clique a mais. Não é erro: há 6 botões levando para a avaliação, incluindo
o do cabeçalho, que fica visível o tempo todo. Mas se você mandou o link da home
para alguém preencher, reenvie apontando direto para `/avaliacao.html`.

O cabeçalho do formulário agora é um link de volta para o site.

## Contato

| Onde | Valor |
| --- | --- |
| WhatsApp | `558788291247` nos links `wa.me`, exibido como `(87) 8829-1247` |
| Instagram | [@wellerson.prof](https://www.instagram.com/wellerson.prof/) |
| E-mail | `welllersonpersonal@gmail.com` — com três L, como já estava no código |

### ⚠️ Duas coisas ainda pendentes

**O CREF está como `000000-G/PE`**, em 2 lugares do `index.html` (rodapé e seção
"Quem é"). A Resolução CONFEF exige o número de registro na divulgação de serviço
de educação física — enquanto estiver assim, o site afirma um registro que não
existe.

```sh
sed -i '' "s|CREF 000000-G/PE|CREF 123456-G/PE|g" index.html
```

**O número de WhatsApp tem 8 dígitos** (`8829-1247`). Desde 2016 todo celular no
Brasil tem 9 dígitos e começa com 9, então o mais provável é que falte um 9:
`98829-1247`. Como foi assim que o número chegou, está assim no site — mas vale
mandar uma mensagem para `wa.me/558788291247` e confirmar que chega. Se não
chegar, o conserto é:

```sh
sed -i '' -e "s/558788291247/5587988291247/g" -e "s/(87) 8829-1247/(87) 98829-1247/g" index.html
```

Se um dia o número ou o perfil mudarem, os padrões a procurar são
`558788291247`, `(87) 8829-1247` e `wellerson.prof`.

## A marca no site

O logo é um lockup **vertical** — W, figura e S empilhados, 113×287. O site usa o
lockup completo no cabeçalho e no rodapé, igual à página da avaliação.

| Onde | Peça | Token CSS |
| --- | --- | --- |
| Cabeçalho e rodapé | Lockup completo, 3.4rem | `--logo` |
| Abertura no modo `logo` | Lockup completo, grande | `--logo` |
| Fim da abertura (modo `barra`) | Só a figura, ao lado do nome | `--logo-icone` |
| Favicon | Figura num quadrado escuro, para funcionar em aba clara e escura | data URI no `<link rel="icon">` |

**Por que o cabeçalho tem 5rem de altura.** Numa proporção de 1:2,54, o lockup a
2,6rem (42px) deixa só 16px de largura e o desenho vira borrão — é o que acontece
hoje no cabeçalho de `avaliacao.html`, que usa 42px. A 3,4rem sobram 21px e as
três peças voltam a se distinguir. Se quiser reduzir o cabeçalho, troque o lockup
pela figura sozinha (`class="logo logo--icone"`), que é quadrada e lê bem pequena.

O favicon continua sendo a figura: o lockup inteiro em 16px daria 6px de largura.

As imagens estão embutidas em base64, uma vez cada, como token CSS — repetir o
base64 em cada `<img>` custaria ~6 KB por cópia. O arquivo original de 500×500
foi recortado e requantizado, caindo de 33 KB para 4,6 KB.

## Animação de abertura

O site abre com uma barra olímpica recebendo anilha por anilha, o contador de
carga subindo de 20 a 100 kg, e no último disco a moldura se abre revelando a
página. Anda sozinha em cerca de 5 segundos, rolar apressa, `Esc` ou um clique
pulam, e quem tem "reduzir movimento" ligado no sistema nunca a vê.

| URL | Abertura |
| --- | --- |
| `/` ou `/?abertura=barra` | Barra carregando anilhas (padrão) |
| `/?abertura=logo` | O logo sobe, uma linha vermelha varre e abre |
| `/?abertura=off` | Entra direto no site |

Para mudar o padrão, edite `data-abertura` na tag `<body>`.

O ritmo é uma fatia da variável `--p` (0 a 1) e está todo no CSS, no bloco
`ABERTURA`. Para deixar uma etapa mais lenta, mexa nos números do `clamp()`
daquela variável — o JavaScript não precisa ser tocado. Tudo dentro do quadro é
medido em `cqh`/`cqw`, então o bloco encolhe junto com a moldura e nada vaza em
tela baixa (conferido de 380px a 1000px de altura).

## O comparador de antes e depois

As duas fotos ocupam a mesma área. A de **antes** fica por cima, recortada por
`clip-path` até a posição do controle — então a metade esquerda é o antes e a
direita é o depois, que é o que os rótulos dizem.

Quem manda é um `<input type="range">` invisível cobrindo a área toda: arrastar
com o mouse, com o dedo e as setas do teclado funcionam sem código extra, e o
controle é acessível por padrão. O JavaScript só espelha o valor dele na
variável `--pos` que o CSS usa.

`touch-action:pan-y` no comparador deixa o arrasto horizontal para ele e mantém a
rolagem vertical da página livre no celular.

## Editar os serviços

Cada frente é um `<article class="serv">` no `index.html`. A frente da carta
mostra pouca coisa de propósito — tag, ícone, título e uma linha de resumo. O
detalhe fica logo abaixo, num `<div class="serv__detalhe" hidden>` dentro da
própria carta, e **a janela empresta esse conteúdo na hora de abrir**:

```html
<article class="serv" id="consultoria">
  ... tag, ícone, título, resumo ...
  <button class="serv__mais" type="button">Ver o que inclui</button>
  <div class="serv__detalhe" hidden>
    ... listas ...
    <div class="det__acoes">
      <a class="btn btn-red" href="https://wa.me/...">Tirar dúvida no WhatsApp</a>
      <a class="btn btn-ghost" href="avaliacao.html">Fazer a avaliação</a>
    </div>
  </div>
</article>
```

Manter o conteúdo no HTML, em vez de num objeto JavaScript, tem duas vantagens:
ele continua indexável pelo Google, e o `<noscript>` no fim do `<head>` faz o
detalhe aparecer na própria carta se o JavaScript falhar — aí o botão que abriria
a janela some, porque não haveria janela.

O clique funciona em **qualquer ponto da carta**, não só no botão. Ele ignora
clique em link e não dispara quando há texto selecionado, para arrastar e copiar
não virar um abre-janela.

Cada carta tem o próprio link de WhatsApp, com a mensagem já preenchida para
aquele serviço.

## O tema "placar de treino"

Três peças carregam a temática, e as duas primeiras são reusadas na ficha de
avaliação para as duas páginas não parecerem de projetos diferentes:

| Peça | O que é | Onde |
| --- | --- | --- |
| `.placar` | Dígito grande num painel preto com risco de varredura e brilho vermelho | Números do hero, do antes e depois, e os `.metric-card` da ficha |
| Máscara de blocos | `repeating-linear-gradient` na barra de progresso, que passa a ler como anilha empilhada em vez de linha contínua | Progresso do topo, nas duas páginas |
| `.barra-div` | Divisória que é uma barra com anilha nas pontas | Entre o comparador e a grade de casos |

Os números usam `font-variant-numeric: tabular-nums`, senão os dígitos dançam de
largura quando o contador anima.

## Rodar local

```sh
python3 -m http.server 8000
# http://localhost:8000
```

O formulário só envia de verdade com a função da Netlify rodando (`netlify dev`)
e a chave do Resend configurada. Abrir o site em si não depende de nada.

## Deploy

O projeto está na Netlify. O site é estático e a única parte com servidor é
`netlify/functions/send.js`, que precisa da variável de ambiente do Resend
configurada no painel — ela não vive no repositório.
