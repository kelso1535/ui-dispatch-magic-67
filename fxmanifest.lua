
fx_version 'cerulean'
game 'gta5'

author 'Your Server Name'
description 'Advanced Dispatch System'
version '1.0.0'

ui_page 'html/index.html'

client_scripts {
    'config.lua',
    'client.lua'
}

server_scripts {
    'server.lua'
}

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/sounds/*.mp3'
}
