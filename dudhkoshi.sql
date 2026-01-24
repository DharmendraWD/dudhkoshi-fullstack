-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2026 at 05:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dudhkoshi`
--

-- --------------------------------------------------------

--
-- Table structure for table `aboutus`
--

CREATE TABLE `aboutus` (
  `id` int(254) NOT NULL,
  `heading` varchar(254) NOT NULL,
  `longPara` varchar(254) NOT NULL,
  `firstCardHeading` varchar(254) NOT NULL,
  `firstCardPara` varchar(254) NOT NULL,
  `secCardHeading` varchar(254) NOT NULL,
  `secCardPara` varchar(254) NOT NULL,
  `thirdCardHeading` varchar(254) NOT NULL,
  `thirdCardHeading2` varchar(254) NOT NULL,
  `thirdCardPara` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutus`
--

INSERT INTO `aboutus` (`id`, `heading`, `longPara`, `firstCardHeading`, `firstCardPara`, `secCardHeading`, `secCardPara`, `thirdCardHeading`, `thirdCardHeading2`, `thirdCardPara`) VALUES
(1, 'About Our Company', 'Dudhkoshi Hydropower Nepal Pvt. Ltd., established in 2070 B.S. and headquartered in Anamnagar, Kathmandu, is a dedicated hydropower development company committed to advancing Nepal’s clean and sustainable energy future. The company is developing the Dudh', 'Foundation', 'Our company stands on a strong foundation of transparency, accountability, and ethical hydropower development, ensuring every project is planned and executed with integrity. Backed by experienced engineers, consultants, and industry experts, our foundati', 'Where we Operate', 'Dudhkoshi Hydropower Nepal Pvt. Ltd. operates in one of Nepal’s most promising hydropower regions — Solukhumbu District, located in Koshi Province. Our primary operational focus is the development of the Dudhkoshi-2 (Jaleswar) Hydroelectric Project, a 95', 'Capacity', '97.5MW', 'The Dudhkoshi-2 (Jaleswar) Hydroelectric Project is designed as a 95.7 MW peaking run-of-river (PRoR) hydropower project optimized to meet Nepal’s growing demand for reliable and sustainable energy. The project uses a design discharge of 83.5 m³/s and a ');

-- --------------------------------------------------------

--
-- Table structure for table `aboutusimage`
--

CREATE TABLE `aboutusimage` (
  `id` int(254) NOT NULL,
  `fullImage` varchar(254) NOT NULL,
  `firstCardImage` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutusimage`
--

INSERT INTO `aboutusimage` (`id`, `fullImage`, `firstCardImage`) VALUES
(1, '1768985240347-954676847.jpg', '1769268199614-223365660.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `cover_image` varchar(255) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `author_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `cover_image`, `author_id`, `author_name`, `created_at`, `updated_at`) VALUES
(6, 'titlesm asladandakn', '<p>cont<br><br><em>ent|sa</em><br><br><strong><em>heading twdw</em></strong></p><p></p>', '1768836894910-899694516.png', 2, 'bbbb', '2026-01-19 15:34:54', '2026-01-21 16:16:38'),
(9, 'tesiklda kadla dlkada dacngkeslgjs', '<p><span style=\"color: lab(8.11897 0.811279 -12.254);\"><strong>3. What is the scheduled completion timeline?</strong></span></p><p></p><p></p><p></p><p><span style=\"color: rgb(83, 91, 96);\">For<strong> those who are interested in finding random paragraphs, that\'s exactly what this webpage provides. If both a </strong></span><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://randomword.com/\"><strong>random word</strong></a><span style=\"color: rgb(83, 91, 96);\"><strong> and a </strong></span><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://randomword.com/sentence\"><strong>random sentence</strong></a><span style=\"color: rgb(83, 91, 96);\"><strong> aren\'t quite long enough fo</strong>r your needs, then a random paragraph might be the perfect solution. Once you arrive at this page, you\'ll see a ra<em>ndom paragraph. If y</em>ou need another one, all you need to do is click on the \"next paragraph\" button. If you happen to need several random paragraphs all at once, you can use this othe</span></p>', '1768986802917-883444561.jpeg', 2, 'bbbb', '2026-01-21 09:13:22', '2026-01-21 09:13:22'),
(10, ',adn,ad a,da', '<p>adadnada,da</p><p></p><img src=\"https://randomwordgenerator.com/img/picture-generator/57e2dd474f53ae14f1dc8460962e33791c3ad6e04e5074417d2e7ed6954bc7_640.jpg\"><p></p>', '1768986876676-665557366.jpeg', 2, 'bbbb', '2026-01-21 09:14:36', '2026-01-21 09:14:36'),
(11, 'blog ttitle', '<p>dnda dakd ad a</p>', '1769268278249-642624539.jpg', 7, 'Dudhkoshi', '2026-01-24 15:24:38', '2026-01-24 15:24:38');

-- --------------------------------------------------------

--
-- Table structure for table `clientmess`
--

CREATE TABLE `clientmess` (
  `id` int(254) NOT NULL,
  `name` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `mess` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientmess`
--

INSERT INTO `clientmess` (`id`, `name`, `email`, `mess`) VALUES
(2, 'd', 'b@gmail.ocm', 'mksama'),
(3, 'dharmednr', 'da@gmail.com', 'ksnnd'),
(4, 'dda', 'bikeshguptabusiness@gmail.com', 'as'),
(5, 'nam ', 'aayu@gmail.com', 'sa'),
(6, 'sa', 'dharmendrathakur.dev@gmail.com', 'sa'),
(7, 'dharmendra', 'dharmendrathakur.dev@gmail.com', 'asa'),
(8, 'as', 'dharmendrathakur.dev@gmail.com', 'xs'),
(9, 'name', 'bikeshguptabusiness@gmail.com', 'snas');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(254) NOT NULL,
  `ques` varchar(254) NOT NULL,
  `ans` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `ques`, `ans`) VALUES
(1, 'ques', 'ans'),
(2, 'ques', 'ans'),
(4, 'ques changesd 34jfs f', 'akjbnsvfs'),
(5, 'new added', 'ned eqoejqeqoeq'),
(6, 'What is the Aayu Malun Khola Hydropower Project?', 'The Aayu Malun Khola Hydropower Project is a 21 MW run-of-river hydropower facility located in Okhaldhunga and Solukhumbu districts, Koshi Province. The project harnesses the hydrological potential of Malun Khola to generate reliable, clean, and renewabl'),
(7, 'Who is the project developer?', 'The Aayu Malun Khola Hydropower Project is a 21 MW run-of-river hydropower facility located in Okhaldhunga and Solukhumbu districts, Koshi Province. The project harnesses the hydrological potential of Malun Khola to generate reliable, clean, and renewabl'),
(8, 'What is the scheduled completion timeline?', 'What is the scheduled completion timeline?'),
(9, 'What are the key technical specifications of the project?', 'What are the key technical specifications of the project?'),
(10, 'How does the project contribute to local development and national energy security?', 'How does the project contribute to local development and national energy security?');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(254) NOT NULL,
  `image` varchar(254) NOT NULL,
  `title` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `image`, `title`) VALUES
(18, 'uploads/gallery/1768969866312-490987920.jpg', 'nk'),
(19, 'uploads/gallery/1768985519449-549277020.jpeg', '1'),
(20, 'uploads/gallery/1768985526206-355768216.png', '2'),
(21, 'uploads/gallery/1768985533326-403455817.png', '3'),
(22, 'uploads/gallery/1768985542916-19125130.png', '5'),
(23, 'uploads/gallery/1768985556358-579625364.jpeg', '6');

-- --------------------------------------------------------

--
-- Table structure for table `heroimage`
--

CREATE TABLE `heroimage` (
  `id` int(254) NOT NULL,
  `title` varchar(254) NOT NULL,
  `image` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `heroimage`
--

INSERT INTO `heroimage` (`id`, `title`, `image`) VALUES
(22, '2', 'uploads/herosectionimg/1768985001056-406141280.jpeg'),
(23, '3', 'uploads/herosectionimg/1768985009658-36161269.jpeg'),
(25, '5', 'uploads/herosectionimg/1768985052370-301124445.jpeg'),
(26, '6', 'uploads/herosectionimg/1768985058987-165527440.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `herosection`
--

CREATE TABLE `herosection` (
  `id` int(254) NOT NULL,
  `slogan` varchar(254) NOT NULL,
  `description` varchar(254) NOT NULL,
  `btn1Text` varchar(254) NOT NULL,
  `btn1Link` varchar(254) NOT NULL,
  `btn2Text` varchar(254) NOT NULL,
  `btn2Link` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `herosection`
--

INSERT INTO `herosection` (`id`, `slogan`, `description`, `btn1Text`, `btn1Link`, `btn2Text`, `btn2Link`) VALUES
(1, 'Clean energy, unstoppable flow. ', 'Dudhkoshi Hydropower Nepal Pvt. Ltd. is a leading hydropower development company committed to delivering clean, reliable, and sustainable energy for Nepal’s growing power needs. Established with a vision to harness Nepal’s immense hydropower potential, t', 'Gallery', '#gallery', 'About Us', '#about-us');

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

CREATE TABLE `mission` (
  `id` int(254) NOT NULL,
  `heading` varchar(254) NOT NULL,
  `shortpara` varchar(254) NOT NULL,
  `firstCardHeading` varchar(254) NOT NULL,
  `firstCardPara` varchar(254) NOT NULL,
  `secCardHeading` varchar(254) NOT NULL,
  `secCardPara` varchar(254) NOT NULL,
  `thirdCardHeading` varchar(254) NOT NULL,
  `thirdCardPara` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`id`, `heading`, `shortpara`, `firstCardHeading`, `firstCardPara`, `secCardHeading`, `secCardPara`, `thirdCardHeading`, `thirdCardPara`) VALUES
(1, 'Mission & Strategy', 'Deliver reliable renewable energy through sustainable hydropower development for Nepal’s future growth.', 'Deliver Sustainable Clean Energy', 'To develop reliable hydropower projects that contribute to Nepal’s long-term energy security while promoting clean, renewable, and environmentally responsible power generation.', 'Empower Communities & Create Value', 'To support local employment, uplift surrounding communities, and create long-term economic value for stakeholders, partners, and the nation.', 'Build with Excellence & Innovation', 'To adopt modern engineering practices, advanced technologies, and international standards to ensure safe, efficient, and cost-effective project development from design to operation.');

-- --------------------------------------------------------

--
-- Table structure for table `missionimage`
--

CREATE TABLE `missionimage` (
  `id` int(254) NOT NULL,
  `img1` varchar(254) NOT NULL,
  `img2` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `missionimage`
--

INSERT INTO `missionimage` (`id`, `img1`, `img2`) VALUES
(1, '1768985329138-881098881.jpg', '1768985339793-508132409.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `other`
--

CREATE TABLE `other` (
  `id` int(254) NOT NULL,
  `a` varchar(254) NOT NULL,
  `b` varchar(254) NOT NULL,
  `c` varchar(254) NOT NULL,
  `d` varchar(254) NOT NULL,
  `developedby` varchar(254) NOT NULL,
  `copyright` varchar(254) NOT NULL,
  `location` varchar(254) NOT NULL,
  `mobNo2` varchar(254) NOT NULL,
  `mobNo` varchar(254) NOT NULL,
  `insta` varchar(254) NOT NULL,
  `address` varchar(254) NOT NULL,
  `yt` varchar(254) NOT NULL,
  `twitter` varchar(254) NOT NULL,
  `fb` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `other`
--

INSERT INTO `other` (`id`, `a`, `b`, `c`, `d`, `developedby`, `copyright`, `location`, `mobNo2`, `mobNo`, `insta`, `address`, `yt`, `twitter`, `fb`, `email`) VALUES
(1, 'Meet Our Talented Team', 'We are not just Team we are more than Team', 'Sustainable Energy for a Brighter Tomorrow.', 'We harness the pure, natural flow of Nepal’s rivers to deliver reliable, sustainable and environmentally friendly hydro-electric power. Our mission is to light homes, empower communities, and build a cleaner future for Nepal.', 'Aayu Softtech', '© 2026 Dudhkoshi', 'sakla', '0097714102710', '0097714102710', 'https://instagram.com/company', 'Anamnagar-29, Kathmandu, Nepaln', 'https://youtube.com/company', 'https://twitter.com/company', 'https://facebook.com/company', '');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(254) NOT NULL,
  `dp` varchar(254) NOT NULL,
  `description` varchar(254) NOT NULL,
  `designation` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `dp`, `description`, `designation`) VALUES
(11, 'nam', '1769071618215-802955012.png', 'description', 'designaion'),
(12, 'nam', '1769071620280-411435707.png', 'description', 'designaion'),
(13, 'sasa', '1769081628739-842524889.jpg', 'asas', 'sasas'),
(14, 'name', '1769268240957-769680970.jpg', 'desc', 'desintion');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `mobNo` int(11) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `password` varchar(254) NOT NULL,
  `image` varchar(254) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `gender`, `mobNo`, `isAdmin`, `password`, `image`, `created_at`) VALUES
(2, 'bbbb', 'ecxample@gmail.com', 'Male', 98, 0, '$2b$10$TuojROajiMBSfYZ4ULxg8.UmEqmK9E/Ks1Pqxadmpt0b1n63uQ8YS', '1768381459226-111373826.jpg', '2026-01-14 09:04:19'),
(7, 'Dudhkoshi', 'aayududhkoshi@gmail.com', 'Male', 977, 1, '$2b$10$JRs4GwMbeUrIB05x9jHcPODoxRcwIuVJLNSelOYYEugXXXAX7unWe', '1769087698504-839578131.png', '2026-01-22 13:14:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aboutus`
--
ALTER TABLE `aboutus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aboutusimage`
--
ALTER TABLE `aboutusimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `clientmess`
--
ALTER TABLE `clientmess`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `heroimage`
--
ALTER TABLE `heroimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `herosection`
--
ALTER TABLE `herosection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `missionimage`
--
ALTER TABLE `missionimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `other`
--
ALTER TABLE `other`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aboutus`
--
ALTER TABLE `aboutus`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aboutusimage`
--
ALTER TABLE `aboutusimage`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `clientmess`
--
ALTER TABLE `clientmess`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `heroimage`
--
ALTER TABLE `heroimage`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `herosection`
--
ALTER TABLE `herosection`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `missionimage`
--
ALTER TABLE `missionimage`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `other`
--
ALTER TABLE `other`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
