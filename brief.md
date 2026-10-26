# Brief — cartTotal (IA#1)

## Nhiệm vụ

Viết hàm `cartTotal(items, options)` trong `src/cart.js` và viết test cho nó
trong `test/cart.test.js`. JavaScript thuần, không dùng thư viện ngoài.

## Phạm vi

Được phép sửa:

- `src/cart.js`: tạo mới hoặc thay toàn bộ phần cài đặt
- `test/cart.test.js`: thêm test, giữ nguyên test có sẵn

Không được sửa:

- `package.json`, `package-lock.json`: không thêm package, không đổi script
- `.github/`, `CLAUDE.md`, `.gitignore`, `README.md`
- Không tạo thêm file nào khác.

## Hợp đồng hàm

Chữ ký: `export function cartTotal(items, options)`, dùng named export, ESM.

Đầu vào `items`: mảng các object `{ name, price, qty }`

- `name`: chuỗi, không dùng trong tính toán
- `price`: đơn giá tính bằng đồng, là số hữu hạn ≥ 0 (cho phép bằng 0)
- `qty`: số nguyên dương (1, 2, 3, …)

Đầu vào `options`: `{ vatRate, freeShipFrom, shipFee }`

- `vatRate`: thuế suất VAT, ví dụ 0.08
- `freeShipFrom`: ngưỡng subtotal để được miễn phí ship (đồng), ví dụ 500000
- `shipFee`: phí ship (đồng), ví dụ 30000

Đầu ra: một **number** (không bao giờ là chuỗi), số nguyên tính bằng đồng.

Cách tính, theo đúng thứ tự:

1. `subtotal = tổng của price × qty` trên tất cả các món
2. `vat = Math.round(subtotal × vatRate)`: VAT được làm tròn đến đồng
3. `shipping = subtotal >= freeShipFrom ? 0 : shipFee`
   (ngưỡng so với subtotal **trước VAT**, dùng `>=`)
4. `return subtotal + vat + shipping`

Ví dụ mẫu:
cartTotal(
[{ name: 'Áo thun', price: 180000, qty: 2 },
{ name: 'Sổ tay', price: 45000, qty: 1 }],
{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
) === 467400 // 405000 + 32400 + 30000

## Các trường hợp lỗi

Kiểm tra mọi món trước khi tính. Gặp dữ liệu sai thì ném lỗi, không trả về
giá trị mặc định.

- `price` âm, hoặc không phải số hữu hạn → `throw new RangeError(...)`
- `qty` không phải số nguyên dương (0, -1, 1.5, '2') → `throw new RangeError(...)`
- Giỏ rỗng `[]` → trả về `0` (không VAT, không ship). Đây không phải lỗi.

## Ràng buộc

- Không thêm dependency. Test chỉ dùng `node:test` và `node:assert/strict`.
- Không dùng `toFixed` vì nó trả về chuỗi. Dùng `Math.round`.
- Không dùng `try/catch` bên trong `cartTotal`; lỗi phải đến được nơi gọi hàm.
- Viết ngắn gọn: một hàm, không tạo class phụ, không trừu tượng hóa thừa.

## Các test cần viết

Mỗi test chỉ kiểm tra một điều. Giá trị mong đợi được tính tay từ brief này,
không chép từ output của code.

1. Ví dụ mẫu → `467400`, và `typeof` kết quả là `'number'`
2. Giỏ rỗng → `0`
3. Subtotal đúng bằng ngưỡng: một món `price 500000, qty 1`
   → `540000` (500000 + 40000 VAT + 0 ship)
4. Subtotal ngay dưới ngưỡng: một món `price 499999, qty 1`
   → `569999` (499999 + 40000 VAT + 30000 ship)
5. `price: -1` → ném `RangeError`
6. `qty: 1.5` → ném `RangeError`
7. `qty: 0` → ném `RangeError`

## Hoàn thành khi

- `npm test` chạy xanh, có đủ các test ở trên
- `npm run format:check` chạy xanh
- `git diff` chỉ thay đổi `src/cart.js` và `test/cart.test.js`
- `package.json` không bị thay đổi
