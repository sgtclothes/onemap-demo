-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2019 at 02:11 PM
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
(2, 'test', 2, '2019-08-15 02:29:38', '2019-08-15 02:29:38'),
(3, 'sample', 2, '2019-07-16 08:57:44', NULL),
(4, 'analysis', 2, '2019-07-31 07:07:34', NULL),
(5, 'oboe2', 2, '2019-08-12 10:16:37', '2019-08-12 10:16:37'),
(6, 'buffer adm', 2, '2019-08-09 09:35:21', NULL),
(7, 'drive adm', 2, '2019-08-09 10:23:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `analysis_points`
--

CREATE TABLE `analysis_points` (
  `id` int(8) NOT NULL,
  `analysis_id` int(8) DEFAULT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `analysis_points`
--

INSERT INTO `analysis_points` (`id`, `analysis_id`, `lat`, `lon`, `created_at`, `updated_at`) VALUES
(3, 2, -6.882999897003174, 107.60700225830078, '2019-07-11 06:39:23', NULL),
(4, 2, -6.865386009216309, 107.73448181152344, '2019-07-11 06:39:23', NULL),
(5, 3, -6.882999897003174, 107.60700225830078, '2019-07-16 08:57:44', NULL),
(6, 4, -6.406419999999975, 106.85188000000005, '2019-07-31 07:07:34', NULL),
(7, 5, -6.2294443, 106.8378906, '2019-08-07 11:26:51', NULL),
(8, 6, -3.4272082, 103.7617188, '2019-08-09 09:35:21', NULL),
(9, 6, -3.1745993, 103.3847504, '2019-08-09 09:35:21', NULL),
(10, 6, -3.290115, 103.5646515, '2019-08-09 09:35:21', NULL),
(11, 6, -3.4871803, 103.39711, '2019-08-09 09:35:21', NULL),
(12, 6, -3.1063807, 103.852356, '2019-08-09 09:35:21', NULL),
(13, 6, -3.4073309, 104.1654664, '2019-08-09 09:35:21', NULL),
(14, 6, -3.6636474, 103.9155274, '2019-08-09 09:35:21', NULL),
(15, 7, -6.2294443, 107.0136719, '2019-08-09 10:23:25', NULL),
(16, 7, -6.234905, 106.7609863, '2019-08-09 10:23:25', NULL),
(17, 7, -6.1884873, 106.8735962, '2019-08-09 10:23:25', NULL),
(18, 7, -6.2785886, 106.9312744, '2019-08-09 10:23:25', NULL),
(19, 7, -6.147527, 106.7142944, '2019-08-09 10:23:25', NULL),
(20, 5, -6.259904, 106.8438987, '2019-08-12 09:29:11', NULL),
(21, 5, -6.5962915, 106.8020133, '2019-08-12 10:16:37', NULL);

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
(25, -2.598, 112.561996, 'Site', '', 2, '2019-07-07 15:49:16', NULL),
(26, -6.2159633, 106.8180848, 'Wtc sudirrman', '', 2, '2019-07-29 10:51:58', NULL);

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
(5, 3, 9.8, 'kilometers', 0, '2019-07-11 06:39:23', NULL),
(6, 3, 45, 'minutes', 3, '2019-07-11 06:39:23', NULL),
(7, 3, 7, 'kilometers', 3, '2019-07-11 06:39:23', NULL),
(8, 4, 12, 'miles', 0, '2019-07-11 06:39:23', NULL),
(128, 5, 12, 'minutes', 3, '2019-07-16 08:57:44', NULL),
(131, 6, 12.5, 'kilometers', 0, '2019-07-31 07:07:34', NULL),
(176, 7, 11, 'kilometers', 0, '2019-08-07 11:26:51', NULL),
(177, 8, 12, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(178, 9, 9.8, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(179, 10, 20, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(180, 11, 12, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(181, 12, 18, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(182, 13, 15, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(183, 14, 16, 'kilometers', 0, '2019-08-09 09:35:21', NULL),
(184, 15, 7, 'minutes', 3, '2019-08-09 10:23:25', NULL),
(185, 16, 11, 'minutes', 3, '2019-08-09 10:23:25', NULL),
(186, 17, 20, 'kilometers', 3, '2019-08-09 10:23:25', NULL),
(187, 18, 12, 'minutes', 3, '2019-08-09 10:23:25', NULL),
(188, 19, 7, 'minutes', 3, '2019-08-09 10:23:25', NULL),
(197, 20, 22, 'kilometers', 0, '2019-08-12 09:29:11', NULL),
(215, 7, 4, 'minutes', 3, '2019-08-12 10:13:32', NULL),
(216, 20, 14, 'kilometers', 3, '2019-08-12 10:15:04', NULL),
(217, 20, 25, 'kilometers', 0, '2019-08-12 10:16:37', NULL),
(218, 21, 6.5, 'kilometers', 0, '2019-08-12 10:16:37', NULL),
(220, 3, 4, 'miles', 0, '2019-08-15 02:20:25', NULL),
(221, 3, 6, 'minutes', 3, '2019-08-15 02:20:25', NULL),
(222, 3, 7, 'kilometers', 0, '2019-08-15 02:29:38', NULL);

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
  `photo` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `role`, `password`, `photo`, `active`, `created_at`, `updated_at`) VALUES
(1, 'system.administrator@locatorlogic.com', 'System Administrator', 'System Administrator', '1b3231655cebb7a1f783eddf27d254ca', '', 1, NULL, NULL),
(2, 'rizal.hermawan@locatorlogic.com', 'Rizal Hermawan', 'Admin', '150fb021c56c33f82eef99253eb36ee1', 'Photo_Profile_2_logo-user-png-6.jpg', 1, NULL, NULL),
(3, 'sigit.sasongko@locatorlogic.com', 'Sigit Sasongko', 'Admin', '223a0fa8f15933d622b3c7a13f186027', '', 1, NULL, NULL),
(4, 'adit@gmail.com', 'Aditya', 'User', '3bd862c0aa8fbe46cc60b2343e8d757f', '', 1, NULL, '2019-07-24 02:45:46'),
(5, 'rizalhrm24@gmail.com', 'Hermawan', 'User', '0a5c2657a27501b02b270ca999b0d412', '', 1, NULL, NULL),
(6, 'sesillia.pongoh@locatorlogic.com', 'Sesillia Pongoh', 'User', '827ccb0eea8a706c4c34a16891f84e7b', '', 1, '2019-07-29 09:17:18', NULL),
(7, 'mike.broomell@locatorlogic.com', 'Mike Broomell', 'User', '827ccb0eea8a706c4c34a16891f84e7b', '', 1, '2019-08-12 10:41:49', NULL);

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
(9, 5, 5, NULL, NULL),
(10, 6, 1, '2019-07-29 09:17:18', NULL),
(11, 7, 1, '2019-08-12 10:41:49', NULL);

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
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `analysis_points`
--
ALTER TABLE `analysis_points`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `spec_buffer_analysis`
--
ALTER TABLE `spec_buffer_analysis`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users_department`
--
ALTER TABLE `users_department`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
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
