NAFNet-SIDD Core ML Models

Source project: https://github.com/megvii-research/NAFNet
Pinned source commit: 2b4af71ebe098a92a75910c233a3965a3e93ede4
Paper/model: NAFNet-SIDD image denoising models
License: MIT License, from the upstream NAFNet repository.

Official pretrained checkpoints published by the pinned NAFNet README:
- NAFNet-SIDD-width32
  - Google Drive ID: 1lsByk21Xw-6aW7epCwOQxvm6HYCQZPHZ
  - SHA256: 89c70e808d1783b6c07911306e106aaf0d4f7f3da8c61078b99ff7f8929a26f4
- NAFNet-SIDD-width64
  - Google Drive ID: 14Fht1QQJ2gMlk4N1ERCRuElg8JfjrWWR
  - SHA256: cd685efaae01f7c4e9951f2deab05780079c8eb1e49ed664b72f6db04dabb445

Core ML conversion:
- Rebuilt on 2026-08-25 with Python 3.9.6, PyTorch 2.7.0,
  coremltools 9.0, and NumPy 2.0.2.
- Fixed input: Float16 MLMultiArray, 1 x 3 x 256 x 256, RGB normalized to [0, 1].
- Fixed output: Float16 MLMultiArray, 1 x 3 x 256 x 256, denoised RGB.
- ML Program storage is Float16 and compiler-reported compute precision is
  Mixed (Float16, Int32), where integer values are shape/index operations.
- Runtime metadata requires iOS 18 or newer.
- Upstream LayerNorm2d uses a custom autograd Function that cannot be traced
  reliably. During conversion only, all 72 instances are replaced by the
  forward-equivalent mean/variance/rsqrt tensor expression. The replacement
  agrees with the upstream eager implementation within max absolute error
  5.05e-7 (width32) and 4.01e-8 (width64); TorchScript agrees exactly on the
  fixed trace patch.
- The model package and compiled metadata/MIL are emitted by coremltools and
  coremlcompiler. No generated Core ML file is hand-edited.

Validation evidence:
- Both compiled iOS assets were loaded and run through Core ML on macOS 26.5.2.
- Compiler metadata and runtime modelDescription both reported Float16 input
  and output with the fixed 1 x 3 x 256 x 256 shape.
- Compiled output was compared with PyTorch on a fixed dark gradient and a
  fixed seeded texture. Required tolerances were max absolute <= 0.04 and mean
  absolute <= 0.0025. Observed worst cases:
  - width32: max 0.031113, mean 0.001691 (dark gradient); max 0.000871,
    mean 0.000143 (seeded texture).
  - width64: max 0.000717, mean 0.000142 (dark gradient); max 0.000969,
    mean 0.000167 (seeded texture).
- Full machine-readable evidence, per-file SHA256 values, and the tree-hash
  definition are recorded in Tools/nafnet_coreml/NAFNet-SIDD-conversion-report.json.

Validated compiled artifact tree SHA256 values:
- NAFNet-SIDD-width32.lsmodelpack:
  c055d355490f1b2e7fd941b0d538f952c575cdb963d4be57efcff76a82eccdba
- NAFNet-SIDD-width64.lsmodelpack:
  6f7993dcaf7dd86adbf9530af4b5b3d4d55f5f3d906bb7a76feabcb16ad1f2fa

The app prefers NAFNet-SIDD-width64 for quality and falls back to
NAFNet-SIDD-width32 if the larger model is unavailable. If neither model can
run on the current OS/device, enhancement falls back to Core Image noise
reduction.
