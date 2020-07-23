-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2018 at 02:18 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;


--
-- Database: `bidding`
--
-- --------------------------------------------------------

--
-- Table structure for table `bidorder`
--

CREATE TABLE `bidorder` (
  `bId` int(11) NOT NULL,
  `bidBy` varchar(255) NOT NULL,
  `bidProj` varchar(255) NOT NULL,
  `bidPrice` varchar(255) NOT NULL,
  `actionBy` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bidorder`
--

INSERT INTO `bidorder` (`bId`, `bidBy`, `bidProj`, `bidPrice`, `actionBy`) VALUES
(1, '2', '2', '1100', 'Reject');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `Id` int(11) NOT NULL,
  `projTitle` varchar(255) NOT NULL,
  `projDesc` longtext NOT NULL,
  `Price` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`Id`, `projTitle`, `projDesc`, `Price`) VALUES
(1, 'Test Project', 'This is just for test Peoject', '200'),
(2, 'Test Project 2', 'This is just for test Peoject', '1200'),
(3, 'Test Project 3', 'This is just for test Peoject', '1500');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `firstName`, `lastName`, `email`, `contact`, `role`) VALUES
(1, 'admin', '$2b$05$ZRv6jDCqZNZcez05jkogZeYbERXjTNH3UT5V97BOwIf9BLQ8NmtR.', 'admin', 'new', 'admin@gmail.com', '123455', '1'),
(2, 'test', '$2b$05$I5g59pVrQt0Fq5ehxhmeKeAdlelE6nlnXB.Czlbjh6YYsXPSFyO0O', 'test', 'new', 'test@gmail.com', '1235678', '3'),
(3, 'provider', '$2b$05$YWurLrlTYwiIBy9iys31pu7KSO/ESidmN5AC..ekaPlQ7E4CKaxXa', 'Bidder', 'Bider', 'bidder@gmail.com', '65456465456', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bidorder`
--
ALTER TABLE `bidorder`
  ADD PRIMARY KEY (`bId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bidorder`
--
ALTER TABLE `bidorder`
  MODIFY `bId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
