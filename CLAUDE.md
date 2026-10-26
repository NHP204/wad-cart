# Project rules — wad-cart

Stack: Node 22, JS thuần, ESM, không có dependency
Layout: code ở trong src/, tests ở trong test/ dùng node:test + node:assert/strict.
Commands: npm test · npm run format:check
Style: 2-space indent, chỉ dùng named exports.
Money: tiền là số nguyên đồng, trả về number, không toFixed.
Never: thêm package vào package.json, chỉnh sửa test files khi chưa yêu cầu,
commit node_modules/.
