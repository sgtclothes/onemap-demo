-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2019 at 06:19 AM
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
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `analysis_points`
--

CREATE TABLE `analysis_points` (
  `id` int(11) NOT NULL,
  `analysis_id` int(11) DEFAULT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department`) VALUES
(1, 'Locator Logic'),
(2, 'Residential'),
(3, 'Office'),
(4, 'Industial'),
(5, 'Investment and Advisory');

-- --------------------------------------------------------

--
-- Table structure for table `layer`
--

CREATE TABLE `layer` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `layer`
--

INSERT INTO `layer` (`id`, `name`) VALUES
(16, 'Bank DKI'),
(27, 'Bank Mandiri'),
(48, 'Bank Sumut');

-- --------------------------------------------------------

--
-- Table structure for table `poi`
--

CREATE TABLE `poi` (
  `id` int(11) NOT NULL,
  `type` varchar(35) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `region` varchar(50) NOT NULL,
  `shape` varchar(50) NOT NULL,
  `created_by` int(11) NOT NULL,
  `color` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poi`
--

INSERT INTO `poi` (`id`, `type`, `name`, `lat`, `lon`, `region`, `shape`, `created_by`, `color`) VALUES
(1, 'Minimarket', 'Indomaret', -5.753, 105.713, 'Where', '0.9292991929', 2, '#226AB3'),
(2, 'Restaurant', 'DermagaSeafood', -6.4084, 107.097, 'cikarang', '6384723', 2, '#28B121'),
(3, 'Office', 'Colliers Indonesia', -6.216, 106.82, 'Jakarta', '6384723', 2, '#E4FF00'),
(4, 'Hospital', 'Omni Hospital', -7.156, 106.854, 'Sukabumi', '6384723', 2, '#226AB3'),
(9, 'Office', 'Margo City Office', -6.392, 106.817, 'Depok', '6384723', 1, '#5B6128'),
(16, 'XX', 'QQ', -1.329, 113.886, 'Depok', '6384723', 2, '#F30606'),
(17, 'AA', 'BB', -1.264, 111.513, 'Kalimantan', '3', 2, '#F30606'),
(18, 'CC', 'DD', 1.153, 109.975, 'Kalimantan', '3', 2, '#E110D5'),
(19, 'EE', 'FF', 0.912, 110.897, 'Kalimantan', '3', 2, '#E110D5');

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(11) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`id`, `lat`, `lon`, `name`, `address`, `created_by`) VALUES
(1, -8.654, 115.219, 'Bar', 'Jalan Denpasar', 2),
(5, -3.317, 105.047, 'site2', '', 2),
(23, -6.883, 107.607, 'site 1', 'bandung', 2);

-- --------------------------------------------------------

--
-- Table structure for table `spec_buffer_analysis`
--

CREATE TABLE `spec_buffer_analysis` (
  `id` int(11) NOT NULL,
  `analysis_points_id` int(11) DEFAULT NULL,
  `distance_radius` varchar(50) NOT NULL,
  `unit` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `spec_drive_time_analysis`
--

CREATE TABLE `spec_drive_time_analysis` (
  `id` int(11) NOT NULL,
  `analysis_points_id` int(11) DEFAULT NULL,
  `driving_data` varchar(50) NOT NULL,
  `distance_time` varchar(50) NOT NULL,
  `unit` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(45) NOT NULL,
  `role` enum('System Administrator','Admin','User') NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `role`, `password`, `active`) VALUES
(1, 'system.administrator@locatorlogic.com', 'System Administrator', 'System Administrator', '1b3231655cebb7a1f783eddf27d254ca', 1),
(2, 'rizal.hermawan@locatorlogic.com', 'Rizal Hermawan', 'Admin', '150fb021c56c33f82eef99253eb36ee1', 1),
(3, 'sigit.sasongko@locatorlogic.com', 'Sigit Sasongko', 'Admin', '223a0fa8f15933d622b3c7a13f186027', 1),
(4, 'adit@gmail.com', 'adit', 'User', '3bd862c0aa8fbe46cc60b2343e8d757f', 1),
(5, 'rizalhrm24@gmail.com', 'Hermawan', 'User', '0a5c2657a27501b02b270ca999b0d412', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_department`
--

CREATE TABLE `users_department` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_department`
--

INSERT INTO `users_department` (`id`, `user_id`, `department_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 2),
(5, 4, 3),
(7, 2, 4),
(8, 5, 4),
(9, 5, 5);

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
-- Indexes for table `poi`
--
ALTER TABLE `poi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`created_by`);

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
-- Indexes for table `spec_drive_time_analysis`
--
ALTER TABLE `spec_drive_time_analysis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `analysis_points_id` (`analysis_points_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_department`
--
ALTER TABLE `users_department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analysis`
--
ALTER TABLE `analysis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `analysis_points`
--
ALTER TABLE `analysis_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `poi`
--
ALTER TABLE `poi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `spec_buffer_analysis`
--
ALTER TABLE `spec_buffer_analysis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `spec_drive_time_analysis`
--
ALTER TABLE `spec_drive_time_analysis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users_department`
--
ALTER TABLE `users_department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `analysis`
--
ALTER TABLE `analysis`
  ADD CONSTRAINT `fk_from_user_in_analysis` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `analysis_points`
--
ALTER TABLE `analysis_points`
  ADD CONSTRAINT `fk_from_analysis` FOREIGN KEY (`analysis_id`) REFERENCES `analysis` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `poi`
--
ALTER TABLE `poi`
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `site`
--
ALTER TABLE `site`
  ADD CONSTRAINT `fk_from_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `spec_buffer_analysis`
--
ALTER TABLE `spec_buffer_analysis`
  ADD CONSTRAINT `fk_from_analysis_points` FOREIGN KEY (`analysis_points_id`) REFERENCES `analysis_points` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `spec_drive_time_analysis`
--
ALTER TABLE `spec_drive_time_analysis`
  ADD CONSTRAINT `fk_from_analysis_points_zoku` FOREIGN KEY (`analysis_points_id`) REFERENCES `analysis_points` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `users_department`
--
ALTER TABLE `users_department`
  ADD CONSTRAINT `fk_depart` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
