const fs = require("fs");
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

const client = new Client();

const log = "./log.csv";
const contacts = "./contacts.txt";

const numbers = [];
const numbersAlreadyAnswered = [];

client.on("qr", (qr) => {
  try {
    // lê os contatos do arquivo contacts.txt
    const data = fs.readFileSync(contacts, "utf8").split("\n");
    data.forEach((num) => numbers.push(num));
  } catch (err) {
    console.error(err);
  }
  // gera o qrcode
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("###### Iniciando envio de mensagens! ######");
  numbers.forEach((number) => {
    const text = "Mensagem customizada"; // mensagem vai aqui
    const chatId = number.substring(1) + "@c.us";
    client.sendMessage(chatId, text); // envia a mensagem
  });
  console.log("###### Envio de mensagens concluído! ######");
});

// "escuta" as respostas de todos os contatos do seu whatsapp
client.on("message", async (msg) => {
  const specialChar = "@c.us";

  const phoneNumberWithoutWithSpecialChar = msg.from;
  const phoneNumber =
    "+" +
    phoneNumberWithoutWithSpecialChar.slice(
      0,
      phoneNumberWithoutWithSpecialChar.indexOf(specialChar)
    );

  // verifica se a resposta é de um número cadastrado
  if (numbers.includes(phoneNumber) && msg.body) {
    const receivedMessage = msg.body;

    // verifica se ja respondeu e a resposta
    // se for 1, salva como true, se for 0, salva como false
    if (receivedMessage.includes("1") && !alreadyAnswered(phoneNumber)) {
      console.log(`====> ${phoneNumber} respondeu!`);
      const info = `${phoneNumber},true\n`;
      fs.appendFile(log, info, (err) => {
        if (err) console.log(err);
      });
      numbersAlreadyAnswered.push(phoneNumber);
    } else if (receivedMessage.includes("0") && !alreadyAnswered(phoneNumber)) {
      console.log(`====> ${phoneNumber} respondeu!`);
      const info = `${phoneNumber},false\n`;
      fs.appendFile(log, info, (err) => {
        if (err) console.log(err);
      });
      numbersAlreadyAnswered.push(phoneNumber);
    }
  }
});

const alreadyAnswered = (number) => {
  if (numbersAlreadyAnswered.indexOf(number) !== -1) return true;
  return false;
};

client.initialize();
