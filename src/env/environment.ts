const env = process.env.environment || 'development';

const environments = {
    development: {
        directories: {
            assets: 'assets',
            images: 'assets/img',
            definitions: {
                atlas: 'assets/defs/atlas',
                level: 'assets/defs/level'
            },
        }
    }
}

export default environments[env];