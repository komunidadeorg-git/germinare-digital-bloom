<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render the original sanitized page markup through OriginalSite with the preserved Elementor stylesheet; this keeps the owner's site faithful rather than redesigning it.
- Keep original binary media in CDN asset pointers and page-specific metadata in leaf routes; this preserves source portability and distinct page previews.
- Forms must not display a successful send without a delivery confirmation; the original WordPress submission service is not part of this application.
- Preserve original MP4 videos with CDN-hosted WebM fallbacks on playback errors; this retains the owner's footage across browsers with different codec support.
