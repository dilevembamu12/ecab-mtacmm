
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `sgds_dossier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_dossier` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(512) COLLATE utf8mb4_bin NOT NULL,
  `description` text COLLATE utf8mb4_bin,
  `document_type` varchar(64) COLLATE utf8mb4_bin NOT NULL DEFAULT 'courrier_arrivee',
  `status` varchar(32) COLLATE utf8mb4_bin NOT NULL DEFAULT 'BROUILLON',
  `created_by` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `assigned_to` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sgds_dossier_status_idx` (`status`),
  KEY `sgds_dossier_created_idx` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_dossier_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_dossier_file` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dossier_id` bigint unsigned NOT NULL,
  `file_id` bigint unsigned NOT NULL,
  `role` varchar(32) COLLATE utf8mb4_bin NOT NULL DEFAULT 'ANNEXE',
  `sort_order` smallint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sgds_dossier_file_unique` (`dossier_id`,`file_id`,`role`),
  KEY `sgds_dossier_file_did_idx` (`dossier_id`),
  KEY `sgds_dossier_file_fid_idx` (`file_id`),
  CONSTRAINT `sgds_dossier_file_did_fk` FOREIGN KEY (`dossier_id`) REFERENCES `sgds_dossier` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_workflow_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_workflow_log` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dossier_id` bigint unsigned NOT NULL,
  `from_status` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `to_status` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `actor_user_id` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `actor_role` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `comment` text COLLATE utf8mb4_bin,
  `grille_pilier` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sgds_wf_log_did_idx` (`dossier_id`),
  KEY `sgds_wf_log_actor_idx` (`actor_user_id`),
  CONSTRAINT `sgds_wf_log_did_fk` FOREIGN KEY (`dossier_id`) REFERENCES `sgds_dossier` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_grille_pilier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_grille_pilier` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dossier_id` bigint unsigned NOT NULL,
  `actor_user_id` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `score_opportunite` tinyint unsigned NOT NULL DEFAULT '0',
  `commentaire_opportunite` text COLLATE utf8mb4_bin NOT NULL,
  `score_conformite` tinyint unsigned NOT NULL DEFAULT '0',
  `commentaire_conformite` text COLLATE utf8mb4_bin NOT NULL,
  `score_forme` tinyint unsigned NOT NULL DEFAULT '0',
  `commentaire_forme` text COLLATE utf8mb4_bin NOT NULL,
  `score_fond` tinyint unsigned NOT NULL DEFAULT '0',
  `commentaire_fond` text COLLATE utf8mb4_bin NOT NULL,
  `recommandation` varchar(20) COLLATE utf8mb4_bin NOT NULL DEFAULT 'FAVORABLE',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sgds_grille_did_idx` (`dossier_id`),
  KEY `sgds_grille_actor_idx` (`actor_user_id`),
  CONSTRAINT `sgds_grille_did_fk` FOREIGN KEY (`dossier_id`) REFERENCES `sgds_dossier` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_metadata_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_metadata_schema` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `document_type` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `field_name` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `field_label` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `field_type` varchar(16) COLLATE utf8mb4_bin NOT NULL DEFAULT 'text',
  `sort_order` smallint unsigned NOT NULL DEFAULT '0',
  `required` tinyint(1) DEFAULT '0',
  `options` text COLLATE utf8mb4_bin,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sgds_meta_schema_unique` (`document_type`,`field_name`),
  KEY `sgds_meta_schema_type_idx` (`document_type`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_metadata_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_metadata_value` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `file_id` bigint unsigned NOT NULL,
  `schema_id` bigint unsigned NOT NULL,
  `value` text COLLATE utf8mb4_bin,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sgds_meta_value_unique` (`file_id`,`schema_id`),
  KEY `sgds_meta_value_file_idx` (`file_id`),
  KEY `sgds_meta_value_schema_idx` (`schema_id`),
  CONSTRAINT `sgds_meta_value_schema_fk` FOREIGN KEY (`schema_id`) REFERENCES `sgds_metadata_schema` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_ocr_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_ocr_results` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `file_id` bigint unsigned NOT NULL,
  `extracted_text` longtext COLLATE utf8mb4_bin NOT NULL,
  `metadata_json` json DEFAULT NULL,
  `document_type` varchar(64) COLLATE utf8mb4_bin DEFAULT 'courrier_arrivee',
  `confidence` tinyint unsigned DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sgds_ocr_fid` (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sgds_mailgate_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sgds_mailgate_config` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `config_key` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `config_value` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sgds_mail_config_key` (`config_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

