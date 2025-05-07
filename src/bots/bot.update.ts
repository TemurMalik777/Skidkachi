import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { BotService } from "./bots.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log(ctx);
    return this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    console.log(ctx);
    return this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    return this.botService.onStop(ctx);
  }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.replyWithPhoto(String(ctx.message.video));
  //     await ctx.replyWithVideo(ctx.message.video.file_id);
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithSticker(ctx.message.sticker.file_id);
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithSticker(ctx.message.animation.file_id);
  //   }
  // }

  // @On("document")
  // async onDocs(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithSticker(ctx.message.document.file_name!);
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("contact" in ctx.message!) {
  //     console.log(ctx.message.contact);
  //     await ctx.reply(ctx.message.contact.phone_number);
  //     await ctx.reply(ctx.message.contact.first_name);
  //     //   await ctx.replyWitSticker(ctx.message.contact.last_name);
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("location" in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithVoice(String(ctx.message.voice.file_id));
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hello Jumon");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.reply("Ertaga yordam beram");
  // }

  // @Command("inline")
  // async onCommandInline(@Ctx() ctx: Context) {
  //   const inlineKeyBorad = [
  //     [
  //       {
  //         text: "Button 1",
  //         callback_data: "buttun_1",
  //       },
  //       {
  //         text: "Button 2",
  //         callback_data: "buttun_2",
  //       },
  //       {
  //         text: "Button 3",
  //         callback_data: "buttun_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 4",
  //         callback_data: "buttun_4",
  //       },
  //       {
  //         text: "Button 5",
  //         callback_data: "buttun_5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 6",
  //         callback_data: "buttun_6",
  //       },
  //     ],
  //   ];
  //   await ctx.reply("Kerakli tugmani tanlang:", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyBorad,
  //     },
  //   });
  // }

  // @Action("buttun_1")
  // async onActionButtun1(@Ctx() ctx: Context) {
  //   await ctx.reply("Buttun 1 bosildi");
  // }

  // @Action("buttun_2")
  // async onActionButtun2(@Ctx() ctx: Context) {
  //   await ctx.reply("Buttun 2 bosildi");
  // }

  // @Action(/^buttun_\d+$/)
  // async onActionAnyButtun_2(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const buttonData = ctx.callbackQuery?.data;
  //     const id = buttonData.split("_")[1];
  //     await ctx.reply(`${id} Button bosildi`);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   const mainKeyBoard = [
  //     ["bir", "ikki", "uch"],
  //     ["to'rt", "besh"],
  //     ["olti"],
  //     [Markup.button.contactRequest("Telfion raqamingizni yuboring")],
  //     [Markup.button.locationRequest("Lokatsiayngizni yubornig")],
  //   ];

  //   await ctx.reply("Kerakli Main Button tanlang:", {
  //     ...Markup.keyboard(mainKeyBoard).resize(),
  //   });
  // }

  // @Hears("bir")
  // async onHearsButtonBir(@Ctx() ctx: Context) {
  //   await ctx.reply("Main Button1 bosildi");
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("text" in ctx.message!) {
  //     if (ctx.message.text == "hi") {
  //       await ctx.replyWithHTML("<b>Hello</b>");
  //     } else {
  //       await ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   return this.botService.onText(ctx)
  // }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.from);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
  }
}
