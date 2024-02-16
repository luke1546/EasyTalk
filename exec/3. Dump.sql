-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s10p12b307
-- ------------------------------------------------------
-- Server version	5.6.47.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alarms`
--

DROP TABLE IF EXISTS `alarms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarms` (
  `alarmId` int(11) NOT NULL AUTO_INCREMENT,
  `requesterId` bigint(20) NOT NULL,
  `receiverId` bigint(20) NOT NULL,
  `statusCode` varchar(20) NOT NULL,
  `alarmTime` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`alarmId`),
  KEY `FK_users_TO_alarms_1` (`requesterId`),
  KEY `FK_users_TO_alarms_2` (`receiverId`),
  KEY `FK_status_TO_alarms_1` (`statusCode`),
  CONSTRAINT `FK_status_TO_alarms_1` FOREIGN KEY (`statusCode`) REFERENCES `status` (`statusCode`),
  CONSTRAINT `FK_users_TO_alarms_1` FOREIGN KEY (`requesterId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_alarms_2` FOREIGN KEY (`receiverId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `artistId` int(11) NOT NULL AUTO_INCREMENT,
  `artistName` varchar(63) NOT NULL,
  `artistImageUri` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`artistId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attendances`
--

DROP TABLE IF EXISTS `attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendances` (
  `attendanceId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `attendanceDate` date DEFAULT NULL,
  PRIMARY KEY (`attendanceId`),
  UNIQUE KEY `userId` (`userId`,`attendanceDate`),
  KEY `FK_users_TO_attendances_1` (`userId`),
  CONSTRAINT `FK_users_TO_attendances_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `feedId` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `content` varchar(300) NOT NULL,
  `registrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`commentId`),
  KEY `FK_feeds_TO_comments_1` (`feedId`),
  KEY `FK_users_TO_comments_1` (`userId`),
  CONSTRAINT `FK_feeds_TO_comments_1` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`feedId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_comments_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feed_images`
--

DROP TABLE IF EXISTS `feed_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_images` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `feedId` int(11) NOT NULL,
  `feedImageUri` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`imageId`),
  KEY `FK_feeds_TO_post_images_1` (`feedId`),
  CONSTRAINT `FK_feeds_TO_post_images_1` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`feedId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeds` (
  `feedId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `content` varchar(500) NOT NULL,
  `registrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`feedId`),
  KEY `FK_users_TO_feeds_1` (`userId`),
  CONSTRAINT `FK_users_TO_feeds_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group_events`
--

DROP TABLE IF EXISTS `group_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_events` (
  `eventId` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `eventName` varchar(20) NOT NULL,
  `eventDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`eventId`),
  KEY `FK_groups_TO_group_events_1` (`groupId`),
  CONSTRAINT `FK_groups_TO_group_events_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`groupId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `group_relationships`
--

DROP TABLE IF EXISTS `group_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_relationships` (
  `userId` bigint(20) NOT NULL,
  `groupId` int(11) NOT NULL,
  `role` varchar(20) NOT NULL,
  UNIQUE KEY `userId` (`userId`,`groupId`),
  KEY `FK_groups_TO_group_relationships_1` (`groupId`),
  CONSTRAINT `FK_groups_TO_group_relationships_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`groupId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_group_relationships_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(6) DEFAULT NULL,
  `groupName` varchar(20) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `limitCount` int(11) DEFAULT NULL,
  `groupDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `targetCycle` varchar(10) DEFAULT NULL,
  `targetTime` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`groupId`),
  CONSTRAINT `CHK_LimitCount` CHECK (1 <= `limitCount` and `limitCount` <= 50)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hearts`
--

DROP TABLE IF EXISTS `hearts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hearts` (
  `feedId` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY (`feedId`,`userId`),
  KEY `FK_users_TO_hearts_1` (`userId`),
  CONSTRAINT `FK_feeds_TO_hearts_1` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`feedId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_hearts_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lyric_sentence`
--

DROP TABLE IF EXISTS `lyric_sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lyric_sentence` (
  `lyricId` int(11) NOT NULL,
  `sentenceId` int(11) NOT NULL,
  PRIMARY KEY (`lyricId`,`sentenceId`),
  KEY `sentenceId` (`sentenceId`),
  CONSTRAINT `lyric_sentence_ibfk_1` FOREIGN KEY (`lyricId`) REFERENCES `lyrics` (`lyricId`),
  CONSTRAINT `lyric_sentence_ibfk_2` FOREIGN KEY (`sentenceId`) REFERENCES `sentences` (`sentenceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lyrics`
--

DROP TABLE IF EXISTS `lyrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lyrics` (
  `lyricId` int(11) NOT NULL AUTO_INCREMENT,
  `musicId` int(11) NOT NULL,
  `lyric` varchar(500) NOT NULL,
  `meaning` varchar(255) NOT NULL,
  `startOffsetMs` int(11) NOT NULL,
  `durationMs` int(11) NOT NULL,
  `lyricAudioUri` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lyricId`),
  KEY `FK_music_TO_lyrics_1` (`musicId`),
  CONSTRAINT `FK_music_TO_lyrics_1` FOREIGN KEY (`musicId`) REFERENCES `musics` (`musicId`)
) ENGINE=InnoDB AUTO_INCREMENT=641 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `content` varchar(500) NOT NULL,
  `messageTime` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`messageId`),
  KEY `FK_rooms_TO_messages_1` (`roomId`),
  KEY `FK_users_TO_messages_1` (`userId`),
  CONSTRAINT `FK_rooms_TO_messages_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`roomId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_messages_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `music_books`
--

DROP TABLE IF EXISTS `music_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music_books` (
  `musicId` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `artistId` int(11) NOT NULL,
  `musicDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`userId`,`musicId`),
  KEY `FK_artists_TO_music_books_1` (`artistId`),
  KEY `FK_music_TO_music_books_1` (`musicId`),
  CONSTRAINT `FK_artists_TO_music_books_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`artistId`),
  CONSTRAINT `FK_music_TO_music_books_1` FOREIGN KEY (`musicId`) REFERENCES `musics` (`musicId`),
  CONSTRAINT `FK_users_TO_music_books_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `music_tests`
--

DROP TABLE IF EXISTS `music_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music_tests` (
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  `testId` int(11) NOT NULL,
  `musicId` int(11) NOT NULL,
  `input` varchar(2000) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL,
  PRIMARY KEY (`questionId`),
  KEY `FK_music_TO_music_tests_1` (`musicId`),
  KEY `FK_music_TO_music_tests_2` (`artistId`),
  KEY `FK_tests_TO_music_tests_1` (`testId`),
  CONSTRAINT `FK_music_TO_music_tests_1` FOREIGN KEY (`musicId`) REFERENCES `musics` (`musicId`),
  CONSTRAINT `FK_music_TO_music_tests_2` FOREIGN KEY (`artistId`) REFERENCES `musics` (`artistId`),
  CONSTRAINT `FK_tests_TO_music_tests_1` FOREIGN KEY (`testId`) REFERENCES `tests` (`testId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `musics`
--

DROP TABLE IF EXISTS `musics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musics` (
  `musicId` int(11) NOT NULL AUTO_INCREMENT,
  `artistId` int(11) NOT NULL,
  `videoId` varchar(63) NOT NULL,
  `title` varchar(255) NOT NULL,
  `musicTime` int(11) DEFAULT NULL,
  `hit` int(11) DEFAULT 0,
  `musicImageUri` varchar(255) NOT NULL,
  PRIMARY KEY (`musicId`),
  UNIQUE KEY `videoId` (`videoId`),
  KEY `FK_artists_TO_music_1` (`artistId`),
  CONSTRAINT `FK_artists_TO_music_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`artistId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neighbors`
--

DROP TABLE IF EXISTS `neighbors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `neighbors` (
  `userId` bigint(20) NOT NULL,
  `neighborId` bigint(20) NOT NULL,
  `statusCode` varchar(20) NOT NULL,
  `since` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`,`neighborId`),
  UNIQUE KEY `requesterId` (`userId`,`neighborId`),
  KEY `FK_users_TO_neighbor_requests_2` (`neighborId`),
  KEY `FK_status_TO_neighbor_requests_1` (`statusCode`),
  CONSTRAINT `FK_status_TO_neighbor_requests_1` FOREIGN KEY (`statusCode`) REFERENCES `status` (`statusCode`),
  CONSTRAINT `FK_users_TO_neighbor_requests_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_neighbor_requests_2` FOREIGN KEY (`neighborId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice_images`
--

DROP TABLE IF EXISTS `notice_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_images` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `noticeId` int(11) NOT NULL,
  `noticeImageUri` varchar(255) NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `FK_notices_TO_notice_images_1` (`noticeId`),
  CONSTRAINT `FK_notices_TO_notice_images_1` FOREIGN KEY (`noticeId`) REFERENCES `notices` (`noticeId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `noticeId` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(50) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `registrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`noticeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `roomId` int(11) NOT NULL AUTO_INCREMENT,
  `roomName` varchar(15) DEFAULT NULL,
  `userId` bigint(20) NOT NULL,
  `notice` varchar(30) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`roomId`),
  KEY `FK_users_TO_rooms_1` (`userId`),
  KEY `FK_groups_TO_rooms_1` (`groupId`),
  CONSTRAINT `FK_groups_TO_rooms_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`groupId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_rooms_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sentence_books`
--

DROP TABLE IF EXISTS `sentence_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence_books` (
  `userId` bigint(20) NOT NULL,
  `sentenceId` int(11) NOT NULL,
  `sentenceDate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`userId`,`sentenceId`),
  KEY `FK_sentences_TO_sentence_books_1` (`sentenceId`),
  CONSTRAINT `FK_sentences_TO_sentence_books_1` FOREIGN KEY (`sentenceId`) REFERENCES `sentences` (`sentenceId`),
  CONSTRAINT `FK_users_TO_sentence_books_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sentence_tests`
--

DROP TABLE IF EXISTS `sentence_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence_tests` (
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  `testId` int(11) NOT NULL,
  `sentenceId` int(11) NOT NULL,
  `input` varchar(255) NOT NULL,
  PRIMARY KEY (`questionId`),
  KEY `FK_tests_TO_sentence_tests_1` (`testId`),
  KEY `FK_sentences_TO_sentence_tests_1` (`sentenceId`),
  CONSTRAINT `FK_sentences_TO_sentence_tests_1` FOREIGN KEY (`sentenceId`) REFERENCES `sentences` (`sentenceId`),
  CONSTRAINT `FK_tests_TO_sentence_tests_1` FOREIGN KEY (`testId`) REFERENCES `tests` (`testId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sentences`
--

DROP TABLE IF EXISTS `sentences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentences` (
  `sentenceId` int(11) NOT NULL AUTO_INCREMENT,
  `sentence` varchar(255) NOT NULL,
  `meaning` varchar(255) NOT NULL,
  `setId` int(11) DEFAULT NULL,
  `sentenceType` varchar(20) DEFAULT NULL,
  `sentenceAudioUri` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`sentenceId`),
  KEY `FK_sentencesSet_TO_sentences_1` (`setId`),
  CONSTRAINT `FK_sentencesSet_TO_sentences_1` FOREIGN KEY (`setId`) REFERENCES `sentencesset` (`setId`)
) ENGINE=InnoDB AUTO_INCREMENT=731 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sentencesset`
--

DROP TABLE IF EXISTS `sentencesset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentencesset` (
  `setId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`setId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `statusCode` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`statusCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `study_times`
--

DROP TABLE IF EXISTS `study_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_times` (
  `studyId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `studyDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `studyTime` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`studyId`),
  UNIQUE KEY `studyId` (`studyId`,`userId`),
  KEY `FK_users_TO_study_times_1` (`userId`),
  CONSTRAINT `FK_users_TO_study_times_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tests` (
  `testId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `testTitle` varchar(100) DEFAULT NULL,
  `testType` varchar(20) DEFAULT NULL,
  `startTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `endTime` timestamp NULL DEFAULT NULL,
  `Score` int(11) DEFAULT 0,
  `musicId` int(11) DEFAULT NULL,
  PRIMARY KEY (`testId`),
  KEY `FK_users_TO_tests_1` (`userId`),
  CONSTRAINT `FK_users_TO_tests_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_rooms`
--

DROP TABLE IF EXISTS `user_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_rooms` (
  `userId` bigint(20) NOT NULL,
  `roomId` int(11) NOT NULL,
  `chatType` enum('PERSONAL','GROUP') DEFAULT NULL,
  UNIQUE KEY `userId` (`userId`,`roomId`),
  KEY `FK_rooms_TO_user_rooms_1` (`roomId`),
  CONSTRAINT `FK_rooms_TO_user_rooms_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`roomId`) ON DELETE CASCADE,
  CONSTRAINT `FK_users_TO_user_rooms_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(8) NOT NULL,
  `profileImageUri` varchar(255) DEFAULT NULL,
  `exp` int(11) NOT NULL DEFAULT 0,
  `info` varchar(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `phone_2` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000003 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `word_books`
--

DROP TABLE IF EXISTS `word_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_books` (
  `userId` bigint(20) NOT NULL,
  `wordId` int(11) NOT NULL,
  `wordDate` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`userId`,`wordId`),
  KEY `FK_words_TO_word_books_1` (`wordId`),
  CONSTRAINT `FK_users_TO_word_books_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `FK_words_TO_word_books_1` FOREIGN KEY (`wordId`) REFERENCES `words` (`wordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `word_musics`
--

DROP TABLE IF EXISTS `word_musics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_musics` (
  `musicId` int(11) NOT NULL,
  `wordId` int(11) NOT NULL,
  PRIMARY KEY (`musicId`,`wordId`),
  KEY `FK_words_TO_word_songs_1` (`wordId`),
  CONSTRAINT `FK_music_TO_word_songs_1` FOREIGN KEY (`musicId`) REFERENCES `musics` (`musicId`),
  CONSTRAINT `FK_words_TO_word_songs_1` FOREIGN KEY (`wordId`) REFERENCES `words` (`wordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `word_sentences`
--

DROP TABLE IF EXISTS `word_sentences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_sentences` (
  `sentenceId` int(11) NOT NULL,
  `wordId` int(11) NOT NULL,
  PRIMARY KEY (`sentenceId`,`wordId`),
  KEY `FK_words_TO_word_sentences_1` (`wordId`),
  CONSTRAINT `FK_sentence_TO_word_sentences_1` FOREIGN KEY (`sentenceId`) REFERENCES `sentences` (`sentenceId`),
  CONSTRAINT `FK_words_TO_word_sentences_1` FOREIGN KEY (`wordId`) REFERENCES `words` (`wordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `word_tests`
--

DROP TABLE IF EXISTS `word_tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_tests` (
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  `testId` int(11) NOT NULL,
  `wordId` int(11) NOT NULL,
  `input` varchar(300) DEFAULT NULL,
  `wrong1` varchar(300) DEFAULT NULL,
  `wrong2` varchar(300) DEFAULT NULL,
  `meaning` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`questionId`),
  KEY `FK_tests_TO_word_tests_1` (`testId`),
  KEY `FK_words_TO_word_tests_1` (`wordId`),
  CONSTRAINT `FK_tests_TO_word_tests_1` FOREIGN KEY (`testId`) REFERENCES `tests` (`testId`) ON DELETE CASCADE,
  CONSTRAINT `FK_words_TO_word_tests_1` FOREIGN KEY (`wordId`) REFERENCES `words` (`wordId`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `words` (
  `wordId` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(50) DEFAULT NULL,
  `pronunciation` varchar(100) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `wordAudioUri` varchar(255) NOT NULL,
  PRIMARY KEY (`wordId`),
  UNIQUE KEY `word` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=1590 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_meaning`
--

DROP TABLE IF EXISTS `words_meaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `words_meaning` (
  `wordId` int(11) NOT NULL,
  `meaning` varchar(300) COLLATE utf8mb4_bin DEFAULT NULL,
  `partOfSpeech` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  KEY `wordId` (`wordId`),
  CONSTRAINT `words_meaning_ibfk_1` FOREIGN KEY (`wordId`) REFERENCES `words` (`wordId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  9:27:29
