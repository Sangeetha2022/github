modify_proxy_config(object) ::= <<
   '/$object.baseName$/*': {
        target: '$object.baseUrl$',
        secure: true,
        pathRewrite: {
            '^/$object.baseName$': ''
        },
        changeOrigin: true,
        logLevel: 'debug'
    }
>>