-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2019 at 05:51 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo_onemap`
--

-- --------------------------------------------------------

--
-- Table structure for table `poi`
--

CREATE TABLE `poi` (
  `id` int(11) NOT NULL,
  `type` varchar(35) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `shape` varchar(50) NOT NULL,
  `created_by` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poi`
--

INSERT INTO `poi` (`id`, `type`, `name`, `lat`, `lon`, `region`, `shape`, `created_by`, `active`) VALUES
(1, 'Minimarket', 'Indomaret', '6.78232', '-109.12', 'Where', '0.9292991929', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(35) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role` enum('System Administrator','Admin','User') NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(75) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `role`, `password`, `department`, `active`) VALUES
(1, 'rizal.hermawan@locatorlogic.com', 'Rizal Hermawan', 'Admin', '150fb021c56c33f82eef99253eb36ee1', 'IT Developer', 1),
(2, 'sigit.sasongko@locatorlogic.com', 'Sigit Sasongko', 'Admin', '223a0fa8f15933d622b3c7a13f186027', 'IT Developer', 1),
(3, 'adit@gmail.com', 'Adit', 'User', '3bd862c0aa8fbe46cc60b2343e8d757f', 'Colliers', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `poi`
--
ALTER TABLE `poi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`created_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `poi`
--
ALTER TABLE `poi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `poi`
--
ALTER TABLE `poi`
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
