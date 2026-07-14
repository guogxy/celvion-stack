(() => {
  const root = document.documentElement;
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  const browserLanguage = navigator.language || "en";
  const initialLanguage = requested === "zh" || requested === "en"
    ? requested
    : browserLanguage.toLowerCase().startsWith("zh") ? "zh" : "en";

  function setLanguage(language, updateAddress = false) {
    const next = language === "zh" ? "zh" : "en";
    root.dataset.language = next;
    root.lang = next === "zh" ? "zh-Hans" : "en";

    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      button.textContent = next === "zh" ? "EN" : "中文";
      button.setAttribute("aria-label", next === "zh" ? "Switch to English" : "切换到简体中文");
    });

    document.querySelectorAll("a[data-preserve-language]").forEach((link) => {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("http")) return;
      const url = new URL(rawHref, window.location.href);
      url.searchParams.set("lang", next);
      link.href = `${url.pathname.split("/").pop() || "index.html"}${url.search}${url.hash}`;
    });

    if (updateAddress) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url);
    }
  }

  setLanguage(initialLanguage);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(root.dataset.language === "zh" ? "en" : "zh", true);
    });
  });

  const header = document.querySelector(".site-header");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll("pre[data-license-source]").forEach(async (element) => {
    const source = element.dataset.licenseSource;
    if (!source) return;
    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      element.textContent = await response.text();
    } catch {
      element.textContent = root.dataset.language === "zh"
        ? "无法在此处载入许可证文本。请使用上方链接打开原始文本。"
        : "The license text could not be loaded here. Use the link above to open the original text.";
    }
  });
})();
