-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 26-04-2015 a las 18:30:40
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
-- Estructura de tabla para la tabla `adjunto`
--

CREATE TABLE IF NOT EXISTS `adjunto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ruta` varchar(200) NOT NULL,
  `tamanio` float NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `ultima_modificacion` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canal`
--

CREATE TABLE IF NOT EXISTS `canal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `metadata` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE IF NOT EXISTS `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_departamento` varchar(200) NOT NULL,
  `prefijo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `etiqueta` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase_carga`
--

CREATE TABLE IF NOT EXISTS `clase_carga` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `metadata` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion_creditos`
--

CREATE TABLE IF NOT EXISTS `configuracion_creditos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metadata` varchar(200) NOT NULL,
  `precio_por_credito` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion_nivel`
--

CREATE TABLE IF NOT EXISTS `configuracion_nivel` (
  `id` int(11) NOT NULL,
  `metadata` varchar(200) NOT NULL,
  `creditos_por_nivel` int(11) NOT NULL,
  `configuracion_creditos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cooperativa`
--

CREATE TABLE IF NOT EXISTS `cooperativa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credito`
--

CREATE TABLE IF NOT EXISTS `credito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `configuracion_creditos_id` int(11) NOT NULL,
  `fact_id` int(11) NOT NULL,
  `precio_total` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cron`
--

CREATE TABLE IF NOT EXISTS `cron` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(200) NOT NULL,
  `timestamp_begin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `timestamp_ended` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `metadata` varchar(200) NOT NULL,
  `us_id` int(11) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cron_acceso`
--

CREATE TABLE IF NOT EXISTS `cron_acceso` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `fecha_notificacion` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `cron_acceso`
--

INSERT INTO `cron_acceso` (`id`, `id_usuario`, `fecha_notificacion`) VALUES
(3, 79, '2015-04-22'),
(4, 79, '2015-04-22'),
(5, 79, '2015-04-22'),
(6, 79, '2015-04-22'),
(7, 79, '2015-04-22'),
(8, 79, '2015-04-22'),
(9, 79, '2015-04-22'),
(10, 80, '2015-04-22'),
(11, 79, '2015-04-22'),
(12, 80, '2015-04-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cron_email`
--

CREATE TABLE IF NOT EXISTS `cron_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_subasta` int(11) NOT NULL,
  `tiempo` int(11) NOT NULL,
  `metadata` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cron_frecuencia`
--

CREATE TABLE IF NOT EXISTS `cron_frecuencia` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `frecuencia` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `cron_frecuencia`
--

INSERT INTO `cron_frecuencia` (`id`, `descripcion`, `frecuencia`) VALUES
(1, 'Envió de correo después de 30 días sin ingresar a la aplicación', 30),
(2, 'Envió de correo después de 45 días sin ingresar a la aplicación', 45),
(3, 'Envió de correo después de 60 días sin ingresar a la aplicación', 60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE IF NOT EXISTS `departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pais` varchar(200) NOT NULL,
  `prefijo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `etiqueta` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE IF NOT EXISTS `direccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_via` varchar(200) NOT NULL,
  `nombre_numero_via` varchar(200) NOT NULL,
  `prefijo_cuadrante` varchar(200) NOT NULL,
  `via_generadora` varchar(200) NOT NULL,
  `prefijo_cuadrante_via_generadora` varchar(200) NOT NULL,
  `numero_placa` varchar(200) NOT NULL,
  `id_subasta` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `email_masivo`
--

CREATE TABLE IF NOT EXISTS `email_masivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_plantilla` int(11) NOT NULL,
  `contenidohtml` text NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `metadata` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_subasta`
--

CREATE TABLE IF NOT EXISTS `estado_subasta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_usuario`
--

CREATE TABLE IF NOT EXISTS `estado_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `metadata` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `estado_usuario`
--

INSERT INTO `estado_usuario` (`id`, `nombre`, `descripcion`, `metadata`) VALUES
(1, 'registro basico', 'El usuario se registro usando el metodo rapido de usuario contraseña pero no ha aprobado la cuenta por email\n', ''),
(2, 'aprobación cuenta', 'el usuario aprobó su cuenta pero no ha completado todos los datos', ''),
(3, 'usuario autenticado', 'el usuario se encuentra autenticado con toda la documentacion en linea', '{}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_factura` varchar(200) NOT NULL,
  `valor_factura` float NOT NULL,
  `estado_factura` varchar(200) NOT NULL,
  `estado_transaccion` varchar(200) NOT NULL,
  `id_transaccion` int(11) NOT NULL,
  `fecha_transaccion` date NOT NULL,
  `hora_transaccion` int(11) NOT NULL,
  `id_adjunto` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_acciones`
--

CREATE TABLE IF NOT EXISTS `historial_acciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metadata` varchar(200) NOT NULL,
  `id_tipo_historial` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `us_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=325 ;

--
-- Volcado de datos para la tabla `historial_acciones`
--

INSERT INTO `historial_acciones` (`id`, `metadata`, `id_tipo_historial`, `fecha`, `us_id`) VALUES
(45, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 14:34:34', 47),
(46, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:01:30', 47),
(47, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:22:28', 48),
(48, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:26:41', 48),
(49, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:31:43', 48),
(50, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:39:23', 48),
(51, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:49:53', 48),
(52, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:51:45', 48),
(53, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:55:25', 48),
(54, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 15:59:49', 48),
(55, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 16:27:52', 48),
(56, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 16:57:38', 48),
(57, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 17:15:18', 48),
(58, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 17:17:05', 48),
(59, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 17:17:30', 48),
(60, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-10 17:18:10', 48),
(61, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-10 22:15:09', 55),
(62, '{"user_agent":"Mozilla\\/5.0 (Linux; U; Android 4.1.2; en-us; GT-N8013 Build\\/JZO54K) AppleWebKit\\/534.30 (KHTML, like Gecko) Version\\/4.0 Safari\\/534.30"}', 1, '2015-04-10 22:16:07', 54),
(63, '{"user_agent":"Mozilla\\/5.0 (Linux; U; Android 4.1.2; en-us; GT-N8013 Build\\/JZO54K) AppleWebKit\\/534.30 (KHTML, like Gecko) Version\\/4.0 Safari\\/534.30"}', 1, '2015-04-10 22:31:08', 54),
(64, '{"user_agent":"Mozilla\\/5.0 (Linux; U; Android 4.1.2; en-us; GT-N8013 Build\\/JZO54K) AppleWebKit\\/534.30 (KHTML, like Gecko) Version\\/4.0 Safari\\/534.30"}', 1, '2015-04-11 01:25:26', 54),
(65, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.118 Safari\\/537.36"}', 1, '2015-04-12 20:33:49', 48),
(66, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.118 Safari\\/537.36"}', 1, '2015-04-12 20:33:50', 48),
(67, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.118 Safari\\/537.36"}', 1, '2015-04-12 20:33:59', 48),
(68, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.118 Safari\\/537.36"}', 1, '2015-04-12 20:34:00', 48),
(69, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.118 Safari\\/537.36"}', 1, '2015-04-12 20:40:41', 48),
(70, '{"user_agent":"Mozilla\\/5.0 (Windows NT 6.1; WOW64; rv:37.0) Gecko\\/20100101 Firefox\\/37.0"}', 1, '2015-04-12 21:39:53', 56),
(71, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-13 02:17:28', 55),
(72, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-13 13:27:27', 48),
(73, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-13 13:29:41', 48),
(74, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-13 13:42:07', 48),
(75, '{"user_agent":"Mozilla\\/5.0 (Linux; U; Android 4.1.2; en-us; GT-N8013 Build\\/JZO54K) AppleWebKit\\/534.30 (KHTML, like Gecko) Version\\/4.0 Safari\\/534.30"}', 1, '2015-04-13 21:35:50', 54),
(76, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-13 21:47:25', 62),
(77, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 16:19:58', 63),
(78, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 16:50:41', 64),
(79, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 17:12:32', 65),
(80, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 17:15:50', 65),
(81, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 17:16:25', 65),
(82, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 17:19:29', 65),
(83, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 17:41:44', 65),
(84, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 19:31:30', 65),
(85, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 19:37:08', 65),
(86, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 19:43:58', 65),
(87, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 19:50:56', 65),
(88, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 19:52:09', 65),
(89, '{"user_agent":"Mozilla\\/5.0 (Linux; U; Android 4.1.2; en-us; GT-N8013 Build\\/JZO54K) AppleWebKit\\/534.30 (KHTML, like Gecko) Version\\/4.0 Safari\\/534.30"}', 1, '2015-04-14 19:52:35', 66),
(90, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 19:57:52', 65),
(91, '{"user_agent":"Mozilla\\/5.0 (Linux; U; Android 4.1.2; en-us; GT-N8013 Build\\/JZO54K) AppleWebKit\\/534.30 (KHTML, like Gecko) Version\\/4.0 Safari\\/534.30"}', 1, '2015-04-14 21:09:14', 66),
(92, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 21:11:15', 65),
(93, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 21:20:22', 65),
(94, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 21:50:48', 65),
(95, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 22:06:29', 65),
(96, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 22:14:32', 65),
(97, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 22:20:52', 65),
(98, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-14 22:38:21', 65),
(99, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 03:04:13', 65),
(100, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 12:32:42', 65),
(101, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:01:23', 65),
(102, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:09:58', 65),
(103, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:12:21', 65),
(104, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:27:17', 65),
(105, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:38:49', 65),
(106, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:44:41', 65),
(107, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:48:12', 65),
(108, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:49:44', 65),
(109, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:51:51', 65),
(110, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:52:32', 65),
(111, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:53:15', 65),
(112, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:55:55', 65),
(113, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 13:58:24', 65),
(114, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 14:02:28', 65),
(115, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 14:20:55', 65),
(116, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 14:42:12', 65),
(117, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 14:42:36', 65),
(118, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 14:44:55', 65),
(119, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 14:46:25', 65),
(120, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:00:47', 65),
(121, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:00:47', 65),
(122, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:01:01', 65),
(123, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:01:33', 65),
(124, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:34:42', 73),
(125, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:35:34', 73),
(126, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:41:08', 73),
(127, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:41:25', 73),
(128, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:43:19', 73),
(129, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:44:29', 73),
(130, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:45:05', 73),
(131, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 15:45:34', 73),
(132, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:10:38', 76),
(133, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 16:23:17', 78),
(134, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 16:23:36', 78),
(135, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:31:37', 76),
(136, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:35:49', 76),
(137, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:49:02', 76),
(138, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:49:31', 76),
(139, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:52:56', 76),
(140, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 16:58:12', 76),
(141, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:03:42', 76),
(142, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:04:32', 76),
(143, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:34:32', 76),
(144, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:40:10', 76),
(145, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:47:11', 76),
(146, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:47:35', 76),
(147, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 17:56:39', 76),
(148, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:02:27', 76),
(149, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:11:18', 76),
(150, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:11:55', 76),
(151, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:12:57', 76),
(152, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:13:06', 76),
(153, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:13:17', 76),
(154, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:14:47', 76),
(155, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:16:23', 76),
(156, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:36:52', 78),
(157, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-15 20:37:03', 76),
(158, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 21:44:50', 76),
(159, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 21:50:07', 76),
(160, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 21:55:17', 76),
(161, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 21:58:51', 76),
(162, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 21:59:24', 76),
(163, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 22:00:04', 76),
(164, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 22:00:48', 76),
(165, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 22:02:01', 76),
(166, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 22:29:13', 76),
(167, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 22:29:52', 76),
(168, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-15 22:36:34', 76),
(169, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 12:40:40', 76),
(170, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/39.0.2171.95 Safari\\/537.36"}', 1, '2015-04-16 13:58:38', 78),
(171, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:13:01', 76),
(172, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:13:38', 76),
(173, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:20:48', 76),
(174, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:23:40', 76),
(175, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:24:02', 76),
(176, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:36:45', 76),
(177, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:46:13', 76),
(178, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:46:22', 76),
(179, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:48:48', 76),
(180, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:49:42', 76),
(181, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:53:08', 76),
(182, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:54:34', 76),
(183, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:55:26', 76),
(184, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 14:57:30', 76),
(185, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:01:17', 76),
(186, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:09:41', 76),
(187, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:09:50', 76),
(188, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:16:03', 76),
(189, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:17:00', 76),
(190, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:24:04', 76),
(191, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:25:16', 76),
(192, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:32:05', 76),
(193, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:35:51', 76),
(194, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:39:41', 76),
(195, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:41:54', 76),
(196, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:44:52', 76),
(197, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:49:59', 76),
(198, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:54:04', 76),
(199, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:54:34', 76),
(200, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 15:59:00', 76),
(201, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 16:23:44', 76),
(202, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 16:38:30', 76),
(203, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:08:26', 76),
(204, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:08:41', 76),
(205, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:09:15', 76),
(206, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:15:26', 76),
(207, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:17:11', 76),
(208, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:17:19', 76),
(209, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:17:34', 76),
(210, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:18:06', 76),
(211, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:19:26', 76),
(212, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:20:29', 76),
(213, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:20:57', 76),
(214, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:22:25', 76),
(215, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 17:42:14', 76),
(216, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 19:09:01', 76),
(217, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 19:11:35', 76),
(218, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 19:13:01', 76),
(219, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 19:16:37', 76),
(220, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:00:26', 76),
(221, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:01:24', 76),
(222, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:11:33', 76),
(223, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:12:40', 76),
(224, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:13:39', 76),
(225, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:14:01', 76),
(226, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:28:11', 76),
(227, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-16 20:44:25', 76),
(228, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 12:44:53', 76),
(229, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 12:47:40', 76),
(230, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 12:49:02', 79),
(231, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 12:57:28', 79),
(232, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 12:58:43', 79),
(233, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 13:04:14', 79),
(234, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 13:30:31', 79),
(235, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 13:32:16', 79),
(236, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:01:17', 79),
(237, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:03:45', 79),
(238, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:04:12', 79),
(239, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:17:16', 79),
(240, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:19:11', 79),
(241, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:21:09', 79),
(242, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:34:40', 79),
(243, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:37:21', 79),
(244, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:40:07', 79),
(245, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:40:47', 79),
(246, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:43:23', 79),
(247, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:43:47', 79),
(248, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:44:49', 79),
(249, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:44:58', 79),
(250, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:46:36', 79),
(251, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:46:57', 79),
(252, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:47:42', 79),
(253, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:48:10', 79),
(254, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:49:07', 79),
(255, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:50:44', 79),
(256, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 14:51:08', 79),
(257, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:09:39', 79),
(258, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:10:15', 79),
(259, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:14:16', 79),
(260, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:15:08', 79),
(261, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:16:22', 80),
(262, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:17:27', 79),
(263, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:17:39', 79),
(264, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:58:27', 79),
(265, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 15:59:28', 79),
(266, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 16:13:43', 79),
(267, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 16:15:04', 80),
(268, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 16:15:56', 80),
(269, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 16:16:32', 79),
(270, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 16:22:18', 79),
(271, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-17 16:23:49', 80),
(272, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 15:21:16', 79),
(273, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 15:23:18', 80),
(274, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 15:24:37', 80),
(275, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 15:25:11', 80),
(276, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 15:34:54', 79),
(277, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 15:38:59', 79),
(278, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:15:08', 79),
(279, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:16:16', 79),
(280, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:23:34', 80),
(281, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:26:46', 79),
(282, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:28:21', 79),
(283, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:28:29', 80),
(284, '{"user_agent":"Mozilla\\/5.0 (X11; Linux x86_64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/41.0.2272.89 Safari\\/537.36"}', 1, '2015-04-18 16:41:09', 79),
(285, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 17:42:34', 79),
(286, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 17:42:51', 79),
(287, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 17:48:31', 79),
(288, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 17:56:24', 80),
(289, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:08:21', 79),
(290, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:15:43', 79),
(291, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:19:21', 79),
(292, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:29:07', 79),
(293, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:30:41', 79),
(294, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:31:46', 79),
(295, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 20:34:21', 80),
(296, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:32:46', 79),
(297, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:33:44', 79),
(298, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:35:42', 79),
(299, '{"user_agent":"Mozilla\\/5.0 (Windows NT 6.3; WOW64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/43.0.2357.18 Safari\\/537.36"}', 1, '2015-04-19 22:37:52', 80),
(300, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:41:15', 79),
(301, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:42:54', 79),
(302, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:43:29', 79),
(303, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:45:57', 79),
(304, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 22:46:57', 79),
(305, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-19 23:01:18', 79),
(306, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 00:05:53', 79),
(307, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 00:16:52', 79),
(308, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 00:22:46', 79),
(309, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 01:15:05', 79),
(310, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 01:43:13', 79),
(311, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 01:44:55', 79),
(312, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 01:53:03', 79),
(313, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 01:54:52', 79),
(314, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 01:55:40', 79),
(315, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 02:01:06', 79),
(316, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 02:01:27', 79),
(317, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 02:03:23', 79),
(318, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 02:07:46', 79),
(319, '{"user_agent":"Mozilla\\/5.0 (Windows NT 6.3; WOW64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/43.0.2357.18 Safari\\/537.36"}', 1, '2015-04-20 02:59:30', 80),
(320, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 03:03:19', 79),
(321, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 03:09:12', 79),
(322, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 03:56:20', 79),
(323, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 05:29:17', 79),
(324, '{"user_agent":"Mozilla\\/5.0 (Windows NT 5.1) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/42.0.2311.90 Safari\\/537.36"}', 1, '2015-04-20 05:45:15', 79);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE IF NOT EXISTS `nivel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label_nivel` varchar(200) NOT NULL,
  `id_configuracion` int(11) NOT NULL,
  `data` varchar(200) NOT NULL,
  `metadata` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `contenido` varchar(200) NOT NULL,
  `id_canal` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE IF NOT EXISTS `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prefijo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `etiqueta` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantilla_email`
--

CREATE TABLE IF NOT EXISTS `plantilla_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `contenido_html` text NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `plantilla_email`
--

INSERT INTO `plantilla_email` (`id`, `nombre`, `contenido_html`, `descripcion`, `slug`) VALUES
(1, 'template aprobación de datos', '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">\n<html xmlns="http://www.w3.org/1999/xhtml"><head>\n    <title></title>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <style type="text/css">\nbody {\n  margin: 0;\n  mso-line-height-rule: exactly;\n  padding: 0;\n  min-width: 100%;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd {\n  padding: 0;\n  vertical-align: top;\n}\n.spacer,\n.border {\n  font-size: 1px;\n  line-height: 1px;\n}\n.spacer {\n  width: 100%;\n}\nimg {\n  border: 0;\n  -ms-interpolation-mode: bicubic;\n}\n.image {\n  font-size: 12px;\n  Margin-bottom: 24px;\n  mso-line-height-rule: at-least;\n}\n.image img {\n  display: block;\n}\n.logo {\n  mso-line-height-rule: at-least;\n}\n.logo img {\n  display: block;\n}\nstrong {\n  font-weight: bold;\n}\nh1,\nh2,\nh3,\np,\nol,\nul,\nli {\n  Margin-top: 0;\n}\nol,\nul,\nli {\n  padding-left: 0;\n}\nblockquote {\n  Margin-top: 0;\n  Margin-right: 0;\n  Margin-bottom: 0;\n  padding-right: 0;\n}\n.column-top {\n  font-size: 32px;\n  line-height: 32px;\n}\n.column-bottom {\n  font-size: 8px;\n  line-height: 8px;\n}\n.column {\n  text-align: left;\n}\n.contents {\n  table-layout: fixed;\n  width: 100%;\n}\n.padded {\n  padding-left: 32px;\n  padding-right: 32px;\n  word-break: break-word;\n  word-wrap: break-word;\n}\n.wrapper {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  min-width: 620px;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n}\ntable.wrapper {\n  table-layout: fixed;\n}\n.one-col,\n.two-col,\n.three-col {\n  Margin-left: auto;\n  Margin-right: auto;\n  width: 600px;\n}\n.centered {\n  Margin-left: auto;\n  Margin-right: auto;\n}\n.two-col .image {\n  Margin-bottom: 23px;\n}\n.two-col .column-bottom {\n  font-size: 9px;\n  line-height: 9px;\n}\n.two-col .column {\n  width: 300px;\n}\n.three-col .image {\n  Margin-bottom: 21px;\n}\n.three-col .column-bottom {\n  font-size: 11px;\n  line-height: 11px;\n}\n.three-col .column {\n  width: 200px;\n}\n.three-col .first .padded {\n  padding-left: 32px;\n  padding-right: 16px;\n}\n.three-col .second .padded {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n.three-col .third .padded {\n  padding-left: 16px;\n  padding-right: 32px;\n}\n@media only screen and (min-width: 0) {\n  .wrapper {\n    text-rendering: optimizeLegibility;\n  }\n}\n@media only screen and (max-width: 620px) {\n  [class=wrapper] {\n    min-width: 318px !important;\n    width: 100% !important;\n  }\n  [class=wrapper] .one-col,\n  [class=wrapper] .two-col,\n  [class=wrapper] .three-col {\n    width: 318px !important;\n  }\n  [class=wrapper] .column,\n  [class=wrapper] .gutter {\n    display: block;\n    float: left;\n    width: 318px !important;\n  }\n  [class=wrapper] .padded {\n    padding-left: 32px !important;\n    padding-right: 32px !important;\n  }\n  [class=wrapper] .block {\n    display: block !important;\n  }\n  [class=wrapper] .hide {\n    display: none !important;\n  }\n  [class=wrapper] .image {\n    margin-bottom: 24px !important;\n  }\n  [class=wrapper] .image img {\n    height: auto !important;\n    width: 100% !important;\n  }\n}\n.wrapper h1 {\n  font-weight: 700;\n}\n.wrapper h2 {\n  font-style: italic;\n  font-weight: normal;\n}\n.wrapper h3 {\n  font-weight: normal;\n}\n.one-col blockquote,\n.two-col blockquote,\n.three-col blockquote {\n  font-style: italic;\n}\n.one-col-feature h1 {\n  font-weight: normal;\n}\n.one-col-feature h2 {\n  font-style: normal;\n  font-weight: bold;\n}\n.one-col-feature h3 {\n  font-style: italic;\n}\ntd.border {\n  width: 1px;\n}\ntr.border {\n  background-color: #e9e9e9;\n  height: 1px;\n}\ntr.border td {\n  line-height: 1px;\n}\n.one-col,\n.two-col,\n.three-col,\n.one-col-feature {\n  background-color: #ffffff;\n  font-size: 14px;\n  table-layout: fixed;\n}\n.one-col,\n.two-col,\n.three-col,\n.one-col-feature,\n.preheader,\n.header,\n.footer {\n  Margin-left: auto;\n  Margin-right: auto;\n}\n.preheader table {\n  width: 602px;\n}\n.preheader .title,\n.preheader .webversion {\n  padding-top: 10px;\n  padding-bottom: 12px;\n  font-size: 12px;\n  line-height: 21px;\n}\n.preheader .title {\n  text-align: left;\n}\n.preheader .webversion {\n  text-align: right;\n  width: 300px;\n}\n.header {\n  width: 602px;\n}\n.header .logo {\n  padding: 32px 0;\n}\n.header .logo div {\n  font-size: 26px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  line-height: 32px;\n}\n.header .logo div a {\n  text-decoration: none;\n}\n.header .logo div.logo-center {\n  text-align: center;\n}\n.header .logo div.logo-center img {\n  Margin-left: auto;\n  Margin-right: auto;\n}\n.gmail {\n  width: 650px;\n  min-width: 650px;\n}\n.gmail td {\n  font-size: 1px;\n  line-height: 1px;\n}\n.wrapper a {\n  text-decoration: underline;\n  transition: all .2s;\n}\n.wrapper h1 {\n  font-size: 36px;\n  Margin-bottom: 18px;\n}\n.wrapper h2 {\n  font-size: 26px;\n  line-height: 32px;\n  Margin-bottom: 20px;\n}\n.wrapper h3 {\n  font-size: 18px;\n  line-height: 22px;\n  Margin-bottom: 16px;\n}\n.wrapper h1 a,\n.wrapper h2 a,\n.wrapper h3 a {\n  text-decoration: none;\n}\n.one-col blockquote,\n.two-col blockquote,\n.three-col blockquote {\n  font-size: 14px;\n  border-left: 2px solid #e9e9e9;\n  Margin-left: 0;\n  padding-left: 16px;\n}\ntable.divider {\n  width: 100%;\n}\n.divider .inner {\n  padding-bottom: 24px;\n}\n.divider table {\n  background-color: #e9e9e9;\n  font-size: 2px;\n  line-height: 2px;\n  width: 60px;\n}\n.wrapper .gray {\n  background-color: #f7f7f7;\n}\n.wrapper .gray blockquote {\n  border-left-color: #dddddd;\n}\n.wrapper .gray .divider table {\n  background-color: #dddddd;\n}\n.padded .image {\n  font-size: 0;\n}\n.image-frame {\n  padding: 8px;\n}\n.image-background {\n  display: inline-block;\n  font-size: 12px;\n}\n.btn {\n  Margin-bottom: 24px;\n  padding: 2px;\n}\n.btn a {\n  border: 1px solid #ffffff;\n  display: inline-block;\n  font-size: 13px;\n  font-weight: bold;\n  line-height: 15px;\n  outline-style: solid;\n  outline-width: 2px;\n  padding: 10px 30px;\n  text-align: center;\n  text-decoration: none !important;\n}\n.one-col .column table:nth-last-child(2) td h1:last-child,\n.one-col .column table:nth-last-child(2) td h2:last-child,\n.one-col .column table:nth-last-child(2) td h3:last-child,\n.one-col .column table:nth-last-child(2) td p:last-child,\n.one-col .column table:nth-last-child(2) td ol:last-child,\n.one-col .column table:nth-last-child(2) td ul:last-child {\n  Margin-bottom: 24px;\n}\n.one-col p,\n.one-col ol,\n.one-col ul {\n  font-size: 16px;\n  line-height: 24px;\n}\n.one-col ol,\n.one-col ul {\n  Margin-left: 18px;\n}\n.two-col .column table:nth-last-child(2) td h1:last-child,\n.two-col .column table:nth-last-child(2) td h2:last-child,\n.two-col .column table:nth-last-child(2) td h3:last-child,\n.two-col .column table:nth-last-child(2) td p:last-child,\n.two-col .column table:nth-last-child(2) td ol:last-child,\n.two-col .column table:nth-last-child(2) td ul:last-child {\n  Margin-bottom: 23px;\n}\n.two-col .image-frame {\n  padding: 6px;\n}\n.two-col h1 {\n  font-size: 26px;\n  line-height: 32px;\n  Margin-bottom: 16px;\n}\n.two-col h2 {\n  font-size: 20px;\n  line-height: 26px;\n  Margin-bottom: 18px;\n}\n.two-col h3 {\n  font-size: 16px;\n  line-height: 20px;\n  Margin-bottom: 14px;\n}\n.two-col p,\n.two-col ol,\n.two-col ul {\n  font-size: 14px;\n  line-height: 23px;\n}\n.two-col ol,\n.two-col ul {\n  Margin-left: 16px;\n}\n.two-col li {\n  padding-left: 5px;\n}\n.two-col .divider .inner {\n  padding-bottom: 23px;\n}\n.two-col .btn {\n  Margin-bottom: 23px;\n}\n.two-col blockquote {\n  padding-left: 16px;\n}\n.three-col .column table:nth-last-child(2) td h1:last-child,\n.three-col .column table:nth-last-child(2) td h2:last-child,\n.three-col .column table:nth-last-child(2) td h3:last-child,\n.three-col .column table:nth-last-child(2) td p:last-child,\n.three-col .column table:nth-last-child(2) td ol:last-child,\n.three-col .column table:nth-last-child(2) td ul:last-child {\n  Margin-bottom: 21px;\n}\n.three-col .image-frame {\n  padding: 4px;\n}\n.three-col h1 {\n  font-size: 20px;\n  line-height: 26px;\n  Margin-bottom: 12px;\n}\n.three-col h2 {\n  font-size: 16px;\n  line-height: 22px;\n  Margin-bottom: 14px;\n}\n.three-col h3 {\n  font-size: 14px;\n  line-height: 18px;\n  Margin-bottom: 10px;\n}\n.three-col p,\n.three-col ol,\n.three-col ul {\n  font-size: 12px;\n  line-height: 21px;\n}\n.three-col ol,\n.three-col ul {\n  Margin-left: 14px;\n}\n.three-col li {\n  padding-left: 6px;\n}\n.three-col .divider .inner {\n  padding-bottom: 21px;\n}\n.three-col .btn {\n  Margin-bottom: 21px;\n}\n.three-col .btn a {\n  font-size: 12px;\n  line-height: 14px;\n  padding: 8px 19px;\n}\n.three-col blockquote {\n  padding-left: 16px;\n}\n.one-col-feature .column-top {\n  font-size: 36px;\n  line-height: 36px;\n}\n.one-col-feature .column-bottom {\n  font-size: 4px;\n  line-height: 4px;\n}\n.one-col-feature .column {\n  text-align: center;\n  width: 600px;\n}\n.one-col-feature .image {\n  Margin-bottom: 32px;\n}\n.one-col-feature .column table:nth-last-child(2) td h1:last-child,\n.one-col-feature .column table:nth-last-child(2) td h2:last-child,\n.one-col-feature .column table:nth-last-child(2) td h3:last-child,\n.one-col-feature .column table:nth-last-child(2) td p:last-child,\n.one-col-feature .column table:nth-last-child(2) td ol:last-child,\n.one-col-feature .column table:nth-last-child(2) td ul:last-child {\n  Margin-bottom: 32px;\n}\n.one-col-feature h1,\n.one-col-feature h2,\n.one-col-feature h3 {\n  text-align: center;\n}\n.one-col-feature h1 {\n  font-size: 52px;\n  Margin-bottom: 22px;\n}\n.one-col-feature h2 {\n  font-size: 42px;\n  Margin-bottom: 20px;\n}\n.one-col-feature h3 {\n  font-size: 32px;\n  line-height: 42px;\n  Margin-bottom: 20px;\n}\n.one-col-feature p,\n.one-col-feature ol,\n.one-col-feature ul {\n  font-size: 21px;\n  line-height: 32px;\n  Margin-bottom: 32px;\n}\n.one-col-feature p a,\n.one-col-feature ol a,\n.one-col-feature ul a {\n  text-decoration: none;\n}\n.one-col-feature p {\n  text-align: center;\n}\n.one-col-feature ol,\n.one-col-feature ul {\n  Margin-left: 40px;\n  text-align: left;\n}\n.one-col-feature li {\n  padding-left: 3px;\n}\n.one-col-feature .btn {\n  Margin-bottom: 32px;\n  text-align: center;\n}\n.one-col-feature .divider .inner {\n  padding-bottom: 32px;\n}\n.one-col-feature blockquote {\n  border-bottom: 2px solid #e9e9e9;\n  border-left-color: #ffffff;\n  border-left-width: 0;\n  border-left-style: none;\n  border-top: 2px solid #e9e9e9;\n  Margin-bottom: 32px;\n  Margin-left: 0;\n  padding-bottom: 42px;\n  padding-left: 0;\n  padding-top: 42px;\n  position: relative;\n}\n.one-col-feature blockquote:before,\n.one-col-feature blockquote:after {\n  background: -moz-linear-gradient(left, #ffffff 25%, #e9e9e9 25%, #e9e9e9 75%, #ffffff 75%);\n  background: -webkit-gradient(linear, left top, right top, color-stop(25%, #ffffff), color-stop(25%, #e9e9e9), color-stop(75%, #e9e9e9), color-stop(75%, #ffffff));\n  background: -webkit-linear-gradient(left, #ffffff 25%, #e9e9e9 25%, #e9e9e9 75%, #ffffff 75%);\n  background: -o-linear-gradient(left, #ffffff 25%, #e9e9e9 25%, #e9e9e9 75%, #ffffff 75%);\n  background: -ms-linear-gradient(left, #ffffff 25%, #e9e9e9 25%, #e9e9e9 75%, #ffffff 75%);\n  background: linear-gradient(to right, #ffffff 25%, #e9e9e9 25%, #e9e9e9 75%, #ffffff 75%);\n  content: '''';\n  display: block;\n  height: 2px;\n  left: 0;\n  outline: 1px solid #ffffff;\n  position: absolute;\n  right: 0;\n}\n.one-col-feature blockquote:before {\n  top: -2px;\n}\n.one-col-feature blockquote:after {\n  bottom: -2px;\n}\n.one-col-feature blockquote p,\n.one-col-feature blockquote ol,\n.one-col-feature blockquote ul {\n  font-size: 42px;\n  line-height: 48px;\n  Margin-bottom: 48px;\n}\n.one-col-feature blockquote p:last-child,\n.one-col-feature blockquote ol:last-child,\n.one-col-feature blockquote ul:last-child {\n  Margin-bottom: 0 !important;\n}\n.footer {\n  width: 602px;\n}\n.footer .padded {\n  font-size: 12px;\n  line-height: 20px;\n}\n.social {\n  padding-top: 32px;\n  padding-bottom: 22px;\n}\n.social img {\n  display: block;\n}\n.social .divider {\n  font-family: sans-serif;\n  font-size: 10px;\n  line-height: 21px;\n  text-align: center;\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.social .social-text {\n  height: 21px;\n  vertical-align: middle !important;\n  font-size: 10px;\n  font-weight: bold;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n.social .social-text a {\n  text-decoration: none;\n}\n.address {\n  width: 250px;\n}\n.address .padded {\n  text-align: left;\n  padding-left: 0;\n  padding-right: 10px;\n}\n.subscription {\n  width: 350px;\n}\n.subscription .padded {\n  text-align: right;\n  padding-right: 0;\n  padding-left: 10px;\n}\n.address,\n.subscription {\n  padding-top: 32px;\n  padding-bottom: 64px;\n}\n.address a,\n.subscription a {\n  font-weight: bold;\n  text-decoration: none;\n}\n.address table,\n.subscription table {\n  width: 100%;\n}\n@media only screen and (max-width: 651px) {\n  .gmail {\n    display: none !important;\n  }\n}\n@media only screen and (max-width: 620px) {\n  [class=wrapper] .one-col .column:last-child table:nth-last-child(2) td h1:last-child,\n  [class=wrapper] .two-col .column:last-child table:nth-last-child(2) td h1:last-child,\n  [class=wrapper] .three-col .column:last-child table:nth-last-child(2) td h1:last-child,\n  [class=wrapper] .one-col-feature .column:last-child table:nth-last-child(2) td h1:last-child,\n  [class=wrapper] .one-col .column:last-child table:nth-last-child(2) td h2:last-child,\n  [class=wrapper] .two-col .column:last-child table:nth-last-child(2) td h2:last-child,\n  [class=wrapper] .three-col .column:last-child table:nth-last-child(2) td h2:last-child,\n  [class=wrapper] .one-col-feature .column:last-child table:nth-last-child(2) td h2:last-child,\n  [class=wrapper] .one-col .column:last-child table:nth-last-child(2) td h3:last-child,\n  [class=wrapper] .two-col .column:last-child table:nth-last-child(2) td h3:last-child,\n  [class=wrapper] .three-col .column:last-child table:nth-last-child(2) td h3:last-child,\n  [class=wrapper] .one-col-feature .column:last-child table:nth-last-child(2) td h3:last-child,\n  [class=wrapper] .one-col .column:last-child table:nth-last-child(2) td p:last-child,\n  [class=wrapper] .two-col .column:last-child table:nth-last-child(2) td p:last-child,\n  [class=wrapper] .three-col .column:last-child table:nth-last-child(2) td p:last-child,\n  [class=wrapper] .one-col-feature .column:last-child table:nth-last-child(2) td p:last-child,\n  [class=wrapper] .one-col .column:last-child table:nth-last-child(2) td ol:last-child,\n  [class=wrapper] .two-col .column:last-child table:nth-last-child(2) td ol:last-child,\n  [class=wrapper] .three-col .column:last-child table:nth-last-child(2) td ol:last-child,\n  [class=wrapper] .one-col-feature .column:last-child table:nth-last-child(2) td ol:last-child,\n  [class=wrapper] .one-col .column:last-child table:nth-last-child(2) td ul:last-child,\n  [class=wrapper] .two-col .column:last-child table:nth-last-child(2) td ul:last-child,\n  [class=wrapper] .three-col .column:last-child table:nth-last-child(2) td ul:last-child,\n  [class=wrapper] .one-col-feature .column:last-child table:nth-last-child(2) td ul:last-child {\n    Margin-bottom: 24px !important;\n  }\n  [class=wrapper] .address,\n  [class=wrapper] .subscription {\n    display: block;\n    float: left;\n    width: 318px !important;\n    text-align: center !important;\n  }\n  [class=wrapper] .address {\n    padding-bottom: 0 !important;\n  }\n  [class=wrapper] .subscription {\n    padding-top: 0 !important;\n  }\n  [class=wrapper] h1 {\n    font-size: 36px !important;\n    line-height: 42px !important;\n    Margin-bottom: 18px !important;\n  }\n  [class=wrapper] h2 {\n    font-size: 26px !important;\n    line-height: 32px !important;\n    Margin-bottom: 20px !important;\n  }\n  [class=wrapper] h3 {\n    font-size: 18px !important;\n    line-height: 22px !important;\n    Margin-bottom: 16px !important;\n  }\n  [class=wrapper] p,\n  [class=wrapper] ol,\n  [class=wrapper] ul {\n    font-size: 16px !important;\n    line-height: 24px !important;\n    Margin-bottom: 24px !important;\n  }\n  [class=wrapper] ol,\n  [class=wrapper] ul {\n    Margin-left: 18px !important;\n  }\n  [class=wrapper] li {\n    padding-left: 2px !important;\n  }\n  [class=wrapper] blockquote {\n    padding-left: 16px !important;\n  }\n  [class=wrapper] .two-col .column:nth-child(n + 3) {\n    border-top: 1px solid #e9e9e9;\n  }\n  [class=wrapper] .btn {\n    margin-bottom: 24px !important;\n  }\n  [class=wrapper] .btn a {\n    display: block !important;\n    font-size: 13px !important;\n    font-weight: bold !important;\n    line-height: 15px !important;\n    padding: 10px 30px !important;\n  }\n  [class=wrapper] .column-bottom {\n    font-size: 8px !important;\n    line-height: 8px !important;\n  }\n  [class=wrapper] .first .column-bottom,\n  [class=wrapper] .three-col .second .column-bottom {\n    display: none;\n  }\n  [class=wrapper] .second .column-top,\n  [class=wrapper] .third .column-top {\n    display: none;\n  }\n  [class=wrapper] .image-frame {\n    padding: 4px !important;\n  }\n  [class=wrapper] .header .logo {\n    padding-left: 10px !important;\n    padding-right: 10px !important;\n  }\n  [class=wrapper] .header .logo div {\n    font-size: 26px !important;\n    line-height: 32px !important;\n  }\n  [class=wrapper] .header .logo div img {\n    display: inline-block !important;\n    max-width: 280px !important;\n    height: auto !important;\n  }\n  [class=wrapper] table.border,\n  [class=wrapper] .header,\n  [class=wrapper] .webversion,\n  [class=wrapper] .footer {\n    width: 320px !important;\n  }\n  [class=wrapper] .preheader .webversion,\n  [class=wrapper] .header .logo a {\n    text-align: center !important;\n  }\n  [class=wrapper] .preheader table,\n  [class=wrapper] .border td {\n    width: 318px !important;\n  }\n  [class=wrapper] .border td.border {\n    width: 1px !important;\n  }\n  [class=wrapper] .image .border td {\n    width: auto !important;\n  }\n  [class=wrapper] .title {\n    display: none;\n  }\n  [class=wrapper] .footer .padded {\n    text-align: center !important;\n  }\n  [class=wrapper] .footer .subscription .padded {\n    padding-top: 20px !important;\n  }\n  [class=wrapper] .footer .social-link {\n    display: block !important;\n  }\n  [class=wrapper] .footer .social-link table {\n    margin: 0 auto 10px !important;\n  }\n  [class=wrapper] .footer .divider {\n    display: none !important;\n  }\n  [class=wrapper] .one-col-feature .btn {\n    margin-bottom: 28px !important;\n  }\n  [class=wrapper] .one-col-feature .image {\n    margin-bottom: 28px !important;\n  }\n  [class=wrapper] .one-col-feature .divider .inner {\n    padding-bottom: 28px !important;\n  }\n  [class=wrapper] .one-col-feature h1 {\n    font-size: 42px !important;\n    line-height: 48px !important;\n    margin-bottom: 20px !important;\n  }\n  [class=wrapper] .one-col-feature h2 {\n    font-size: 32px !important;\n    line-height: 36px !important;\n    margin-bottom: 18px !important;\n  }\n  [class=wrapper] .one-col-feature h3 {\n    font-size: 26px !important;\n    line-height: 32px !important;\n    margin-bottom: 20px !important;\n  }\n  [class=wrapper] .one-col-feature p,\n  [class=wrapper] .one-col-feature ol,\n  [class=wrapper] .one-col-feature ul {\n    font-size: 20px !important;\n    line-height: 28px !important;\n    margin-bottom: 28px !important;\n  }\n  [class=wrapper] .one-col-feature blockquote {\n    font-size: 18px !important;\n    line-height: 26px !important;\n    margin-bottom: 28px !important;\n    padding-bottom: 26px !important;\n    padding-left: 0 !important;\n    padding-top: 26px !important;\n  }\n  [class=wrapper] .one-col-feature blockquote p,\n  [class=wrapper] .one-col-feature blockquote ol,\n  [class=wrapper] .one-col-feature blockquote ul {\n    font-size: 26px !important;\n    line-height: 32px !important;\n  }\n  [class=wrapper] .one-col-feature blockquote p:last-child,\n  [class=wrapper] .one-col-feature blockquote ol:last-child,\n  [class=wrapper] .one-col-feature blockquote ul:last-child {\n    margin-bottom: 0 !important;\n  }\n  [class=wrapper] .one-col-feature .column table:last-of-type h1:last-child,\n  [class=wrapper] .one-col-feature .column table:last-of-type h2:last-child,\n  [class=wrapper] .one-col-feature .column table:last-of-type h3:last-child {\n    margin-bottom: 28px !important;\n  }\n}\n@media only screen and (max-width: 320px) {\n  [class=wrapper] td.border {\n    display: none;\n  }\n  [class=wrapper] table.border,\n  [class=wrapper] .header,\n  [class=wrapper] .webversion,\n  [class=wrapper] .footer {\n    width: 318px !important;\n  }\n}\n</style>\n    <!--[if gte mso 9]>\n    <style>\n      .column-top {\n        mso-line-height-rule: exactly !important;\n      }\n    </style>\n    <![endif]-->\n  <meta name="robots" content="noindex,nofollow">\n<meta property="og:title" content="My First Campaign">\n</head>\n  <body style="margin: 0;mso-line-height-rule: exactly;padding: 0;min-width: 100%;background-color: #fbfbfb"><style type="text/css">\nbody,.wrapper,.emb-editor-canvas{background-color:#fbfbfb}.border{background-color:#e9e9e9}h1{color:#565656}.wrapper h1{}.wrapper h1{font-family:sans-serif}@media only screen and (min-width: 0){.wrapper h1{font-family:Avenir,sans-serif !important}}h1{}.one-col h1{line-height:42px}.two-col h1{line-height:32px}.three-col h1{line-height:26px}.wrapper .one-col-feature h1{line-height:58px}@media only screen and (max-width: 620px){h1{line-height:42px !important}}h2{color:#555}.wrapper h2{}.wrapper h2{font-family:Georgia,serif}h2{}.one-col h2{line-height:32px}.two-col h2{line-height:26px}.three-col h2{line-height:22px}.wrapper .one-col-feature h2{line-height:52px}@media only screen and (max-width: 620px){h2{line-height:32px !important}}h3{color:#555}.wrapper h3{}.wrapper h3{font-family:Georgia,serif}h3{}.one-col h3{line-height:26px}.two-col h3{line-height:22px}.three-col \nh3{line-height:20px}.wrapper .one-col-feature h3{line-height:42px}@media only screen and (max-width: 620px){h3{line-height:26px !important}}p,ol,ul{color:#565656}.wrapper p,.wrapper ol,.wrapper ul{}.wrapper p,.wrapper ol,.wrapper ul{font-family:Georgia,serif}p,ol,ul{}.one-col p,.one-col ol,.one-col ul{line-height:25px;Margin-bottom:25px}.two-col p,.two-col ol,.two-col ul{line-height:23px;Margin-bottom:23px}.three-col p,.three-col ol,.three-col ul{line-height:21px;Margin-bottom:21px}.wrapper .one-col-feature p,.wrapper .one-col-feature ol,.wrapper .one-col-feature ul{line-height:32px}.one-col-feature blockquote p,.one-col-feature blockquote ol,.one-col-feature blockquote ul{line-height:50px}@media only screen and (max-width: 620px){p,ol,ul{line-height:25px !important;Margin-bottom:25px !important}}.image{color:#565656}.image{font-family:Georgia,serif}.wrapper a{color:#41637e}.wrapper \na:hover{color:#30495c !important}.wrapper .logo div{color:#41637e}.wrapper .logo div{font-family:sans-serif}@media only screen and (min-width: 0){.wrapper .logo div{font-family:Avenir,sans-serif !important}}.wrapper .logo div a{color:#41637e}.wrapper .logo div a:hover{color:#41637e !important}.wrapper .one-col-feature p a,.wrapper .one-col-feature ol a,.wrapper .one-col-feature ul a{border-bottom:1px solid #41637e}.wrapper .one-col-feature p a:hover,.wrapper .one-col-feature ol a:hover,.wrapper .one-col-feature ul a:hover{color:#30495c !important;border-bottom:1px solid #30495c !important}.btn a{}.wrapper .btn a{}.wrapper .btn a{font-family:Georgia,serif}.wrapper .btn a{background-color:#41637e;color:#fff !important;outline-color:#41637e;text-shadow:0 1px 0 #3b5971}.wrapper .btn a:hover{background-color:#3b5971 !important;color:#fff !important;outline-color:#3b5971 !important}.preheader \n.title,.preheader .webversion,.footer .padded{color:#999}.preheader .title,.preheader .webversion,.footer .padded{font-family:Georgia,serif}.preheader .title a,.preheader .webversion a,.footer .padded a{color:#999}.preheader .title a:hover,.preheader .webversion a:hover,.footer .padded a:hover{color:#737373 !important}.footer .social .divider{color:#e9e9e9}.footer .social .social-text,.footer .social a{color:#999}.wrapper .footer .social .social-text,.wrapper .footer .social a{}.wrapper .footer .social .social-text,.wrapper .footer .social a{font-family:Georgia,serif}.footer .social .social-text,.footer .social a{}.footer .social .social-text,.footer .social a{letter-spacing:0.05em}.footer .social .social-text:hover,.footer .social a:hover{color:#737373 !important}.image .border{background-color:#c8c8c8}.image-frame{background-color:#dadada}.image-background{background-color:#f7f7f7}\n</style>\n    <center class="wrapper" style="display: table;table-layout: fixed;width: 100%;min-width: 620px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;background-color: #fbfbfb">\n      <table class="gmail" style="border-collapse: collapse;border-spacing: 0;width: 650px;min-width: 650px"><tbody><tr><td style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px">&nbsp;</td></tr></tbody></table>\n      <table class="preheader centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto">\n        <tbody><tr>\n          <td style="padding: 0;vertical-align: top">\n            <table style="border-collapse: collapse;border-spacing: 0;width: 602px">\n              <tbody><tr>\n                \n                <td class="webversion" style="padding: 0;vertical-align: top;padding-top: 10px;padding-bottom: 12px;font-size: 12px;line-height: 21px;text-align: right;width: 300px;color: #999;font-family: Georgia,serif"> </td>\n              </tr>\n            </tbody></table>\n          </td>\n        </tr>\n      </tbody></table>\n      \n      \n          <table class="border" style="border-collapse: collapse;border-spacing: 0;font-size: 1px;line-height: 1px;background-color: #e9e9e9;Margin-left: auto;Margin-right: auto" width="602">\n            <tbody><tr><td style="padding: 0;vertical-align: top">&#8203;</td></tr>\n          </tbody></table>\n        \n          <table class="centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto">\n            <tbody><tr>\n              <td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #e9e9e9;width: 1px">&#8203;</td>\n              <td style="padding: 0;vertical-align: top">\n                <table class="one-col" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 600px;background-color: #ffffff;font-size: 14px;table-layout: fixed">\n                  <tbody><tr>\n                    <td class="column" style="padding: 0;vertical-align: top;text-align: left">\n                      <div><div class="column-top" style="font-size: 32px;line-height: 32px">&nbsp;</div></div>\n                        <table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%">\n                          <tbody><tr>\n                            <td class="padded" style="padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px;word-break: break-word;word-wrap: break-word">\n                              \n            <h1 style="Margin-top: 0;color: #565656;font-weight: 700;font-size: 36px;Margin-bottom: 18px;font-family: sans-serif;line-height: 42px">Aprueba tu cuenta para ser usada</h1><p style="Margin-top: 0;color: #565656;font-family: Georgia,serif;font-size: 16px;line-height: 25px;Margin-bottom: 24px">Hola para poder hacer uso de todos los beneficios que te ofrece subastra com haz click en el siguiente enlace: </p>\n<a href="#LINK#">#LINK#</a>\n          \n                            </td>\n                          </tr>\n                        </tbody></table>\n                      \n                      <div class="column-bottom" style="font-size: 8px;line-height: 8px">&nbsp;</div>\n                    </td>\n                  </tr>\n                </tbody></table>\n              </td>\n              <td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #e9e9e9;width: 1px">&#8203;</td>\n            </tr>\n          </tbody></table>\n        \n          <table class="border" style="border-collapse: collapse;border-spacing: 0;font-size: 1px;line-height: 1px;background-color: #e9e9e9;Margin-left: auto;Margin-right: auto" width="602">\n            <tbody><tr><td style="padding: 0;vertical-align: top">&#8203;</td></tr>\n          </tbody></table>\n        \n      <div class="spacer" style="font-size: 1px;line-height: 32px;width: 100%">&nbsp;</div>\n      <table class="footer centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 602px">\n        <tbody><tr>\n          \n        </tr>\n        <tr><td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #e9e9e9;width: 1px">&nbsp;</td></tr>\n        <tr>\n          <td style="padding: 0;vertical-align: top">\n            <table style="border-collapse: collapse;border-spacing: 0">\n              <tbody><tr>\n                <td class="address" style="padding: 0;vertical-align: top;width: 250px;padding-top: 32px;padding-bottom: 64px">\n                  <table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%">\n                    <tbody><tr>\n                      <td class="padded" style="padding: 0;vertical-align: top;padding-left: 0;padding-right: 10px;word-break: break-word;word-wrap: break-word;text-align: left;font-size: 12px;line-height: 20px;color: #999;font-family: Georgia,serif">\n                        <div>subastra<br>\nFormulario</div>\n                      </td>\n                    </tr>\n                  </tbody></table>\n                </td>\n                <td class="subscription" style="padding: 0;vertical-align: top;width: 350px;padding-top: 32px;padding-bottom: 64px">\n                  <table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%">\n                    <tbody><tr>\n                      <td class="padded" style="padding: 0;vertical-align: top;padding-left: 10px;padding-right: 0;word-break: break-word;word-wrap: break-word;font-size: 12px;line-height: 20px;color: #999;font-family: Georgia,serif;text-align: right">\n                        <div>Subastra todos los derechos reservador</div>\n                        \n                      </td>\n                    </tr>\n                  </tbody></table>\n                </td>\n              </tr>\n            </tbody></table>\n          </td>\n        </tr>\n      </tbody></table>\n    </center>\n  \n\n</body></html>\n', 'este template es cuando el usuario aprueba la cuenta usando el email', 'template-register\r\n'),
(2, 'template dudas', '<html class="ui-mobile"><head><style type="text/css">.gm-style .gm-style-mtc label,.gm-style .gm-style-mtc div{font-weight:400}</style><link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"><style type="text/css">.gm-style .gm-style-cc span,.gm-style .gm-style-cc a,.gm-style .gm-style-mtc div{font-size:10px}</style><style type="text/css">@media print {  .gm-style .gmnoprint, .gmnoprint {    display:none  }}@media screen {  .gm-style .gmnoscreen, .gmnoscreen {    display:none  }}</style><style type="text/css">.gm-style{font-family:Roboto,Arial,sans-serif;font-size:11px;font-weight:400;text-decoration:none}</style><base href="http://subastra.com/415111911007422/page.html#page-register">\n	<title>&nbsp;</title>\n	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n\n	<!-- se importa fonts awesome plugin para los iconos -->\n	<link rel="stylesheet" href="http://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css">\n\n	<!-- jQueryMobileCSS - original sin estilo -->\n	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.css">\n\n	<!-- css nativo del tema -->\n	<link rel="stylesheet" href="css/jquerymobile.nativedroid.css">\n\n	<!-- nativeDroid: tema suave para css -->\n	<link rel="stylesheet" href="css/jquerymobile.nativedroid.light.css" id="jQMnDTheme">\n\n	<!-- importo jQuery  -->\n	<script src="js/libs/jquery-1.9.1.min.js"></script>\n    \n	<!-- importo jQuery route para enrutar todas las paginas de la aplciacion -->\n    <script type="text/javascript" src="js/jquery.mobile.router.js"></script>\n	\n    <!-- importo jQuery mobile js -->\n    <script src="js/libs/jquery.mobile-1.4.2.min.js"></script>\n	\n    <!-- importo mis estilos propios -->\n	<link rel="stylesheet" type="text/css" href="css/style.css">\n	\n    <!-- importo actions donde esta toda la logica de la aplicacion -->\n	<script type="text/javascript" src="js/actions.js"></script>\n	\n    <!-- importo routes donde esta todas las rutas de la aplicacion -->\n	<script type="text/javascript" src="js/routes.js"></script>\n    \n    <!-- importo libreria que contiene el datepicker js de ui -->\n    <script src="js/libs/jquery.ui.datepicker.js"></script>\n    \n    <!-- importo libreria que contiene el datepicker js de movil -->\n    <script id="mobile-datepicker" src="js/libs/jquery.mobile.datepicker.js"></script>\n    \n     <!-- importo libreria que contiene el datepicker css de movil -->\n    <link rel="stylesheet" href="js/libs/jquery.mobile.datepicker.css">\n    \n<script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/common.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/map.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/util.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/onion.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/controls.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/stats.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/marker.js"></script></head>\n<body><div style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f1f2f6">\n	<table style="border-spacing:0;width:100%;background-color:#f1f2f6;table-layout:fixed">\n		<tbody><tr>\n			<td align="center" style="padding-right:0;padding-left:0;vertical-align:top;padding-top:24px;padding-bottom:0;font-family:sans-serif;font-size:14px;color:#bec7cf">\n				<center>\n					<div style="font-size:20px;line-height:20px;display:block">&nbsp;</div>\n					<table style="border-spacing:0;width:650px;min-width:650px"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-size:1px;line-height:1px">&nbsp;</td></tr></tbody></table>\n					<img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd">\n				</center>\n			</td>\n		</tr>\n	</tbody></table>\n	<table style="border-spacing:0;width:100%;background-color:#f1f2f6;table-layout:fixed">\n		<tbody><tr>\n			<td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\n				<div style="font-size:40px;line-height:40px;min-height:40px;display:block">&nbsp;</div>\n				<center>\n 					<table width="610" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr>\n							<td width="100%" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\n								<table width="100%" style="border-spacing:0">\n									<tbody><tr>\n										\n									</tr>\n								</tbody></table>\n							</td>\n						</tr>\n					</tbody></table>\n					\n					\n					<table width="612" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\n							<td width="608" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#fdfdfe">\n								<table width="100%" style="border-spacing:0">\n									<tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#f8f9fb;border-top-width:1px;border-top-style:solid;border-top-color:#e7e7ea;font-size:3px;line-height:3px">&nbsp;</td></tr>\n									<tr>\n										<td style="vertical-align:top;padding-left:70px;padding-right:70px;padding-bottom:30px;padding-top:40px">\n											<table width="100%" style="border-spacing:0">\n												<tbody><tr>\n													<td style="padding-top:0;padding-right:0;padding-left:0;vertical-align:top;padding-bottom:7px;text-align:left">\n														<h2 style="font-family:sans-serif;font-weight:bold;Margin-top:0;text-align:left;font-size:18px;line-height:24px;Margin-bottom:17px;letter-spacing:-0.02em;color:#445359">Acaba de llegar una solicitud enviada desde el formulario de solicitud de subastra</h2>\n														<p style="Margin-top:0;font-weight:normal;color:#677483;font-family:sans-serif;font-size:14px;line-height:25px;Margin-bottom:15px"><b>MENSAJE:</b>&nbsp;#MENSAJE#</p>\n														<table style="border-spacing:0">\n															<tbody><tr><td colspan="2" height="10" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;color:#677483;text-align:left;font-size:0;line-height:0">&nbsp;</td></tr>\n															<tr>\n																<td style="padding-top:0;padding-bottom:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;font-size:13px;line-height:18px;color:#677483;text-align:left;padding-right:10px"><img src="https://ci3.googleusercontent.com/proxy/cpwbJ02efqX72Mlt83RNcGnbh4HqiCR3ZgI6tY8gaOF6jWG5aug0NOgtk_k6WsEuNLI2SIRnvGlThLYRnj73GIV8d5gXfyFkvaJyI7zY5LlpStt2Mv5zYYxxkUJOhQ=s0-d-e1-ft#https://i1.campaignmonitor.com/assets/images/canvas-public/icon-tick.png" width="18" height="16" alt="" style="border-width:0" class="CToWUd"></td>\n																<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;font-size:13px;line-height:18px;color:#677483;text-align:left"><b>NOMBRE</b> #NOMBRE#</td>\n															</tr>\n															<tr><td colspan="2" height="10" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;color:#677483;text-align:left;font-size:0;line-height:0">&nbsp;</td></tr>\n															<tr>\n																<td style="padding-top:0;padding-bottom:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;font-size:13px;line-height:18px;color:#677483;text-align:left;padding-right:10px"><img src="https://ci3.googleusercontent.com/proxy/cpwbJ02efqX72Mlt83RNcGnbh4HqiCR3ZgI6tY8gaOF6jWG5aug0NOgtk_k6WsEuNLI2SIRnvGlThLYRnj73GIV8d5gXfyFkvaJyI7zY5LlpStt2Mv5zYYxxkUJOhQ=s0-d-e1-ft#https://i1.campaignmonitor.com/assets/images/canvas-public/icon-tick.png" width="18" height="16" alt="" style="border-width:0" class="CToWUd"></td>\n																<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;font-size:13px;line-height:18px;color:#677483;text-align:left"><b>APELLIDO</b> #APELLIDO#</td>\n															</tr>\n															<tr><td colspan="2" height="10" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;color:#677483;text-align:left;font-size:0;line-height:0">&nbsp;</td></tr>\n															<tr>\n																<td style="padding-top:0;padding-bottom:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;font-size:13px;line-height:18px;color:#677483;text-align:left;padding-right:10px"><img src="https://ci3.googleusercontent.com/proxy/cpwbJ02efqX72Mlt83RNcGnbh4HqiCR3ZgI6tY8gaOF6jWG5aug0NOgtk_k6WsEuNLI2SIRnvGlThLYRnj73GIV8d5gXfyFkvaJyI7zY5LlpStt2Mv5zYYxxkUJOhQ=s0-d-e1-ft#https://i1.campaignmonitor.com/assets/images/canvas-public/icon-tick.png" width="18" height="16" alt="" style="border-width:0" class="CToWUd"></td>\n																<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-family:sans-serif;font-weight:normal;font-size:13px;line-height:18px;color:#677483;text-align:left"><b>CORREO ELECTRONICO</b> #CORREO#</td>\n															</tr>\n														</tbody></table>\n													</td>\n												</tr>\n											</tbody></table>\n										</td>\n									</tr>\n								</tbody></table>\n							</td>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\n						</tr>\n					</tbody></table>\n					<table width="630" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\n								<table width="100%" style="border-spacing:0">\n									<tbody><tr>\n										\n									</tr>\n								</tbody></table>\n							</td>\n						</tr>\n						<tr>\n							<td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\n								<center>\n									<table width="610" style="border-spacing:0;Margin:0 auto">\n										</table>\n								</center>\n							</td>\n						</tr>\n					</tbody></table>\n					<table width="612" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\n							<td width="608" bgcolor="#ffffff" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;Margin:0 auto">\n								<table width="100%" style="border-spacing:0">\n									<tbody><tr>\n										<td height="23" style="font-size:3px;line-height:3px;color:#ffffff;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">&nbsp;</td>\n									</tr>\n								</tbody></table>\n							</td>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\n						</tr>\n					</tbody></table>\n					\n					<table width="610" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr>\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\n								<table width="100%" style="border-spacing:0">\n									<tbody><tr>\n										<td width="610" style="background-color:#ffffff;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;height:3px;font-size:3px;line-height:3px;border-left-width:1px;border-left-style:solid;border-left-color:#e2e3e7;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e3e7;border-right-width:1px;border-right-style:solid;border-right-color:#e2e3e7;border-bottom-left-radius:3px;border-bottom-right-radius:3px">\n											&#8203;\n										</td>\n									</tr>\n								</tbody></table>\n							</td>\n						</tr>\n					</tbody></table>\n					<table width="608" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td></tr>\n					</tbody></table>\n					<table width="606" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e6e9ee;width:1px">&#8203;</td></tr>\n					</tbody></table>\n					<table width="604" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td></tr>\n					</tbody></table>\n					<table width="600" style="border-spacing:0;Margin:0 auto">\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td></tr>\n					</tbody></table>\n					<table width="400" style="border-spacing:0;Margin:0 auto">\n					  <tbody><tr>\n					    \n					  </tr>\n					  <tr>\n					    \n					  </tr>\n					  <tr>\n					    <td style="line-height:5px;font-size:5px;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;text-align:center">\n					      <img src="https://ci5.googleusercontent.com/proxy/WawXy5P5x6A7-_RD2Vzp9mSLxbKnppuK513VM8XYJu1MUGpClr9cSVcOYaEkf15ppRWVDxDGCz4OrHvmcU8LaNeC-GX6fHpBBTfnjKFK-sf_hF7rTHW0G04=s0-d-e1-ft#https://i1.campaignmonitor.com/assets/images/canvas-public/bull.png" alt="" width="5" height="5" style="border-width:0" class="CToWUd">\n					    </td>\n					  </tr>\n					  \n					  <tr><td height="80" style="font-size:0;line-height:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;text-align:center">&nbsp;</td></tr>\n					</tbody></table>\n				</center>\n			</td>\n		</tr>\n	</tbody></table><div class="yj6qo"></div><div class="adL">\n</div></div></body></html>', 'template para el formulario de preguntas frecuentes en la aplicacion', 'template-dudes');
INSERT INTO `plantilla_email` (`id`, `nombre`, `contenido_html`, `descripcion`, `slug`) VALUES
(3, 'retiro de subastra', '<html class="ui-mobile"><head><style type="text/css">.gm-style .gm-style-mtc label,.gm-style .gm-style-mtc div{font-weight:400}</style><link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"><style type="text/css">.gm-style .gm-style-cc span,.gm-style .gm-style-cc a,.gm-style .gm-style-mtc div{font-size:10px}</style><style type="text/css">@media print {  .gm-style .gmnoprint, .gmnoprint {    display:none  }}@media screen {  .gm-style .gmnoscreen, .gmnoscreen {    display:none  }}</style><style type="text/css">.gm-style{font-family:Roboto,Arial,sans-serif;font-size:11px;font-weight:400;text-decoration:none}</style><base href="http://subastra.com/415111911007422/page.html#page-register">\r\n	<title>&nbsp;</title>\r\n	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\r\n\r\n	<!-- se importa fonts awesome plugin para los iconos -->\r\n	<link rel="stylesheet" href="http://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css">\r\n\r\n	<!-- jQueryMobileCSS - original sin estilo -->\r\n	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.css">\r\n\r\n	<!-- css nativo del tema -->\r\n	<link rel="stylesheet" href="css/jquerymobile.nativedroid.css">\r\n\r\n	<!-- nativeDroid: tema suave para css -->\r\n	<link rel="stylesheet" href="css/jquerymobile.nativedroid.light.css" id="jQMnDTheme">\r\n\r\n	<!-- importo jQuery  -->\r\n	<script src="js/libs/jquery-1.9.1.min.js"></script>\r\n    \r\n	<!-- importo jQuery route para enrutar todas las paginas de la aplciacion -->\r\n    <script type="text/javascript" src="js/jquery.mobile.router.js"></script>\r\n	\r\n    <!-- importo jQuery mobile js -->\r\n    <script src="js/libs/jquery.mobile-1.4.2.min.js"></script>\r\n	\r\n    <!-- importo mis estilos propios -->\r\n	<link rel="stylesheet" type="text/css" href="css/style.css">\r\n	\r\n    <!-- importo actions donde esta toda la logica de la aplicacion -->\r\n	<script type="text/javascript" src="js/actions.js"></script>\r\n	\r\n    <!-- importo routes donde esta todas las rutas de la aplicacion -->\r\n	<script type="text/javascript" src="js/routes.js"></script>\r\n    \r\n    <!-- importo libreria que contiene el datepicker js de ui -->\r\n    <script src="js/libs/jquery.ui.datepicker.js"></script>\r\n    \r\n    <!-- importo libreria que contiene el datepicker js de movil -->\r\n    <script id="mobile-datepicker" src="js/libs/jquery.mobile.datepicker.js"></script>\r\n    \r\n     <!-- importo libreria que contiene el datepicker css de movil -->\r\n    <link rel="stylesheet" href="js/libs/jquery.mobile.datepicker.css">\r\n    \r\n<script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/common.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/map.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/util.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/onion.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/controls.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/stats.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.gstatic.com/maps-api-v3/api/js/20/6/intl/es_ALL/marker.js"></script></head>\r\n<body><div style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f1f2f6">\r\n	<table style="border-spacing:0;width:100%;background-color:#f1f2f6;table-layout:fixed">\r\n		<tbody><tr>\r\n			<td align="center" style="padding-right:0;padding-left:0;vertical-align:top;padding-top:24px;padding-bottom:0;font-family:sans-serif;font-size:14px;color:#bec7cf">\r\n				<center>\r\n					<div style="font-size:20px;line-height:20px;display:block">&nbsp;</div>\r\n					<table style="border-spacing:0;width:650px;min-width:650px"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-size:1px;line-height:1px">&nbsp;</td></tr></tbody></table>\r\n					<img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd">\r\n				</center>\r\n			</td>\r\n		</tr>\r\n	</tbody></table>\r\n	<table style="border-spacing:0;width:100%;background-color:#f1f2f6;table-layout:fixed">\r\n		<tbody><tr>\r\n			<td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\r\n				<div style="font-size:40px;line-height:40px;min-height:40px;display:block">&nbsp;</div>\r\n				<center>\r\n 					<table width="610" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr>\r\n							<td width="100%" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\r\n								<table width="100%" style="border-spacing:0">\r\n									<tbody><tr>\r\n										\r\n									</tr>\r\n								</tbody></table>\r\n							</td>\r\n						</tr>\r\n					</tbody></table>\r\n					\r\n					\r\n					<table width="612" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\r\n							<td width="608" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#fdfdfe">\r\n								<table width="100%" style="border-spacing:0">\r\n									<tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#f8f9fb;border-top-width:1px;border-top-style:solid;border-top-color:#e7e7ea;font-size:3px;line-height:3px">&nbsp;</td></tr>\r\n									<tr>\r\n										<td style="vertical-align:top;padding-left:70px;padding-right:70px;padding-bottom:30px;padding-top:40px">\r\n											<table width="100%" style="border-spacing:0">\r\n												<tbody><tr>\r\n													<td style="padding-top:0;padding-right:0;padding-left:0;vertical-align:top;padding-bottom:7px;text-align:left">\r\n														<h2 style="font-family:sans-serif;font-weight:bold;Margin-top:0;text-align:left;font-size:18px;line-height:24px;Margin-bottom:17px;letter-spacing:-0.02em;color:#445359">\r\n															Lamentamos que te hayas ido y por supuesto, estaremos encantados cuando decidas regresar. \r\n															<p>Te invitamos a que nos digas porque quieres irte.</p>\r\n															<p>Ingresa al siguiente link</p>\r\n															<p>Ingresa al siguiente link</p>\r\n														</h2>\r\n														\r\n													</td>\r\n												</tr>\r\n											</tbody></table>\r\n										</td>\r\n									</tr>\r\n								</tbody></table>\r\n							</td>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\r\n						</tr>\r\n					</tbody></table>\r\n					<table width="630" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\r\n								<table width="100%" style="border-spacing:0">\r\n									<tbody><tr>\r\n										\r\n									</tr>\r\n								</tbody></table>\r\n							</td>\r\n						</tr>\r\n						<tr>\r\n							<td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\r\n								<center>\r\n									<table width="610" style="border-spacing:0;Margin:0 auto">\r\n										</table>\r\n								</center>\r\n							</td>\r\n						</tr>\r\n					</tbody></table>\r\n					<table width="612" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\r\n							<td width="608" bgcolor="#ffffff" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;Margin:0 auto">\r\n								<table width="100%" style="border-spacing:0">\r\n									<tbody><tr>\r\n										<td height="23" style="font-size:3px;line-height:3px;color:#ffffff;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">&nbsp;</td>\r\n									</tr>\r\n								</tbody></table>\r\n							</td>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>\r\n						</tr>\r\n					</tbody></table>\r\n					\r\n					<table width="610" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr>\r\n							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">\r\n								<table width="100%" style="border-spacing:0">\r\n									<tbody><tr>\r\n										<td width="610" style="background-color:#ffffff;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;height:3px;font-size:3px;line-height:3px;border-left-width:1px;border-left-style:solid;border-left-color:#e2e3e7;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e3e7;border-right-width:1px;border-right-style:solid;border-right-color:#e2e3e7;border-bottom-left-radius:3px;border-bottom-right-radius:3px">\r\n											&#8203;\r\n										</td>\r\n									</tr>\r\n								</tbody></table>\r\n							</td>\r\n						</tr>\r\n					</tbody></table>\r\n					<table width="608" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td></tr>\r\n					</tbody></table>\r\n					<table width="606" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e6e9ee;width:1px">&#8203;</td></tr>\r\n					</tbody></table>\r\n					<table width="604" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td></tr>\r\n					</tbody></table>\r\n					<table width="600" style="border-spacing:0;Margin:0 auto">\r\n						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td></tr>\r\n					</tbody></table>\r\n					<table width="400" style="border-spacing:0;Margin:0 auto">\r\n					  <tbody><tr>\r\n					    \r\n					  </tr>\r\n					  <tr>\r\n					    \r\n					  </tr>\r\n					  <tr>\r\n					    <td style="line-height:5px;font-size:5px;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;text-align:center">\r\n					      <img src="https://ci5.googleusercontent.com/proxy/WawXy5P5x6A7-_RD2Vzp9mSLxbKnppuK513VM8XYJu1MUGpClr9cSVcOYaEkf15ppRWVDxDGCz4OrHvmcU8LaNeC-GX6fHpBBTfnjKFK-sf_hF7rTHW0G04=s0-d-e1-ft#https://i1.campaignmonitor.com/assets/images/canvas-public/bull.png" alt="" width="5" height="5" style="border-width:0" class="CToWUd">\r\n					    </td>\r\n					  </tr>\r\n					  \r\n					  <tr><td height="80" style="font-size:0;line-height:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;text-align:center">&nbsp;</td></tr>\r\n					</tbody></table>\r\n				</center>\r\n			</td>\r\n		</tr>\r\n	</tbody></table><div class="yj6qo"></div><div class="adL">\r\n</div></div></body></html>', 'plantilla de correo que se envia cuando alguien se retira de subastra', 'template-retiro'),
(4, 'plantilla bienvenida', '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n  <title>Retiro</title>\r\n  <meta charset="utf-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1">\r\n  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">\r\n  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\r\n  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>\r\n  <script type="text/javascript" src="script.js"></script>\r\n</head>\r\n<body style="background:#f1f2f6">\r\n\r\n<div class="container">\r\n  <div class="row clearfix">\r\n    <div class="col-md-3 column"></div>\r\n    <div class="col-md-6 column">\r\n      <div style="text-align:center"><img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd"></div>\r\n\r\n    <div style="background:#fff; padding: 20px 50px; margin-top: 30px;">\r\n    <h2 style="text-align:center">Bienvenido a SUBASTRA</h2><br>\r\n    <h4>Te invitamos a que explores las siguientes opciones:</h4>\r\n    <h4>\r\n      <ul>\r\n        <li type="disc">Crear perfil</li>\r\n        <li type="disc">Ver Subastas</li>\r\n        <li type="disc">Participar subastas</li>\r\n        <li type="disc">Y mucho más</li>\r\n      </ul>\r\n    </h4>\r\n    <br>\r\n    <h4>También tenemos una sección de preguntas frecuentes, por si tienes alguna duda nos la hagas saber.\r\n      <br>\r\n      <br>\r\n      <p>Atentamente,</p>\r\n      <p style="color: #d9534f; font-style: italic;">Equipo Subastra</p>\r\n    </h4>\r\n  </div>\r\n  </div>\r\n   <div class="col-md-3 column"></div>\r\n  </div>\r\n</div>\r\n\r\n</body>\r\n</html>\r\n', 'Plantilla para envio de email de bienvenida cuando el administrador aprueba el ingreso del usuario', 'template-bienvenida'),
(5, 'plantilla de cuenta desactivada', '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Retiro</title>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">\n  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\n  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>\n  <script type="text/javascript" src="script.js"></script>\n</head>\n<body style="background:#f1f2f6">\n\n<div class="container">\n  <div class="row clearfix">\n    <div class="col-md-3 column"></div>\n    <div class="col-md-6 column">\n      <div style="text-align:center"><img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd"></div>\n\n    <div style="background:#fff; padding: 20px 50px; margin-top: 30px;">\n    <h2 style="text-align:center">Atenci&oacute;n <strong style="color: #d9534f; font-size: 44px; font-weight: bold; text-shadow: 2px 1px #B5B0B0;">!</strong></h2><br>\n    <h4>Tu usuario ha sido desactivado, por uso inadecuado</h4>\n    <h4>Te invitamos a que leas el siguiente mensaje\n      <p><a href="#">mensaje</a><p>\n      <br>\n      <p>Atentamente,</p>\n      <p style="color: #d9534f; font-style: italic;">Equipo Subastra</p>\n    </h4>\n  </div>\n  </div>\n   <div class="col-md-3 column"></div>\n  </div>\n</div>\n\n</body>\n</html>\n', 'plantilla para envio de correo cuando el administrados desactiva una cuenta de usuario', 'template-cuenta-desactivada'),
(6, 'Usuarios que no han ingresado a subastra', '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n  <title>Mail</title>\r\n  <meta charset="utf-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1">\r\n  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">\r\n  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\r\n  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>\r\n  <script type="text/javascript" src="script.js"></script>\r\n</head>\r\n<body style="background:#f1f2f6">\r\n\r\n<div class="container">\r\n  <div class="row clearfix">\r\n    <div class="col-md-3 column"></div>\r\n    <div class="col-md-6 column">\r\n      <div style="text-align:center"><img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd"></div>\r\n\r\n    <div style="background:#fff; padding: 20px 50px; margin-top: 30px;">\r\n    <h2 style="text-align:center">Hemos notado tu ausencia!</h2><br>\r\n    <h4>Te invitamos a que ingreses a Subastra y disfrutes de sus beneficios.\r\n      <br> <br>\r\n      <p>Atentamente,</p>\r\n      <p style="color: #d9534f; font-style: italic;">Equipo Subastra</p>\r\n    </h4>\r\n  </div>\r\n  </div>\r\n   <div class="col-md-3 column"></div>\r\n  </div>\r\n</div>\r\n\r\n</body>\r\n</html>\r\n', 'Plantilla que se envia despues de una frecuencia del usuario sin ingresar al sistema.', 'template-noingreso'),
(7, 'Usuarios que no han activado la cuenta', '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n  <title>Mail</title>\r\n  <meta charset="utf-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1">\r\n  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">\r\n  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\r\n  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>\r\n  <script type="text/javascript" src="script.js"></script>\r\n</head>\r\n<body style="background:#f1f2f6">\r\n\r\n<div class="container">\r\n  <div class="row clearfix">\r\n    <div class="col-md-3 column"></div>\r\n    <div class="col-md-6 column">\r\n      <div style="text-align:center"><img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd"></div>\r\n\r\n    <div style="background:#fff; padding: 20px 50px; margin-top: 30px;">\r\n    <h2 style="text-align:center">No has activado tu cuenta!</h2><br>\r\n    <h4>Te invitamos a que ingreses a tu correo y actives tu cuenta Subastra para que disfrutes de todos los beneficios.\r\n      <br> <br>\r\n      <p>Atentamente,</p>\r\n      <p style="color: #d9534f; font-style: italic;">Equipo Subastra</p>\r\n    </h4>\r\n  </div>\r\n  </div>\r\n   <div class="col-md-3 column"></div>\r\n  </div>\r\n</div>\r\n\r\n</body>\r\n</html>\r\n', 'Plantilla que se envia despues de una frecuencia del usuario sin activar la cuenta por mail', 'template-noactivacionmail');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etiqueta` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `permisos` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `etiqueta`, `nombre`, `slug`, `permisos`) VALUES
(1, 'Administrador', 'Administrador', 'administrador', '#page-admin-menu,#options-page,#page-admin-user,#page-register-user-admin,#page-all-user-admin,#page-history'),
(2, 'Empresa', 'Empresa', 'empresa', '#page-profile,#options-page,#page-view-profile'),
(3, 'Transportista', 'Transportista', 'transportista', '#page-profile,#options-page,#page-view-profile');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metadata` varchar(200) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=114 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subasta`
--

CREATE TABLE IF NOT EXISTS `subasta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` int(11) NOT NULL,
  `clase_carga_id` int(11) NOT NULL,
  `unidad_medida_id` int(11) NOT NULL,
  `cantidad` float NOT NULL,
  `descripcion_carga` varchar(400) NOT NULL,
  `ciudad_recoleccion_carga` int(11) NOT NULL,
  `ciudad_entrega_carga` int(11) NOT NULL,
  `coordenada_inicial` varchar(200) NOT NULL,
  `coordenada_final` varchar(200) NOT NULL,
  `centroide_inicial` varchar(200) NOT NULL,
  `centroide_final` varchar(200) NOT NULL,
  `fecha_entrega_carga` date NOT NULL,
  `hora_entrega_carga` int(11) NOT NULL,
  `fecha_recogida_carga` date NOT NULL,
  `hora_recogida_carga` int(11) NOT NULL,
  `presupuesto_envio` float NOT NULL,
  `fecha_inicio_subasta` date NOT NULL,
  `hora_inicio_subasta` int(11) NOT NULL,
  `fecha_fin_subasta` date NOT NULL,
  `hora_fin_subasta` int(11) NOT NULL,
  `us_id` int(11) NOT NULL,
  `valor_final_subasta` float NOT NULL,
  `metadata` varchar(200) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `hora_creacion` int(11) NOT NULL,
  `id_adjunto_parafiscal` int(11) NOT NULL,
  `id_certificado_bancario` int(11) NOT NULL,
  `id_rut` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_historial_acciones`
--

CREATE TABLE IF NOT EXISTS `tipo_historial_acciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metadata` varchar(200) NOT NULL,
  `label` varchar(100) NOT NULL,
  `nombre` varchar(90) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tipo_historial_acciones`
--

INSERT INTO `tipo_historial_acciones` (`id`, `metadata`, `label`, `nombre`, `descripcion`) VALUES
(1, '{}', 'Acceso', 'Acceso', 'Historial de Acceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE IF NOT EXISTS `unidad_medida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `SIM` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_historia`
--

CREATE TABLE IF NOT EXISTS `usuario_historia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `us_id` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nit` varchar(200) NOT NULL,
  `rut` varchar(200) NOT NULL,
  `metadata` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_vehiculo`
--

CREATE TABLE IF NOT EXISTS `usuario_vehiculo` (
  `id_usuario` int(11) NOT NULL,
  `id_vehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE IF NOT EXISTS `vehiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(200) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `placa` varchar(200) NOT NULL,
  `id_adjunto` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=49 ;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `modelo`, `observaciones`, `placa`, `id_adjunto`, `usuario_id`) VALUES
(46, 'LUV 1600', 'HOLA SOY REPTAR', 'HBB 447', 0, 76),
(47, 'DASD', 'ASDAS', 'HBB447', 0, 76),
(48, 'LUV 1600', '', 'HBB 447', 0, 79);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cron_acceso`
--
ALTER TABLE `cron_acceso`
  ADD CONSTRAINT `cron_acceso_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
