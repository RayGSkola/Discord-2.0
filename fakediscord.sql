-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 25 apr 2025 kl 00:20
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
  `Id` int(255) NOT NULL,
  `User_Id` int(255) DEFAULT NULL,
  `Friend_Id` int(255) DEFAULT NULL,
  `Status` enum('pending','accepted','blocked') DEFAULT 'pending',
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellstruktur `messages`
--

CREATE TABLE `messages` (
  `Id` int(255) NOT NULL,
  `Sender_Id` int(255) DEFAULT NULL,
  `Reciever_Id` int(255) DEFAULT NULL,
  `Message` text NOT NULL,
  `Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `Id` int(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Displayname` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`Id`, `Username`, `Displayname`, `Email`, `Password`) VALUES
(1, 'Hey', 'Bye', 'ray.gao@skola.taby.se', '$2b$10$UDr7VImBaaZDQUX16bG5/.dDG/bmUe5dRIRoDKH5qg5VKsJU3F8Gy'),
(3, 'Ja', 'Bye', 'Jala@gmail.com', '$2b$10$RdYvRfEMsZtZb3Jq2UkbTezxgUqzDJttDSgPNbTx3wsBn7uk5iEOy'),
(4, 'Yourmom1', 'Sploinker', 'Diddy@gmail.com', '$2b$10$QMSnabsQJ7H7mMi18evZgOBWWWhUKw6vYzP2FZNoUg8GuIXKS.JiC'),
(6, 'Jake', 'Bye', 'Jared@gmail.com', '$2b$10$AGgKjkcDKKzjn54IQdNsEetM42YWQkm80n/a7OK0pteAmGKUE4/Wa'),
(7, 'Jared', 'No', 'Smith@gmail.com', '$2b$10$/Lr3a1aN9yHnoNucMsnx2ez.Upxqf6p1XW9qB.d/zeumr6JPLjbQ.'),
(8, 'Bill', 'Dill', 'Jill@gmail.com', '$2b$10$yvw9AdHSBcpFG25mW1h9U.Oop.3y4kkyf4OV7Yb3f3BdjEiggSNNu'),
(9, 'test', 'Best', 'Krill@gmail.com', '$2b$10$FRqTImix8h4b9Qq1aMqAzeR2bhXWyVPiCXrnBhu.oaA.ZwwGp.3d.'),
(10, 'test1', 'Best', 'Krill1@gmail.com', '$2b$10$tTQ/vP.lpvDCLpZXriBK0uk6MSFD2j4qwUng2tJ1KnteEpP04off6'),
(11, 'test2', 'Best', 'Krill2@gmail.com', '$2b$10$Mo6UCZ0LBIeRBXXhHIPqQ.SLaN.LYkNBaGA/BS8v0X9xlgTuRaVxa'),
(12, 'test3', 'Best', 'Krill3@gmail.com', '$2b$10$Ii41O8lC7SvFFcKgiMkUeOdSgT/rX.09f7ejRoHwUSfVjYtWWAHsu'),
(13, 'test4', 'Best', 'Krill4@gmail.com', '$2b$10$gjXfjqJHRvLk5YkWlj6rVekb2rYibaU0DzVoaqZLOGaSRS9NrPjsK');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User_Id` (`User_Id`),
  ADD KEY `Friend_Id` (`Friend_Id`);

--
-- Index för tabell `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Sender_Id` (`Sender_Id`);

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
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT för tabell `messages`
--
ALTER TABLE `messages`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`Friend_Id`) REFERENCES `users` (`Id`);

--
-- Restriktioner för tabell `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`Sender_Id`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
