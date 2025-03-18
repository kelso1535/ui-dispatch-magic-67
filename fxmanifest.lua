
fx_version 'cerulean'
game 'gta5'

author 'Your Server Name'
description 'Advanced Dispatch System'
version '1.0.0'

ui_page 'ui/index.html'

client_scripts {
    'config.lua',
    'client.lua'
}

server_scripts {
    'server.lua'
}

files {
    'ui/**/*'
}
