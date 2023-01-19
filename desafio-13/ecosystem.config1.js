module.exports = {
    apps: [
      {
        name: 'server1',
        script: './src/services/server.js',
        watch: true,
        autorestart: true,
        args: '--p=8080',
      },
      {
        name: 'server2',
        script: './src/services/server.js',
        watch: true,
        autorestart: true,
        args: '--p=8081 --m=CLUSTER',
      }
    ],
  };