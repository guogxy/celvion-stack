RealESRGAN-x4plus Core ML Model

Source: https://huggingface.co/VincentGOURBIN/RealESRGAN-CoreML
Original project: https://github.com/xinntao/Real-ESRGAN
License: BSD-3-Clause, matching the upstream Real-ESRGAN model card.

Model notes:
- Architecture: RRDBNet RealESRGAN_x4plus
- Task: 4x image super-resolution
- Input: Float16 MultiArray, 1 x 3 x 256 x 256, RGB normalized to [0, 1]
- Output: Float16 MultiArray, 1 x 3 x 1024 x 1024, RGB in [0, 1]
- Runtime: Core ML ML Program compiled with iOS 18+ metadata

The app uses this model as an optional AI enhancement path. If the model is
unavailable or the OS cannot load it, the app falls back to Core Image local
denoise, sharpening, and Lanczos scaling.
