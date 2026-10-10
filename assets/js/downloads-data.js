/*
  Downloads page data. Edit this file to publish a release; downloads.html
  renders one section per product, in this order.

  platforms.<os>.url: a direct installer link. Set it to null to show
  "Coming soon" for that platform instead of a download button.
*/
window.ZARO_DOWNLOADS = [
  {
    id: "cutreel",
    name: "CutReel",
    kind: "Video editor",
    icon: "assets/img/cutreel/cutreel-icon.png",
    accent: "#8b7bff",
    page: "cutreel.html",
    version: "0.7.2",
    changelog: "https://github.com/skynab/CutReel/releases",
    platforms: {
      windows: { detail: "64-bit installer (.exe)", url: "https://github.com/skynab/CutReel/releases/latest" },
      macos:   { detail: "Disk image (.dmg)", url: "https://github.com/skynab/CutReel/releases/latest" },
      linux:   { detail: "Debian / Ubuntu package (.deb)", url: "https://github.com/skynab/CutReel/releases/latest" }
    },
    resources: [
      { title: "Source code", detail: "Build CutReel yourself", action: "View on GitHub", url: "https://github.com/skynab/CutReel" },
      { title: "Older versions", detail: "Every past release", action: "Browse", url: "https://github.com/skynab/CutReel/releases" },
      { title: "Command-line tools", detail: "cutreel-render, -probe, -otio and more", action: "Read more", url: "info.html#cutreel" },
      { title: "Licenses", detail: "Apache-2.0 source, GPL-3.0 binaries", action: "Open", url: "legal.html#licenses" }
    ],
    note: "Distributed binaries include FFmpeg and other third-party components. See THIRD-PARTY.md in the source for details."
  },
  {
    id: "soundsplice",
    name: "SoundSplice",
    kind: "Audio editor",
    icon: "assets/img/brand/soundsplice-icon.svg",
    accent: "#2fd4c0",
    page: "soundsplice.html",
    version: "0.7.0",
    changelog: "https://github.com/skynab/SoundSplice/releases",
    platforms: {
      windows: { detail: "64-bit installer", url: "https://github.com/skynab/SoundSplice/releases/latest" },
      macos:   { detail: "Universal app", url: "https://github.com/skynab/SoundSplice/releases/latest" },
      linux:   { detail: "x86_64 build", url: "https://github.com/skynab/SoundSplice/releases/latest" }
    },
    resources: [
      { title: "Source code", detail: "Build SoundSplice yourself", action: "View on GitHub", url: "https://github.com/skynab/SoundSplice" },
      { title: "Older versions", detail: "Every past release", action: "Browse", url: "https://github.com/skynab/SoundSplice/releases" },
      { title: "Plugins", detail: "Load VST3 and AU effects", action: "Read more", url: "info.html#soundsplice" },
      { title: "License", detail: "MIT-licensed source", action: "Open", url: "legal.html#licenses" }
    ],
    note: ""
  }
];
