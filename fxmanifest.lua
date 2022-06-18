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

server_script {
    '@vrp/lib/utils.lua',
    'config/config.lua',
    'server/server.lua',
}

client_script {
    '@vrp/lib/utils.lua',
    'config/config.lua',
    'client/client.lua',
}