# Runcfg JS Client

### Usage in projects

First download dependency using npm
```shell
$  npm i runcfg
```

### Using your first config

1. Create an account at https://runcfg.com
2. Download your .runcfg file from your project page at https://runcfg.com by clicking (get .runcfg file)

![](https://raw.githubusercontent.com/runcfg/runcfg-net/main/runcfg.png)

3. Place your .runcfg file at the root of your project
4. Create an instance of the client in your code as follows:

```javascript
const { Client } = require('runcfg');

class MyConfig {
    version
    target
    enabled
}

let func = async function() {
    let client = new Client(".runcfg");
    let config = await client.Load(MyConfig)
    console.log(`config values: ${config.version}, ${config.target}, ${config.enabled}`)
    assert.equal(config.version, "1")
}()
```

Now your remote config is available in your specified type.