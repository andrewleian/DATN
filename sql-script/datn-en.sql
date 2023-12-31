-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: datn_en
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_customer` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_customer` (`id_customer`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `total_payment` decimal(10,0) DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `id_customer` bigint unsigned DEFAULT NULL,
  `id_staff` bigint unsigned DEFAULT NULL,
  `payments` varchar(45) DEFAULT NULL,
  `bill_code` varchar(20) NOT NULL,
  `note_cancel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_customer` (`id_customer`),
  KEY `id_staff` (`id_staff`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`),
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (70,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','23s thanh ',3394000,NULL,'2023-08-17 09:56:58','2023-08-21 09:56:58','Thành công','2023-08-20 09:56:58',15,NULL,'offline','Z0HLK3EKTEMH',NULL),(71,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com',' we 34',1083400,NULL,'2023-08-20 09:57:31','2023-08-21 09:57:31','Thành công','2023-08-20 09:56:58',15,NULL,'offline','04D5SL0SFHAA',NULL),(74,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số 23 dường Hòa BÌnh',1724001,NULL,'2023-08-17 09:56:58','2023-08-21 14:13:15','Thành công','2023-08-15 09:56:58',15,NULL,'offline','O2281UDV3LWF',NULL),(75,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số 23 Đường Lương tài',1719001,NULL,'2023-08-18 14:14:07','2023-08-21 14:14:07','Thành công','2023-08-16 09:56:58',15,NULL,'offline','FOL52HR4CIUM',NULL),(76,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số 46 Đường Thuận Thành',5669000,NULL,'2023-08-19 14:15:06','2023-08-21 14:15:06','Thành công','2023-08-17 09:56:58',15,NULL,'offline','5GJ9QAH8NWGS',NULL),(77,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số nhà 46 Đương Long Bình',2429000,NULL,'2023-08-21 14:16:15','2023-08-21 14:16:15','Hủy','2023-08-20 09:56:58',15,NULL,'online','7003E4QBRLK3',NULL),(78,'Hoàng Thị Nguyện','0978527641','nguyennguyen@gmail.com','Nhầ số 34 xã đồng thắng',2434000,NULL,'2023-08-21 14:17:09','2023-08-21 14:17:09','Hủy',NULL,16,NULL,'offline','Y0Y71IVHU0GU',NULL),(79,'Hoàng Thị Nguyện','0978527641','nguyennguyen@gmail.com',' Xã La oán Tần nhà số 23',1234000,NULL,'2023-08-18 14:17:55','2023-08-21 14:17:55','Thành công','2023-08-18 09:56:58',16,NULL,'offline','BOTMXRGGWOVK',NULL),(80,'Hoàng Thị Thu Duyên','0999527641','thuduyen@gmail.com','Số nhà 24 xã đình lập',2704000,NULL,'2023-08-20 14:20:10','2023-08-21 14:20:10','Thành công','2023-08-19 09:56:58',17,NULL,'offline','MSGIM6V36OD2',NULL),(81,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số nhà 24 zã Púng Luông',2134000,NULL,'2023-08-21 14:28:51','2023-08-21 14:28:51','Thành công','2023-08-15 09:56:58',18,NULL,'offline','MV9MLFOW1QBT',NULL),(82,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số nhà 25 Đường Long Hưng',1034000,NULL,'2023-08-21 14:29:53','2023-08-21 14:29:53','Hủy',NULL,18,NULL,'offline','BH1CEIMN1HSC',NULL),(83,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số 23 Đường ',939001,NULL,'2023-08-20 14:31:59','2023-08-21 14:31:59','Thành công','2023-08-17 09:56:58',18,NULL,'offline','XSPE9JIVBLDI',NULL),(84,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số nhà 67 đường Mễ Sở',7034000,NULL,'2023-08-20 14:32:30','2023-08-21 14:32:30','Hủy',NULL,18,NULL,'offline','JZEPXHVB0OYU',NULL),(85,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số 23 Đường 45',3536001,NULL,'2023-08-13 14:32:58','2023-08-21 14:32:58','Thành công','2023-08-14 09:56:58',18,NULL,'offline','ML4NVVB6N9EN',NULL),(87,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số 23 nhà Phạm hưng 23',3687400,NULL,'2023-08-15 02:21:06','2023-08-21 02:21:06','Thành công','2023-08-18 02:23:52',15,NULL,'offline','1QJOXZ4Q76X2',NULL),(88,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số 23 kim bôi',1234000,NULL,'2023-08-16 02:25:27','2023-08-20 03:00:19','Đang giao',NULL,15,NULL,'offline','AGPU6EYQK2AD',NULL),(89,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Nhà số 23 xã Tìa Dình',3603400,NULL,'2023-08-17 02:30:08','2023-08-20 03:00:19','Thành công','2023-08-17 02:30:25',15,NULL,'offline','9IJ2QGJ5RR9O',NULL),(90,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số nhà 23',3603400,NULL,'2023-08-20 09:56:58','2023-08-20 03:00:19','Thành công','2023-08-18 02:33:20',15,NULL,'offline','OR9WA5KS1UHP',NULL),(91,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số nhà 23',1234000,NULL,'2023-08-20 09:56:58','2023-08-20 03:00:19','Thành công','2023-08-14 02:59:22',15,NULL,'offline','6Z9JZ4TOHR9A',NULL),(92,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','Số nhà 24 đường nguyễn trãi',1234000,NULL,'2023-08-20 09:56:58','2023-08-20 03:00:19','Thành công','2023-08-20 09:56:58',15,NULL,'offline','0SI4V45VCGQE',NULL),(93,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số 23 đường Lê Lợi',3694000,NULL,'2023-08-20 09:56:58','2023-08-20 03:00:19','Chờ đơn vị vận chuyển',NULL,18,NULL,'offline','OSJT8N4RRYWT',NULL),(94,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số nhà 23 gần nhà văn hóa',3694000,'Tôi muốn đổi size','2023-08-20 09:56:58','2023-08-20 03:00:19','Thành công','2023-08-22 08:16:51',18,NULL,'offline','SD9IAVJ8K70I',NULL),(95,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Gần nhà văn Hóa thông 2',1789001,NULL,'2023-08-20 03:00:19','2023-08-20 03:00:19','Chờ xác nhận',NULL,18,NULL,'offline','WQLM3JCGWILO',NULL),(96,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Số nhà 23 Đường lê Hồng Phong',1724000,NULL,'2023-08-20 09:56:58','2023-08-13 07:26:52','Chờ thanh toán',NULL,18,NULL,'offline','JBXLTV821UAF',NULL),(97,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Đường Võ Nguyên Giáp số nhà 23',1779000,NULL,'2023-08-13 07:27:28','2023-08-15 07:27:28','Chờ thanh toán',NULL,18,NULL,'offline','4CNPQNO587XJ',NULL),(98,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','Gần ngay biển biển vũng tầu , đường Trần Duy Hưng 11',1786001,NULL,'2023-08-20 09:56:58','2023-08-12 07:28:56','Đang chuẩn bị hàng',NULL,18,NULL,'offline','ARDIJRM6U8LU',NULL);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_detail`
--

DROP TABLE IF EXISTS `bill_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_detail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `unit_price` decimal(10,0) DEFAULT '0',
  `amount` int unsigned DEFAULT '0',
  `note` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_bill` bigint unsigned DEFAULT NULL,
  `id_product_details` bigint unsigned DEFAULT NULL,
  `promotional_price` decimal(10,0) DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_bill` (`id_bill`),
  KEY `id_product_details` (`id_product_details`),
  CONSTRAINT `bill_detail_ibfk_1` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id`),
  CONSTRAINT `bill_detail_ibfk_2` FOREIGN KEY (`id_product_details`) REFERENCES `product_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_detail`
--

LOCK TABLES `bill_detail` WRITE;
/*!40000 ALTER TABLE `bill_detail` DISABLE KEYS */;
INSERT INTO `bill_detail` VALUES (89,1200000,2,NULL,70,640,840000,30),(90,1200000,2,NULL,70,636,840000,30),(91,1200000,9,NULL,71,567,1200000,0),(95,1200000,2,NULL,74,643,840000,30),(96,1200000,2,NULL,75,638,840000,30),(97,940000,6,NULL,76,358,940000,0),(98,1200000,1,NULL,77,587,1200000,0),(99,1200000,1,NULL,77,607,1200000,0),(100,1200000,1,NULL,78,614,1200000,0),(101,1200000,1,NULL,78,616,1200000,0),(102,1200000,1,NULL,79,549,1200000,0),(103,890000,3,NULL,80,454,890000,0),(104,1050000,2,NULL,81,477,1050000,0),(105,1000000,1,NULL,82,472,1000000,0),(106,900000,1,NULL,83,352,900000,0),(107,3500000,1,NULL,84,390,3500000,0),(108,3500000,1,NULL,84,379,3500000,0),(109,3500000,3,NULL,85,376,3500000,0),(120,900000,2,NULL,85,377,NULL,NULL),(126,1200000,2,NULL,87,578,1200000,0),(127,1200000,1,NULL,87,644,840000,30),(128,1200000,1,NULL,88,620,1200000,0),(129,1200000,2,NULL,89,631,1200000,0),(130,1200000,2,NULL,90,632,1200000,0),(131,1200000,1,NULL,91,628,1200000,0),(132,1200000,1,NULL,92,560,1200000,0),(133,1830000,2,NULL,93,422,1830000,0),(134,1830000,2,NULL,94,424,1830000,0),(135,1750000,1,NULL,95,303,1750000,0),(136,1690000,1,NULL,96,312,1690000,0),(137,1750000,1,NULL,97,297,1750000,0),(138,1750000,1,NULL,98,301,1750000,0);
/*!40000 ALTER TABLE `bill_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_customer` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_customer` (`id_customer`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (18,'2023-08-20 16:54:40','2023-08-20 16:54:40','active',16),(19,'2023-08-21 09:56:34','2023-08-21 09:56:34','active',15),(20,'2023-08-21 14:19:14','2023-08-21 14:19:14','active',17),(21,'2023-08-21 14:26:50','2023-08-21 14:26:50','active',18);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_detail`
--

DROP TABLE IF EXISTS `cart_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_detail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_cart` bigint unsigned DEFAULT NULL,
  `id_product_detail` bigint unsigned DEFAULT NULL,
  `amount` int unsigned DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cart` (`id_cart`),
  KEY `id_product_detail` (`id_product_detail`),
  CONSTRAINT `cart_detail_ibfk_1` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id`),
  CONSTRAINT `cart_detail_ibfk_2` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_detail`
--

LOCK TABLES `cart_detail` WRITE;
/*!40000 ALTER TABLE `cart_detail` DISABLE KEYS */;
INSERT INTO `cart_detail` VALUES (87,18,635,1,'inactive'),(88,18,640,1,'inactive'),(89,18,633,1,'inactive'),(90,18,614,1,'inactive'),(91,18,616,1,'inactive'),(92,19,640,2,'inactive'),(93,19,636,2,'inactive'),(94,19,567,9,'inactive'),(95,19,643,2,'inactive'),(96,19,638,2,'inactive'),(97,19,587,1,'inactive'),(98,19,607,1,'inactive'),(99,19,358,6,'inactive'),(100,18,549,1,'inactive'),(101,20,454,3,'inactive'),(102,20,628,30,'active'),(103,20,624,29,'active'),(104,21,477,2,'inactive'),(105,21,472,1,'inactive'),(106,21,352,1,'inactive'),(107,21,390,1,'inactive'),(108,21,379,1,'inactive'),(109,21,376,1,'inactive'),(112,19,578,30,'inactive'),(113,19,644,1,'inactive'),(114,19,620,1,'inactive'),(115,19,631,30,'inactive'),(116,19,632,30,'inactive'),(117,19,628,1,'inactive'),(118,19,560,1,'inactive'),(119,21,422,2,'inactive'),(120,21,424,2,'inactive'),(121,21,303,1,'inactive'),(122,21,297,1,'inactive'),(123,21,301,1,'inactive'),(124,21,312,1,'inactive'),(126,21,603,1,'active'),(127,21,608,1,'active');
/*!40000 ALTER TABLE `cart_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Category 1','2023-06-24 02:15:22','2023-06-24 02:15:22',NULL),(2,'Category 2','2023-06-24 02:15:22','2023-06-24 02:15:22',NULL),(3,'Category 3','2023-06-24 02:15:22','2023-06-24 02:15:22',NULL),(4,'Category 4','2023-06-24 02:15:22','2023-06-24 02:15:22',NULL),(5,'Category 5','2023-06-24 02:15:22','2023-06-24 02:15:22',NULL),(11,'Chạy Bộ','2023-06-24 02:15:22','2023-06-24 02:15:22','active'),(12,'Bóng Rổ','2023-06-24 02:15:22','2023-06-24 02:15:22','active'),(13,'Đi Bộ','2023-06-24 02:15:22','2023-06-24 02:15:22','active'),(14,'Tối giản','2023-06-24 02:15:22','2023-06-24 02:15:22','active'),(15,'Loại khác','2023-06-24 02:15:22','2023-06-24 02:15:22','active');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_detail`
--

DROP TABLE IF EXISTS `category_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_detail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_product` bigint unsigned DEFAULT NULL,
  `id_category` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_category` (`id_category`),
  CONSTRAINT `category_detail_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `category_detail_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_detail`
--

LOCK TABLES `category_detail` WRITE;
/*!40000 ALTER TABLE `category_detail` DISABLE KEYS */;
INSERT INTO `category_detail` VALUES (15,57,14),(16,53,14),(17,41,14),(18,30,14),(19,49,14),(20,60,12),(21,59,12),(22,49,12),(23,36,12),(24,31,12),(25,51,12),(26,58,11),(27,35,11),(28,39,11),(29,54,11),(30,34,11),(31,42,11),(32,59,13),(33,38,13),(34,46,13),(35,47,13),(36,53,13),(37,33,13),(38,45,13),(39,44,13),(40,43,15),(41,40,15),(42,52,15),(43,37,15),(44,32,15),(45,55,15),(46,31,14),(47,35,14),(48,54,14),(49,55,14),(50,42,14),(52,40,14),(53,60,13),(54,59,13),(55,37,13),(56,43,13),(57,57,13),(58,39,13),(59,54,12),(60,47,12),(61,33,12),(62,40,12),(63,55,12),(64,55,11),(65,57,11),(66,30,11),(68,60,11),(69,49,11),(70,53,11);
/*!40000 ALTER TABLE `category_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` varchar(20) NOT NULL,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES ('000000','Đen','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('0000FF','Xanh Dương','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('008000','Xanh Lá','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('800080','Tím','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('808080','Xám','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('FF0000','Đỏ','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('FFCCFF','Hồng','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('FFFF00','Vàng','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('FFFFFF','Trắng','2023-05-23 09:24:11','2023-05-23 09:24:11','active'),('xx1001','Tràm','2023-07-30 19:07:16','2023-07-30 19:07:16','active');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_customer` bigint unsigned DEFAULT NULL,
  `id_product` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_customer` (`id_customer`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (45,'Sản Phẩm ok lắm nha mọi người lên mua về .','2023-08-20 22:28:53','2023-08-20 22:28:53','active',15,30),(46,'Mình mua về tặng chồng mình rất thích','2023-08-20 22:28:53','2023-08-20 22:28:53','active',16,31),(47,'Giày của shop thật sự đẹp luôn ấy','2023-08-20 22:28:53','2023-08-20 22:28:53','active',17,32),(48,'Shop giao hàng nhanh đóng gói cẩn thận, tư vấn rất tận tinh','2023-08-20 22:28:53','2023-08-20 22:28:53','active',18,33),(49,'Sản phẩm như hình luôn ạ','2023-08-20 22:28:53','2023-08-20 22:28:53','active',19,34),(50,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:28:53','2023-08-20 22:28:53','active',20,35),(51,'Mình đã mua ở đây 3 đôi rất đẹp luôn','2023-08-20 22:28:53','2023-08-20 22:28:53','active',21,36),(52,'Không liên quan nhưng shipper thân thiện quá.','2023-08-20 22:28:53','2023-08-20 22:28:53','active',22,37),(53,'Sản phẩm đẹp, chât lượng ok','2023-08-20 22:28:53','2023-08-20 22:28:53','active',23,38),(54,'Mình mua bị nhầm size ấy , h đổi như nào nhỉ','2023-08-20 22:28:53','2023-08-20 22:28:53','active',25,39),(55,'Ôi mới nhận nhìn đẹp thật sự','2023-08-20 22:28:53','2023-08-20 22:28:53','active',24,40),(56,'Mình mua bị nhầm size ấy , h đổi như nào nhỉ','2023-08-20 22:32:16','2023-08-20 22:32:16','active',23,41),(57,'Shop giao hàng nhanh đóng gói cẩn thận, tư vấn rất tận tinh','2023-08-20 22:32:16','2023-08-20 22:32:16','active',24,42),(58,'Giày của shop thật sự đẹp luôn ấy','2023-08-20 22:32:16','2023-08-20 22:32:16','active',25,43),(59,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',19,44),(60,'Mình mua về tặng chồng mình rất thích','2023-08-20 22:32:16','2023-08-20 22:32:16','active',18,45),(61,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',17,46),(62,'Giày của shop thật sự đẹp luôn ấy','2023-08-20 22:32:16','2023-08-20 22:32:16','active',16,47),(63,'Sản Phẩm ok lắm nha mọi người lên mua về .','2023-08-20 22:32:16','2023-08-20 22:32:16','active',30,48),(64,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',15,49),(65,'Đã quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',16,50),(66,'Mình mua về tặng chồng mình rất thích','2023-08-20 22:32:16','2023-08-20 22:32:16','active',17,51),(67,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',18,52),(68,'Mình mua về tặng chồng mình rất thích','2023-08-20 22:32:16','2023-08-20 22:32:16','active',19,53),(69,'Mình mua về tặng chồng mình rất thích','2023-08-20 22:32:16','2023-08-20 22:32:16','active',20,54),(70,'Sản Phẩm ok lắm nha mọi người lên mua về .','2023-08-20 22:32:16','2023-08-20 22:32:16','active',21,55),(71,'Shop giao hàng nhanh đóng gói cẩn thận, tư vấn rất tận tinh','2023-08-20 22:32:16','2023-08-20 22:32:16','active',22,56),(72,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',23,57),(73,'Mình mua về tặng chồng mình rất thích','2023-08-20 22:32:16','2023-08-20 22:32:16','active',24,58),(74,'Shop giao hàng nhanh đóng gói cẩn thận, tư vấn rất tận tinh','2023-08-20 22:32:16','2023-08-20 22:32:16','active',25,59),(75,'Sẽ quay lại ủng hộ shop lần 2','2023-08-20 22:32:16','2023-08-20 22:32:16','active',30,60),(76,NULL,'2023-08-20 22:32:16','2023-08-20 22:32:16','',NULL,NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (15,'Nguyễn Khánh Trang','0978527640','trangkhanh@gmail.com','1993-07-22','trangkhanh','$2a$10$1oU0Qp2bIjJ/eaIs0pWIl.v4Jatrtuztb2swx7DIXl/axKMubuKnS','2023-08-01 07:55:12','2023-08-01 07:55:12','enable','Nữ'),(16,'Hoàng Thị Nguyện','0978527641','nguyennguyen@gmail.com','1996-07-25','nguyennguyen15','$2a$10$54YSIlEGhzRNko7PwfS3zeHeWsyr8Dka0Vjb1O70thq4/bpSIySeC','2023-08-01 07:56:37','2023-08-01 07:56:37','enable','Nữ'),(17,'Hoàng Thị Thu Duyên','0999527641','thuduyen@gmail.com','2000-07-21','thuduyen018','$2a$10$oCBRIK3BdeYs5BdUK4bow.ca6Jso3deWH8R1.mxFtH7GbzrZZrGZS','2023-08-01 07:57:19','2023-08-01 07:57:19','enable','Nữ'),(18,'Hoàng thị Thêm Thương','0966527641','thuongthuong@gmail.com','2000-07-21','thuongthuong12','$2a$10$OJLPWXhjuJhDN1dcWzJGf.2iXQjINFMrxcdrgQNoc0t/MmSpxJIgK','2023-08-01 07:58:02','2023-08-01 07:58:02','enable','Nữ'),(19,'Nguyễn Thị Thu','0966589641','tientienty0603@gmail.com','2003-07-21','thuthu','$2a$10$ujRiunKVFUoKS8Dx1.dxOOSGmoHcGEJ8jUkiGIdybGiY0TDubiLwi','2023-08-01 07:58:37','2023-08-01 07:58:37','enable','Nữ'),(20,'Hoàng Mạnh Đức','0966589691','ducden@gmail.com','2001-09-21','ducxem01','$2a$10$qfhMUCnqTwPEwr8PC4LoL.AwBp4SCy59/zg0Sf/Wt/UMaFj51ZOc2','2023-08-01 07:59:52','2023-08-01 07:59:52','enable','Nam'),(21,'Hoàng Mạnh Uy','0966581111','uytin@gmail.com','2001-01-27','uytin','$2a$10$nh4nIW2CUKgfCeMDQihFnOLgdHwq.iq/a/bAKDm2hx.4i/HJU6ZMC','2023-08-01 08:00:52','2023-08-01 08:00:52','enable','Nam'),(22,'Hoàng Mạnh Yếu','0966591111','yeu@gmail.com','2004-08-22','yeueyus12','$2a$10$KrWM1T7tAOotJr8x.0UCwudcznUWsFo6KrLUCY081AAAOV/Gq5UA6','2023-08-01 08:01:37','2023-08-01 08:01:37','enable','Nam'),(23,'Nguyễn Thùy Linh','0373796722','lthuylinh@gmail.com','1997-11-01','linh11','$10$iJpOi8Mz6BqNMb0evUaoVe45r7hSAUnwQwz9NCisQkPRCUVYoTmoe','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nữ'),(24,'Nguyễn Mai Anh','0373796725','maianh11@gmail.com','1996-01-11','maianh11','$10$h9PG8Jdo96Cjb3sHd8ThsufgF/7dbk/roX4BSwpSLeKLFt8HCkaOq','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nữ'),(25,'Nguyễn Bích Ngọc','0373796726','bichnhoj2058@gmail.com','2000-02-02','ngoc11','$10$5knQrTJW7vuQsNtKbxDjRe8ADSoirAC9.fkCSz4utvvjWBli4nRWK','2023-06-24 02:15:22','2023-07-18 12:54:37','enable','Nữ'),(26,'Nguyễn Thanh Thảo','0373796727','thao11@gmail.com','1988-09-01','thao11','$10$Dyf660BACpfSjTQJvgtKZ.eXG8aGwWYPr7QITBFnXxtESAPd//0Ya','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nữ'),(27,'Nguyễn Minh Anh','0373796728','minhanh11@gmail.com','1988-01-09','minhanh11','$10$tKbySM9eBRYi98tR7FybH.IxgEFjK9gMJuS.f7g0RmeXuup1L5Zmi','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nữ'),(28,'Hoàng Văn Phong','0373796729','phong11@gmail.com','1995-01-01','phong01','$10$u7lougroCwRLH7Jy1qeGlu.jMVrRiK3LgwJJp6O7bQormKpUv34WC','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nam'),(29,'Hoàng Văn Đạt','0373796730','dat11@gmail.com','1994-01-01','dat09','$10$QYKIfVHiplIv46d.TqxL5.9dGf/0fv8Hc3Sb8im7qOgksVicNp60q','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nam'),(30,'Hoàng Văn Công','0373796731','cong11@gmail.com','1988-01-01','cong11','$10$dpktzTuap6gGV8qeRa63Ied4VE.ZQ3it7z1T9t.zfcNcD221nMEFm','2023-06-24 02:15:22','2023-06-24 02:15:22','enable','Nam'),(31,'Phan công khanh','0978527639','phancongkhanh@gmail.com','1993-07-22','congkhanh1','$2a$10$EGb4U6GoJKIy50myOt0Md.DUjGOYqH3u3z.4arSlBZlbVytqS.Z1q','2023-08-01 07:54:04','2023-08-01 07:54:04','enable','Nam');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `code` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_pcs` bigint unsigned DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `name` (`name`),
  KEY `id_pcs` (`id_pcs`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_pcs`) REFERENCES `product_color_size` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (27,'104main-20230821193507.webp','2023-08-21 12:35:08','2023-08-21 12:35:08',104,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/104main-20230821193507.webp','active'),(28,'104second-20230821193507.webp','2023-08-21 12:35:08','2023-08-21 12:35:08',104,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/104second-20230821193507.webp','active'),(29,'103main-20230821193748.webp','2023-08-21 12:37:49','2023-08-21 12:37:49',103,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/103main-20230821193748.webp','active'),(30,'103second-20230821193748.webp','2023-08-21 12:37:49','2023-08-21 12:37:49',103,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/103second-20230821193748.webp','active'),(31,'105main-20230821193902.webp','2023-08-21 12:39:02','2023-08-21 12:39:02',105,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/105main-20230821193902.webp','active'),(32,'105second-20230821193902.webp','2023-08-21 12:39:02','2023-08-21 12:39:02',105,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/105second-20230821193902.webp','active'),(33,'102main-20230821194045.webp','2023-08-21 12:40:46','2023-08-21 12:40:46',102,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/102main-20230821194045.webp','active'),(34,'102second-20230821194045.webp','2023-08-21 12:40:46','2023-08-21 12:40:46',102,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/102second-20230821194045.webp','active'),(35,'101main-20230821194308.webp','2023-08-21 12:43:09','2023-08-21 12:43:09',101,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/101main-20230821194308.webp','active'),(36,'101second-20230821194308.webp','2023-08-21 12:43:09','2023-08-21 12:43:09',101,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/101second-20230821194308.webp','active'),(37,'3den1.webp','2023-08-21 12:44:21','2023-08-21 12:44:21',100,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/100main-20230821194420.webp','active'),(38,'3den2.webp','2023-08-21 12:44:21','2023-08-21 12:44:21',100,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/100second-20230821194420.webp','active'),(39,'99main-20230821194622.webp','2023-08-21 12:46:23','2023-08-21 12:46:23',99,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/99main-20230821194622.webp','active'),(40,'99second-20230821194622.webp','2023-08-21 12:46:23','2023-08-21 12:46:23',99,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/99second-20230821194622.webp','active'),(41,'98main-20230821194827.webp','2023-08-21 12:48:28','2023-08-21 12:48:28',98,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/98main-20230821194827.webp','active'),(42,'98second-20230821194827.webp','2023-08-21 12:48:28','2023-08-21 12:48:28',98,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/98second-20230821194827.webp','active'),(43,'97main-20230821195109.webp','2023-08-21 12:51:09','2023-08-21 12:51:09',97,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/97main-20230821195109.webp','active'),(44,'97second-20230821195109.webp','2023-08-21 12:51:10','2023-08-21 12:51:10',97,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/97second-20230821195109.webp','active'),(45,'96main-20230821195327.webp','2023-08-21 12:53:28','2023-08-21 12:53:28',96,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/96main-20230821195327.webp','active'),(46,'96second-20230821195327.webp','2023-08-21 12:53:28','2023-08-21 12:53:28',96,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/96second-20230821195327.webp','active'),(47,'95main-20230821195546.webp','2023-08-21 12:55:46','2023-08-21 12:55:46',95,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/95main-20230821195546.webp','active'),(48,'95second-20230821195546.webp','2023-08-21 12:55:46','2023-08-21 12:55:46',95,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/95second-20230821195546.webp','active'),(49,'94main-20230821195811.webp','2023-08-21 12:58:12','2023-08-21 12:58:12',94,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/94main-20230821195811.webp','active'),(50,'94second-20230821195811.webp','2023-08-21 12:58:12','2023-08-21 12:58:12',94,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/94second-20230821195811.webp','active'),(51,'93main-20230821200021.webp','2023-08-21 13:00:21','2023-08-21 13:00:21',93,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/93main-20230821200021.webp','active'),(52,'93second-20230821200021.png','2023-08-21 13:00:21','2023-08-21 13:00:21',93,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/93second-20230821200021.png','active'),(53,'92main-20230821200314.webp','2023-08-21 13:03:15','2023-08-21 13:03:15',92,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/92main-20230821200314.webp','active'),(54,'92second-20230821200314.webp','2023-08-21 13:03:15','2023-08-21 13:03:15',92,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/92second-20230821200314.webp','active'),(55,'91main-20230821200358.webp','2023-08-21 13:03:59','2023-08-21 13:03:59',91,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/91main-20230821200358.webp','active'),(56,'91second-20230821200358.webp','2023-08-21 13:03:59','2023-08-21 13:03:59',91,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/91second-20230821200358.webp','active'),(57,'90main-20230821200627.webp','2023-08-21 13:06:27','2023-08-21 13:06:27',90,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/90main-20230821200627.webp','active'),(58,'90second-20230821200627.webp','2023-08-21 13:06:27','2023-08-21 13:06:27',90,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/90second-20230821200627.webp','active'),(59,'89main-20230821200759.webp','2023-08-21 13:08:00','2023-08-21 13:08:00',89,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/89main-20230821200759.webp','active'),(60,'89second-20230821200759.webp','2023-08-21 13:08:00','2023-08-21 13:08:00',89,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/89second-20230821200759.webp','active'),(61,'88main-20230821200954.webp','2023-08-21 13:09:55','2023-08-21 13:09:55',88,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/88main-20230821200954.webp','active'),(62,'88second-20230821200954.webp','2023-08-21 13:09:55','2023-08-21 13:09:55',88,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/88second-20230821200954.webp','active'),(63,'87main-20230821201229.webp','2023-08-21 13:12:29','2023-08-21 13:12:29',87,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/87main-20230821201229.webp','active'),(64,'87second-20230821201229.webp','2023-08-21 13:12:29','2023-08-21 13:12:29',87,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/87second-20230821201229.webp','active'),(65,'86main-20230821201407.webp','2023-08-21 13:14:07','2023-08-21 13:14:07',86,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/86main-20230821201407.webp','active'),(66,'86second-20230821201407.webp','2023-08-21 13:14:07','2023-08-21 13:14:07',86,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/86second-20230821201407.webp','active'),(67,'85main-20230821201542.webp','2023-08-21 13:15:42','2023-08-21 13:15:42',85,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/85main-20230821201542.webp','active'),(68,'85second-20230821201542.webp','2023-08-21 13:15:42','2023-08-21 13:15:42',85,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/85second-20230821201542.webp','active'),(69,'84main-20230821202012.webp','2023-08-21 13:20:12','2023-08-21 13:20:12',84,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/84main-20230821202012.webp','active'),(70,'84second-20230821202012.webp','2023-08-21 13:20:12','2023-08-21 13:20:12',84,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/84second-20230821202012.webp','active'),(71,'77main-20230821202631.webp','2023-08-21 13:26:32','2023-08-21 13:26:32',77,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/77main-20230821202631.webp','active'),(72,'77second-20230821202631.webp','2023-08-21 13:26:32','2023-08-21 13:26:32',77,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/77second-20230821202631.webp','active'),(73,'78main-20230821202708.webp','2023-08-21 13:27:08','2023-08-21 13:27:08',78,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/78main-20230821202708.webp','active'),(74,'78second-20230821202708.webp','2023-08-21 13:27:08','2023-08-21 13:27:08',78,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/78second-20230821202708.webp','active'),(75,'79main-20230821202756.webp','2023-08-21 13:27:57','2023-08-21 13:27:57',79,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/79main-20230821202756.webp','active'),(76,'79second-20230821202756.webp','2023-08-21 13:27:57','2023-08-21 13:27:57',79,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/79second-20230821202756.webp','active'),(77,'80main-20230821202821.webp','2023-08-21 13:28:22','2023-08-21 13:28:22',80,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/80main-20230821202821.webp','active'),(78,'80second-20230821202821.webp','2023-08-21 13:28:22','2023-08-21 13:28:22',80,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/80second-20230821202821.webp','active'),(79,'81main-20230821202854.webp','2023-08-21 13:28:55','2023-08-21 13:28:55',81,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/81main-20230821202854.webp','active'),(80,'81second-20230821202854.webp','2023-08-21 13:28:55','2023-08-21 13:28:55',81,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/81second-20230821202854.webp','active'),(81,'82main-20230821203030.webp','2023-08-21 13:30:31','2023-08-21 13:30:31',82,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/82main-20230821203030.webp','active'),(82,'82second-20230821203030.webp','2023-08-21 13:30:31','2023-08-21 13:30:31',82,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/82second-20230821203030.webp','active'),(83,'83main-20230821203113.webp','2023-08-21 13:31:13','2023-08-21 13:31:13',83,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/83main-20230821203113.webp','active'),(84,'83second-20230821203113.webp','2023-08-21 13:31:13','2023-08-21 13:31:13',83,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/83second-20230821203113.webp','active'),(85,'75main-20230821203328.webp','2023-08-21 13:33:29','2023-08-21 13:33:29',75,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/75main-20230821203328.webp','active'),(86,'75second-20230821203328.webp','2023-08-21 13:33:29','2023-08-21 13:33:29',75,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/75second-20230821203328.webp','active'),(87,'76main-20230821203505.webp','2023-08-21 13:35:06','2023-08-21 13:35:06',76,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/76main-20230821203505.webp','active'),(88,'76second-20230821203505.webp','2023-08-21 13:35:06','2023-08-21 13:35:06',76,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/76second-20230821203505.webp','active'),(89,'67main-20230821204925.webp','2023-08-21 13:49:26','2023-08-21 13:49:26',67,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/67main-20230821204925.webp','active'),(90,'67second-20230821204925.webp','2023-08-21 13:49:26','2023-08-21 13:49:26',67,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/67second-20230821204925.webp','active'),(91,'68main-20230821204959.webp','2023-08-21 13:49:59','2023-08-21 13:49:59',68,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/68main-20230821204959.webp','active'),(92,'68second-20230821204959.webp','2023-08-21 13:49:59','2023-08-21 13:49:59',68,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/68second-20230821204959.webp','active'),(93,'69main-20230821205025.webp','2023-08-21 13:50:26','2023-08-21 13:50:26',69,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/69main-20230821205025.webp','active'),(94,'69second-20230821205025.webp','2023-08-21 13:50:26','2023-08-21 13:50:26',69,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/69second-20230821205025.webp','active'),(95,'70main-20230821205045.webp','2023-08-21 13:50:46','2023-08-21 13:50:46',70,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/70main-20230821205045.webp','active'),(96,'70second-20230821205045.webp','2023-08-21 13:50:46','2023-08-21 13:50:46',70,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/70second-20230821205045.webp','active'),(97,'71main-20230821205109.webp','2023-08-21 13:51:10','2023-08-21 13:51:10',71,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/71main-20230821205109.webp','active'),(98,'71second-20230821205109.webp','2023-08-21 13:51:10','2023-08-21 13:51:10',71,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/71second-20230821205109.webp','active'),(99,'72main-20230821205134.webp','2023-08-21 13:51:34','2023-08-21 13:51:34',72,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/72main-20230821205134.webp','active'),(100,'72second-20230821205134.webp','2023-08-21 13:51:34','2023-08-21 13:51:34',72,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/72second-20230821205134.webp','active'),(101,'73main-20230821205201.webp','2023-08-21 13:52:01','2023-08-21 13:52:01',73,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/73main-20230821205201.webp','active'),(102,'73second-20230821205201.webp','2023-08-21 13:52:01','2023-08-21 13:52:01',73,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/73second-20230821205201.webp','active'),(103,'74main-20230821205227.webp','2023-08-21 13:52:28','2023-08-21 13:52:28',74,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/74main-20230821205227.webp','active'),(104,'74second-20230821205227.webp','2023-08-21 13:52:28','2023-08-21 13:52:28',74,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/74second-20230821205227.webp','active'),(105,'106main-20230821205849.webp','2023-08-21 13:58:49','2023-08-21 13:58:49',106,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/106main-20230821205849.webp','active'),(106,'106second-20230821205849.webp','2023-08-21 13:58:49','2023-08-21 13:58:49',106,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/106second-20230821205849.webp','active'),(107,'63main-20230821210839.webp','2023-08-21 14:08:40','2023-08-21 14:08:40',63,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/63main-20230821210839.webp','active'),(108,'63second-20230821210839.webp','2023-08-21 14:08:40','2023-08-21 14:08:40',63,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/63second-20230821210839.webp','active'),(109,'64main-20230821210859.webp','2023-08-21 14:09:00','2023-08-21 14:09:00',64,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/64main-20230821210859.webp','active'),(110,'64second-20230821210859.webp','2023-08-21 14:09:00','2023-08-21 14:09:00',64,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/64second-20230821210859.webp','active'),(111,'65main-20230821210929.webp','2023-08-21 14:09:29','2023-08-21 14:09:29',65,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/65main-20230821210929.webp','active'),(112,'65second-20230821210929.webp','2023-08-21 14:09:29','2023-08-21 14:09:29',65,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/65second-20230821210929.webp','active'),(113,'66main-20230821210950.webp','2023-08-21 14:09:50','2023-08-21 14:09:50',66,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/66main-20230821210950.webp','active'),(114,'66second-20230821210950.webp','2023-08-21 14:09:50','2023-08-21 14:09:50',66,'E:\\DuAnTotNghiep_OK\\du-an-tot-nghiep\\datn-fe\\public\\image/66second-20230821210950.webp','active'),(115,'47main-20230822171958.webp','2023-08-22 10:19:59','2023-08-22 10:19:59',47,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/47main-20230822171958.webp','active'),(116,'47second-20230822171958.webp','2023-08-22 10:19:59','2023-08-22 10:19:59',47,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/47second-20230822171958.webp','active'),(117,'62main-20230822172100.webp','2023-08-22 10:21:01','2023-08-22 10:21:01',62,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/62main-20230822172100.webp','active'),(118,'62second-20230822172100.webp','2023-08-22 10:21:01','2023-08-22 10:21:01',62,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/62second-20230822172100.webp','active'),(119,'60main-20230822172255.webp','2023-08-22 10:22:55','2023-08-22 10:22:55',60,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/60main-20230822172255.webp','active'),(120,'60second-20230822172255.webp','2023-08-22 10:22:55','2023-08-22 10:22:55',60,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/60second-20230822172255.webp','active'),(121,'59main-20230822172324.webp','2023-08-22 10:23:25','2023-08-22 10:23:25',59,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/59main-20230822172324.webp','active'),(122,'59second-20230822172324.webp','2023-08-22 10:23:25','2023-08-22 10:23:25',59,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/59second-20230822172324.webp','active'),(123,'58main-20230822172347.webp','2023-08-22 10:23:47','2023-08-22 10:23:47',58,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/58main-20230822172347.webp','active'),(124,'58second-20230822172347.webp','2023-08-22 10:23:47','2023-08-22 10:23:47',58,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/58second-20230822172347.webp','active'),(125,'57main-20230822172416.webp','2023-08-22 10:24:17','2023-08-22 10:24:17',57,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/57main-20230822172416.webp','active'),(126,'57second-20230822172416.webp','2023-08-22 10:24:17','2023-08-22 10:24:17',57,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/57second-20230822172416.webp','active'),(127,'56main-20230822172442.webp','2023-08-22 10:24:43','2023-08-22 10:24:43',56,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/56main-20230822172442.webp','active'),(128,'56second-20230822172442.webp','2023-08-22 10:24:43','2023-08-22 10:24:43',56,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/56second-20230822172442.webp','active'),(129,'55main-20230822172528.webp','2023-08-22 10:25:29','2023-08-22 10:25:29',55,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/55main-20230822172528.webp','active'),(130,'55second-20230822172528.webp','2023-08-22 10:25:29','2023-08-22 10:25:29',55,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/55second-20230822172528.webp','active'),(131,'54main-20230822172552.webp','2023-08-22 10:25:53','2023-08-22 10:25:53',54,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/54main-20230822172552.webp','active'),(132,'54second-20230822172552.webp','2023-08-22 10:25:53','2023-08-22 10:25:53',54,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/54second-20230822172552.webp','active'),(133,'51main-20230822172645.webp','2023-08-22 10:26:45','2023-08-22 10:26:45',51,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/51main-20230822172645.webp','active'),(134,'51second-20230822172645.webp','2023-08-22 10:26:45','2023-08-22 10:26:45',51,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/51second-20230822172645.webp','active'),(135,'50main-20230822172709.webp','2023-08-22 10:27:09','2023-08-22 10:27:09',50,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/50main-20230822172709.webp','active'),(136,'50second-20230822172709.webp','2023-08-22 10:27:09','2023-08-22 10:27:09',50,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/50second-20230822172709.webp','active'),(137,'49main-20230822172736.webp','2023-08-22 10:27:36','2023-08-22 10:27:36',49,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/49main-20230822172736.webp','active'),(138,'49second-20230822172736.webp','2023-08-22 10:27:36','2023-08-22 10:27:36',49,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/49second-20230822172736.webp','active'),(139,'48main-20230822172801.webp','2023-08-22 10:28:01','2023-08-22 10:28:01',48,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/48main-20230822172801.webp','active'),(140,'48second-20230822172801.webp','2023-08-22 10:28:02','2023-08-22 10:28:02',48,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/48second-20230822172801.webp','active'),(141,'46main-20230822174710.webp','2023-08-22 10:47:10','2023-08-22 10:47:10',46,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/46main-20230822174710.webp','active'),(142,'46second-20230822174710.webp','2023-08-22 10:47:10','2023-08-22 10:47:10',46,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/46second-20230822174710.webp','active'),(143,'30main-20230822174735.webp','2023-08-22 10:47:35','2023-08-22 10:47:35',30,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/30main-20230822174735.webp','active'),(144,'30second-20230822174735.webp','2023-08-22 10:47:35','2023-08-22 10:47:35',30,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/30second-20230822174735.webp','active'),(145,'31main-20230822174755.webp','2023-08-22 10:47:56','2023-08-22 10:47:56',31,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/31main-20230822174755.webp','active'),(146,'31second-20230822174755.webp','2023-08-22 10:47:56','2023-08-22 10:47:56',31,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/31second-20230822174755.webp','active'),(147,'32main-20230822174826.webp','2023-08-22 10:48:26','2023-08-22 10:48:26',32,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/32main-20230822174826.webp','active'),(148,'32second-20230822174826.webp','2023-08-22 10:48:26','2023-08-22 10:48:26',32,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/32second-20230822174826.webp','active'),(149,'33main-20230822174857.webp','2023-08-22 10:48:58','2023-08-22 10:48:58',33,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/33main-20230822174857.webp','active'),(150,'33second-20230822174857.webp','2023-08-22 10:48:58','2023-08-22 10:48:58',33,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/33second-20230822174857.webp','active'),(151,'34main-20230822174918.webp','2023-08-22 10:49:18','2023-08-22 10:49:18',34,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/34main-20230822174918.webp','active'),(152,'34second-20230822174918.webp','2023-08-22 10:49:18','2023-08-22 10:49:18',34,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/34second-20230822174918.webp','active'),(153,'35main-20230822174939.webp','2023-08-22 10:49:39','2023-08-22 10:49:39',35,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/35main-20230822174939.webp','active'),(154,'35second-20230822174939.webp','2023-08-22 10:49:39','2023-08-22 10:49:39',35,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/35second-20230822174939.webp','active'),(155,'36main-20230822175000.webp','2023-08-22 10:50:01','2023-08-22 10:50:01',36,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/36main-20230822175000.webp','active'),(156,'36second-20230822175000.webp','2023-08-22 10:50:01','2023-08-22 10:50:01',36,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/36second-20230822175000.webp','active'),(157,'38main-20230822175021.webp','2023-08-22 10:50:22','2023-08-22 10:50:22',38,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/38main-20230822175021.webp','active'),(158,'38second-20230822175021.webp','2023-08-22 10:50:22','2023-08-22 10:50:22',38,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/38second-20230822175021.webp','active'),(159,'39main-20230822175042.webp','2023-08-22 10:50:42','2023-08-22 10:50:42',39,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/39main-20230822175042.webp','active'),(160,'39second-20230822175042.webp','2023-08-22 10:50:42','2023-08-22 10:50:42',39,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/39second-20230822175042.webp','active'),(161,'40main-20230822175115.webp','2023-08-22 10:51:16','2023-08-22 10:51:16',40,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/40main-20230822175115.webp','active'),(162,'40second-20230822175115.webp','2023-08-22 10:51:16','2023-08-22 10:51:16',40,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/40second-20230822175115.webp','active'),(163,'41main-20230822175142.webp','2023-08-22 10:51:42','2023-08-22 10:51:42',41,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/41main-20230822175142.webp','active'),(164,'41second-20230822175142.webp','2023-08-22 10:51:42','2023-08-22 10:51:42',41,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/41second-20230822175142.webp','active'),(165,'42main-20230822175212.webp','2023-08-22 10:52:12','2023-08-22 10:52:12',42,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/42main-20230822175212.webp','active'),(166,'42second-20230822175212.webp','2023-08-22 10:52:12','2023-08-22 10:52:12',42,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/42second-20230822175212.webp','active'),(167,'43main-20230822175235.webp','2023-08-22 10:52:36','2023-08-22 10:52:36',43,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/43main-20230822175235.webp','active'),(168,'43second-20230822175235.webp','2023-08-22 10:52:36','2023-08-22 10:52:36',43,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/43second-20230822175235.webp','active'),(169,'44main-20230822175335.webp','2023-08-22 10:53:36','2023-08-22 10:53:36',44,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/44main-20230822175335.webp','active'),(170,'44second-20230822175335.webp','2023-08-22 10:53:36','2023-08-22 10:53:36',44,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/44second-20230822175335.webp','active'),(171,'45main-20230822175402.webp','2023-08-22 10:54:03','2023-08-22 10:54:03',45,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/45main-20230822175402.webp','active'),(172,'45second-20230822175402.webp','2023-08-22 10:54:03','2023-08-22 10:54:03',45,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/45second-20230822175402.webp','active'),(173,'61main-20230822175622.webp','2023-08-22 10:56:22','2023-08-22 10:56:22',61,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/61main-20230822175622.webp','active'),(174,'61second-20230822175622.webp','2023-08-22 10:56:22','2023-08-22 10:56:22',61,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/61second-20230822175622.webp','active'),(175,'52main-20230822175750.webp','2023-08-22 10:57:51','2023-08-22 10:57:51',52,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/52main-20230822175750.webp','active'),(176,'52second-20230822175750.webp','2023-08-22 10:57:51','2023-08-22 10:57:51',52,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/52second-20230822175750.webp','active'),(177,'53main-20230822175951.webp','2023-08-22 10:59:51','2023-08-22 10:59:51',53,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/53main-20230822175951.webp','active'),(178,'53second-20230822175951.webp','2023-08-22 10:59:51','2023-08-22 10:59:51',53,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/53second-20230822175951.webp','active'),(179,'37main-20230822180158.webp','2023-08-22 11:01:59','2023-08-22 11:01:59',37,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/37main-20230822180158.webp','active'),(180,'37second-20230822180158.webp','2023-08-22 11:01:59','2023-08-22 11:01:59',37,'E:\\thithi\\du-an-tot-nghiep\\datn-fe\\public\\image/37second-20230822180158.webp','active');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `product_code` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `manufacturer` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `is_new` tinyint unsigned DEFAULT '0',
  `is_best_seller` tinyint unsigned DEFAULT '0',
  `is_active` tinyint unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`product_code`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (30,'Nike Classic Aoo1','P0030','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',1,0,1),(31,'Nike Dunk Low By You','P0031','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',0,1,0),(32,'Nike Air Force','P0032','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',0,0,1),(33,'Nike Revolution','P0033','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',1,0,0),(34,'Nike Air Force 1 High','P0034','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',0,1,1),(35,'Nike Downshifter','P0035','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',0,0,1),(36,'Nike Go FlyEase 7','P0036','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',1,0,1),(37,'Nike Dunk Hi Retro 8','P0037','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',0,1,0),(38,'NikeCourt Legacy','P0038','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',1,0,0),(39,'Nike Alphafly2','P0039','Nike','2023-06-24 02:15:22','2023-06-24 02:15:22','active',0,1,1),(40,'Nike Dunk Hight Retro','P0040','Nike','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(41,'Nike Classic Impact4','P0041','Nike','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(42,'Nike Zoom Mercurial Supperfly','P0042','Nike','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(43,'Nike Pegasus','P0043','Nike','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(44,'Adidas Adizero SL','Ads01','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(45,'Adidas Ultraboost Light','Ads02','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(46,'Adidas Predator Accracyo','Ads03','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(47,'Adidas Originals Stan','Ads04','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(48,'Adidas Suppernova 3','Ads05','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(49,'Adidas Duramo10','Ads06','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(50,'Adidas Advantage','Ads07','Adidas','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(51,'Balance Fuelcell Elite','blc01',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(52,'Balance Fresh Foam','blc02',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(53,'Balance Classic 574','blc03',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(54,'Balance Shifted','blc04',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(55,'Balance 574','blc05',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(56,'Balance XC-72 Shifted','blc06',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(57,'Balance Classic Ml574Evg','blc07',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(58,'Balance 550 Sea Salt True Red','blc08',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(59,'Balance BB550LWT','blc09',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1),(60,'Balance DAHOOD HUB x Wmns 5740','blc011',' Balance','2023-07-30 19:50:02','2023-07-30 19:50:02','active',0,0,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color_size`
--

DROP TABLE IF EXISTS `product_color_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color_size` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10,0) DEFAULT '0',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_product` bigint unsigned DEFAULT NULL,
  `id_color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_color` (`id_color`),
  CONSTRAINT `product_color_size_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `product_color_size_ibfk_2` FOREIGN KEY (`id_color`) REFERENCES `color` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color_size`
--

LOCK TABLES `product_color_size` WRITE;
/*!40000 ALTER TABLE `product_color_size` DISABLE KEYS */;
INSERT INTO `product_color_size` VALUES (30,1100000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',30,'000000'),(31,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',30,'0000FF'),(32,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',30,'FF0000'),(33,1000000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',30,'FFFFFF'),(34,50,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',31,'000000'),(35,100,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',31,'0000FF'),(36,1830000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',31,'FF0000'),(37,1930000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',31,'FFFFFF'),(38,979000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',32,'000000'),(39,999000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',32,'0000FF'),(40,989000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',32,'FF0000'),(41,999000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',32,'FFFFFF'),(42,1250000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',33,'000000'),(43,1250000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',33,'0000FF'),(44,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',33,'FFFFFF'),(45,1600000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',34,'000000'),(46,1600000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',34,'0000FF'),(47,1600000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',34,'FFFFFF'),(48,1800000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',35,'000000'),(49,1800000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',35,'0000FF'),(50,1750000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',35,'FFFFFF'),(51,900000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',36,'FFFFFF'),(52,900000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',36,'0000FF'),(53,900000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',36,'000000'),(54,950000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',37,'FFFFFF'),(55,990000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',37,'0000FF'),(56,950000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',37,'000000'),(57,7790000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',38,'FFFFFF'),(58,7790000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',38,'0000FF'),(59,7990000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',38,'000000'),(60,2690000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',39,'FFFFFF'),(61,2590000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',39,'0000FF'),(62,2690000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',39,'000000'),(63,1750000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',40,'FFFFFF'),(64,1690000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',40,'0000FF'),(65,1690000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',40,'000000'),(66,1290000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',41,'FFFFFF'),(67,1290000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',41,'0000FF'),(68,1390000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',41,'000000'),(69,900000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',42,'FFFFFF'),(70,940000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',42,'0000FF'),(71,990000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',42,'000000'),(72,3500000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',43,'FFFFFF'),(73,3500000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',43,'0000FF'),(74,3500000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',43,'000000'),(75,800000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',44,'FFFFFF'),(76,890000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',44,'0000FF'),(77,80000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',44,'000000'),(78,1830000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',45,'FFFFFF'),(79,1830000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',45,'0000FF'),(80,1930000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',45,'000000'),(81,840000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',49,'FFFFFF'),(82,890000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',49,'0000FF'),(83,800000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',49,'000000'),(84,1000000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',50,'FFFFFF'),(85,1050000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',50,'0000FF'),(86,1000000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',50,'000000'),(87,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',51,'FFFFFF'),(88,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',51,'0000FF'),(89,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',51,'000000'),(90,700000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',52,'FFFFFF'),(91,720000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',52,'0000FF'),(92,700000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',52,'000000'),(93,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',53,'FFFFFF'),(94,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',53,'0000FF'),(95,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',53,'000000'),(96,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',54,'FFFFFF'),(97,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',54,'0000FF'),(98,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',54,'000000'),(99,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',55,'FFFFFF'),(100,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',55,'0000FF'),(101,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',55,'000000'),(102,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',56,'FFFFFF'),(103,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',56,'0000FF'),(104,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',56,'000000'),(105,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',57,'FFFFFF'),(106,1200000,'2023-06-24 02:15:22','2023-06-24 02:15:22','active',57,'0000FF');
/*!40000 ALTER TABLE `product_color_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT '0',
  `id_pcs` bigint unsigned DEFAULT NULL,
  `id_size` int unsigned DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pcs` (`id_pcs`),
  KEY `id_size` (`id_size`),
  CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`id_pcs`) REFERENCES `product_color_size` (`id`),
  CONSTRAINT `product_detail_ibfk_2` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=650 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (30,48,30,1,'active'),(31,50,30,2,'active'),(32,50,30,3,'active'),(33,50,30,4,'active'),(34,49,30,5,'active'),(35,49,30,6,'active'),(36,50,30,7,'active'),(37,50,30,8,'active'),(38,50,30,9,'active'),(39,50,30,10,'active'),(40,49,30,11,'active'),(41,30,31,2,'active'),(42,30,31,3,'active'),(43,30,31,4,'active'),(44,30,31,5,'active'),(45,30,31,6,'active'),(46,30,31,7,'active'),(47,30,31,8,'active'),(48,30,31,9,'active'),(49,30,32,2,'active'),(50,30,32,3,'active'),(51,30,32,4,'active'),(52,30,32,5,'active'),(53,30,32,6,'active'),(54,30,32,7,'active'),(55,30,32,8,'active'),(56,30,32,9,'active'),(57,30,33,2,'active'),(58,29,33,3,'active'),(59,30,33,4,'active'),(60,30,33,5,'active'),(61,30,33,6,'active'),(62,30,33,7,'active'),(63,30,33,8,'active'),(64,30,33,9,'active'),(65,30,34,2,'active'),(66,30,34,3,'active'),(67,30,34,4,'active'),(68,30,34,5,'active'),(69,30,34,6,'active'),(70,30,34,7,'active'),(71,30,34,8,'active'),(72,30,34,9,'active'),(73,30,35,2,'active'),(74,30,35,3,'active'),(75,30,35,4,'active'),(76,30,35,5,'active'),(77,30,35,6,'active'),(78,30,35,7,'active'),(79,30,35,8,'active'),(80,30,35,9,'active'),(81,30,36,2,'active'),(82,30,36,3,'active'),(83,30,36,4,'active'),(84,30,36,5,'active'),(85,30,36,6,'active'),(86,30,36,7,'active'),(87,30,36,8,'active'),(88,30,36,9,'active'),(89,30,37,2,'active'),(90,30,37,3,'active'),(91,30,37,4,'active'),(92,30,37,5,'active'),(93,30,37,6,'active'),(94,30,37,7,'active'),(95,30,37,8,'active'),(96,30,37,9,'active'),(97,30,38,2,'active'),(98,30,38,3,'active'),(99,30,38,4,'active'),(100,30,38,5,'active'),(101,30,38,6,'active'),(102,30,38,7,'active'),(103,30,38,8,'active'),(104,30,38,9,'active'),(105,30,39,2,'active'),(106,30,39,3,'active'),(107,30,39,4,'active'),(108,30,39,5,'active'),(109,30,39,6,'active'),(110,30,39,7,'active'),(111,30,39,8,'active'),(112,30,39,9,'active'),(113,30,40,2,'active'),(114,30,40,3,'active'),(115,30,40,4,'active'),(116,30,40,5,'active'),(117,30,40,6,'active'),(118,30,40,7,'active'),(119,30,40,8,'active'),(120,30,40,9,'active'),(121,30,41,2,'active'),(122,30,41,3,'active'),(123,30,41,4,'active'),(124,30,41,5,'active'),(125,30,41,6,'active'),(126,30,41,7,'active'),(127,30,41,8,'active'),(128,30,41,9,'active'),(129,30,42,2,'active'),(130,30,42,3,'active'),(131,30,42,4,'active'),(132,30,42,5,'active'),(133,30,42,6,'active'),(134,30,42,7,'active'),(135,30,42,8,'active'),(136,30,42,9,'active'),(137,30,43,2,'active'),(138,30,43,3,'active'),(139,30,43,4,'active'),(140,30,43,5,'active'),(141,30,43,6,'active'),(142,30,43,7,'active'),(143,30,43,8,'active'),(144,30,43,9,'active'),(145,30,44,2,'active'),(146,30,44,3,'active'),(147,30,44,4,'active'),(148,30,44,5,'active'),(149,30,44,6,'active'),(150,30,44,7,'active'),(151,30,44,8,'active'),(152,30,44,9,'active'),(153,30,45,2,'active'),(154,30,45,3,'active'),(155,30,45,4,'active'),(156,30,45,5,'active'),(157,30,45,6,'active'),(158,30,45,7,'active'),(159,30,45,8,'active'),(160,30,45,9,'active'),(161,30,46,2,'active'),(162,30,46,3,'active'),(163,30,46,4,'active'),(164,30,46,5,'active'),(165,30,46,6,'active'),(166,30,46,7,'active'),(167,30,46,8,'active'),(168,30,46,9,'active'),(169,30,47,2,'active'),(170,30,47,3,'active'),(171,30,47,4,'active'),(172,30,47,5,'active'),(173,30,47,6,'active'),(174,30,47,7,'active'),(175,30,47,8,'active'),(176,30,47,9,'active'),(177,30,48,2,'active'),(178,30,48,3,'active'),(179,30,48,4,'active'),(180,30,48,5,'active'),(181,30,48,6,'active'),(182,30,48,7,'active'),(183,30,48,8,'active'),(184,30,48,9,'active'),(185,30,49,2,'active'),(186,30,49,3,'active'),(187,30,49,4,'active'),(188,30,49,5,'active'),(189,30,49,6,'active'),(190,30,49,7,'active'),(191,30,49,8,'active'),(192,30,49,9,'active'),(193,30,50,2,'active'),(194,30,50,3,'active'),(195,30,50,4,'active'),(196,30,50,5,'active'),(197,30,50,6,'active'),(198,30,50,7,'active'),(199,30,50,8,'active'),(200,30,50,9,'active'),(201,30,51,2,'active'),(202,30,51,3,'active'),(203,30,51,4,'active'),(204,30,51,5,'active'),(205,30,51,6,'active'),(206,30,51,7,'active'),(207,30,51,8,'active'),(208,30,51,9,'active'),(209,30,52,2,'active'),(210,30,52,3,'active'),(211,30,52,4,'active'),(212,30,52,5,'active'),(213,30,52,6,'active'),(214,30,52,7,'active'),(215,30,52,8,'active'),(216,30,52,9,'active'),(217,30,53,2,'active'),(218,30,53,3,'active'),(219,30,53,4,'active'),(220,30,53,5,'active'),(221,30,53,6,'active'),(222,30,53,7,'active'),(223,30,53,8,'active'),(224,30,53,9,'active'),(225,30,54,2,'active'),(226,30,54,3,'active'),(227,30,54,4,'active'),(228,30,54,5,'active'),(229,30,54,6,'active'),(230,30,54,7,'active'),(231,30,54,8,'active'),(232,30,54,9,'active'),(233,25,55,2,'active'),(234,30,55,3,'active'),(235,30,55,4,'active'),(236,26,55,5,'active'),(237,30,55,6,'active'),(238,30,55,7,'active'),(239,30,55,8,'active'),(240,24,55,9,'active'),(241,30,56,2,'active'),(242,30,56,3,'active'),(243,30,56,4,'active'),(244,30,56,5,'active'),(245,30,56,6,'active'),(246,30,56,7,'active'),(247,30,56,8,'active'),(248,30,56,9,'active'),(249,30,57,2,'active'),(250,30,57,3,'active'),(251,30,57,4,'active'),(252,30,57,5,'active'),(253,30,57,6,'active'),(254,30,57,7,'active'),(255,30,57,8,'active'),(256,30,57,9,'active'),(257,30,58,2,'active'),(258,30,58,3,'active'),(259,30,58,4,'active'),(260,30,58,5,'active'),(261,30,58,6,'active'),(262,30,58,7,'active'),(263,30,58,8,'active'),(264,30,58,9,'active'),(265,30,59,2,'active'),(266,30,59,3,'active'),(267,30,59,4,'active'),(268,30,59,5,'active'),(269,30,59,6,'active'),(270,30,59,7,'active'),(271,30,59,8,'active'),(272,30,59,9,'active'),(273,30,60,2,'active'),(274,30,60,3,'active'),(275,30,60,4,'active'),(276,30,60,5,'active'),(277,30,60,6,'active'),(278,30,60,7,'active'),(279,30,60,8,'active'),(280,30,60,9,'active'),(281,30,61,2,'active'),(282,30,61,3,'active'),(283,30,61,4,'active'),(284,30,61,5,'active'),(285,30,61,6,'active'),(286,30,61,7,'active'),(287,30,61,8,'active'),(288,30,61,9,'active'),(289,30,62,2,'active'),(290,30,62,3,'active'),(291,30,62,4,'active'),(292,30,62,5,'active'),(293,30,62,6,'active'),(294,30,62,7,'active'),(295,30,62,8,'active'),(296,30,62,9,'active'),(297,29,63,2,'active'),(298,30,63,3,'active'),(299,30,63,4,'active'),(300,30,63,5,'active'),(301,29,63,6,'active'),(302,30,63,7,'active'),(303,29,63,8,'active'),(304,30,63,9,'active'),(305,30,64,2,'active'),(306,30,64,3,'active'),(307,30,64,4,'active'),(308,30,64,5,'active'),(309,30,64,6,'active'),(310,30,64,7,'active'),(311,30,64,8,'active'),(312,29,64,9,'active'),(313,30,65,2,'active'),(314,30,65,3,'active'),(315,30,65,4,'active'),(316,30,65,5,'active'),(317,30,65,6,'active'),(318,30,65,7,'active'),(319,30,65,8,'active'),(320,30,65,9,'active'),(321,30,66,2,'active'),(322,30,66,3,'active'),(323,30,66,4,'active'),(324,30,66,5,'active'),(325,30,66,6,'active'),(326,30,66,7,'active'),(327,30,66,8,'active'),(328,30,66,9,'active'),(329,30,67,2,'active'),(330,30,67,3,'active'),(331,30,67,4,'active'),(332,30,67,5,'active'),(333,30,67,6,'active'),(334,30,67,7,'active'),(335,30,67,8,'active'),(336,30,67,9,'active'),(337,30,68,2,'active'),(338,30,68,3,'active'),(339,30,68,4,'active'),(340,30,68,5,'active'),(341,30,68,6,'active'),(342,30,68,7,'active'),(343,30,68,8,'active'),(344,30,68,9,'active'),(345,30,69,2,'active'),(346,30,69,3,'active'),(347,30,69,4,'active'),(348,30,69,5,'active'),(349,30,69,6,'active'),(350,30,69,7,'active'),(351,30,69,8,'active'),(352,29,69,9,'active'),(353,30,70,2,'active'),(354,30,70,3,'active'),(355,30,70,4,'active'),(356,30,70,5,'active'),(357,30,70,6,'active'),(358,24,70,7,'active'),(359,30,70,8,'active'),(360,30,70,9,'active'),(361,30,71,2,'active'),(362,30,71,3,'active'),(363,30,71,4,'active'),(364,30,71,5,'active'),(365,30,71,6,'active'),(366,30,71,7,'active'),(367,30,71,8,'active'),(368,30,71,9,'active'),(369,30,72,2,'active'),(370,30,72,3,'active'),(371,30,72,4,'active'),(372,30,72,5,'active'),(373,30,72,6,'active'),(374,30,72,7,'active'),(375,30,72,8,'active'),(376,29,72,9,'active'),(377,30,73,2,'active'),(378,30,73,3,'active'),(379,29,73,4,'active'),(380,30,73,5,'active'),(381,30,73,6,'active'),(382,30,73,7,'active'),(383,30,73,8,'active'),(384,30,73,9,'active'),(385,30,74,2,'active'),(386,30,74,3,'active'),(387,30,74,4,'active'),(388,30,74,5,'active'),(389,30,74,6,'active'),(390,29,74,7,'active'),(391,30,74,8,'active'),(392,30,74,9,'active'),(393,30,75,2,'active'),(394,30,75,3,'active'),(395,30,75,4,'active'),(396,30,75,5,'active'),(397,30,75,6,'active'),(398,30,75,7,'active'),(399,30,75,8,'active'),(400,30,75,9,'active'),(401,30,76,2,'active'),(402,30,76,3,'active'),(403,30,76,4,'active'),(404,30,76,5,'active'),(405,30,76,6,'active'),(406,30,76,7,'active'),(407,30,76,8,'active'),(408,30,76,9,'active'),(409,30,77,2,'active'),(410,30,77,3,'active'),(411,30,77,4,'active'),(412,30,77,5,'active'),(413,30,77,6,'active'),(414,30,77,7,'active'),(415,30,77,8,'active'),(416,30,77,9,'active'),(417,30,78,2,'active'),(418,30,78,3,'active'),(419,30,78,4,'active'),(420,30,78,5,'active'),(421,30,78,6,'active'),(422,28,78,7,'active'),(423,30,78,8,'active'),(424,28,78,9,'active'),(425,30,79,2,'active'),(426,30,79,3,'active'),(427,30,79,4,'active'),(428,30,79,5,'active'),(429,30,79,6,'active'),(430,30,79,7,'active'),(431,30,79,8,'active'),(432,30,79,9,'active'),(433,30,80,2,'active'),(434,30,80,3,'active'),(435,30,80,4,'active'),(436,30,80,5,'active'),(437,30,80,6,'active'),(438,30,80,7,'active'),(439,30,80,8,'active'),(440,30,80,9,'active'),(441,30,81,2,'active'),(442,30,81,3,'active'),(443,30,81,4,'active'),(444,30,81,5,'active'),(445,30,81,6,'active'),(446,30,81,7,'active'),(447,30,81,8,'active'),(448,30,81,9,'active'),(449,30,82,2,'active'),(450,30,82,3,'active'),(451,30,82,4,'active'),(452,30,82,5,'active'),(453,30,82,6,'active'),(454,27,82,7,'active'),(455,30,82,8,'active'),(456,30,82,9,'active'),(457,30,83,2,'active'),(458,30,83,3,'active'),(459,30,83,4,'active'),(460,30,83,5,'active'),(461,30,83,6,'active'),(462,30,83,7,'active'),(463,30,83,8,'active'),(464,30,83,9,'active'),(465,30,84,2,'active'),(466,30,84,3,'active'),(467,30,84,4,'active'),(468,30,84,5,'active'),(469,30,84,6,'active'),(470,30,84,7,'active'),(471,30,84,8,'active'),(472,29,84,9,'active'),(473,30,85,2,'active'),(474,30,85,3,'active'),(475,30,85,4,'active'),(476,30,85,5,'active'),(477,28,85,6,'active'),(478,30,85,7,'active'),(479,30,85,8,'active'),(480,30,85,9,'active'),(481,30,86,2,'active'),(482,30,86,3,'active'),(483,30,86,4,'active'),(484,30,86,5,'active'),(485,30,86,6,'active'),(486,30,86,7,'active'),(487,30,86,8,'active'),(488,30,86,9,'active'),(489,30,87,2,'active'),(490,30,87,3,'active'),(491,30,87,4,'active'),(492,30,87,5,'active'),(493,30,87,6,'active'),(494,30,87,7,'active'),(495,30,87,8,'active'),(496,30,87,9,'active'),(497,30,88,2,'active'),(498,30,88,3,'active'),(499,30,88,4,'active'),(500,30,88,5,'active'),(501,30,88,6,'active'),(502,30,88,7,'active'),(503,30,88,8,'active'),(504,30,88,9,'active'),(505,30,89,2,'active'),(506,30,89,3,'active'),(507,30,89,4,'active'),(508,30,89,5,'active'),(509,30,89,6,'active'),(510,30,89,7,'active'),(511,30,89,8,'active'),(512,30,89,9,'active'),(513,30,90,2,'active'),(514,30,90,3,'active'),(515,30,90,4,'active'),(516,30,90,5,'active'),(517,30,90,6,'active'),(518,30,90,7,'active'),(519,30,90,8,'active'),(520,30,90,9,'active'),(521,30,91,2,'active'),(522,30,91,3,'active'),(523,29,91,4,'active'),(524,30,91,5,'active'),(525,30,91,6,'active'),(526,30,91,7,'active'),(527,30,91,8,'active'),(528,28,91,9,'active'),(529,30,92,2,'active'),(530,30,92,3,'active'),(531,30,92,4,'active'),(532,30,92,5,'active'),(533,30,92,6,'active'),(534,30,92,7,'active'),(535,30,92,8,'active'),(536,30,92,9,'active'),(537,30,93,2,'active'),(538,30,93,3,'active'),(539,30,93,4,'active'),(540,30,93,5,'active'),(541,30,93,6,'active'),(542,30,93,7,'active'),(543,30,93,8,'active'),(544,30,93,9,'active'),(545,30,94,2,'active'),(546,30,94,3,'active'),(547,30,94,4,'active'),(548,30,94,5,'active'),(549,29,94,6,'active'),(550,30,94,7,'active'),(551,30,94,8,'active'),(552,30,94,9,'active'),(553,30,95,2,'inactive'),(554,30,95,3,'inactive'),(555,30,95,4,'inactive'),(556,30,95,5,'inactive'),(557,30,95,6,'inactive'),(558,30,95,7,'inactive'),(559,30,95,8,'active'),(560,29,95,9,'active'),(561,30,96,2,'active'),(562,30,96,3,'active'),(563,30,96,4,'active'),(564,30,96,5,'active'),(565,30,96,6,'active'),(566,30,96,7,'active'),(567,21,96,8,'active'),(568,30,96,9,'active'),(569,30,97,2,'active'),(570,30,97,3,'active'),(571,30,97,4,'active'),(572,30,97,5,'active'),(573,30,97,6,'active'),(574,30,97,7,'active'),(575,30,97,8,'active'),(576,30,97,9,'active'),(577,30,98,2,'active'),(578,0,98,3,'active'),(579,30,98,4,'active'),(580,30,98,5,'active'),(581,30,98,6,'active'),(582,30,98,7,'active'),(583,30,98,8,'active'),(584,30,98,9,'active'),(585,30,99,2,'active'),(586,30,99,3,'active'),(587,29,99,4,'active'),(588,30,99,5,'active'),(589,30,99,6,'active'),(590,30,99,7,'active'),(591,30,99,8,'active'),(592,30,99,9,'active'),(593,30,100,2,'active'),(594,30,100,3,'active'),(595,30,100,4,'active'),(596,30,100,5,'active'),(597,30,100,6,'active'),(598,30,100,7,'active'),(599,30,100,8,'active'),(600,30,100,9,'active'),(601,30,101,2,'active'),(602,30,101,3,'active'),(603,30,101,4,'active'),(604,30,101,5,'active'),(605,30,101,6,'active'),(606,30,101,7,'active'),(607,29,101,8,'active'),(608,30,101,9,'active'),(609,30,102,2,'active'),(610,29,102,3,'active'),(611,30,102,4,'active'),(612,30,102,5,'active'),(613,30,102,6,'active'),(614,29,102,7,'active'),(615,30,102,8,'active'),(616,29,102,9,'active'),(617,30,103,2,'active'),(618,28,103,3,'active'),(619,30,103,4,'active'),(620,29,103,5,'active'),(621,30,103,6,'active'),(622,29,103,7,'active'),(623,29,103,8,'active'),(624,29,103,9,'active'),(625,30,104,2,'active'),(626,30,104,3,'active'),(627,30,104,4,'active'),(628,29,104,5,'active'),(629,30,104,6,'active'),(630,30,104,7,'active'),(631,0,104,8,'active'),(632,0,104,9,'active'),(633,29,105,2,'active'),(634,30,105,3,'active'),(635,28,105,4,'active'),(636,27,105,5,'active'),(637,29,105,6,'active'),(638,28,105,7,'active'),(639,30,105,8,'active'),(640,27,105,9,'active'),(641,28,106,2,'active'),(642,28,106,3,'active'),(643,26,106,4,'active'),(644,25,106,5,'active'),(645,28,106,6,'active'),(646,26,106,7,'active'),(647,30,106,8,'active'),(648,13,106,9,'active');
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `discount_value` decimal(10,0) DEFAULT NULL,
  `start_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,'Mùa hè sôi động','Đập tan cái nóng với chương trình khuyến mãi lên đến 30%',30,'2023-05-31 17:00:00','2023-07-29 17:00:00','2023-06-24 02:15:22','2023-07-27 14:44:55','inactive'),(2,'Trở lại trường học','Mừng ngày quay lại trường giảm giá lên đến 20%',20,'2023-08-19 17:00:00','2023-08-27 17:00:00','2023-08-24 02:15:22','2023-08-22 07:50:55','active');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion_detail`
--

DROP TABLE IF EXISTS `promotion_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_detail` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_pcs` bigint unsigned DEFAULT NULL,
  `id_promotion` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pcs` (`id_pcs`),
  KEY `id_promotion` (`id_promotion`),
  CONSTRAINT `promotion_detail_ibfk_1` FOREIGN KEY (`id_pcs`) REFERENCES `product_color_size` (`id`),
  CONSTRAINT `promotion_detail_ibfk_2` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1401 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_detail`
--

LOCK TABLES `promotion_detail` WRITE;
/*!40000 ALTER TABLE `promotion_detail` DISABLE KEYS */;
INSERT INTO `promotion_detail` VALUES (1395,95,2),(1396,94,2),(1397,93,2),(1398,74,2),(1399,73,2),(1400,72,2);
/*!40000 ALTER TABLE `promotion_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'DIRECTOR','2023-05-01 09:34:48','2023-05-01 09:34:57','1'),(2,'STAFF','2023-05-01 09:35:28','2023-05-01 09:35:33','1');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'36','2001-06-04 18:46:18','2018-09-07 02:14:18','Active'),(2,'37','2011-05-04 16:49:49','2006-08-02 07:13:47','Active'),(3,'38','2016-07-30 05:33:25','2010-12-28 18:45:47','Active'),(4,'39','2014-05-04 17:25:16','2011-01-22 23:55:21','Active'),(5,'40','2009-09-11 16:57:43','2002-08-06 17:56:29','Active'),(6,'41','2005-01-05 20:02:07','2020-10-24 19:52:57','Active'),(7,'42','2011-05-10 16:37:52','2018-05-17 05:49:44','Active'),(8,'43','2000-05-09 03:01:45','2022-08-01 23:30:02','Active'),(9,'44','2018-10-11 04:30:45','2018-03-07 12:32:51','Active'),(10,'45','2012-10-07 15:46:34','2007-08-21 04:48:06','Active'),(11,'46','2023-07-28 19:00:49','2023-07-28 19:00:49','active');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_role` int unsigned NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'admin','1234567811','admin@example.com','1980-01-01','admin','$2y$10$c1qONZVnI6N/UEBAct6kCeLiwaCkgUNsOFVCex/kuC.X0VTGy8huy','2023-06-24 02:15:22','2023-06-24 02:15:22','enable',1,NULL),(12,'Nguyễn Đình Quyền','0373796713','dinhquyen11@gmail.com','2001-11-11','dinhquyen','$2a$10$j5GsAEi6xYdtBEw4G5fnOePyC/lZa6GPod/CXKPjwr75P/59AbcXK','2023-08-01 07:46:57','2023-08-01 07:46:57','enable',1,'Nam'),(13,'Nguyễn Văn Tỉnh','0373796203','tinhhp14@gmail.com','2001-08-28','tinhnmv11','$2a$10$K7HyWi0iwmQ8VugO9gEwR.uZKk3LDvGETAxUp/Drf67DzgLpwh.jK','2023-08-01 07:48:44','2023-08-01 07:48:44','enable',2,'Nam'),(14,'Hoàng Tuấn Đạt','0373866203','dathp11@gmail.com','2001-11-11','datvip01','$2a$10$JDD9kP8bdi0nEg2qIIgNEeMQ3UFzoJX8ysN1hLxT1DxvRVxOzA9eG','2023-08-01 07:49:22','2023-08-01 07:49:22','enable',2,'Nam'),(15,'Nguyễn Thành Long','0373866293','longbio@gmail.com','1007-11-21','longbiphp','$2a$10$X7I24qmutA.mFG9i/1BmQOA7caKkZo2eXKR9KIukqLxVJ7GJoUIYa','2023-08-01 07:50:04','2023-08-01 07:50:04','enable',2,'Nam'),(16,'Nguyễn Thủy Tiên','0993866293','tientien@gmail.com','1993-05-22','tientien','$2a$10$kDdd/r78QDMTNNZWTpiDjubsg9UQeuhfo/3x.WIBa0FZTm8Sb7dpa','2023-08-01 07:50:56','2023-08-20 14:45:57','enable',2,'Nữ'),(17,'Nguyễn Trâm Anh','0998866293','tramanh@gmail.com','1997-08-22','tramanh','$2a$10$QGF4QLj0wFdHD/7h29N.JuR4Jnj14TDsE4KSjTWWdlkdYzgxWb3Ku','2023-08-01 07:51:39','2023-08-01 07:51:39','enable',2,'Nu'),(18,'Nguyễn Quỳnh Nga','0728866293','quynhnga@gmail.com','1998-03-12','quynhnga14','$2a$10$o/jowpko2ntgISIeWlMkSuezVYIDlcY4KagUa9beE4RIheaWZ7jyK','2023-08-01 07:52:25','2023-08-20 14:47:01','enable',2,'Nữ'),(19,'Nguyễn Hương Giang','0728888293','huonggianido@gmail.com','1998-03-12','giangido15','$2a$10$MYTM5RJI.f5RXOBl5gfONecrkl4ddZcJnXWj/qsuEFojfohO/BJsq','2023-08-01 07:53:02','2023-08-20 14:46:53','enable',2,'Nữ'),(20,'Hoàng Trung Kiên','0393277576','kien@gmail.com','1988-01-01','kien11','$10$lYz.anpPd1C.a81NY4UCN.JedoJPhaevQySXsVjIlpnOmygm1.7kW','2023-06-24 02:15:22','2023-06-24 02:15:22','enable',2,'Nam'),(21,'Hoàng Thị Hồng','0393277575','hong11n@gmail.com','2001-11-01','hong11','$2a$10$lpcWg8DywPAiuvy9aUMx2u2ksZQZOQUiD40R.aB.t4qdzy/iUUweW','2023-06-24 02:15:22','2023-08-20 14:46:41','enable',2,'Nữ'),(22,'Hoàng Mai Lan','0393277574','lan23n@example.com','2002-06-03','lan11','$2a$10$emzjLOOCiWjgbqw6hGwh6uym1YEfw0CmXbowUdGSibhaZJ7EQeBBS','2023-06-24 02:15:22','2023-08-20 14:46:27','enable',2,'Nữ'),(23,'Trần Lan Hương','0393277573','huonglb98@example.com','1999-03-04','huong11','$2a$10$i49hGc1m8mAxCphYBnITqOenMuqrz/T9fDNy7fe77ekJKVsCBWbjS','2023-06-24 02:15:22','2023-08-20 14:46:19','enable',2,'Nữ'),(24,'Trần Quốc Toản','0393277579','toantq@example.com','1998-09-05','toantq','$2a$10$lRIXsN3YoTqxvdVoc97gfuq65cZzr3gIqPr7Ny6p5ArvDHHQ7UYji','2023-06-24 02:15:22','2023-08-20 14:46:13','enable',2,'Nam'),(25,'Bùi Hồng Vân','0969630851','vanhong11@gmail.com','1999-09-25','van99','$2a$10$okguBDGo8gdrtYvHsAX.W.YHb4vk0Q29H3jkfJMIZ8tDMZVGsVAxe','2023-06-24 02:15:22','2023-08-20 14:44:30','enable',2,'Nữ'),(26,'testStaff','0443523423','testStaff@fa.g','2023-08-17','testStaff','$2a$10$e0u8pqJSTt8gUyZXXFS8eeyJlTPPAOhUhG16l4sL6zAtduEHgKnK.','2023-08-18 02:20:53','2023-08-18 02:20:53','disable',2,'Nữ');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-23  4:48:29
