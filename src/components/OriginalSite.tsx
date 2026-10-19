import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Settings = {
  background_slideshow_gallery?: { url: string }[];
  background_slideshow_slide_duration?: number;
  slides_to_show?: string;
  slides_to_scroll?: string;
  autoplay_speed?: number;
  speed?: number;
};

function settings(element: HTMLElement): Settings {
  try { return JSON.parse(element.dataset['settings'] ?? "{}"); } catch { return {}; }
}

export function OriginalSite({ html }: { html: string }) {
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<{ images: string[]; index: number } | null>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const cleanups: (() => void)[] = [];
    const page = element.querySelector<HTMLElement>('[data-elementor-id]');
    const pageId = page?.dataset['elementorId'];
    const bodyClasses = ['elementor-default', 'elementor-page', 'elementor-template-canvas', ...(pageId ? [`elementor-page-${pageId}`, `page-id-${pageId}`] : [])];
    document.body.classList.add(...bodyClasses);
    cleanups.push(() => document.body.classList.remove(...bodyClasses));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
        const node = entry.target;
        observer.unobserve(node);
        const target = Number(node.dataset['toValue'] ?? 0);
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Number(node.dataset['duration'] ?? 2000);
        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
          const progress = duration ? Math.min(1, (now - start) / duration) : 1;
          node.textContent = String(Math.round(target * progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        cleanups.push(() => cancelAnimationFrame(frame));
      });
    });
    element.querySelectorAll('.elementor-counter-number').forEach((node) => observer.observe(node));
    cleanups.push(() => observer.disconnect());
    element.querySelectorAll(".elementor-invisible").forEach((node) => node.classList.remove("elementor-invisible"));
    element.querySelectorAll<HTMLElement>("[data-settings]").forEach((node) => {
      const config = settings(node);
      const slides = config.background_slideshow_gallery?.filter((image) => image.url.startsWith("/__l5e/"));
      if (!slides?.length) return;
      const background = document.createElement("div");
      background.className = "original-slideshow";
      slides.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.url; img.alt = ""; img.className = index === 0 ? "active" : "";
        background.append(img);
      });
      node.prepend(background);
      let index = 0;
      const timer = window.setInterval(() => {
        background.children[index]?.classList.remove("active");
        index = (index + 1) % slides.length;
        background.children[index]?.classList.add("active");
      }, config.background_slideshow_slide_duration ?? 9000);
      cleanups.push(() => { clearInterval(timer); background.remove(); });
    });
    let disposed = false;
    import("swiper").then(async ({ default: Swiper }) => {
      const { Navigation, Pagination, Autoplay } = await import("swiper/modules");
      if (disposed) return;
      element.querySelectorAll<HTMLElement>(".elementor-widget-image-carousel, .elementor-widget-testimonial-carousel").forEach((widget) => {
        const container = widget.querySelector<HTMLElement>(".swiper");
        if (!container) return;
        const config = settings(widget);
        const swiper = new Swiper(container, {
          modules: [Navigation, Pagination, Autoplay],
          slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20,
          breakpoints: { 768: { slidesPerView: Number(config.slides_to_show ?? 1), slidesPerGroup: Number(config.slides_to_scroll ?? 1) } },
          speed: config.speed ?? 900, loop: true,
          autoplay: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? false : { delay: config.autoplay_speed ?? 9000, pauseOnMouseEnter: true, disableOnInteraction: false },
          navigation: { prevEl: widget.querySelector<HTMLElement>(".elementor-swiper-button-prev"), nextEl: widget.querySelector<HTMLElement>(".elementor-swiper-button-next") },
          pagination: { el: widget.querySelector<HTMLElement>(".swiper-pagination"), clickable: true },
        });
        cleanups.push(() => swiper.destroy());
      });
    });
    const click = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const toggle = target.closest<HTMLElement>(".elementor-menu-toggle");
      if (toggle) {
        const open = toggle.classList.toggle("elementor-active");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.closest(".elementor-widget")?.querySelector(".elementor-nav-menu--dropdown")?.classList.toggle("original-menu-open", open);
        return;
      }
      const link = target.closest<HTMLAnchorElement>("a");
      if (!link) return;
      if (link.dataset['elementorOpenLightbox'] === "yes") {
        event.preventDefault();
        const group = link.dataset['elementorLightboxSlideshow'];
        const links = Array.from(element.querySelectorAll<HTMLAnchorElement>("a[data-elementor-open-lightbox='yes']")).filter((a) => !group || a.dataset['elementorLightboxSlideshow'] === group);
        setGallery({ images: links.map((a) => a.href), index: Math.max(0, links.indexOf(link)) });
      } else if (link.getAttribute("href")?.startsWith("/") && !link.getAttribute("href")?.startsWith("/__l5e") && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        navigate({ to: link.getAttribute("href") ?? "/" });
      } else if (link.getAttribute("href") === "#" || /^https?:\/\/(www\.)?germinare\.uy\/[^#]*#topo$/.test(link.href)) {
        event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const keydown = (event: KeyboardEvent) => {
      if ((event.key === "Enter" || event.key === " ") && event.target instanceof HTMLElement && event.target.matches(".elementor-menu-toggle")) { event.preventDefault(); event.target.click(); }
    };
    // The original WordPress mail action is not available on the clone. Never show a fabricated success.
    const submit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!(event.target instanceof HTMLFormElement)) return;
      const form = event.target;
      const fields = Array.from(new FormData(form).entries()).map(([key, value]) => `${key}: ${value}`).join("\n");
      const subject = form.closest(".elementor-2345") ? "Solicitação de COA — Germinare" : "Mensagem — Germinare";
      window.location.href = `mailto:sales@germinare.uy?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fields)}`;
    };
    element.addEventListener("click", click);
    element.addEventListener("keydown", keydown);
    element.addEventListener("submit", submit);
    return () => {
      disposed = true;
      element.removeEventListener("click", click); element.removeEventListener("keydown", keydown); element.removeEventListener("submit", submit);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [html, navigate]);
  useEffect(() => {
    if (!gallery) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGallery(null);
      if (event.key === "ArrowRight") setGallery((value) => value && ({ ...value, index: (value.index + 1) % value.images.length }));
      if (event.key === "ArrowLeft") setGallery((value) => value && ({ ...value, index: (value.index + value.images.length - 1) % value.images.length }));
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", key); };
  }, [gallery]);
  return <div className="original-site elementor-kit-52">
    <div ref={root} dangerouslySetInnerHTML={{ __html: html }} />
    {gallery && <div className="original-lightbox" role="dialog" aria-modal="true" aria-label="Galeria de fotos">
      <Button variant="ghost" className="original-lightbox-close" aria-label="Fechar galeria" onClick={() => setGallery(null)}><X /></Button>
      <Button variant="ghost" aria-label="Foto anterior" onClick={() => setGallery({ ...gallery, index: (gallery.index + gallery.images.length - 1) % gallery.images.length })}><ChevronLeft /></Button>
      <img src={gallery.images[gallery.index]} alt="Germinare Farm" />
      <Button variant="ghost" aria-label="Próxima foto" onClick={() => setGallery({ ...gallery, index: (gallery.index + 1) % gallery.images.length })}><ChevronRight /></Button>
    </div>}
  </div>;
}