module.exports = {
    apps: [
      {
        name: 'server1',
        script: './src/services/server.js',
        watch: true,
        autorestart: true,
        args: '--p=8082',
      },
      {
        name: 'server2',
        script: './src/services/server.js',
        watch: true,
        autorestart: true,
        args: '--p=8083',
      },
      {
        name: 'server3',
        script: './src/services/server.js',
        watch: true,
        autorestart: true,
        args: '--p=8084',
      },
      {
        name: 'server4',
        script: './src/services/server.js',
        watch: true,
        autorestart: true,
        args: '--p=8085',
      }
    ],
  };