-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 06 mai 2024 à 14:09
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `systeme`
--

-- --------------------------------------------------------

--
-- Structure de la table `activities`
--

CREATE TABLE `activities` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `activities`
--

INSERT INTO `activities` (`id`, `description`, `name`, `client_id`) VALUES
(3, 'Description of Activity 1', 'Activity 1', NULL),
(4, 'Description of Activity 2', 'Activity 2', NULL),
(12, 'Description SI', 'SI', NULL),
(13, 'Description Monétique', 'Monétique', NULL),
(14, 'Description de Multimédia', 'Multimédia', NULL),
(15, 'Description de Aerospatial', 'Aerospatial', NULL),
(16, 'Description de Télécom', 'Télécom', NULL),
(17, 'Description de databox', 'Databox', NULL),
(18, 'Description d\'électronique', 'Electronique', NULL),
(19, 'Description de mécanique', 'Mécanique', NULL),
(20, 'Description de RH', 'Ressources Humaines', NULL),
(21, 'Description d\'achat', 'Achat', NULL),
(22, 'Description de support', 'Support', NULL),
(23, 'Description de qualité', 'Qualité', NULL),
(24, 'Description de DG', 'Direction Générale', NULL),
(34, 'ggg', 'iiiiiiiiiiiiiiii', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `activity_processus`
--

CREATE TABLE `activity_processus` (
  `activity_id` bigint(20) NOT NULL,
  `processus_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `activity_processus`
--

INSERT INTO `activity_processus` (`activity_id`, `processus_id`) VALUES
(3, 3),
(3, 10),
(4, 25),
(12, 10),
(12, 11),
(12, 12),
(12, 13),
(13, 10),
(13, 11),
(13, 12),
(13, 13),
(13, 15),
(14, 10),
(14, 11),
(14, 12),
(14, 13),
(14, 15),
(15, 2),
(15, 10),
(15, 11),
(15, 12),
(15, 13),
(15, 15),
(16, 10),
(16, 11),
(16, 12),
(34, 2);

-- --------------------------------------------------------

--
-- Structure de la table `analyse`
--

CREATE TABLE `analyse` (
  `id` bigint(20) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `cause` varchar(255) DEFAULT NULL,
  `file_name` longtext DEFAULT NULL,
  `problem` varchar(255) DEFAULT NULL,
  `kpi_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `analyse`
--

INSERT INTO `analyse` (`id`, `action`, `cause`, `file_name`, `problem`, `kpi_id`) VALUES
(1, 'ggg', 'yyy', 'data (4).pdf', 'hhh', 6),
(2, 'ggg', 'yyy', 'data (4).pdf', 'hhh', 6),
(3, 'ggg', 'yyy', '4. Examen type.docx', 'hhh', 6),
(4, 'yyy', 'uuu', 'data (4).pdf', 'yyy', 7);

-- --------------------------------------------------------

--
-- Structure de la table `cadrans`
--

CREATE TABLE `cadrans` (
  `id` bigint(20) NOT NULL,
  `end_datep` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_datep` date DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `volet_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cadrans`
--

INSERT INTO `cadrans` (`id`, `end_datep`, `name`, `start_datep`, `type`, `volet_id`) VALUES
(1, NULL, 'cadran1', NULL, 'STRENGTH', 2),
(3, NULL, 'cadran2', NULL, 'OPPORTUNITY', 1),
(5, NULL, 'cadran3', NULL, 'OPPORTUNITY', 2);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Partenaires'),
(2, 'Collaborateurs/stagiaires'),
(3, 'ClientsProspets'),
(4, 'Actionaires'),
(5, 'Conseil Admin'),
(6, 'Concurents locaux'),
(7, 'les concurents à l\'echelle internationale'),
(8, 'Fonds d\'investissement+Agences de notation'),
(9, 'Media'),
(10, 'Institutions officielles et organisme internationaux'),
(11, 'les agents d\'entretien et de gardiennage'),
(12, 'Organisateus des salons/foires'),
(13, 'Universités'),
(14, 'Assurances'),
(15, 'CCE'),
(16, 'Sociéte civile_ONG_AS sociations'),
(17, 'Etat,Autrités publiques,Organisme de régulation'),
(18, 'Les concurents à l\'echelle internationale');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `active`, `name`, `phone`) VALUES
(1, b'1', 'sofrecom', 234567),
(2, b'0', 'Actia', 723456777);

-- --------------------------------------------------------

--
-- Structure de la table `kpis`
--

CREATE TABLE `kpis` (
  `id` bigint(20) NOT NULL,
  `frequence` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `objectif` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `kpis`
--

INSERT INTO `kpis` (`id`, `frequence`, `name`, `objectif`) VALUES
(1, 'Semestrielle', 'Taux de réalisation des objectifs stratégiques', 15),
(2, 'Semestrielle', 'Evolution du Chiffre d\'affaire', 12),
(3, 'Annuelle', 'Taux de réalisation des projets de prototypage', 80),
(4, 'Annuelle', 'Taux de réalisation des projets de recherche', 100),
(5, 'Annuelle', 'Taux de réalisation des produits valorisés', 50),
(6, 'Semestrielle', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90),
(7, 'Semestrielle', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90),
(8, 'Semestrielle', 'Efficacité de detection de défauts (revue)\r\n/Defect Detection Effectiveness (review)', 90),
(9, 'Semestrielle', 'Nbr des élements de sortie NC externes par activité / Nbr of external Non conforming output per activity', 1),
(10, 'Semestrielle', 'Taux d\'élements de sortie NCs internes (libérations refusées) par activité', 3),
(11, 'Semestrielle', 'Average time to resolve tickets variance (M&C)', 15),
(12, NULL, 'Ecart d\'effort/Effort Variance', NULL),
(14, NULL, 'On-Time Service Delivery', NULL),
(15, NULL, 'Ecart délai / Schedule Variance', NULL),
(16, 'Semestrielle', 'Efficacité des libérations produit', 100),
(17, 'Semestrielle', 'Taux de réalisation des 8D ', 100),
(18, 'Semestrielle', 'Taux de libération des produits', 95),
(22, NULL, 'Taux de conversion des offres en commandes pour les projets en forfait', NULL),
(24, NULL, 'Taux de conversion des offres en commandes pour les prestations d\'assistances techniques', NULL),
(26, NULL, 'Nbr de Run /Run Number (Hardware)', NULL),
(28, NULL, 'Nbre d\'intégration manqué/Failed integration number (Mécanique&Hardware)', NULL),
(30, NULL, 'Indice de satisfaction client/Customer Satisfaction Index', NULL),
(32, 'Semestrielle', 'Taux de réalisation des audits', 100),
(34, 'Semestrielle', 'Taux de réalisation des AC/Actions face aux risques', 80),
(36, 'Semestrielle', 'Efficacité des AC/Actions face aux risques', 80),
(38, 'Semestrielle', 'kpi1', 40),
(39, 'Semestrielle', 'Temps de traitement des commandes', 30),
(40, 'Semestrielle', 'Taux de service client ', 40),
(41, 'Semestrielle', 'hadil', 40);

-- --------------------------------------------------------

--
-- Structure de la table `kpi_history`
--

CREATE TABLE `kpi_history` (
  `id` bigint(20) NOT NULL,
  `end_datep` date DEFAULT NULL,
  `kpi_name` varchar(255) DEFAULT NULL,
  `kpi_objectif` int(11) DEFAULT NULL,
  `start_datep` date DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `kpi_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `kpi_history`
--

INSERT INTO `kpi_history` (`id`, `end_datep`, `kpi_name`, `kpi_objectif`, `start_datep`, `value`, `kpi_id`, `project_id`) VALUES
(1, '2022-04-28', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90, '2022-04-09', 30, 7, 1),
(2, '2024-04-28', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90, '2024-04-07', 19, 7, 1),
(3, '2022-03-21', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2022-01-01', 81, 6, 1),
(4, '2024-06-03', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-12', 66, 6, 1),
(5, '2024-05-04', 'Average time to resolve tickets variance (M&C)', 15, '2024-04-05', 13, 11, 1),
(6, '2022-05-04', 'Average time to resolve tickets variance (M&C)', 15, '2022-04-05', 15, 11, 1),
(7, '2024-07-11', 'Efficacité de detection de défauts (revue)\r\n/Defect Detection Effectiveness (review)', 90, '2024-04-08', 23, 8, 1),
(8, '2024-05-11', 'Efficacité de detection de défauts (revue)\r\n/Defect Detection Effectiveness (review)', 90, '2024-05-04', 22, 8, 1),
(9, '2023-05-24', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2023-05-03', 1, 6, 1),
(10, '2023-05-24', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2023-05-03', 1, 6, 1),
(11, '2023-04-25', 'Taux d\'élements de sortie NCs internes (libérations refusées) par activité', 3, '2023-06-02', 36, 10, 1),
(12, '2023-04-25', 'Taux d\'élements de sortie NCs internes (libérations refusées) par activité', 3, '2023-06-02', 35, 10, 1),
(13, '2024-05-11', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-03', 17, 6, 1),
(14, '2024-05-11', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-03', 17, 6, 1),
(15, '2024-05-11', 'On-Time Service Delivery', NULL, '2024-04-04', 25, 14, 2),
(16, '2024-05-11', 'On-Time Service Delivery', NULL, '2024-04-04', 25, 14, 2),
(17, '2024-05-03', 'Ecart d\'effort/Effort Variance', NULL, '2024-04-01', 9, 12, 2),
(18, '2024-05-03', 'Ecart d\'effort/Effort Variance', NULL, '2024-04-01', 9, 12, 2),
(19, '2024-05-03', 'On-Time Service Delivery', NULL, '2024-04-05', 21, 14, 2),
(20, '2024-05-03', 'On-Time Service Delivery', NULL, '2024-04-05', 21, 14, 2),
(21, '2024-05-03', 'Nbr des élements de sortie NC externes par activité / Nbr of external Non conforming output per activity', 1, '2024-04-19', 19, 9, 1),
(22, '2023-05-03', 'Nbr des élements de sortie NC externes par activité / Nbr of external Non conforming output per activity', 1, '2023-04-18', 16, 9, 1),
(23, '2024-05-03', 'Nbr des élements de sortie NC externes par activité / Nbr of external Non conforming output per activity', 1, '2024-04-05', 26, 9, 1),
(24, '2024-05-03', 'Nbr des élements de sortie NC externes par activité / Nbr of external Non conforming output per activity', 1, '2024-04-04', 26, 9, 1),
(25, '2024-05-04', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-04', 9, 6, 1),
(26, '2024-05-04', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-04', 9, 6, 1),
(27, '2024-05-11', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-05-01', 26, 6, 1),
(28, '2024-05-11', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-05-01', 26, 6, 1),
(29, '2024-05-11', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-18', 12, 6, 1),
(30, '2024-05-11', 'Customer Satisfaction Index 1/Indice de satisfaction client 1', 90, '2024-04-18', 12, 6, 1),
(31, '2024-04-28', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90, '2024-04-05', 16, 7, 1),
(32, '2024-04-28', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90, '2024-04-05', 16, 7, 1),
(33, '2024-04-26', 'Efficacité de detection de défauts (revue)\r\n/Defect Detection Effectiveness (review)', 90, '2024-04-04', 13, 8, 1),
(34, '2024-04-26', 'Efficacité de detection de défauts (revue)\r\n/Defect Detection Effectiveness (review)', 90, '2024-04-04', 13, 8, 1),
(35, '2023-04-29', NULL, NULL, '2023-06-10', 36, NULL, NULL),
(36, '2023-04-29', NULL, NULL, '2023-06-14', 36, NULL, NULL),
(37, NULL, 'Efficacité des libérations produit', 100, NULL, NULL, 16, NULL),
(40, '2024-05-09', 'Taux de réalisation des 8D ', 100, '2024-04-15', 5, 17, NULL),
(43, '2024-11-06', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90, '2022-01-01', 6, 7, 1),
(44, '2024-11-06', 'Customer Satisfaction Index 2/Indice de satisfaction client 2', 90, '2022-01-01', 6, 7, 1);

-- --------------------------------------------------------

--
-- Structure de la table `pips`
--

CREATE TABLE `pips` (
  `id` bigint(20) NOT NULL,
  `interaction` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pips`
--

INSERT INTO `pips` (`id`, `interaction`, `name`, `type`, `category_id`) VALUES
(1, 'Forte', 'Plan d\'amélioration de l\'expérience client', 'Interne', 3),
(2, 'Faible', 'Programme de formation des employés', 'Interne', 2),
(3, 'Moyenne', 'Programme de partenariat stratégique', 'Interne', 1),
(4, 'Forte', 'Projet de responsabilité sociale d\'entreprise', 'Interne', 6),
(5, 'Faible', 'gym', 'Externe', 4),
(6, 'Moyenne', 'hadil', 'Externe', 5);

-- --------------------------------------------------------

--
-- Structure de la table `processus`
--

CREATE TABLE `processus` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `processus`
--

INSERT INTO `processus` (`id`, `description`, `name`) VALUES
(2, 'Proumouvoir et développer l\'innovation', 'PDI'),
(3, 'Piloter Telnet / Telnet Management', 'MNG'),
(10, 'Délivrer les Services / Deliver Services', 'DSS'),
(11, 'Réaliser un projet / Project Engineering', 'PRE'),
(12, 'Piloter les projets/produits / Project/Product Man...', 'PPM'),
(13, 'Garantir la Qualité Opérationnelle / Operational Q...', 'OQM'),
(14, 'Développer un produit/Product Development', 'PRD'),
(15, 'Répondre à un appel d’offre / Response to Call for...', 'RCT'),
(16, 'Gérer le Système de Management / Business Operatin...', 'BOS'),
(17, 'Gérer les Ressources Humaines / Human resources ma...', 'HRM'),
(18, 'Assurer le support système et la sécurité de l\'inf...', 'ISS'),
(19, 'Acheter / Purchasing', 'PUR'),
(25, 'des1', 'proc1'),
(26, 'des11', 'proc2');

-- --------------------------------------------------------

--
-- Structure de la table `processus_kpis`
--

CREATE TABLE `processus_kpis` (
  `processus_id` bigint(20) NOT NULL,
  `kpi_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `processus_kpis`
--

INSERT INTO `processus_kpis` (`processus_id`, `kpi_id`) VALUES
(2, 3),
(2, 4),
(2, 5),
(2, 39),
(2, 40),
(2, 41),
(3, 1),
(3, 2),
(10, 6),
(10, 7),
(11, 6),
(11, 7),
(11, 8),
(11, 9),
(11, 10),
(11, 11),
(12, 12),
(12, 14),
(13, 16),
(13, 17),
(13, 18),
(14, 26),
(14, 28),
(14, 30),
(15, 22),
(15, 24),
(16, 32),
(26, 1);

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `activity_id` bigint(20) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projects`
--

INSERT INTO `projects` (`id`, `name`, `end_date`, `start_date`, `type`, `activity_id`, `client_id`) VALUES
(1, 'Projet1', '2024-05-01 01:00:00.000000', '2024-04-01 01:00:00.000000', 'Régie', 16, 1),
(2, 'Projet 2', '2024-05-01 01:00:00.000000', '2024-05-01 01:00:00.000000', 'Forfait', 12, 1),
(3, 'Projet3', '2024-05-01 01:00:00.000000', '2024-04-01 01:00:00.000000', 'Forfait', 16, 2),
(4, ' projet4', '2024-05-01 01:00:00.000000', '2024-05-01 01:00:00.000000', 'Forfait', 13, 2);

-- --------------------------------------------------------

--
-- Structure de la table `projects_processus`
--

CREATE TABLE `projects_processus` (
  `projects_id` bigint(20) NOT NULL,
  `processus_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projects_processus`
--

INSERT INTO `projects_processus` (`projects_id`, `processus_id`) VALUES
(1, 10),
(1, 11),
(3, 12),
(2, 12),
(4, 15);

-- --------------------------------------------------------

--
-- Structure de la table `project_kpis`
--

CREATE TABLE `project_kpis` (
  `project_id` bigint(20) NOT NULL,
  `kpi_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `project_kpis`
--

INSERT INTO `project_kpis` (`project_id`, `kpi_id`) VALUES
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(2, 12),
(2, 14),
(3, 12),
(3, 14),
(4, 22),
(4, 24);

-- --------------------------------------------------------

--
-- Structure de la table `resultatpi_processus`
--

CREATE TABLE `resultatpi_processus` (
  `resultatpip_id` bigint(20) NOT NULL,
  `processus_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `resultatpi_processus`
--

INSERT INTO `resultatpi_processus` (`resultatpip_id`, `processus_id`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `resultpips`
--

CREATE TABLE `resultpips` (
  `id` bigint(20) NOT NULL,
  `existant_monitoring` varchar(255) DEFAULT NULL,
  `expectation` varchar(255) DEFAULT NULL,
  `risk` varchar(255) DEFAULT NULL,
  `setup_monitoring` varchar(255) DEFAULT NULL,
  `pip_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `resultpips`
--

INSERT INTO `resultpips` (`id`, `existant_monitoring`, `expectation`, `risk`, `setup_monitoring`, `pip_id`) VALUES
(1, 'oui', 'resultat1', 'fort', 'suivi', 1);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ADMIN'),
(2, 'RESPONSABLEQUALITE'),
(3, 'DIRECTEUR'),
(4, 'CHEFDEPROJET');

-- --------------------------------------------------------

--
-- Structure de la table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `is_logged_out` bit(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `token`
--

INSERT INTO `token` (`id`, `is_logged_out`, `token`, `user_id`) VALUES
(1, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyMDM5NjcsImV4cCI6MTcxMzI5MDM2N30.X3xE6CQ9aT5471JXKxuy52g-6qwV0-CsPcmngTgjzx-VsFJg0TWsuuAiS6XT_GlG', 1),
(2, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyMDYzNzcsImV4cCI6MTcxMzI5Mjc3N30.42KfLJMnUArJDXbhOi0cO3QoDOSYS-7q6DbQZcXPaFSCO_GblBwOcDQhlH26eSJt', 1),
(4, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyMDY4MzUsImV4cCI6MTcxMzI5MzIzNX0.ZflkGGREqHxPKjhJX6mQrGeDN1a8-IaMo3dOw2Bm5PMY7uSHIA_Aa22UsY1ML-OG', 1),
(5, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyNjMyNDUsImV4cCI6MTcxMzM0OTY0NX0.tJvckVbeEXYofIF8pMZBkIXx-hH07-h_gqKvKvARL-AuQLOujUiqNXBAXwBpWldY', 1),
(6, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyODQwMjUsImV4cCI6MTcxMzM3MDQyNX0.aE5qqpspF7VpBOya7nMuAXOTQDMZVI3TqFI9CyJcCDMaJBehyCYitjJfLCQBdehv', 1),
(7, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyODQwODEsImV4cCI6MTcxMzM3MDQ4MX0.sc57J-w2YBABHMsOYjdYZMez4e9hFPEJrIxE6vNeHgg-LoePeQQr2UjRaPFseN18', 1),
(8, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMyODY1MDIsImV4cCI6MTcxMzM3MjkwMn0.IOKaWO6P7zw7Czs9jLd6L-hfjdSl6h_jYtb1bIkBU4Bs97TsLpl5PhrcVEZvqDGV', 1),
(9, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzI4OTAxMSwiZXhwIjoxNzEzMzc1NDExfQ.Na38wTWw_6GFETyLHciHj9os8GQki78h_AjTrQAZAHBAm85s8zbUc562CaS3viTS', 3),
(10, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzNDI5MzgsImV4cCI6MTcxMzQyOTMzOH0.bqnAdXrwEvoXsIUlqge4CtLT7XmmxmTjOhENj2EU60ZbX3ZtibLeMmRbwd4jAb4M', 1),
(11, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzM0Mjk3NiwiZXhwIjoxNzEzNDI5Mzc2fQ.vCj8GzafyCuIzfdFx4wuxjvabO3LDDM6Ga7udWlt_nL7eQQVN8ngwxtu9gIB-bEW', 3),
(12, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU0MzcsImV4cCI6MTcxMzQ3MTgzN30.S9HTKIUdiSpqevoSl5Q-EwrsbHiTdiyfht7Sf6J-7lGhRva9_f04OO7MZHWTkZ7P', 1),
(13, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU1MTQsImV4cCI6MTcxMzQ3MTkxNH0.qz8Ecgos8Tm2WF_bLWR1huvX_fvDSXqlQX-H_yIuf3uhQzSDomBmJxge9GOV5hB5', 1),
(14, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU1MTUsImV4cCI6MTcxMzQ3MTkxNX0.vAwuFvpUePuKqBP9I-kJUuT4GlBMmSO0Ct4Fb-pPPSaTVivpF3IoRDNd8hsCUbwE', 1),
(15, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU1MTcsImV4cCI6MTcxMzQ3MTkxN30.qI7gHo5zKBYunZZeXSWGUt542PdHJssZNBQiK3ic4uVnHaWw4bnV17F60IsebaZr', 1),
(16, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU1MTgsImV4cCI6MTcxMzQ3MTkxOH0.NEPbbELS6cAvIvDyGdBHU4fIHNl8ysAqs-fY7cnczQlvnIgWj1HtlA0PVdT_mhzo', 1),
(17, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU1MTgsImV4cCI6MTcxMzQ3MTkxOH0.NEPbbELS6cAvIvDyGdBHU4fIHNl8ysAqs-fY7cnczQlvnIgWj1HtlA0PVdT_mhzo', 1),
(18, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU2MzEsImV4cCI6MTcxMzQ3MjAzMX0.oBYuijoCjExl4CXbaYRfiJs1Q61Kfj1tZjrNXunIiO9nkZUafj6BCvfFrQjUc28I', 1),
(19, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU2MzIsImV4cCI6MTcxMzQ3MjAzMn0.AvDaw2qbBGDtkGuSdAx0xwgTIVBvN2FQF3gE3QHW8OeD-jR4O3xytsAalmI1-rvB', 1),
(20, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTMzODU3ODQsImV4cCI6MTcxMzQ3MjE4NH0.yR5cSXMM1wCw6PG0QozzmttkZ26FO88Yi9ZD9uTZD44jnFm0zn0kxKe0JME1vIH8', 1),
(21, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTAzOTEsImV4cCI6MTcxMzUzNjc5MX0.c6Ke7TVko3PEWsB5rTLI70SAiSsBDG9iRpocMlEfBW-CSQkcfT2yM5B0-rDYhjPT', 1),
(22, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU2NzQsImV4cCI6MTcxMzU0MjA3NH0.JXrjK09HVJUg0eBCDDAleuHgVamHxhNFDkcP96_E_XZC9_YhwkxiUKELKE2YOTqw', 1),
(23, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5ODAsImV4cCI6MTcxMzU0MjM4MH0.udGdoomyILoC_glc17uWqHrs8ThuuaNjbBbl1GgAgiDX25BRfo1iCd5xbyG0mqAE', 1),
(24, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5ODIsImV4cCI6MTcxMzU0MjM4Mn0.B4YnwtgJcpKg5vrENaFFGjNff63B249ZUDve6Ue8e_N8E3pW_tgtG7vsH25w2OQv', 1),
(25, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5ODMsImV4cCI6MTcxMzU0MjM4M30.bmJjj8-FqhkJ6qLSp8jPko1ommuqOsvuIb3mWzqlh1a9IhphN3BjWf7tnUNWzWcR', 1),
(26, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5ODQsImV4cCI6MTcxMzU0MjM4NH0.nDhmP15EccuvNBPdCJRwAAyyNBEB4dosfbcVs210e8Eh-Ppx8-gjUlNT_aU77Dlb', 1),
(27, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5ODQsImV4cCI6MTcxMzU0MjM4NH0.nDhmP15EccuvNBPdCJRwAAyyNBEB4dosfbcVs210e8Eh-Ppx8-gjUlNT_aU77Dlb', 1),
(28, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5ODQsImV4cCI6MTcxMzU0MjM4NH0.nDhmP15EccuvNBPdCJRwAAyyNBEB4dosfbcVs210e8Eh-Ppx8-gjUlNT_aU77Dlb', 1),
(29, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTU5OTcsImV4cCI6MTcxMzU0MjM5N30.Guu8SSKam_OeufOQyYRDW1TOeMZbNN2xosni1IIO43auljhUG_tWOYHYF4sqFHAE', 1),
(30, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTYwMzEsImV4cCI6MTcxMzU0MjQzMX0.KW2x79mJ_-pi84hTydjReQ-79twn7fIwpGvmo7bgd6KBLHSA8mWRoJrvVTI2toJi', 1),
(31, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTY0ODcsImV4cCI6MTcxMzU0Mjg4N30.-zNTOPzJwZ_2rnxfqQk3SvLSEg2kb4KIyc9IloHPORtVUcb-eyXr6HjIjTHq61ak', 1),
(32, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTY4OTgsImV4cCI6MTcxMzU0MzI5OH0.hFkGDW31svJOb_UyuwA19lwsxAQQ95S-VvhfP9i-jUq6Wwc6NJtTo1JJcCbiJWHP', 1),
(33, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTcwNzUsImV4cCI6MTcxMzU0MzQ3NX0.3q678dRSobQfuP8GNZcxqcHe_psP-7ittqQlHvOJ5ZxmIsm2WufmPr-LugM-_TjB', 1),
(34, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTcyMzcsImV4cCI6MTcxMzU0MzYzN30.Wt5TCHxirFsX4TksXtDpHo3o_bRoWhe1FYDLmsHJeFAHJxkjeFYmtZNGoQLcwEjm', 1),
(35, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTcyMzcsImV4cCI6MTcxMzU0MzYzN30.Wt5TCHxirFsX4TksXtDpHo3o_bRoWhe1FYDLmsHJeFAHJxkjeFYmtZNGoQLcwEjm', 1),
(36, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTcyMzksImV4cCI6MTcxMzU0MzYzOX0.KSxlLWoqKULzzI3oRfIKiCS0pjbYTAheC5pZEF1OYqTkuSTZAR88FL-F78MHNvOL', 1),
(37, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTcyNDIsImV4cCI6MTcxMzU0MzY0Mn0.7BM6Y-v4ccXOw83u9_8Wg7Sz1cdPhxch3--nYnYWaJbZU9OHwgfQknIdAJEQ-lkw', 1),
(38, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTczMDcsImV4cCI6MTcxMzU0MzcwN30.Tn5JT8ny61LnUdKLnUT75oFhp-VMW5w51452KFuaF2hrNIWfheRauLVvPfkAbvfv', 1),
(39, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTc0MTksImV4cCI6MTcxMzU0MzgxOX0.qvkrp7Pqg3pPtu01JEoBImu69QZL_5svV4ey4OMtMC-81AopUaQgUmfhe4Q5UqUY', 1),
(40, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NTc1MzgsImV4cCI6MTcxMzU0MzkzOH0.ByxhdNnnGh76S5hhEPiD06mh1OiJBjho6Itp5ROXFv6vm9R9V57LsKVXO-qP1-eZ', 1),
(41, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NjQ0MjAsImV4cCI6MTcxMzU1MDgyMH0.L57ncjMAf4k17Kex5MTj2eCMUacSCiKfHg85s7JbmJZprWH6Fa_l6fq8XPhoNFo9', 1),
(42, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzQ2NDYxNSwiZXhwIjoxNzEzNTUxMDE1fQ.YiWj3egCQ8Op_6tTD8yElJhWOH9AelxYlMCBBjpwmYgwJm_K9NdGnbdnan17y9NJ', 3),
(43, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM0NjQ3MzYsImV4cCI6MTcxMzU1MTEzNn0.SRIXAvDYEI_I1q4J6f0mUO1LeRCMUAkPm5YK0R-jAEwZjtdWFZsr9cK23JyRcU1O', 1),
(44, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzUxNTIxMCwiZXhwIjoxNzEzNjAxNjEwfQ.UtwTmtrenST9YH_5sWpRFBHjpynPoKK3FirWOfpb1V6Th0bi1MvyVLJWir_MdjK9', 3),
(45, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM1MTU1NTEsImV4cCI6MTcxMzYwMTk1MX0.-1B6VsEc7qyNJ-9SIHCECk_wtj1rmosJ2uJo5BCQj61PwLRKsjI6uKurM1vzxKbL', 1),
(46, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzUxOTA4NCwiZXhwIjoxNzEzNjA1NDg0fQ.v2sPUYjO8kVALAvs5lesSNQULiPiSfKJFHHd-fT4xCHDqNgpH5elREwUCB97zE9m', 3),
(47, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzUxOTE2MSwiZXhwIjoxNzEzNjA1NTYxfQ.bIoySSkrhUhhoGD_BZHUZAzPsn8eK_1NgmonFN1jeBdVXO3qo3Q4oWyDcHqmd-iw', 3),
(48, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM1MTk4MjcsImV4cCI6MTcxMzYwNjIyN30.Vq30jxWDiclb4RbGYtC9sqODczrjfUf4-PDA9fMzRSR8WAIgRJo9_sz6AS_Jy5ro', 1),
(49, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM1NDcxNTYsImV4cCI6MTcxMzYzMzU1Nn0.oIGSKVD4X8yQtenqjI_1o0EgNEFCTJ-pOsQUHCdH08vAD4zPjgGUIs_Og4aqbcux', 1),
(50, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM4MTE5NjQsImV4cCI6MTcxMzg5ODM2NH0.aZSL9epS8AVMWGd5qFXt1XDBz-hxAjwwEUnwfWD7W0rNhI99XZ_DYWoXxxtWdmpo', 1),
(51, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzgxMjAxNCwiZXhwIjoxNzEzODk4NDE0fQ.h4P_R2c2HgMDQKhyHpu1YrPCVJSXBCOVm2WlGphpoSS_keF5DPsXBtYhMTJ127Xn', 3),
(52, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM4MTY3MTgsImV4cCI6MTcxMzkwMzExOH0.nCeRqfXG3cFSu_j8Qp6vXm5UKLHeQ-FuIR1K3G7AC-nqW-RlOwWvM8nqV1Wb1LOW', 1),
(53, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM4MTc5ODYsImV4cCI6MTcxMzkwNDM4Nn0.Ur_J0QGwKY3r9tdytLhTwzcaE6UU8D51FRjQRCP69-Ex520j-E4C3hlMswUbWIwT', 1),
(54, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzgxOTAyMywiZXhwIjoxNzEzOTA1NDIzfQ._FM2ELfLZ_mCr_gSR03H6oTwhtvoUD_roV_Hx53Fx9q8eudwi5PrD3QmJ3JFiX3H', 3),
(55, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM5MDQzNTMsImV4cCI6MTcxMzk5MDc1M30.nSoci_9IW1MR-W6d7qOa2Itn-6toOLpu-yNbMxXYRZdhoD9BY3ZLu3vKr16PaloT', 1),
(56, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTM5MDYyMzQsImV4cCI6MTcxMzk5MjYzNH0.eegsx97w6goECwiQOEb8ttIM2GSZBfgdejOTnCqbGpGOdNx4BKX3j4c7P-as7iyl', 1),
(57, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxMzkwNzI4MywiZXhwIjoxNzEzOTkzNjgzfQ.POaJ2g3zlm05lBjK1iI9YR-CP281Wn4TXrqpUp63NfeIXzE2rnsmp5l5ELZFp74a', 3),
(58, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQwNTIxODIsImV4cCI6MTcxNDEzODU4Mn0.1iMfySYfmetDc62TrrbEhio5UGEYtujcPKpCzy99ExcIr_OQ_Dsypu4jge7rCnW0', 1),
(59, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQxMzkwMjMsImV4cCI6MTcxNDIyNTQyM30._lpsA8o-X_1etCJVuqKjCIYbUM5a3wXBBQt4oL_ED0aAp-0h_81XSY_LqQxrlcvF', 1),
(60, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDE2Nzc5OCwiZXhwIjoxNzE0MjU0MTk4fQ.UfKpYeOhvcw8AkHUxxXbTI4yhYMedpcA8Uo5VpXTysPX1xJ5gZzoxHX3mzINZ5B1', 3),
(61, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDE2ODAwOSwiZXhwIjoxNzE0MjU0NDA5fQ.sPqyMo06W-2hOyR7fE75P6cUZ2GCw_4qh36kD3VZ8nQpXPXNEbLkmy3T6fZWk0Dk', 3),
(62, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDE2ODE4NCwiZXhwIjoxNzE0MjU0NTg0fQ.GWYI-ZvPssc75rL_uBTlwIs60nhHzvaGlf7LRb3xyngZ-ebek2Qlyo-F72a8251R', 3),
(63, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQyMjkxNTAsImV4cCI6MTcxNDMxNTU1MH0.-CELOWvNSYYmmkH4bS1puXLBkl-5lTLOBmSQCZKwypNbhP-x2O0lJwFjI17jIR27', 1),
(64, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQyNDEyNzMsImV4cCI6MTcxNDMyNzY3M30.X-XGLs85nWDiSPa1xT0WkE3jP01LtGB_IkO97Vf9V_VNzsqdAeqHBIvZKG8TZRKr', 1),
(65, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDI0MTI5MSwiZXhwIjoxNzE0MzI3NjkxfQ.1yg4_T5-ZyzsCtJwS9iH6XaJaJCMACSfI1Zc_VI38eNGXqR85i9FjvOTnND2VIEm', 3),
(66, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQzMDkxMjksImV4cCI6MTcxNDM5NTUyOX0.LAZnvCGtyvf-zVCM-B6-NhlFTamcw8F-WCra_Q6y4XyVdNl-T7VWduw4OUhTc7jt', 1),
(67, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQzOTU1OTYsImV4cCI6MTcxNDQ4MTk5Nn0.9NmKln8tgKdxWm-kdnLWBKgTEZW7hPQuFU9M5ASD9QMTQQGBU0fDyoS1wTImcXIY', 1),
(68, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDQwMjU4MCwiZXhwIjoxNzE0NDg4OTgwfQ.gNiaT5E822nPZ6jr3_TUf9sFlplfnK9aQhIld1YJ8PqcRv_B1KcF6LllD7jBXmkf', 3),
(69, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ0MDM5NTYsImV4cCI6MTcxNDQ5MDM1Nn0.IIjQfstmWYgHNMvxiPp4MSFhaX6ZM4CRvAcB3Hng9ShNH8yNp44nlXe2ZyhNeRr-', 1),
(70, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDQyMjU0MSwiZXhwIjoxNzE0NTA4OTQxfQ.yxZo1dNmTTpdKbBKH81vyuBULRYl993yhdqN7n5JWvN-Z68UXUYIJHRjfIR81uao', 3),
(71, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ2NTIyMTksImV4cCI6MTcxNDczODYxOX0.SOchrukrThBh1Eageg0wjRILQUG6XYyy30bdi2P-5wYAZBc7LhQm24HseNgGutgx', 1),
(72, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ2NTM1MTAsImV4cCI6MTcxNDczOTkxMH0.WLduIXyvNAbRFCK_Wde50Ztq-pgOOWQXDa9GBm8vVx6_mAV0FGwNMf42h88b2TnJ', 1),
(73, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ2NTM1MTIsImV4cCI6MTcxNDczOTkxMn0.d2WdQYnmlqDjhDfdKn_5e3RvEgn4uV0OaIa1CwfEgkMtj8Uk_ONU3K7X1CSGEB7W', 1),
(74, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ2NTM1NDIsImV4cCI6MTcxNDczOTk0Mn0.m8DD-_EJY-pcgdhvF3z0wuy3RAzNpxdC_hWxNiYpscVzYYLWZZhTDw0Y1fdy36hv', 1),
(75, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDY1NDgyOCwiZXhwIjoxNzE0NzQxMjI4fQ.qjw6m4JhSN-j_OW2ll0ZAvbVs_w9xgGoKbXFob5oDTeDAlA_OglXCjNwzu5CxfDN', 3),
(76, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ3NDA0NDQsImV4cCI6MTcxNDgyNjg0NH0.Xwn3_V5itF2lwTQNYamXTcdYqZ2DhGfj5sihF_wtg5ZFrMsCbjeQP3FCizwEsImb', 1),
(77, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ4MjY5MTAsImV4cCI6MTcxNDkxMzMxMH0.g4Qh1-8myhinClQfDQCBNniBglciIJeW6ZCGDwULtKJ7YTx7g9AjKsj9lmsY1Rdh', 1),
(78, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDg1NzM5NywiZXhwIjoxNzE0OTQzNzk3fQ.MHN2uPBweJ1veVA-7kiY7EwViZYeL1UPBk_Hw3FCiYR3MMxXUcXq19rST9EK9fvy', 3),
(79, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ4NjA2MDYsImV4cCI6MTcxNDk0NzAwNn0._VkzQUvKzzVt-Po8wULabL0mIg_gF1_Ivnk7Vl7uZ2CxevIdMA3WJ0HLzQt_1xNS', 1),
(80, b'0', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5ZXNtaW5lQGVzcHJpdC50biIsImlhdCI6MTcxNDg2MDkxNSwiZXhwIjoxNzE0OTQ3MzE1fQ.feYgDyMUXuuuXgpLsxhLs_0iNF6XhrprhRVkm4J7aB3D2AKBSer10RaVyAb3HE1n', 3),
(81, b'1', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ4NjA5MzksImV4cCI6MTcxNDk0NzMzOX0.8dIdasDQ8yQvMz7DHF2WBKuoDWpF2p0sQcIESqus4jjBACkGd5og-c9Lta0ofgbZ', 1),
(82, b'0', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhaG1lZEBlc3ByaXQudG4iLCJpYXQiOjE3MTQ5NDg3MzYsImV4cCI6MTcxNTAzNTEzNn0.b9OVcI2GwqzrQMkciK7QbpAuiiaOiayGRAuIgtafsCa0f7GSdR_LjGHIL9erVfWE', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `role`, `username`) VALUES
(1, 'ahmed@esprit.tn', 'ahmed', 'ahmedDrtyvboe', '$2a$10$fznljchoECs2MMeO9pI4FuQTmngkBUe1MqOD2NFoBDExJqy3nSorG', NULL, 'ahmed'),
(3, 'yesmine@esprit.tn', 'yesmine', 'Nechi', '$2a$10$yKUG9.fKrRsHBvRW0Ub9Q.ed7/9yNr2ymwFzSb5LKLlUVL/D5lPGC', NULL, 'ahmed'),
(5, 'habiba@gmail.com', 'rrr', 'ftyfhj', '$2a$10$LfPqsLVYcROZExrhLqMjK.Pr.ktgybLwGn/fuTVK9Wku.mmPon5H.', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_activities`
--

CREATE TABLE `user_activities` (
  `user_id` int(11) NOT NULL,
  `activity_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_activities`
--

INSERT INTO `user_activities` (`user_id`, `activity_id`) VALUES
(3, 14),
(1, 12),
(1, 13),
(5, 3),
(5, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 2),
(3, 1),
(5, 4);

-- --------------------------------------------------------

--
-- Structure de la table `volets`
--

CREATE TABLE `volets` (
  `id` bigint(20) NOT NULL,
  `axe` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `volets`
--

INSERT INTO `volets` (`id`, `axe`, `name`) VALUES
(1, 'INTERNE', 'Volet2'),
(2, 'EXTERNE', 'volet1');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKs5mwna3bq3f2ohqg033aym0op` (`client_id`);

--
-- Index pour la table `activity_processus`
--
ALTER TABLE `activity_processus`
  ADD PRIMARY KEY (`activity_id`,`processus_id`),
  ADD KEY `FKfamgn0jtu578ljvxlq88ctg1l` (`processus_id`);

--
-- Index pour la table `analyse`
--
ALTER TABLE `analyse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3fmnnu4vc8517t19d9ese75xa` (`kpi_id`);

--
-- Index pour la table `cadrans`
--
ALTER TABLE `cadrans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmdw873h0gal0sg00lhskflhje` (`volet_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `kpis`
--
ALTER TABLE `kpis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_7oqfpl49v9i71ske1hvujw6r2` (`name`);

--
-- Index pour la table `kpi_history`
--
ALTER TABLE `kpi_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbmylk7uyiu1d9llu2r13kqacr` (`kpi_id`),
  ADD KEY `FK4j56pf5jl99ewx3n9y0tahynq` (`project_id`);

--
-- Index pour la table `pips`
--
ALTER TABLE `pips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmcv4rooff87fqi04l27xlvk09` (`category_id`);

--
-- Index pour la table `processus`
--
ALTER TABLE `processus`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `processus_kpis`
--
ALTER TABLE `processus_kpis`
  ADD PRIMARY KEY (`processus_id`,`kpi_id`),
  ADD KEY `FKib5qpp8trvfty2r6bcc491y61` (`kpi_id`);

--
-- Index pour la table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5bqdlxm63kaqk8u70q4ko2omv` (`activity_id`),
  ADD KEY `FK97l5bbdo6jhl16q4gct2wdx7b` (`client_id`);

--
-- Index pour la table `projects_processus`
--
ALTER TABLE `projects_processus`
  ADD KEY `FKc6pwcg95jcvp5xak1mcure7c4` (`processus_id`),
  ADD KEY `FKtn1vn931hvvfab1v0408jprua` (`projects_id`);

--
-- Index pour la table `project_kpis`
--
ALTER TABLE `project_kpis`
  ADD PRIMARY KEY (`project_id`,`kpi_id`),
  ADD KEY `FKcsm58y6bcnwn9h15tg4tv4k8f` (`kpi_id`);

--
-- Index pour la table `resultatpi_processus`
--
ALTER TABLE `resultatpi_processus`
  ADD KEY `FKno37vy01i9e37q8r7bunnchql` (`processus_id`),
  ADD KEY `FKng5f8uds3h32eh766axv2qx32` (`resultatpip_id`);

--
-- Index pour la table `resultpips`
--
ALTER TABLE `resultpips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6e6e7kmlv9rbspabuf8mxebut` (`pip_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKe32ek7ixanakfqsdaokm4q9y2` (`user_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_activities`
--
ALTER TABLE `user_activities`
  ADD KEY `FK234dtcelry3pf97oi0hmo1cv6` (`activity_id`),
  ADD KEY `FKl7vovck3n8695rq07aq2r2x7m` (`user_id`);

--
-- Index pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`);

--
-- Index pour la table `volets`
--
ALTER TABLE `volets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `analyse`
--
ALTER TABLE `analyse`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `cadrans`
--
ALTER TABLE `cadrans`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `kpis`
--
ALTER TABLE `kpis`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `kpi_history`
--
ALTER TABLE `kpi_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `pips`
--
ALTER TABLE `pips`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `processus`
--
ALTER TABLE `processus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `resultpips`
--
ALTER TABLE `resultpips`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `volets`
--
ALTER TABLE `volets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `FKs5mwna3bq3f2ohqg033aym0op` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`);

--
-- Contraintes pour la table `activity_processus`
--
ALTER TABLE `activity_processus`
  ADD CONSTRAINT `FKfamgn0jtu578ljvxlq88ctg1l` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id`),
  ADD CONSTRAINT `FKrl6h37y4wqe71j94jjf2dmnf3` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`);

--
-- Contraintes pour la table `analyse`
--
ALTER TABLE `analyse`
  ADD CONSTRAINT `FK3fmnnu4vc8517t19d9ese75xa` FOREIGN KEY (`kpi_id`) REFERENCES `kpis` (`id`);

--
-- Contraintes pour la table `cadrans`
--
ALTER TABLE `cadrans`
  ADD CONSTRAINT `FKmdw873h0gal0sg00lhskflhje` FOREIGN KEY (`volet_id`) REFERENCES `volets` (`id`);

--
-- Contraintes pour la table `kpi_history`
--
ALTER TABLE `kpi_history`
  ADD CONSTRAINT `FK4j56pf5jl99ewx3n9y0tahynq` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `FKbmylk7uyiu1d9llu2r13kqacr` FOREIGN KEY (`kpi_id`) REFERENCES `kpis` (`id`);

--
-- Contraintes pour la table `pips`
--
ALTER TABLE `pips`
  ADD CONSTRAINT `FKmcv4rooff87fqi04l27xlvk09` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `processus_kpis`
--
ALTER TABLE `processus_kpis`
  ADD CONSTRAINT `FKib5qpp8trvfty2r6bcc491y61` FOREIGN KEY (`kpi_id`) REFERENCES `kpis` (`id`),
  ADD CONSTRAINT `FKo2o9v3ocslwppr7ut0qrj9hjy` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id`);

--
-- Contraintes pour la table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `FK5bqdlxm63kaqk8u70q4ko2omv` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`),
  ADD CONSTRAINT `FK97l5bbdo6jhl16q4gct2wdx7b` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`);

--
-- Contraintes pour la table `projects_processus`
--
ALTER TABLE `projects_processus`
  ADD CONSTRAINT `FKc6pwcg95jcvp5xak1mcure7c4` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id`),
  ADD CONSTRAINT `FKtn1vn931hvvfab1v0408jprua` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`);

--
-- Contraintes pour la table `project_kpis`
--
ALTER TABLE `project_kpis`
  ADD CONSTRAINT `FKcsm58y6bcnwn9h15tg4tv4k8f` FOREIGN KEY (`kpi_id`) REFERENCES `kpis` (`id`),
  ADD CONSTRAINT `FKcwie9xnl59aqk30gmi1grvfxo` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Contraintes pour la table `resultatpi_processus`
--
ALTER TABLE `resultatpi_processus`
  ADD CONSTRAINT `FKng5f8uds3h32eh766axv2qx32` FOREIGN KEY (`resultatpip_id`) REFERENCES `resultpips` (`id`),
  ADD CONSTRAINT `FKno37vy01i9e37q8r7bunnchql` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id`);

--
-- Contraintes pour la table `resultpips`
--
ALTER TABLE `resultpips`
  ADD CONSTRAINT `FK6e6e7kmlv9rbspabuf8mxebut` FOREIGN KEY (`pip_id`) REFERENCES `pips` (`id`);

--
-- Contraintes pour la table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `FKe32ek7ixanakfqsdaokm4q9y2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_activities`
--
ALTER TABLE `user_activities`
  ADD CONSTRAINT `FK234dtcelry3pf97oi0hmo1cv6` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`),
  ADD CONSTRAINT `FKl7vovck3n8695rq07aq2r2x7m` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
