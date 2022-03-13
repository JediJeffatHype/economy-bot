const fs = require('node:fs');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const clientId = '908037287063978015';
const guildId = '783339746347843614';
module.exports = (client) => {

    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);

                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }



        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('refreshing (/) commands');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandArray
                    },
                );

                console.log('reloaded');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};