const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const chalk = require('chalk');
const { ImageUploadService } = require('node-upload-images');
const fs = require('fs');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const os = require('os');
const { tiktokDl } = require('./scraper');
const fetch = require('node-fetch');
const settings = require('./settings');
const token = settings.token;
const domain = settings.domain;
const plta = settings.plta;
const pltc = settings.pltc;
const premiumUsersFile = 'premiumUsers.json';
const owner = settings.owner;
const ram = (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + ' GB';
    const freeRam = (os.freemem() / Math.pow(1024, 3)).toFixed(2) + ' GB';
try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}

const bot = new TelegramBot(token, { polling: true });

// URL gambar (masih terpisah tetapi menggunakan URL yang sama)
const startImageUrl = 'https://files.catbox.moe/6w8x9r.jpg';
const panelImageUrl = 'https://files.catbox.moe/lnt61k.jpg';
const ownerImageUrl = 'https://files.catbox.moe/h90rkz.jpg';
const fiturImageUrl = 'https://files.catbox.moe/9ea2tn.jpg';
const cekIdImageUrl = 'https://files.catbox.moe/loasia.jpg';
const groupUrl = 'https://chat.whatsapp.com/EofjnAjjkM3Giqyhs2yKLL'; // URL grup Telegram
const chanelUrl = 'https://whatsapp.com/channel/0029VahijLt89inbnukyVn3l'; // Url chanel Telegram
const panelUrl = 'https://files.catbox.moe/nff8uf.jpg' // Set Url Data Panel

// Fungsi untuk menampilkan menu start
const sendStartMenu = (chatId, messageId, username) => {
    const caption = `Hai ${username} \n〤 I am 𝐅𝐚𝐭𝐡𝐢𝐫 𝒗𝟐 bot create panel via Telegram, created by @fathirsthore. Enjoy using the bot. Thank You.\n\n〤 Silakan pilih menu di bawah ini 😉:`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Panel Menu', callback_data: 'panel_menu' },
                    { text: 'Owner Menu', callback_data: 'owner_menu' }
                ],
                [
                    { text: 'Fitur Menu', callback_data: 'fitur_menu' },
                    { text: 'Join Grup', url: groupUrl }
                ]
            ]
        }
    };

    bot.editMessageMedia(
        {
            type: 'photo',
            media: startImageUrl,
            caption: caption
        },
        { chat_id: chatId, message_id: messageId, ...options }
    );
};

// Fungsi untuk menampilkan Panel Menu
const sendPanelMenu = (chatId, messageId, username) => {
    const caption = `Hi @${username} Ini adalah Panel Menu:\n\n/1gb user,idtele\n/2gb user,idtele\n/3gb user,idtele\n/4gb user,idtele\n/5gb user,idtele\n/6gb user,idtele\n/7gb user,idtele\n/8gb user,idtele\n/9gb user,idtele\n/10gb user,idtele\n/unli user,idtele\n\nDeveloper: @fathirsthore`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Kembali', callback_data: 'start_menu' }]
            ]
        }
    };

    bot.editMessageMedia(
        {
            type: 'photo',
            media: panelImageUrl,
            caption: caption
        },
        { chat_id: chatId, message_id: messageId, ...options }
    );
};

// Fungsi untuk menampilkan Owner Menu
const sendOwnerMenu = (chatId, messageId, username) => {
    const caption = `Hi @${username} Ini adalah Owner Menu:\n\n/createadmin username,idtele\n/listusr\n/delusr\n/listsrv\n/delsrv\n/addprem\n/delprem\n/listprem\n/domain\n/plta\n/pltc\n\nDeveloper: @fathirsthore`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Kembali', callback_data: 'start_menu' }]
            ]
        }
    };

    bot.editMessageMedia(
        {
            type: 'photo',
            media: ownerImageUrl,
            caption: caption
        },
        { chat_id: chatId, message_id: messageId, ...options }
    );
};

// Fungsi untuk menampilkan Fitur Menu
const sendFiturMenu = (chatId, messageId, username) => {
    const caption = `Hi @${username} Ini adalah Fitur Menu:\n\n/cekid\n/cekpacar\n/cekkendaraan\n/cekkhodam\n/tiktok url\n/tourl\n/play namalagu\n/brat teks\n\nDeveloper: @fathirsthore`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Kembali', callback_data: 'start_menu' }]
            ]
        }
    };

    bot.editMessageMedia(
        {
            type: 'photo',
            media: fiturImageUrl,
            caption: caption
        },
        { chat_id: chatId, message_id: messageId, ...options }
    );
};

// Handle command /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    bot.sendPhoto(chatId, startImageUrl, {
        caption: `Hai ${username} \n〤 I am 𝐅𝐚𝐭𝐡𝐢𝐫 𝒗𝟐 create panel via Telegram, created by @fathirsthore. Enjoy using the bot. Thank You.\n\n〤 Silakan pilih menu di bawah ini 😉:`,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Panel Menu', callback_data: 'panel_menu' },
                    { text: 'Owner Menu', callback_data: 'owner_menu' }
                ],
                [
                    { text: 'Fitur Menu', callback_data: 'fitur_menu' },
                    { text: 'Join Grup', url: groupUrl }
                ]
                ]
    }
    });
});

// Handle perintah /cekid
bot.onText(/\/cekid/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;
    const idTele = msg.from.id;

    bot.sendPhoto(chatId, cekIdImageUrl, {
        caption: `Hi @${username} \n\nID Telegram Anda: ${idTele}\nUsername Anda: @${username}\n\nItu adalah ID Telegram Anda 😉\nDeveloper: @fathirsthore`
    });
});

// Handle perintah /cekpacar
bot.onText(/\/cekpacar/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    // Daftar nama pacar yang dipilih secara acak
    const pacarList = [
        "Siti", "Senti", "Sifa", "Aprel", "Ika", "Cahya", "Mifta", 
        "Asraf", "Suep", "Jamal", "Akmal", "Supri", "Josep", 
        "Agus", "Akbar", "Dian", "Gak ada ☠️"
    ];

    // Pilih nama pacar secara acak
    const pacar = pacarList[Math.floor(Math.random() * pacarList.length)];

    // Kirim pesan ke pengguna
    bot.sendMessage(chatId, `@${username}, pacarmu adalah *${pacar}* ❤️`, { parse_mode: "Markdown" });
});

/// Handle perintah /cekkhodam dengan regex agar lebih fleksibel
bot.onText(/\/cekkhodam\s*/i, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    // Daftar Khodam yang dipilih secara acak
    const khodamList = [
        "Tumis Kangkung", "Topi Melorot", "Nyu Blorong", "Rayap Gendut", 
        "LC Karaoke", "Cicak Kawin", "Sundel Bolong", "Tuyul Kesandung", 
        "Genderuwo TikTok", "Pocong Bersepeda", "Tuyul Main PS5", "Kompor Meledak"
    ];

    // Pilih khodam secara acak
    const khodam = khodamList[Math.floor(Math.random() * khodamList.length)];

    // Kirim pesan ke pengguna
    bot.sendMessage(chatId, `@${username}, Khodam mu adalah *${khodam}* 🔥`, { parse_mode: "Markdown" });
});

// Daftar URL gambar kendaraan (ganti dengan URL kendaraan sesuai kebutuhan)
const kendaraanImages = [
    "https://img12.pixhost.to/images/1064/578151475_uploaded_image.jpg",
    "https://img12.pixhost.to/images/1064/578151478_uploaded_image.jpg",
    "https://img12.pixhost.to/images/1064/578151497_uploaded_image.jpg",
    "https://img12.pixhost.to/images/1064/578151503_uploaded_image.jpg",
    "https://img12.pixhost.to/images/1064/578151606_uploaded_image.jpg"
];

// Handle perintah /cekkendaraan
bot.onText(/\/cekkendaraan\s*/i, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    // Pilih gambar kendaraan secara acak
    const randomImage = kendaraanImages[Math.floor(Math.random() * kendaraanImages.length)];

    // Kirim gambar dengan caption
    bot.sendPhoto(chatId, randomImage, {
        caption: `@${username}, Itulah kendaraanmu sekarang 🚗`,
        parse_mode: "Markdown"
    });
});

bot.onText(/^(\.|\#|\/)tiktok$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Format salah example /tiktok link`);
  });
  

bot.onText(/\/tiktok (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1]; // Mengambil teks setelah perintah /tt

    if (!text.startsWith("https://")) {
        return bot.sendMessage(chatId, "Masukkan URL TikTok yang valid!");
    }

    try {
        bot.sendMessage(chatId, "⏳ Proses Kakkk");

        const result = await tiktokDl(text);

        if (!result.status) {
            return bot.sendMessage(chatId, "Terjadi kesalahan saat memproses URL!");
        }

        if (result.durations === 0 && result.duration === "0 Seconds") {
            let mediaArray = [];

            for (let i = 0; i < result.data.length; i++) {
                const a = result.data[i];
                mediaArray.push({
                    type: 'photo',
                    media: a.url,
                    caption: `Foto Slide Ke ${i + 1}`
                });
            }

            return bot.sendMediaGroup(chatId, mediaArray);
        } else {
            const video = result.data.find(e => e.type === "nowatermark_hd" || e.type === "nowatermark");
            if (video) {
                return bot.sendVideo(chatId, video.url, { caption: "TikTok Downloader BY Zè O`Liqq" });
            }
        }
    } catch (e) {
        console.error(e);
        bot.sendMessage(chatId, "Terjadi kesalahan saat memproses permintaan.");
    }
});

bot.onText(/^(\.|\#|\/)brat$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Format salah example /brat katakatabebas`);
  });
  
bot.onText(/\/brat (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1];

    if (!text) {
        return bot.sendMessage(chatId, 'Contoh penggunaan: /brat teksnya');
    }

    try {
        const imageUrl = `https://kepolu-brat.hf.space/brat?q=${encodeURIComponent(text)}`;
        const tempFilePath = './temp_sticker.webp';
        const downloadFile = async (url, dest) => {
            const writer = fs.createWriteStream(dest);

            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream',
            });

            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        };

        await downloadFile(imageUrl, tempFilePath);

        await bot.sendSticker(chatId, tempFilePath);

        await fs.promises.unlink(tempFilePath);
    } catch (error) {
        console.error(error.message || error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat membuat stiker. Pastikan teks valid atau coba lagi.');
    }
});

bot.onText(/\/tourl/, async (msg, match) => {
    const chatId = msg.chat.id;
    const isPrivateChat = msg.chat.type === 'private';

    if (msg.reply_to_message && msg.reply_to_message.photo) {
        try {
            const fileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
            const filePath = await bot.downloadFile(fileId, './temp');
            const fileBuffer = fs.readFileSync(filePath);
            
            const service = new ImageUploadService('pixhost.to');
            const { directLink } = await service.uploadFromBinary(fileBuffer, 'uploaded_image.png');
            const responseText = `Berikut adalah URL gambar Anda:\n${directLink}`;
            bot.sendMessage(chatId, responseText, { reply_to_message_id: msg.message_id });

            fs.unlinkSync(filePath);
        } catch (error) {
            const errorMessage = `Terjadi kesalahan: ${error.message}`;
            bot.sendMessage(chatId, errorMessage, { reply_to_message_id: msg.message_id });
        }
    } else {
       
        const errorText = isPrivateChat
            ? 'Harap balas pesan dengan gambar untuk mengubahnya menjadi URL.'
            : 'Perintah ini hanya berfungsi jika Anda membalas pesan dengan gambar.';
        bot.sendMessage(chatId, errorText, { reply_to_message_id: msg.message_id });
    }
});

bot.onText(/^(\.|\#|\/)play$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `format salah example /play bunga terakhir`);
  });
  
bot.onText(/\/play (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];

    if (!query) {
        return bot.sendMessage(chatId, 'Contoh penggunaan:\n\n/play Pulang - Wali Band');
    }

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0) {
            return bot.sendMessage(chatId, 'Lagu yang Anda cari tidak ditemukan.');
        }

        const video = search.videos[0];
        const detail = `
🎵 **YouTube Audio Play** 🎶

✨ **Judul Lagu**: ${video.title}
👁️‍🗨️ **Penonton**: ${video.views}
🎤 **Pengarang**: ${video.author.name}
📅 **Diunggah**: ${video.ago}
🔗 **Tonton Selengkapnya**: [Klik Disini](${video.url})
Developer:@fathirsthore`;

        await bot.sendMessage(chatId, detail, { parse_mode: 'Markdown' });

        const stream = ytdl(video.url, { filter: 'audioonly' });

        bot.sendAudio(chatId, stream, { caption: 'Sekarang Memutar Musik' });

    } catch (error) {
        console.error('Error:', error.message);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat memproses permintaan Anda.');
    }
});

// Respon ketika pengguna mengirim /domain
bot.onText(/\/domain/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString(); // Ubah ke string agar sesuai dengan settings.js

    if (userId === owner) {
        bot.sendMessage(chatId, `📍Domain:\n${domain}`);
    } else {
        bot.sendMessage(chatId, 'FITUR KHUSUS OWNER!!');
    }
});

bot.onText(/\/plta/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString(); // Ubah ke string agar sesuai dengan settings.js

    if (userId === owner) {
        bot.sendMessage(chatId, `📍Plta:\n${plta}`);
    } else {
        bot.sendMessage(chatId, 'FITUR KHUSUS OWNER!!');
    }
});

bot.onText(/\/pltc/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString(); // Ubah ke string agar sesuai dengan settings.js

    if (userId === owner) {
        bot.sendMessage(chatId, `📍Pltc:\n${pltc}`);
    } else {
        bot.sendMessage(chatId, 'FITUR KHUSUS OWNER!!');
    }
});

bot.onText(/^(\.|\#|\/)delsrv$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Format salah example delsrv id`);
  });
bot.onText(/\/delsrv (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const srv = match[1].trim();

  const adminUsers = owner;
  const isAdmin = adminUsers.includes(String(msg.from.id));

  if (!isAdmin) {
    bot.sendMessage(
      chatId,
      "Fitur Khusus Owner!",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
          ],
        },
      }
    );
    return;
  }

  if (!srv) {
    bot.sendMessage(
      chatId,
      "Mohon masukkan ID server yang ingin dihapus, contoh: /delsrv 1234"
    );
    return;
  }

  try {
    let f = await fetch(domain + "/api/application/servers/" + srv, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
    });

    let res = f.ok ? { errors: null } : await f.json();

    if (res.errors) {
      bot.sendMessage(chatId, "SERVER TIDAK ADA");
    } else {
      bot.sendMessage(chatId, "SUCCESFULLY DELETE SERVER");
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Terjadi kesalahan saat menghapus server.");
  }
});

bot.onText(/^(\.|\#|\/)deluser$/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Format salah example delusr id yang akan di hapus`);
  });
  

bot.onText(/\/delusr(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const usr = match[1].trim();

    const adminUsers = owner;
    const isAdmin = adminUsers.includes(String(msg.from.id));

    if (!isAdmin) {
        bot.sendMessage(chatId, 'Fitur Khusus Owner!', {
       reply_markup: {
          inline_keyboard: [
            [{ text: "HUBUNGI ADMIN", url: "https://t.me/nussjbreal" }],
          ],
        },
            }
        );
        return;
    }

    if (!usr) {
        bot.sendMessage(chatId, 'Mohon masukkan ID server yang ingin dihapus, contoh: /delusr 1');
        return;
    }

try {
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
	            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();

        if (res.errors) {
            bot.sendMessage(chatId, 'USER NOT FOUND');
        } else {
            bot.sendMessage(chatId, 'SUCCESSFULLY DELETE THE USER');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus server.');
    }
});

bot.onText(/\/listusr/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = owner;
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'Fitur Khusus Owner!', {
          reply_markup: {
          inline_keyboard: [
            [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
          ],
        },  
                       
            }
        );
        return;
    }
    let page = '1';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});

bot.onText(/\/listsrv/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  // Check if the user is the Owner
  const adminUsers = owner;
  const isAdmin = adminUsers.includes(String(msg.from.id));
  if (!isAdmin) {
    bot.sendMessage(
      chatId,
      "Fitur Khusus Owner!",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
          ],
        },
      }
    );
    return;
  }
  let page = 1; // Mengubah penggunaan args[0] yang tidak didefinisikan sebelumnya
  try {
    let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
      // Menggunakan backticks untuk string literal
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
    });
    let res = await f.json();
    let servers = res.data;
    let messageText = "Daftar server aktif yang dimiliki:\n\n";
    for (let server of servers) {
      let s = server.attributes;

      let f3 = await fetch(
        `${domain}/api/client/servers/${s.uuid.split("-")[0]}/resources`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${pltc}`,
          },
        }
      );
      let data = await f3.json();
      let status = data.attributes ? data.attributes.current_state : s.status;

      messageText += `ID Server: ${s.id}\n`;
      messageText += `Nama Server: ${s.name}\n`;
      messageText += `Status: ${status}\n\n`;
    }

    bot.sendMessage(chatId, messageText);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Terjadi kesalahan dalam memproses permintaan.");
  }
});

bot.onText(/\/addprem (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const newPremiumId = match[1].toString();

    // Cek apakah pengirim adalah pemilik bot
    if (userId !== owner) {
        bot.sendMessage(chatId, "Fitur Khusus Owner");
        return;
    }

    try {
        // Baca file premiumUsers.json
        let premiumUsers = [];
        if (fs.existsSync(premiumUsersFile)) {
            premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
        }

        // Periksa apakah ID sudah ada dalam daftar premium
        if (premiumUsers.includes(newPremiumId)) {
            bot.sendMessage(chatId, `${newPremiumId} Sudah Di Addprem`);
            return;
        }

        // Tambahkan ID baru ke daftar premium
        premiumUsers.push(newPremiumId);
        fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers, null, 2));

        bot.sendMessage(chatId, `Sukses Add ${newPremiumId} Ke Premium`);
    } catch (error) {
        console.error("Error updating premiumUsers file:", error);
        bot.sendMessage(chatId, "Terjadi kesalahan saat memperbarui daftar premium.");
    }
});

function loadPremiumUsers() {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { premium: [] };
    }
}

const premiumFile = "premiumUsers.json";


// Fungsi untuk menyimpan daftar pengguna premium
const savePremiumUsers = (data) => {
    fs.writeFileSync(premiumFile, JSON.stringify(data, null, 2));
};

// Fungsi untuk menghapus user dari daftar premium
const removePremiumUser = (userId) => {
    let premiumUsers = loadPremiumUsers();
    const index = premiumUsers.indexOf(userId);
    if (index !== -1) {
        premiumUsers.splice(index, 1);
        savePremiumUsers(premiumUsers);
        return true;
    }
    return false;
};

// Event handler untuk perintah /delprem
bot.onText(/\/delprem (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const admin = owner;
    const userId = msg.from.id;
    const targetId = match[1]; // ID yang ingin dihapus

    // Cek apakah user adalah owner
    if (userId.toString() !== admin) {
        return bot.sendMessage(chatId, "❌ Maaf, Anda tidak memiliki akses untuk menggunakan perintah ini.");
    }

    let premiumUsers = loadPremiumUsers();

    // Cek apakah user ada dalam daftar premium
    if (!premiumUsers.includes(targetId)) {
        return bot.sendMessage(chatId, `❌ User ID ${targetId} Tidak Di Temukan.`);
    }

    // Hapus user dari daftar premium
    if (removePremiumUser(targetId)) {
        bot.sendMessage(
            chatId,
            `✅ Sukses Menghapus User *${targetId}* Dari Premium `,
            { parse_mode: "Markdown" }
        );
    } else {
        bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat menghapus user premium.");
    }
});

bot.onText(/\/listprem/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const admin = owner;

    // Cek apakah yang menjalankan perintah adalah owner
    if (userId.toString() !== admin) {
        return bot.sendMessage(chatId, "Fitur Khusus Owner!");
    }

    // Baca file premiumUsers.json
    fs.readFile('premiumUsers.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error membaca file:", err);
            return bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat membaca daftar pengguna premium.");
        }

        let premiumUsers;
        try {
            premiumUsers = JSON.parse(data);
        } catch (e) {
            return bot.sendMessage(chatId, "⚠️ Format file premiumUsers.json tidak valid.");
        }

        // Cek apakah ada pengguna premium
        if (premiumUsers.length === 0) {
            return bot.sendMessage(chatId, "📌 *LIST USER PREMIUM*\n\nTidak ada pengguna premium.", { parse_mode: "Markdown" });
        }

        // Buat daftar user premium dalam format pesan
        const listMessage = premiumUsers
            .map((id, index) => `*${index + 1}.* [${id}](tg://user?id=${id})`)
            .join("\n");

        const message = `📌 *LIST USER PREMIUM*\n\n${listMessage}\n\n🔰 *Total:* ${premiumUsers.length} user`;

        bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
    });
});

bot.onText(/\/1gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /1gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "1gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "1024";
  const cpu = "30";
  const disk = "1024";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}9192`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/2gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /2gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "2gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "2048";
  const cpu = "60";
  const disk = "2048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}9192`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/3gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /3gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "3gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "3048";
  const cpu = "90";
  const disk = "3048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}842`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/4gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /4gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "4gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "4048";
  const cpu = "120";
  const disk = "4048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}9192`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/5gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /5gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "5gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "5048";
  const cpu = "150";
  const disk = "5048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}6052`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/6gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /6gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "6gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "6048";
  const cpu = "180";
  const disk = "6048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}9192`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/7gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /7gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "7gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "7048";
  const cpu = "210";
  const disk = "7048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}84852`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/8gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /8gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "8gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "8048";
  const cpu = "240";
  const disk = "8048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}2049`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/9gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /9gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "9gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "9048";
  const cpu = "270";
  const disk = "9048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}8574`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/10gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /10gb namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "10gb";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "10048";
  const cpu = "300";
  const disk = "10048";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}5068`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/unli (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, "Anda Belum Menjadi Users Premium.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
        ],
      },
    });
    return;
  }
  const t = text.split(",");
  if (t.length < 2) {
    bot.sendMessage(chatId, "Invalid format. Usage: /unli namapanel,idtele");
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + "unli";
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = "0";
  const cpu = "0";
  const disk = "0";
  const spc =
    'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@fathirsthore`;
  const akunlo = settings.pp;
  const password = `${username}910292`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: "en",
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      if (
        data.errors[0].meta.rule === "unique" &&
        data.errors[0].meta.source_field === "email"
      ) {
        bot.sendMessage(
          chatId,
          "Email already exists. Please use a different email."
        );
      } else {
        bot.sendMessage(
          chatId,
          `Error: ${JSON.stringify(data.errors[0], null, 2)}`
        );
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        name: name,
        description: "",
        user: user.id,
        egg: parseInt(egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: spc,
        environment: {
          INST: "npm",
          USER_UPLOAD: "0",
          AUTO_UPDATE: "0",
          CMD_RUN: "npm start",
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1,
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: [],
        },
      }),
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(
      chatId,
      `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`
    );
    if (panelUrl) {
      bot.sendPhoto(u, panelUrl, {
        caption: `Hai @${u}

 DETAIL DATA PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    𝗐𝖺𝗁𝖺𝗂 𝗉𝖺𝗋𝖺 𝖻𝗎𝗒𝖾𝗋 𝗄𝗎 𝗃𝗂𝗄𝖺 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗆𝖺𝗄𝖺𝗂
𝗉𝖺𝗇𝖾𝗅 𝗍𝗎𝖺𝗇 𝗆𝗎 𝗂𝗇𝗂 𝗃𝖺𝗇𝗀𝖺𝗇 𝗅𝖺𝗁 𝖾𝗇𝗀𝗄𝖺𝗎 𝗆𝖾𝗅𝖺𝗇𝗀𝗀𝖺𝗋 𝖺𝗍𝗎𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝖺𝖽𝖺
𝟣.𝗍𝗂𝖽𝖺𝗄 𝖻𝗈𝗅𝖾𝗁 𝗌𝖾𝗋 𝖽𝗈𝗆𝖺𝗂𝗇
𝟤.𝗃𝖺𝗇𝗀𝖺𝗇 𝖻𝖺𝗀𝗂 𝖻𝖺𝗀𝗂 𝗉𝖺𝗇𝖾𝗅 𝗌𝖾𝖼𝖺𝗋𝖺 𝖿𝗋𝖾𝖾 
𝟥.𝗉𝖺𝗇𝖾𝗅 𝗎𝗇𝗅𝗂 𝗃𝗎𝖺𝗅 𝖽𝗂 𝖺𝗍𝖺𝗌 𝟧𝗄
𝟦.𝗉𝖺𝗍𝗎𝗁𝗂 𝖺𝗍𝖺𝗎 𝗆𝖺𝗍𝗂
`,
      });
      bot.sendMessage(
        chatId,
        "Data panel berhasil dikirim ke ID Telegram yang dimaksud."
      );
    }
  } else {
    bot.sendMessage(chatId, "Gagal membuat data panel. Silakan coba lagi.");
  }
});

bot.onText(/\/createadmin (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const adminUsers = owner;
  const isAdmin = adminUsers.includes(String(msg.from.id));
  if (!isAdmin) {
    bot.sendMessage(
      chatId,
      "Fitur Khusus Owner!!",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "HUBUNGI ADMIN", url: "https://t.me/fathirsthore" }],
          ],
        },
      }
    );
    return;
  }
  const commandParams = match[1].split(",");
  const panelName = commandParams[0].trim();
  const telegramId = commandParams[1].trim();
  if (commandParams.length < 2) {
    bot.sendMessage(
      chatId,
      "Format Salah! Penggunaan: /createadmin namapanel,idtele"
    );
    return;
  }
  const password = panelName + "403";
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${plta}`,
      },
      body: JSON.stringify({
        email: `${panelName}@kyydh18`,
        username: panelName,
        first_name: panelName,
        last_name: "Memb",
        language: "en",
        root_admin: true,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      bot.sendMessage(chatId, JSON.stringify(data.errors[0], null, 2));
      return;
    }
    const user = data.attributes;
    const userInfo = `
TYPE: user
➟ ID: ${user.id}
➟ USERNAME: ${user.username}
➟ EMAIL: ${user.email}
➟ NAME: ${user.first_name} ${user.last_name}
➟ LANGUAGE: ${user.language}
➟ ADMIN: ${user.root_admin}
➟ CREATED AT: ${user.created_at}
    `;
    bot.sendMessage(chatId, userInfo);
    bot.sendMessage(
      telegramId,
      `
DETAIL ADMIN PANEL ANDA :
👑 Login : ${domain}
💣 Username : ${user.username}
🔑 Password : ${password} 

📍 ᴄᴀᴛᴀᴛᴀɴ ᴘᴇɴᴛɪɴɢ:
    ᴡᴇʙ ᴊᴀɴɢᴀɴ ᴅɪ ʙᴜᴀᴛ ᴅᴅᴏs
    ᴛᴜᴛᴜᴘɪ ᴅᴏᴍᴀɪɴ ᴋᴇᴛɪᴋᴀ ᴅɪ ss
    ᴅᴏᴍᴀɪɴ ᴊᴀɴɢᴀɴ ᴅɪ sᴇʙᴀʀ
    ᴍᴏʜᴏɴ ᴘᴇʀʜᴀᴛɪᴀɴ
    EXPIRED SAMPAI                     DDOS
    ALL TRANSAKSI NO REFFUND 🙏
    JANGAN LUPA SS DONE
    PERATURAN (WAJIB DI BACA) :
    1. GA BOLEH BUAT AKUN PANEL PAKE SC C PANEL HARUS BUAT MANUAL
    2. GA BOLEH BUAT AKUN ADMIN PANEL PAKE SC C ADMIN HARUS BUAT MANUAL
    3. NAMA BELAKANG EMAIL HARUS  @fathirsthore JANGAN @gmail.com ATAU YANG LAINNYA
    4. JANGAN RUSUH
    5. IKUTI ATURAN
    `
    );
  } catch (error) {
    console.error(error);
    bot.sendMessage(
      chatId,
      "Terjadi kesalahan dalam pembuatan admin. Silakan coba lagi nanti."
    );
  }
});

// Handle callback query dari tombol
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const username = callbackQuery.from.username || callbackQuery.from.first_name;

    if (callbackQuery.data === 'panel_menu') {
        sendPanelMenu(chatId, messageId, username);
    } else if (callbackQuery.data === 'owner_menu') {
        sendOwnerMenu(chatId, messageId, username);
    } else if (callbackQuery.data === 'fitur_menu') {
        sendFiturMenu(chatId, messageId, username);
    } else if (callbackQuery.data === 'start_menu') {
        sendStartMenu(chatId, messageId, username);
    }

    bot.answerCallbackQuery(callbackQuery.id);
});

console.log(chalk.green.bold(`

88""Yb 88 8888P 8888P     8b    d8    db    88""Yb 88  dP 888888 888888 
88__dP 88   dP    dP      88b  d88   dPYb   88__dP 88odP  88__     88   
88"Yb  88  dP    dP       88YbdP88  dP__Yb  88"Yb  88"Yb  88""     88   
88  Yb 88 d8888 d8888     88 YY 88 dP""""Yb 88  Yb 88  Yb 888888   88`));
console.log(chalk.yellow.bold('bot 𝐅𝐚𝐭𝐡𝐢𝐫 v2.0 berhasil tersambung!!'));
console.log(' ');
console.log(' ');
console.log(chalk.blue.bold('Contact Dev:'));
console.log(chalk.yellow.bold('WhatsApp: +62882003493812'));
console.log(chalk.yellow.bold('Telegram: @fathirsthore'));
console.log(chalk.green.bold('hargai hasil dari Fathir'));
console.log(chalk.green.bold('developer.'));