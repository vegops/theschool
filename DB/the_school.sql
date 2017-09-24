-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 24, 2017 at 07:02 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `the_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `ID` int(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `role` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `image` varchar(100) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`ID`, `name`, `role`, `phone`, `image`, `email`, `password`) VALUES
(1, 'ethan', 'owner', '0543030400', 'https://www.rentmanager.com/wp-content/uploads/2015/04/icons-Owner_Web_Access-200x200.png', 'er-post@hotmail.com', 'e10adc3949ba59abbe56e057f20f883e'),
(2, 'user', 'manager', '99999999', 'https://typeset-beta.imgix.net/2016/7/3/hp-cae3c33a-4904-4266-8f09-e5ef38f6a33b.jpg', 'user@gmail.com', 'e10adc3949ba59abbe56e057f20f883e'),
(4, 'sailer', 'sales', '84747329247', 'http://www.taylorclark.co/wp-content/uploads/2013/07/salesman.jpg', 'sales@sales.og', '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `ID` int(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`ID`, `name`, `description`, `image`) VALUES
(10010, 'fly with Quidditch  ', 'Ever want to take a course on quidditch? Well now you can! The homework is light and there is a study guide for midterms! ', 'uploads/quidditch.png'),
(10012, 'magical creatures', 'The Department for the Regulation and Control of Magical Creatures of the Ministry of Magic is responsible for overseeing and regulating magical creatures. \r\nIt is divided into three divisions: \r\nthe Beast Division, the Being Division, and the Spirit Division. come learn with us how to handle them when you meet them alive!', 'uploads/71176.jpg'),
(10014, 'History Of Magic', 'Have you ever wanted to delve into Divination, ponder the peculiarities of Potions and discover enchanting creatures? Now you can. We unveil rare books, manuscripts and magical objects from the British Library\'s collection, capturing the traditions of folklore and magic which are at the heart of the Harry Potter stories. Marvel at original drafts and drawings by J.K. Rowling and illustrator Jim Kay, both on display for the first time.', 'uploads/c29af2f1a062afcd534eecb9ce4d3fd0--spell-books-book-covers.jpg'),
(10056, 'Potions', 'Potions is a required subject for students, from first year to fifth year. Potion recipes can be found in many books, including the books the students at Hogwarts use in their classes, but the intricacies of timing, ageing, stirring techniques, and bottling which are much more difficult to learn without the mentoring of the experienced masters.', 'uploads/potions.jpg'),
(10057, 'Baking with Magic', 'Magical baking will take you to a journey into the ovens of the Gringos baking materials and methods.', 'uploads/ethan/untitled-0005-2-Edit.jpg');

-- --------------------------------------------------------

--
-- Stand-in structure for view `course_of_student`
-- (See below for the actual view)
--
CREATE TABLE `course_of_student` (
`name` varchar(20)
,`ID` int(5)
,`student_ID` int(11)
,`description` text
);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `ID` int(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`ID`, `name`, `phone`, `email`, `image`) VALUES
(5001, 'Harry Potter', '0683227588', 'potter@hogwartz.lg', 'http://oud.girlscene.nl/images/library/articles/images01/girlscene/harryyyypotter5.jpg'),
(5005, 'Vizly', '0909737309', 'prince@charming.il', 'uploads/ethan/giphy-facebook_s.jpg'),
(5006, 'Ariel', '2147483647', 'l.mrmd@sea.com', 'uploads/ethan/l-mrmd.jpg'),
(5007, 'Tiger the animal', '0543030403', 'tiger@hogwartz.lg', 'uploads/ethan/download.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `students_courses`
--

CREATE TABLE `students_courses` (
  `student_ID` int(11) NOT NULL,
  `courses_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `students_courses`
--

INSERT INTO `students_courses` (`student_ID`, `courses_ID`) VALUES
(5001, 10010),
(5001, 10056),
(5005, 10012),
(5005, 10014),
(5006, 10010),
(5006, 10012),
(5007, 10010),
(5007, 10012),
(5007, 10014),
(5007, 10056),
(5007, 10057);

-- --------------------------------------------------------

--
-- Structure for view `course_of_student`
--
DROP TABLE IF EXISTS `course_of_student`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `course_of_student`  AS  select `courses`.`name` AS `name`,`courses`.`ID` AS `ID`,`students_courses`.`student_ID` AS `student_ID`,`courses`.`description` AS `description` from (`courses` join `students_courses` on((`courses`.`ID` = `students_courses`.`courses_ID`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `students_courses`
--
ALTER TABLE `students_courses`
  ADD PRIMARY KEY (`student_ID`,`courses_ID`),
  ADD KEY `students` (`student_ID`),
  ADD KEY `courses` (`courses_ID`),
  ADD KEY `student_ID` (`student_ID`,`courses_ID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10058;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5008;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `students_courses`
--
ALTER TABLE `students_courses`
  ADD CONSTRAINT `students_courses_ibfk_1` FOREIGN KEY (`student_ID`) REFERENCES `students` (`ID`),
  ADD CONSTRAINT `students_courses_ibfk_2` FOREIGN KEY (`courses_ID`) REFERENCES `courses` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
