-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 07, 2023 lúc 05:27 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ytb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `interacts`
--

CREATE TABLE `interacts` (
  `MaTT` int(10) NOT NULL,
  `MaVD` int(10) NOT NULL,
  `Username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Type` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Title` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `PostTime` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `interacts`
--

INSERT INTO `interacts` (`MaTT`, `MaVD`, `Username`, `Type`, `Title`, `PostTime`) VALUES
(25, 11, 'nguyenquangmeo', 'Like', 'Like', '1691409843555'),
(26, 11, 'nguyenquangmeo', 'Save', 'Save', '1691410019608');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`Username`, `Password`) VALUES
('nguyenquangmeo', '12345'),
('nguyenvana', '12345');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `videos`
--

CREATE TABLE `videos` (
  `MaVD` int(10) NOT NULL,
  `TenVD` varchar(100) NOT NULL,
  `Hinh` varchar(500) NOT NULL,
  `Theloai` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `URL` varchar(500) NOT NULL,
  `PostTime` varchar(100) NOT NULL,
  `LuotXem` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `videos`
--

INSERT INTO `videos` (`MaVD`, `TenVD`, `Hinh`, `Theloai`, `Username`, `URL`, `PostTime`, `LuotXem`) VALUES
(9, 'GTA V Midnight City trailer', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Thumbnails%2FImage-1691408784260?alt=media&token=b0e55e78-865b-49c8-8954-8ffe00293567', 'Trò Chơi', 'nguyenquangmeo', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Videos%2FVideo-1691408784260?alt=media&token=9a2e14e9-0de1-46d0-a476-18c77f06d069', '1691408910994', 4),
(10, 'øneheart x reidenshi snowfall', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Thumbnails%2FImage-1691408975106?alt=media&token=c8a00fc3-ae4d-41a5-8d4a-604203d7cebc', 'Âm Nhạc', 'nguyenvana', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Videos%2FVideo-1691408975106?alt=media&token=2641bece-d6ee-4d05-9096-7eb8782d1d3c', '1691409138714', 0),
(11, 'Lewis Capaldi Before You Go Lyrics', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Thumbnails%2FImage-1691409338735?alt=media&token=2b63aa0c-2768-4b73-8f19-f6438823f103', 'Âm Nhạc', 'nguyenvana', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Videos%2FVideo-1691409338735?alt=media&token=7f20e2d3-d902-4207-840b-bff6eb8984ce', '1691409459511', 2),
(12, 'Red Dead Redemption 2: Official Trailer #3', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Thumbnails%2FImage-1691409699112?alt=media&token=c8f27cde-4c6b-4592-933f-d4f22dc75d87', 'Trò Chơi', 'nguyenquangmeo', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Videos%2FVideo-1691409699112?alt=media&token=95ff058b-dcfc-4428-a7d1-00295ad72508', '1691409811035', 0),
(13, 'The Incredible Hulk #Clip: Hulk VS Abomination', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Thumbnails%2FImage-1691422233031?alt=media&token=4483cc65-98e2-4bc6-b852-d1ed96875a18', 'Giải Trí', 'nguyenquangmeo', 'https://firebasestorage.googleapis.com/v0/b/fakestorage-d6cfd.appspot.com/o/Videos%2FVideo-1691422233031?alt=media&token=76afca58-4b9b-474e-aa9b-e061138885bf', '1691422483067', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `interacts`
--
ALTER TABLE `interacts`
  ADD PRIMARY KEY (`MaTT`),
  ADD KEY `MaVD` (`MaVD`),
  ADD KEY `Username` (`Username`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Username`);

--
-- Chỉ mục cho bảng `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`MaVD`),
  ADD KEY `Username` (`Username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `interacts`
--
ALTER TABLE `interacts`
  MODIFY `MaTT` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `videos`
--
ALTER TABLE `videos`
  MODIFY `MaVD` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `interacts`
--
ALTER TABLE `interacts`
  ADD CONSTRAINT `interacts_ibfk_1` FOREIGN KEY (`MaVD`) REFERENCES `videos` (`MaVD`),
  ADD CONSTRAINT `interacts_ibfk_2` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`);

--
-- Các ràng buộc cho bảng `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
