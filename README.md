# Bot Whats App - Perguntas

Este bot de whats app foi desenvolvido para ajudar um colega que precisava disparar uma determinada mensagem para uma lista de contatos e dependendo da resposta (0 para não e 1 para sim), o bot armazena a resposta em um arquivo .csv.

## Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)

## Como rodar

1. Clone o projeto `https://github.com/ArthurCech/bot-whatsapp`
2. No arquivo **contacts.txt**, salve todos os contatos, um abaixo do outro, no formato +551112345-6789, ou seja, +55DDDNÚMERO
3. Entrar na pasta do projeto
4. Instalar as dependências necessárias `npm install`
5. Rodar o projeto `node app.js`
6. Um código QRCode será exibindo no terminal. Este QRCode é necessário para você conectar seu perfil do WhatsApp (como se fosse a autenticação para o WhatsApp Web)
7. Feita a autenticação, a mensagem será enviada

## Avisos

- É importante que você deixe o terminal aberto com o programa rodando, caso contrário, o programa não vai "escutar" as respostas dos contatos. Portanto, é necessário que você estipule um prazo e avise os contatos qual o tempo máximo que ela tem para responder.
- A mensagem pode ser uma pergunta, como por exemplo: "Estamos abrindo uma nova filial de nosso cinema em sua cidade. Você gostaria que vendessemos pipoca doce? Responda 1 para sim e 0 para não.".
