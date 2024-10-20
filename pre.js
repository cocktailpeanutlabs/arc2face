module.exports = (config, kernel) => {
  const x = {
    "win32": {
      "nvidia": `pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 ${config.xformers ? 'xformers' : ''} --index-url https://download.pytorch.org/whl/cu121`,
      "amd": "pip install torch-directml torchaudio torchvision numpy==1.26.4",
      "cpu": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
    },
    "darwin": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu",
    "linux": {
      "nvidia": `pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 ${config.xformers ? 'xformers' : ''} --index-url https://download.pytorch.org/whl/cu121`,
      "amd": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm6.0",
      "cpu": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
    }
  }
  if (config.torch) {
    if (kernel.platform === "darwin") {
      return x[kernel.platform]
    } else {
      return x[kernel.platform][kernel.gpu]
    }
  }
}
