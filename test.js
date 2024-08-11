const { Client } = require('./index');
const assert = require("node:assert");

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
