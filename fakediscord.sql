-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 16 maj 2025 kl 01:10
-- Serverversion: 10.4.32-MariaDB
-- PHP-version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fakediscord`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `user1_Username` varchar(255) NOT NULL,
  `user2_Username` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `friends`
--

INSERT INTO `friends` (`id`, `user1_Username`, `user2_Username`, `created_at`) VALUES
(11, 'RayAdmin2', 'Jared1234', '2025-05-15 18:26:03'),
(12, 'Jared123456', 'RayAdmin2', '2025-05-15 19:49:33'),
(13, 'Admin9', 'RayAdmin2', '2025-05-15 22:48:07');

-- --------------------------------------------------------

--
-- Tabellstruktur `friend_requests`
--

CREATE TABLE `friend_requests` (
  `id` int(11) NOT NULL,
  `sender_Username` varchar(255) NOT NULL,
  `receiver_Username` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','accepted','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `friend_requests`
--

INSERT INTO `friend_requests` (`id`, `sender_Username`, `receiver_Username`, `created_at`, `status`) VALUES
(35, 'RayAdmin2', 'Jared1234', '2025-05-15 18:25:53', 'accepted'),
(36, 'RayAdmin2', 'Jared1234', '2025-05-15 18:25:53', 'accepted'),
(37, 'Jared123456', 'RayAdmin2', '2025-05-15 19:49:29', 'accepted'),
(38, 'Jared123456', 'RayAdmin2', '2025-05-15 19:49:29', 'accepted'),
(47, 'RayAdmin2', 'Admin2', '2025-05-15 22:42:55', 'pending'),
(48, 'RayAdmin2', 'Admin2', '2025-05-15 22:42:55', 'pending'),
(49, 'Admin9', 'RayAdmin2', '2025-05-15 22:44:29', 'accepted'),
(50, 'Admin9', 'RayAdmin2', '2025-05-15 22:44:29', 'accepted'),
(51, 'RayAdmin2', 'Admin10', '2025-05-15 22:52:22', 'pending'),
(52, 'RayAdmin2', 'Admin10', '2025-05-15 22:52:22', 'pending'),
(53, 'Admin11', 'Jared12345', '2025-05-15 23:06:21', 'pending'),
(54, 'Admin11', 'Jared12345', '2025-05-15 23:06:21', 'pending');

-- --------------------------------------------------------

--
-- Tabellstruktur `messages`
--

CREATE TABLE `messages` (
  `Id` int(255) NOT NULL,
  `Sender_Username` varchar(255) DEFAULT NULL,
  `Receiver_Username` varchar(255) DEFAULT NULL,
  `Message` text NOT NULL,
  `Time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `messages`
--

INSERT INTO `messages` (`Id`, `Sender_Username`, `Receiver_Username`, `Message`, `Time`) VALUES
(49, 'RayAdmin2', 'Jared1234', 'Hey', '2025-05-15 21:14:46'),
(50, 'RayAdmin2', 'Admin9', 'Hey', '2025-05-16 00:49:09');

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `Id` int(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Displayname` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `isBanned` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`Id`, `Username`, `Displayname`, `Email`, `Password`, `isAdmin`, `isBanned`) VALUES
(1, 'Hey', 'Bye', 'ray.gao@skola.taby.se', '$2b$10$UDr7VImBaaZDQUX16bG5/.dDG/bmUe5dRIRoDKH5qg5VKsJU3F8Gy', 0, 0),
(3, 'Ja', 'Bye', 'Jala@gmail.com', '$2b$10$RdYvRfEMsZtZb3Jq2UkbTezxgUqzDJttDSgPNbTx3wsBn7uk5iEOy', 0, 0),
(4, 'Yourmom1', 'Sploinker', 'Diddy@gmail.com', '$2b$10$QMSnabsQJ7H7mMi18evZgOBWWWhUKw6vYzP2FZNoUg8GuIXKS.JiC', 0, 0),
(6, 'Jake', 'Bye', 'Jared@gmail.com', '$2b$10$AGgKjkcDKKzjn54IQdNsEetM42YWQkm80n/a7OK0pteAmGKUE4/Wa', 0, 0),
(7, 'Jared', 'No', 'Smith@gmail.com', '$2b$10$/Lr3a1aN9yHnoNucMsnx2ez.Upxqf6p1XW9qB.d/zeumr6JPLjbQ.', 0, 0),
(8, 'Bill', 'Dill', 'Jill@gmail.com', '$2b$10$yvw9AdHSBcpFG25mW1h9U.Oop.3y4kkyf4OV7Yb3f3BdjEiggSNNu', 0, 0),
(9, 'test', 'Best', 'Krill@gmail.com', '$2b$10$FRqTImix8h4b9Qq1aMqAzeR2bhXWyVPiCXrnBhu.oaA.ZwwGp.3d.', 0, 0),
(10, 'test1', 'Best', 'Krill1@gmail.com', '$2b$10$tTQ/vP.lpvDCLpZXriBK0uk6MSFD2j4qwUng2tJ1KnteEpP04off6', 0, 0),
(11, 'test2', 'Best', 'Krill2@gmail.com', '$2b$10$Mo6UCZ0LBIeRBXXhHIPqQ.SLaN.LYkNBaGA/BS8v0X9xlgTuRaVxa', 0, 0),
(12, 'test3', 'Best', 'Krill3@gmail.com', '$2b$10$Ii41O8lC7SvFFcKgiMkUeOdSgT/rX.09f7ejRoHwUSfVjYtWWAHsu', 0, 0),
(13, 'test4', 'Best', 'Krill4@gmail.com', '$2b$10$gjXfjqJHRvLk5YkWlj6rVekb2rYibaU0DzVoaqZLOGaSRS9NrPjsK', 0, 0),
(15, 'Jared123', 'Jamal', 'Jared123@gmail.com', '$2b$10$GJ14nwfW9ohiWCfxeLg3j.oPzcdUaWiYjn5V58k/Cx2XRgcyNXqNK', 0, 0),
(16, 'Jared1234', 'Jamal', 'Jared1234@gmail.com', '$2b$10$KFl9nl372CuMUcRvDvjdnOTa/OcbibdhX.t4j3UkHyMu1ThdRH9Qi', 0, 1),
(17, 'Jared12345', 'Jared12345', 'Jared12345@gmail.com', '$2b$10$TOF6/yzqp3BEd8svgFjKHegzdpkuhDXMVJ.W/U2AXNweWtc2ftnvG', 0, 0),
(18, 'RayAdmin', 'RayAdmin', 'raygao90@gmail.com', '$2b$10$WIreGScyaCUn6ofVPSikiuj364jYse8qvvhZQwEmi3yvTAiN37cP2', 0, 0),
(20, 'RayAdmin2', 'RayAdmin2', 'raygao91@gmail.com', '$2b$10$YuFIdTBvesBmaGVdQ6AeMe36eLIxKZbQohByv/8fwJyZULqc/ihT2', 1, 0),
(21, 'RayAdmin3', 'RayAdmin3', 'ray.gao1@skola.taby.se', '$2b$10$.IJK9Msgp0dEmlgdRr3t6.LuhEYyE9yPY4y7dpEm6a8PJ2YywKCP2', 0, 0),
(22, 'Jared123456', 'Jared123456', 'Jared123456@gmail.com', '$2b$10$F2AwvJ.InIl3wvVphDLileZ7.E3k87saiyuj16L9tvHOkf77q1ztG', 0, 1),
(23, 'Jared12349', 'Sploinker', 'Jared12349@gmail.com', '$2b$10$wwHPa02P16IlonGSDf2XwugX3hFvERtSbNF3vCwGGUyWAallovN.m', 0, 0),
(24, 'RayAdmin4', 'RayAdmin4', 'raygao94@gmail.com', '$2b$10$GgQOmRm8YtGktKx3xCYl5evCkFRDcKaXjDpcKmK.ykSSvB6LB7.Sa', 0, 0),
(25, 'Admin1', 'Admin1', 'Admin@gmail.com', '$2b$10$ExvOeCALHF0HALEGkZU3keyBW3QSad5hEnxM1Eqg/OpeC7S/UZxem', 0, 0),
(26, 'Admin2', 'Admin2', 'Admin2@gmail.com', '$2b$10$LKSqJgV26IeIIquIktLZ9uTf2qicosSje1xmWDD295f3O93iAXujK', 0, 0),
(27, 'RayAdmin5', 'RayAdmin5', 'raygao95@gmail.com', '$2b$10$YTvRZe4pDjnDs2uXomVcZ.x.2IZ8CbwVh47b5gA00uPDpxH/BzCxO', 0, 0),
(28, 'Admin5', 'Admin5', 'Admin5@gmail.com', '$2b$10$n3OKXvN3Py/KOfAVHIAKJu.TY/mATovDDw4/IL4/caAcxLn6bl3YO', 0, 0),
(29, 'Admin6', 'Admin6', 'Admin6@gmail.com', '$2b$10$.hNrIy4oTcERNuI/ewuV7ut/d71vhh/czew5eAPDpPl8vhvwO.CvW', 0, 0),
(30, 'Admin9', 'Admin9', 'Admin9@gmail.com', '$2b$10$5r8OkTnaZDmbUVIaL4MXQemCWFOisirNSc7UXSys8zZHu6vWnSDrO', 0, 1),
(31, 'Admin10', 'Admin10', 'Admin10@gmail.com', '$2b$10$H20UNmfTaNrd/amz0QEZCu8TutBWzgFANlXrLsZxncYPClDs/oh1O', 0, 0),
(32, 'Admin11', 'Admin11', 'Admin11@gmail.com', '$2b$10$rVZhoVmW9jI4o9ZTxPdQSO4Jzp2bLfFtJdVLlTKRK1CCSmIshomLy', 0, 0);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1_Username` (`user1_Username`),
  ADD KEY `user2_Username` (`user2_Username`);

--
-- Index för tabell `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_Username` (`sender_Username`),
  ADD KEY `receiver_Username` (`receiver_Username`);

--
-- Index för tabell `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Sender_Id` (`Sender_Username`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT för tabell `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT för tabell `messages`
--
ALTER TABLE `messages`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user1_Username`) REFERENCES `users` (`Username`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`user2_Username`) REFERENCES `users` (`Username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
