const fs = require('fs')
const path = require('path')
let dir = fs.readdirSync(path.resolve(__dirname, './packages'))
const components = {}, reg = /^s-/

dir.forEach(filename => {
  reg.test(filename) && (components[filename] = `./packages/${filename}/index.js`)
})

components['base'] = './packages/styles/base.js'

fs.writeFileSync('./components.json', JSON.stringify(components, null, 2))