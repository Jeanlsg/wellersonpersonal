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

## ⚠️ Antes de publicar: dados que ainda são placeholder

| Placeholder | Onde | O que é |
| --- | --- | --- |
| `5500000000000` | 5× no `index.html` | Número do WhatsApp nos links `wa.me`, no formato DDI+DDD+número, só dígitos |
| `(00) 00000-0000` | 2× | O número como o visitante lê na tela |
| `SEU-INSTAGRAM` | 4× | Perfil do Instagram |
| `CREF 000000-G/PE` | 2× | Registro no CREF, no rodapé e na seção "Quem é" |

Trocando tudo de uma vez, na raiz do projeto. O `-i ''` é a forma do `sed` do
macOS; no Linux é só `-i`:

```sh
ZAP=5587999999999          # DDI+DDD+número, só dígitos
ZAP_TXT='(87) 99999-9999'  # como aparece na tela
INSTA=wellersonpersonal    # sem o @
CREF='CREF 123456-G/PE'

sed -i '' \
  -e "s/5500000000000/$ZAP/g" \
  -e "s/(00) 00000-0000/$ZAP_TXT/g" \
  -e "s/SEU-INSTAGRAM/$INSTA/g" \
  -e "s|CREF 000000-G/PE|$CREF|g" \
  index.html

grep -n '5500000000000\|(00) 00000-0000\|SEU-INSTAGRAM\|000000-G' index.html || echo 'nenhum placeholder restante'
```

**O CREF não é opcional.** A Resolução CONFEF exige o número de registro na
divulgação de serviço de profissional de educação física. Enquanto estiver
`000000`, o site está afirmando um registro que não existe.

**Confira o e-mail.** O site e a função serverless usam
`welllersonpersonal@gmail.com`, com três L, que é o que já estava no código. Pode
estar certo — mas se for engano de digitação, toda avaliação preenchida está indo
para uma caixa que não existe, sem erro visível para quem preencheu.

## A marca no site

O logo é um lockup **vertical** (W, figura, S empilhados — 113×287). Nessa
proporção, na altura que cabe num cabeçalho, sobram 16px de largura e vira
borrão. Por isso o site usa duas formas:

| Onde | Peça | Token CSS |
| --- | --- | --- |
| Cabeçalho, rodapé, fim da abertura | Só a figura, que é quadrada | `--logo-icone` |
| Abertura no modo `logo` | Lockup completo | `--logo` |
| Favicon | Figura num quadrado escuro, para funcionar em aba clara e escura | data URI no `<link rel="icon">` |

As imagens estão embutidas em base64, uma vez cada, como token CSS — repetir o
base64 em cada `<img>` custaria ~6 KB por cópia.

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

O texto curto está no `<article class="serv">`. O texto longo — o que abre no
modal — está no objeto `S`, no script ao final do `index.html`:

| Campo | O que é |
| --- | --- |
| `tag`, `spec`, `titulo` | Cabeçalho do modal |
| `resumo` | Parágrafo de abertura |
| `aviso` | Bloco amarelo de ressalva. **Opcional** — hoje só a avaliação física usa, para deixar claro que ela não substitui médico nem nutricionista. |
| `inclui`, `como`, `sinais` | As três listas |
| `zap` | Mensagem já preenchida no WhatsApp |

O `id` do `<article>`, o `data-serv` do botão e a chave em `S` precisam ser o
mesmo texto — é assim que o botão acha o conteúdo.

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
