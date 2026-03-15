# Huong dan thuc hien bai nop

## 1) Cai dat va chay du an
```powershell
npm install
npm start
```
Mac dinh server chay tai: `http://localhost:3000`

## 2) Cac API can dung trong Postman
Base URL: `http://localhost:3000/api/v1/auth`

### 2.1 Login
- Method: `POST`
- URL: `/login`
- Body JSON:
```json
{
  "username": "<username>",
  "password": "<password>"
}
```
- Ket qua: tra ve JWT (da ky bang `RS256`).

### 2.2 /me (yeu cau dang nhap)
- Method: `GET`
- URL: `/me`
- Header:
  - `Authorization: Bearer <token_login>`

### 2.3 Change password (yeu cau dang nhap)
- Method: `POST`
- URL: `/change-password`
- Header:
  - `Authorization: Bearer <token_login>`
- Body JSON:
```json
{
  "oldpassword": "<mat_khau_cu>",
  "newpassword": "<mat_khau_moi_manh>"
}
```
- Validate `newpassword`:
  - Toi thieu 8 ky tu
  - Co it nhat 1 chu hoa, 1 chu thuong, 1 so, 1 ky tu dac biet

## 3) Chuyen JWT sang RS256
Da chuyen thanh cong:
- Sign token: `RS256` bang private key
- Verify token: `RS256` bang public key

2 file ma hoa de nop:
- `keys/jwtRS256.key` (private key)
- `keys/jwtRS256.key.pub` (public key)

Luu y: day la cap khoa `RSA 2048-bit` (thuong de bai viet la 2048).

## 4) Anh can nop
Dat anh vao thu muc `evidence/` voi ten goi y:
- `evidence/login-postman.png`
- `evidence/me-postman.png`

Noi dung anh:
1. Anh login: hien request body + response token.
2. Anh /me: hien header Bearer token + response thong tin user.

## 5) Day len GitHub
```powershell
git add .
git commit -m "Add change-password API and migrate JWT to RS256"
git push origin main
```
