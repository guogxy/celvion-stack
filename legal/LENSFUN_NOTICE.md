# Lensfun database attribution and modification notice

Celvion Stack includes an adapted subset of the Lensfun lens database.

- Title: Lensfun lens database
- Original authors: Lensfun database contributors
- Original-data credit recorded by Lensfun: Tom Niemann, original open-source
  PTLens database
- Project: <https://github.com/lensfun/lensfun>
- Source commit: `5bfb8d8cb151a3a4068219cfc798f63d0641ff19`
- Exact source: <https://github.com/lensfun/lensfun/commit/5bfb8d8cb151a3a4068219cfc798f63d0641ff19>
- License: Creative Commons Attribution-ShareAlike 3.0 Unported
  (`CC-BY-SA-3.0`), <https://creativecommons.org/licenses/by-sa/3.0/>

Changes by Celvion Stack: source XML was converted at build time to a compact,
deterministic JSON representation; Lensfun defaults and provenance were made
explicit; stable record identifiers and source hashes were added; only the
identity and geometric-distortion records used by the app were retained. TCA,
vignetting, crop-boundary, and field-of-view records were omitted. The PTLens,
Poly3, and Poly5 model types, their coefficients, focal/real-focal values,
calibration crop/aspect values, lens projection, and lens-center coordinates
were preserved. No source model was converted to or approximated by
Brown–Conrady.

The complete license is included as `LICENSE-CC-BY-SA-3.0.txt`. The converted
data package remains available in source-readable JSON form under the same
license. Lensfun names identify the source and do not imply endorsement of
Celvion Stack.

