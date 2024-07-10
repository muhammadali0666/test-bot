const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("6965103192:AAHAf3DUlpKOF5u_1S4p4-sr7LvYAjlM66M", {
  polling: true,
});

bot.setMyCommands([
  { command: "/start", description: "Botdan foydalanishni boshlash" },
  { command: "/info", description: "User haqida malumot olish" },
]);
const categoryFunc = async (chatId, name) => {
  await bot.sendMessage(
    chatId,
    `
        Hello ${name}`,
    {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "menu",
            },
            {
              text: "video",
            },
          ],
          [
            {
              text: "audio",
            },
            {
              text: "documentation",
            },
          ],
          [
            {
              text: "contact",
            },
          ],
        ],
        resize_keyboard: true,
      }),
    }
  );
};

bot.onText(/start/, async (msg) => {
  categoryFunc(msg.chat.id, msg.chat.first_name)
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === "menu") {
    bot.sendMessage(chatId, "Menular", {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Foods",
            },
            {
              text: "Drinks",
            },
          ],
          [
            {
              text: "Back to main menu",
            },
          ],
        ],
        resize_keyboard: true,
      }),
    });
  }

  if (msg.text === "Back to main menu") {
    categoryFunc(msg.chat.id, msg.chat.first_name)
  }

  if (msg.text === "Foods") {
    bot.sendMessage(chatId, "Foods", {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Lavash ",
            },
            {
              text: "Gamburger",
            },
          ],
          [
            {
              text: "Back to main menu",
            },
          ],

        ],
        resize_keyboard: true,
      }),
    });
  }

  if (msg.text == "Lavash") {
    bot.sendPhoto(
      chatId,
      "https://static.1000.menu/res/640/img/content-v2/43/f0/42850/farshirovannyi-lavash-v-duxovke_1580382171_10_max.jpg",
      {
        caption: `
             <strong>Lavash</strong>
             <i class="tg-spoiler">24000</i>
             <span class="tg-spoiler">Katta va kichik lavash...</span>
            `,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Zakaz berish",
                callback_data: "zakaz",
              },
              {
                text: "More",
                url: "https://tashkentkfc.me/",
              },
            ],
          ],
        },
      }
    );
  }

  if (msg.text === "video") {
    await bot.sendVideo(chatId, "./download/3.mp4", {
      caption: `
              <strong>Video</strong>
            `,
    });
  }

  if (msg.text === "audio") {
    bot.sendAudio(chatId, "./download/a.wav", {
      caption: ` Habibim... `,
    });
  }

  if (msg.text === "documentation") {
    bot.sendDocument(chatId, "./download/a.wav", {
      caption: ` Info... `,
    });
  }
});

bot.on("callback_query", (msg) => {
  const chatId = msg.message.chat.id;
  if (msg.data === "zakaz") {
    bot.sendMessage(chatId, "Locatsiyani qoldiring", {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "contact ulashish",
              request_contact: true,
            },
            {
              text: "location",
              request_location: true,
            },
          ],
        ],
        resize_keyboard: true,
      }),
    });
  }
});

bot.on("contact", (msg) => {});

bot.on("location", (msg) => {
  let { latitude, longitude } = msg.location;
  bot.sendLocation(msg.chat.id, latitude, longitude);
});
