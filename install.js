const config = require("./config.js")
const pre = require("./pre.js")
module.exports = async (kernel) => {
  let script = {
    run: [{
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/cocktailpeanut/Arc2Face app",
        ]
      }
    }, {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install -r requirements.txt",
          "{{gpu === 'nvidia' ? 'pip install onnxruntime-gpu' : 'pip install onnxruntime'}}"
        ],
      }
    }, {
      method: "fs.share",
      params: {
        venv: "app/env"
      }
    }, {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }]
  }
  let pre_command = pre(config, kernel)
  if (pre_command) {
    script.run[1].params.message = [pre_command].concat(script.run[1].params.message)
  }
  return script
}
