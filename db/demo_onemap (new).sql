-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2019 at 06:03 AM
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
-- Table structure for table `analysis`
--

CREATE TABLE `analysis` (
  `id` int(8) NOT NULL,
  `name` varchar(75) CHARACTER SET latin1 NOT NULL,
  `created_by` int(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `analysis`
--

INSERT INTO `analysis` (`id`, `name`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'sangkuriang', 1, '2019-07-07 16:06:33', NULL),
(2, 'analysis', 1, '2019-07-07 18:47:38', NULL),
(3, 'test', 1, '2019-07-08 04:29:40', NULL),
(4, 'sample', 2, '2019-07-08 09:36:54', NULL),
(5, 'test', 2, '2019-07-09 02:35:21', NULL),
(6, 'test', 2, '2019-07-09 02:40:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `analysis_points`
--

CREATE TABLE `analysis_points` (
  `id` int(8) NOT NULL,
  `analysis_id` int(8) DEFAULT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `analysis_points`
--

INSERT INTO `analysis_points` (`id`, `analysis_id`, `lat`, `lon`, `created_at`, `updated_at`) VALUES
(1, 1, -6.883, 107.607, '2019-07-07 16:06:33', NULL),
(2, 2, -2.598, 112.562, '2019-07-07 18:47:38', NULL),
(3, 3, -2.598, 112.562, '2019-07-08 04:29:40', NULL),
(4, 3, -6.883, 107.607, '2019-07-08 04:29:40', NULL),
(5, 4, -1.96085, 120.961, '2019-07-08 09:36:54', NULL),
(6, 4, -6.56307, 121.444, '2019-07-08 09:36:54', NULL),
(7, 5, -2.598, 112.562, '2019-07-09 02:35:21', NULL),
(8, 6, -2.598, 112.562, '2019-07-09 02:40:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(2) NOT NULL,
  `department` varchar(50) CHARACTER SET latin1 NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department`, `created_at`, `updated_at`) VALUES
(1, 'Locator Logic', NULL, NULL),
(2, 'Residential', NULL, NULL),
(3, 'Office', NULL, NULL),
(4, 'Industial', NULL, NULL),
(5, 'Investment & Advisory', '2019-07-06 06:20:53', '2019-07-06 06:20:53');

-- --------------------------------------------------------

--
-- Table structure for table `layer`
--

CREATE TABLE `layer` (
  `id` int(3) NOT NULL,
  `name` varchar(40) CHARACTER SET latin1 NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `layer`
--

INSERT INTO `layer` (`id`, `name`, `created_at`, `updated_at`) VALUES
(4, 'Apotek K24', '2019-07-08 03:32:16', NULL),
(5, 'Apotek Kimia Farma', '2019-07-08 03:32:16', NULL),
(7, 'Apotek Watsons', '2019-07-08 03:32:39', NULL),
(16, 'Bank DKI', NULL, NULL),
(27, 'Bank Mandiri', NULL, NULL),
(48, 'Bank Sumut', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(8) NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 NOT NULL,
  `address` text CHARACTER SET latin1 NOT NULL,
  `created_by` int(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`id`, `lat`, `lon`, `name`, `address`, `created_by`, `created_at`, `updated_at`) VALUES
(1, -8.65418, 115.218857, 'Resto Denpasar', 'Jalan Durian', 2, '2019-07-07 15:44:09', NULL),
(5, -3.317, 105.046997, 'Wisata Danau', '', 2, '2019-07-07 15:46:06', NULL),
(23, -6.883, 107.607002, 'Cafe Sangkuriang', 'Jalan Sangkuriang', 2, '2019-07-07 15:47:47', NULL),
(25, -2.598, 112.561996, 'Site', '', 2, '2019-07-07 15:49:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spec_buffer_analysis`
--

CREATE TABLE `spec_buffer_analysis` (
  `id` int(8) NOT NULL,
  `analysis_points_id` int(8) DEFAULT NULL,
  `distance` float NOT NULL,
  `unit` varchar(15) CHARACTER SET latin1 NOT NULL,
  `options` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `spec_buffer_analysis`
--

INSERT INTO `spec_buffer_analysis` (`id`, `analysis_points_id`, `distance`, `unit`, `options`, `created_at`, `updated_at`) VALUES
(5, 1, 1, 'kilometers', 0, '2019-07-07 16:06:33', NULL),
(21, 2, 257, 'kilometers', 0, '2019-07-07 18:47:38', NULL),
(22, 2, 10, 'minutes', 3, '2019-07-07 18:47:38', NULL),
(23, 3, 9.8, 'kilometers', 0, '2019-07-08 04:29:40', NULL),
(24, 3, 10, 'kilometers', 0, '2019-07-08 04:29:40', NULL),
(25, 4, 9.8, 'kilometers', 0, '2019-07-08 04:29:40', NULL),
(26, 4, 10, 'kilometers', 0, '2019-07-08 04:29:40', NULL),
(31, 5, 2, 'kilometers', 0, '2019-07-08 09:36:54', NULL),
(32, 6, 2, 'kilometers', 0, '2019-07-08 09:36:54', NULL),
(39, 7, 10, 'kilometers', 0, '2019-07-09 02:35:21', NULL),
(40, 8, 10, 'kilometers', 0, '2019-07-09 02:40:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 NOT NULL,
  `name` varchar(45) CHARACTER SET latin1 NOT NULL,
  `role` enum('System Administrator','Admin','User') CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `role`, `password`, `active`, `created_at`, `updated_at`) VALUES
(1, 'system.administrator@locatorlogic.com', 'System Administrator', 'System Administrator', '1b3231655cebb7a1f783eddf27d254ca', 1, NULL, NULL),
(2, 'rizal.hermawan@locatorlogic.com', 'Rizal Hermawan', 'Admin', '150fb021c56c33f82eef99253eb36ee1', 1, NULL, NULL),
(3, 'sigit.sasongko@locatorlogic.com', 'Sigit Sasongko', 'Admin', '223a0fa8f15933d622b3c7a13f186027', 1, NULL, NULL),
(4, 'adit@gmail.com', 'adit', 'User', '3bd862c0aa8fbe46cc60b2343e8d757f', 0, NULL, '2019-07-06 06:51:31'),
(5, 'rizalhrm24@gmail.com', 'Hermawan', 'User', '0a5c2657a27501b02b270ca999b0d412', 1, NULL, NULL),
(6, 'sesillia.pongoh@locatorlogic.com', 'Sessilia Pongoh', 'System Administrator', '202cb962ac59075b964b07152d234b70', 1, '2019-07-09 04:03:35', NULL),
(7, 'mikebrommel@locatorlogic.com', 'Mike Brommel', 'System Administrator', '202cb962ac59075b964b07152d234b70', 1, '2019-07-09 04:03:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_department`
--

CREATE TABLE `users_department` (
  `id` int(5) NOT NULL,
  `user_id` int(4) DEFAULT NULL,
  `department_id` int(2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_department`
--

INSERT INTO `users_department` (`id`, `user_id`, `department_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 1, NULL, NULL),
(3, 3, 1, NULL, NULL),
(4, 4, 2, NULL, NULL),
(5, 4, 3, NULL, NULL),
(7, 2, 4, NULL, NULL),
(8, 5, 4, NULL, NULL),
(9, 5, 5, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analysis`
--
ALTER TABLE `analysis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `analysis_points`
--
ALTER TABLE `analysis_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `analysis_id` (`analysis_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `layer`
--
ALTER TABLE `layer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `spec_buffer_analysis`
--
ALTER TABLE `spec_buffer_analysis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `analysis_points_id` (`analysis_points_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `users_department`
--
ALTER TABLE `users_department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analysis`
--
ALTER TABLE `analysis`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `analysis_points`
--
ALTER TABLE `analysis_points`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `spec_buffer_analysis`
--
ALTER TABLE `spec_buffer_analysis`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users_department`
--
ALTER TABLE `users_department`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `analysis`
--
ALTER TABLE `analysis`
  ADD CONSTRAINT `fk_from_user_in_analysis` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `analysis_points`
--
ALTER TABLE `analysis_points`
  ADD CONSTRAINT `fk_from_analysis` FOREIGN KEY (`analysis_id`) REFERENCES `analysis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `site`
--
ALTER TABLE `site`
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `spec_buffer_analysis`
--
ALTER TABLE `spec_buffer_analysis`
  ADD CONSTRAINT `fk_from_analysis_points` FOREIGN KEY (`analysis_points_id`) REFERENCES `analysis_points` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_department`
--
ALTER TABLE `users_department`
  ADD CONSTRAINT `fk_users_department_to_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_department_to_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
