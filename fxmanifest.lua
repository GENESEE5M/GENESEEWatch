fx_version 'cerulean'
game 'gta5'

ui_page('html/index.html')

files {
    'html/*.html',
    'html/css/*.css',
    'html/js/*.js',
    'html/img/*.png',
    'html/**/*'
}

server_script 'server/server.lua'
client_script 'client/client.lua'

shared_scripts { 
    '@vrp/lib/utils.lua',
    'config/config.lua',
}
