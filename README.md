# Capstio web

Website marketing của Capstio, viết bằng Next.js (App Router, Cache Components), Tailwind CSS v4 và TypeScript.

```bash
pnpm install
pnpm dev      # http://localhost:3000, tự chuyển sang /vi hoặc /en theo Accept-Language
pnpm lint
pnpm build
```

Next.js ở đây là phiên bản mới, khác nhiều so với bản cũ. Đọc `AGENTS.md` và tài liệu trong `node_modules/next/dist/docs/` trước khi sửa routing hoặc caching.

## Cấu trúc

- `src/app/[lang]/`: layout gốc và các trang, mọi route nằm dưới `vi` hoặc `en`.
- `src/proxy.ts`: chuyển hướng đường dẫn thiếu mã ngôn ngữ.
- `src/dictionaries/{vi,en}.json`: toàn bộ chữ hiển thị. Tiếng Việt là ngôn ngữ chính, tiếng Anh là bản dịch đầy đủ.
- `src/lib/site-nav.ts`: cấu trúc điều hướng dùng chung cho header và footer (nhãn nằm trong từ điển).
- `src/components/ui/`: component cơ bản (Button, StatusBadge, CodeStrip, Card, Section, Container, Logo, Overline).
- `src/components/layout/`: Header (thanh thông báo, mega menu, kính khi cuộn, menu mobile), Footer, chọn ngôn ngữ, đổi giao diện.
- `public/brand/`: logo lấy từ bộ brand của app macOS (`../macos/docs/brand/logo`).

## Design token

Nguồn là mục Foundations trong file Figma Capstio. Toàn bộ nằm ở `src/app/globals.css`, chia ba lớp:

1. **Primitives** trong `@theme`: neutral, blue, mint, slate và các bậc trạng thái. Trang không dùng trực tiếp.
2. **Semantic**: biến theo vai trò (`--bg-page`, `--text-body`, `--action-primary`...), đổi theo giao diện sáng hoặc tối. Dùng qua utility ngắn như `bg-page`, `text-heading`, `border-line`, `bg-action`.
3. **Context**: khối trang chọn một ngữ cảnh bằng `data-surface="light|subtle|dark"` (component `Section`). Khối `dark` luôn giữ màu tối ở cả hai giao diện.

Kiểu chữ dùng utility `type-display`, `type-h1`...`type-mono-s` (cỡ mobile và desktop theo Figma). Font là Inter (Latin, Vietnamese, Cyrillic, Greek) và JetBrains Mono, nạp bằng `next/font`. Thang khoảng cách dùng thang 4px mặc định của Tailwind, khớp với Figma. Container nội dung 1200px, dùng class `container-page`.

Giao diện tối bật bằng class `dark` trên `<html>`, lưu ở `localStorage` (`capstio-theme`) và áp trước lần vẽ đầu để không bị nháy.
