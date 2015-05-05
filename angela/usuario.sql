-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 26-04-2015 a las 18:30:08
-- Versión del servidor: 5.5.42-cll
-- Versión de PHP: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `subastrs_aplication`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `contrasenia` varchar(200) NOT NULL,
  `telefono` varchar(200) NOT NULL,
  `cedula` varchar(200) NOT NULL,
  `nit` varchar(200) NOT NULL,
  `id_referido` int(11) NOT NULL,
  `rut` varchar(200) NOT NULL,
  `id_cooperativa` int(11) NOT NULL,
  `cooperativa` varchar(200) NOT NULL,
  `id_tipo_vehiculo` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `estado_registro` int(11) NOT NULL,
  `metadata` varchar(200) NOT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `id_canal` int(11) NOT NULL,
  `ultimo_acceso` date DEFAULT NULL,
  `url_compartir` varchar(10) NOT NULL,
  `id_nivel` int(11) NOT NULL,
  `hashverified` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=81 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `rol_id`, `correo_electronico`, `contrasenia`, `telefono`, `cedula`, `nit`, `id_referido`, `rut`, `id_cooperativa`, `cooperativa`, `id_tipo_vehiculo`, `fecha_nacimiento`, `estado_registro`, `metadata`, `fecha_creacion`, `id_canal`, `ultimo_acceso`, `url_compartir`, `id_nivel`, `hashverified`) VALUES
(79, 'Herman Andres', 'figueroa', 1, 'heanfig@gmail.com', '123456', '8767549', '1053826485', '12345', 0, '', 0, 'coomeva', 0, '0000-00-00', 3, '', NULL, 0, '2015-03-23', '', 0, 'e2219bba54b7b486b4cdd16a7f6a5c4db1390a26dbeb'),
(80, 'Herman Andres', 'figueroa', 3, 'dmsanchez86@misena.edu.co', '123456', '8767549', '1053826485', '12345', 0, '', 0, 'coomeva', 0, '0000-00-00', 2, '', NULL, 0, '2015-03-08', '', 0, 'e2219bba54b7b486b4cdd16a7f6a5c4db1390a26dbeb');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
