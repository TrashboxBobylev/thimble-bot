const { Command } = require('discord.js-commando');

const meta = {
  name: 'avatar',
  description: 'Get the avatar of a certain user.',
  examples: [
    '`avatar @someone#1234` - Get someone\'s avatar based on their DiscordTag',
    '`avatar someone` - Get someone\'s avatar based on their username/nickname',
    '`avatar` - Get your own avatar'
  ],
  args: [
    {
      key: 'user',
      prompt: 'Please provide a user.',
      type: 'user',
      default: ''
    }
  ]
};

class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'avatar',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });
  }

  extension(str) {
    return str
      .split('.')
      .pop()
      .split('?')
      .shift();
  }

  generateAttachment(user) {
    return {
      file: {
        attachment: user.avatarURL,
        name: `avatar.${this.extension(user.avatarURL)}`
      }
    };
  }

  async run(message, { user }) {
    if (!user) {
      user = message.author;
    }

    if (user && user.id) {
      return message.say('', this.generateAttachment(user));
    }

    return message.say(':x: User not found.');
  }
};

module.exports = AvatarCommand;
module.exports.meta = meta;
