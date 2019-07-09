-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2019 at 07:20 AM
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
(1, 'test', 2, '2019-07-05 18:28:31', NULL),
(2, 'test', 2, '2019-07-05 18:28:34', NULL),
(3, 'test', 2, '2019-07-05 18:28:37', NULL),
(4, 'kuching', 1, '2019-07-06 08:51:20', NULL);

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
(1, 1, -8.654, 115.219, NULL, NULL),
(2, 1, -8.487, 115.184, NULL, NULL),
(3, 2, -8.654, 115.219, NULL, NULL),
(4, 2, -8.501, 115.153, NULL, NULL),
(5, 3, -8.654, 115.219, NULL, NULL),
(6, 3, -8.472, 115.186, NULL, NULL),
(7, 3, -8.817, 115.135, NULL, NULL),
(8, 4, 1.50986, 110.364, '2019-07-06 08:51:20', NULL);

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
(5, 'Investment & Advisory', NULL, '2019-07-06 06:20:53');

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
(16, 'Bank DKI', NULL, NULL),
(27, 'Bank Mandiri', NULL, NULL),
(48, 'Bank Sumut', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(8) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
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
(1, -8.654, 115.219, 'Bar', 'Jalan Denpasar', 2, '2019-07-05 19:12:31', NULL),
(5, -3.317, 105.047, 'site2', '', 2, '2019-07-05 19:12:35', NULL),
(23, -6.883, 107.607, 'site 1', 'bandung', 2, '2019-07-05 19:12:39', NULL),
(25, -2.598, 112.562, 'site 3', '', 2, '2019-07-06 11:08:03', NULL);

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
(1, 1, 10, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(2, 1, 11, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(3, 2, 10, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(4, 2, 11, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(5, 3, 12, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(6, 4, 12, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(7, 5, 12, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(8, 6, 12, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(9, 7, 12, 'kilometers', 0, '2019-07-05 19:13:46', NULL),
(10, 8, 12, 'kilometers', 0, '2019-07-06 08:51:20', NULL);

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
(5, 'rizalhrm24@gmail.com', 'Hermawan', 'User', '0a5c2657a27501b02b270ca999b0d412', 1, NULL, NULL);

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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
