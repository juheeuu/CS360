-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: Delivery
-- ------------------------------------------------------
-- Server version	8.0.11


CREATE DATABASE IF NOT EXISTS Delivery;
USE Delivery;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Distance`
--

DROP TABLE IF EXISTS `Distance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Distance` (
  `Space_idSpace` varchar(45) NOT NULL,
  `Space_idSpace1` varchar(45) NOT NULL,
  `Distancecol` int(11) DEFAULT NULL,
  PRIMARY KEY (`Space_idSpace`,`Space_idSpace1`),
  KEY `fk_Space_has_Space_Space2_idx` (`Space_idSpace1`),
  KEY `fk_Space_has_Space_Space1_idx` (`Space_idSpace`),
  CONSTRAINT `fk_Space_has_Space_Space1` FOREIGN KEY (`Space_idSpace`) REFERENCES `space` (`idspace`),
  CONSTRAINT `fk_Space_has_Space_Space2` FOREIGN KEY (`Space_idSpace1`) REFERENCES `space` (`idspace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Distance`
--

LOCK TABLES `Distance` WRITE;
/*!40000 ALTER TABLE `Distance` DISABLE KEYS */;
/*!40000 ALTER TABLE `Distance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-22 20:44:31
SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Duration`
--

DROP TABLE IF EXISTS `Duration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Duration` (
  `Space_idSpace` varchar(45) NOT NULL,
  `Restaruant_idRestaruant` int(11) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`Space_idSpace`,`Restaruant_idRestaruant`),
  KEY `fk_Space_has_Restaruant_Restaruant1_idx` (`Restaruant_idRestaruant`),
  KEY `fk_Space_has_Restaruant_Space1_idx` (`Space_idSpace`),
  CONSTRAINT `fk_Space_has_Restaruant_Restaruant1` FOREIGN KEY (`Restaruant_idRestaruant`) REFERENCES `restaruant` (`idrestaruant`),
  CONSTRAINT `fk_Space_has_Restaruant_Space1` FOREIGN KEY (`Space_idSpace`) REFERENCES `space` (`idspace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Duration`
--

LOCK TABLES `Duration` WRITE;
/*!40000 ALTER TABLE `Duration` DISABLE KEYS */;
/*!40000 ALTER TABLE `Duration` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-22 20:44:32
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Evlauation`
--

DROP TABLE IF EXISTS `Evlauation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Evlauation` (
  `Student_idStudent` varchar(45) NOT NULL,
  `Restaruant_idRestaruant` int(11) NOT NULL,
  `EvaluationData` varchar(45) DEFAULT NULL,
  `EvaluationValue` int(11) DEFAULT NULL,
  PRIMARY KEY (`Student_idStudent`,`Restaruant_idRestaruant`),
  KEY `fk_Student_has_Restaruant_Restaruant1_idx` (`Restaruant_idRestaruant`),
  KEY `fk_Student_has_Restaruant_Student1_idx` (`Student_idStudent`),
  CONSTRAINT `fk_Student_has_Restaruant_Restaruant1` FOREIGN KEY (`Restaruant_idRestaruant`) REFERENCES `restaruant` (`idrestaruant`),
  CONSTRAINT `fk_Student_has_Restaruant_Student1` FOREIGN KEY (`Student_idStudent`) REFERENCES `student` (`idstudent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evlauation`
--

LOCK TABLES `Evlauation` WRITE;
/*!40000 ALTER TABLE `Evlauation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Evlauation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Restaruant`
--

DROP TABLE IF EXISTS `Restaruant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Restaruant` (
  `idRestaruant` int(11) NOT NULL,
  `Restaruantcol` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `PhoneNumber` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `Menu` varchar(45) NOT NULL,
  `DeliveryLocation` varchar(45) NOT NULL,
  PRIMARY KEY (`idRestaruant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaruant`
--

LOCK TABLES `Restaruant` WRITE;
/*!40000 ALTER TABLE `Restaruant` DISABLE KEYS */;
/*!40000 ALTER TABLE `Restaruant` ENABLE KEYS */;
UNLOCK TABLES;

 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Space`
--

DROP TABLE IF EXISTS `Space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Space` (
  `idSpace` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idSpace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Space`
--

LOCK TABLES `Space` WRITE;
/*!40000 ALTER TABLE `Space` DISABLE KEYS */;
/*!40000 ALTER TABLE `Space` ENABLE KEYS */;
UNLOCK TABLES;

 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Student` (
  `idStudent` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `bookmark` varchar(45) DEFAULT NULL,
  `prefermenu` int(11) DEFAULT NULL,
  `Space_idSpace` varchar(45) NOT NULL,
  PRIMARY KEY (`idStudent`,`Space_idSpace`),
  KEY `fk_Student_Space1_idx` (`Space_idSpace`),
  CONSTRAINT `fk_Student_Space1` FOREIGN KEY (`Space_idSpace`) REFERENCES `space` (`idspace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

CREATE USER IF NOT EXISTS 'tester'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON Delivery.* TO 'tester'@'%';
