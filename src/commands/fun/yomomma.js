const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class YoMommaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'yomomma',
      aliases: ['yourmom', 'ym'],
      usage: 'yomomma [user mention]',
      description: 'Says a random yo momma joke.',
      type: 'fun',
      examples: ['yomomma @Calypso']
    });
  }
  async run(message, args) {
    const member =  this.getMemberFromMention(message, args[0]) || message.member;
    try {
      const res = await fetch('https://api.yomomma.info');
      let joke = (await res.json()).joke;
      joke = joke.charAt(0).toLowerCase() + joke.slice(1);
      const embed = new MessageEmbed()
        .setTitle('🤱  Yo Momma  🤱')
        .setDescription(`${member}, ${joke}`)
        .setFooter(`Requested by ${message.member.displayName}#${message.author.discriminator}`, 
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 'Something went wrong. Please try again in a few seconds.', err.message);
    }
  }
};
