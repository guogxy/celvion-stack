NAFNet-SIDD Core ML Models

Source project: https://github.com/megvii-research/NAFNet
Paper/model: NAFNet-SIDD image denoising models
License: MIT License, from the upstream NAFNet repository.
Original pretrained weights:
- NAFNet-SIDD-width64: Google Drive link published in the NAFNet README; mirrored from Hugging Face for reliable download.
- NAFNet-SIDD-width32: Google Drive link published in the NAFNet README.

Conversion notes:
- Converted locally from PyTorch checkpoint to Core ML ML Program with coremltools 9.0.
- Fixed input: Float32 MultiArray, 1 x 3 x 256 x 256, RGB normalized to [0, 1].
- Fixed output: Float16 MultiArray, 1 x 3 x 256 x 256, denoised RGB.
- Runtime metadata requires iOS 18 or newer.
- Custom LayerNorm2d was replaced with equivalent traceable PyTorch operations during conversion.
- The app prefers NAFNet-SIDD-width64 for quality and falls back to NAFNet-SIDD-width32 if the larger model is unavailable.
- NAFNet-SIDD-width64 source checkpoint SHA256: cd685efaae01f7c4e9951f2deab05780079c8eb1e49ed664b72f6db04dabb445.

The app uses these as optional AI denoising paths. If the model is unavailable
or cannot run on the current OS/device, enhancement falls back to Core Image
noise reduction.
