-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 05 月 25 日 07:36
-- 服务器版本: 5.5.8
-- PHP 版本: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `xiangmu`
--
CREATE DATABASE `xiangmu` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `xiangmu`;

-- --------------------------------------------------------

--
-- 表的结构 `ban`
--

CREATE TABLE IF NOT EXISTS `ban` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `ban`
--

INSERT INTO `ban` (`id`, `url`) VALUES
(1, 'http://img01.handu.com/hdysweb/20150313/zpp/img/mn-.jpg'),
(2, 'http://img01.handu.com/hdysweb/20150313/zpp/img/NA.jpg'),
(3, 'http://img01.handu.com/hdysweb/20150313/zpp/img/H-.jpg'),
(4, 'http://img01.handu.com/hdysweb/20150313/zpp/img/FQ.jpg'),
(5, 'http://img01.handu.com/hdysweb/20150313/zpp/img/Sn.jpg'),
(6, 'http://img01.handu.com/hdysweb/20150313/zpp/img/DKN.jpg'),
(7, 'http://img01.handu.com/hdysweb/20150313/zpp/img/NBS.jpg'),
(8, 'http://img01.handu.com/hdysweb/20150313/zpp/img/YT.jpg'),
(9, 'http://img01.handu.com/hdysweb/20150313/zpp/img/SL.jpg'),
(10, 'http://img01.handu.com/hdysweb/20150313/zpp/img/zc.jpg'),
(11, 'http://img01.handu.com/hdysweb/20150313/zpp/img/kui.jpg'),
(12, 'http://img01.handu.com/hdysweb/20150313/zpp/img/HN-.jpg'),
(13, 'http://img01.handu.com/hdysweb/20150313/zpp/img/ANMA.jpg'),
(14, 'http://img01.handu.com/hdysweb/20150313/zpp/img/ZG.jpg'),
(15, 'http://img01.handu.com/hdysweb/20150313/zpp/img/pig.jpg'),
(16, 'http://img01.handu.com/hdysweb/20150313/zpp/img/yyt-.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `cats`
--

CREATE TABLE IF NOT EXISTS `cats` (
  `sid` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(199) NOT NULL,
  `title` varchar(199) NOT NULL,
  `price` varchar(20) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `cats`
--

INSERT INTO `cats` (`sid`, `url`, `title`, `price`) VALUES
(1, 'http://s.handu.com/images/201703/thumb_img/1055750_thumb_G_1490259139501.jpg ', '娜娜日记甜美女装2017春装新款', '168.00'),
(2, 'http://s.handu.com/images/201703/thumb_img/1056203_thumb_G_1490252555160.jpg', '娜娜日记2017夏装新款女装宽松', '258.00'),
(3, 'http://s.handu.com/images/201703/thumb_img/1056243_thumb_G_1490252651722.jpg', '娜娜日记2017夏装新款女装蓝色', '278.00'),
(4, 'http://s.handu.com/images/201703/thumb_img/1488297903762197942.jpg', '韩都衣舍韩版2017女装夏装新款', '238.00'),
(5, 'http://s.handu.com/images/201703/thumb_img/1489039559973951398.jpg', '米妮哈鲁童装2017春装新中大童', '249.00'),
(6, 'http://s.handu.com/images/201703/thumb_img/1489594251840320724.jpg', '韩都衣舍2017韩版女装夏装新款', '198.00');

-- --------------------------------------------------------

--
-- 表的结构 `change1`
--

CREATE TABLE IF NOT EXISTS `change1` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(199) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `change1`
--

INSERT INTO `change1` (`id`, `url`) VALUES
(1, 'http://img01.handu.com/hdysweb/20160728/230_1.jpg'),
(2, 'http://img01.handu.com/hdysweb/20170322/2.jpg'),
(3, 'http://img01.handu.com/hdysweb/20170322/qq.jpg'),
(4, 'http://img01.handu.com/hdysweb/20160817/xp.jpg'),
(5, 'http://img01.handu.com/hdysweb/20150713/051.jpg'),
(6, 'http://img01.handu.com/hdysweb/20160728/1.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `fashion`
--

CREATE TABLE IF NOT EXISTS `fashion` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- 转存表中的数据 `fashion`
--

INSERT INTO `fashion` (`id`, `url`) VALUES
(1, 'http://s.handu.com/images/afficheimg/1493262816605002849.jpg'),
(2, 'http://s.handu.com/images/afficheimg/1495015408107356773.png'),
(3, 'http://s.handu.com/images/afficheimg/1493262853044735391.png'),
(4, 'http://s.handu.com/images/afficheimg/1493262972718897039.png'),
(5, 'http://s.handu.com/images/201703/thumb_img/1490371524314942844.jpg'),
(6, 'http://s.handu.com/images/201703/thumb_img/1488297903762197942.jpg'),
(7, 'http://s.handu.com/images/201702/thumb_img/1488211914428348812.jpg'),
(8, 'http://s.handu.com/images/201703/thumb_img/1489594129268400848.jpg'),
(9, 'http://s.handu.com/images/201703/thumb_img/1488384237414197273.jpg'),
(10, 'http://s.handu.com/images/201702/thumb_img/1487174944714570549.jpg'),
(11, 'http://s.handu.com/images/201703/thumb_img/1489594251840320724.jpg'),
(12, 'http://s.handu.com/images/201703/thumb_img/1489421242567100914.jpg'),
(13, 'http://s.handu.com/images/201702/thumb_img/1487952534008113430.jpg'),
(14, 'http://s.handu.com/images/201702/thumb_img/1487952157115516386.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `kids`
--

CREATE TABLE IF NOT EXISTS `kids` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(199) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `kids`
--

INSERT INTO `kids` (`id`, `url`) VALUES
(1, 'http://s.handu.com/images/afficheimg/1493262613546572917.png'),
(2, 'http://s.handu.com/images/afficheimg/1495177663293907440.jpg'),
(3, 'http://s.handu.com/images/afficheimg/1493262665783718824.png'),
(4, 'http://s.handu.com/images/afficheimg/1493262685405785998.png'),
(5, 'http://s.handu.com/images/201612/thumb_img/1481214024152780534.jpg'),
(6, 'http://s.handu.com/images/201611/thumb_img/1052778_thumb_G_1479873119644.jpg'),
(7, 'http://s.handu.com/images/201605/thumb_img/1462983750285991709.jpg'),
(8, 'http://s.handu.com/images/201604/thumb_img/1461572704902466360.jpg'),
(9, 'http://s.handu.com/images/201603/thumb_img/1459269786762559885.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `mather`
--

CREATE TABLE IF NOT EXISTS `mather` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `mather`
--

INSERT INTO `mather` (`id`, `url`) VALUES
(1, 'http://s.handu.com/images/afficheimg/1493262771561902312.png'),
(2, 'http://s.handu.com/images/afficheimg/1495177408631952484.jpg'),
(3, 'http://s.handu.com/images/afficheimg/1493262788515271622.png'),
(4, 'http://s.handu.com/images/afficheimg/1483593695007779801.png'),
(5, 'http://s.handu.com/images/201704/thumb_img/1491967728747994816.jpg'),
(6, 'http://s.handu.com/images/201704/thumb_img/1491940248355955801.jpg'),
(7, 'http://s.handu.com/images/201704/thumb_img/1491533834135807630.jpg'),
(8, 'http://s.handu.com/images/201703/thumb_img/1489521066423862592.jpg'),
(9, 'http://s.handu.com/images/201703/thumb_img/1489521014801960760.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `newp`
--

CREATE TABLE IF NOT EXISTS `newp` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(199) NOT NULL,
  `price` varchar(10) NOT NULL,
  `reprice` varchar(10) NOT NULL,
  `title` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=126 ;

--
-- 转存表中的数据 `newp`
--

INSERT INTO `newp` (`id`, `url`, `price`, `reprice`, `title`) VALUES
(101, 'http://s.handu.com/images/201705/thumb_img/1494042375481897130.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(102, 'http://s.handu.com/images/201705/thumb_img/1494042363459120246.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(103, 'http://s.handu.com/images/201705/thumb_img/1494042337141297729.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(104, 'http://s.handu.com/images/201705/thumb_img/1494042309110440525.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(105, 'http://s.handu.com/images/201705/thumb_img/1494042304548326099.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(106, 'http://s.handu.com/images/201703/thumb_img/1056243_thumb_G_1490252651722.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(107, 'http://s.handu.com/images/201703/thumb_img/1056235_thumb_G_1490252743351.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(108, 'http://s.handu.com/images/201703/thumb_img/1056203_thumb_G_1490252555160.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(109, 'http://s.handu.com/images/201703/thumb_img/1053350_thumb_G_1490252815879.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(110, 'http://s.handu.com/images/201609/thumb_img/1046131_thumb_G_1473843851049.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(111, 'http://s.handu.com/images/201704/thumb_img/1493149876999607480.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(112, 'http://s.handu.com/images/201704/thumb_img/1491335453995724632.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(113, 'http://s.handu.com/images/201703/thumb_img/1488916220447810266.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(114, 'http://s.handu.com/images/201702/thumb_img/1486497019550126770.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(115, 'http://s.handu.com/images/201612/thumb_img/1483127403297240315.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(116, 'http://s.handu.com/images/201704/thumb_img/1490997617849349186.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(117, 'http://s.handu.com/images/201703/thumb_img/1490911215110275085.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(118, 'http://s.handu.com/images/201703/thumb_img/1490347492957551546.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(119, 'http://s.handu.com/images/201703/thumb_img/1490347484896595843.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(120, 'http://s.handu.com/images/201703/thumb_img/1490347308935795193.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(121, 'http://s.handu.com/images/201704/thumb_img/1057818_thumb_G_1491984138009.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(122, 'http://s.handu.com/images/201703/thumb_img/1489039559973951398.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(123, 'http://s.handu.com/images/201703/thumb_img/1488990188641442950.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(124, 'http://s.handu.com/images/201704/thumb_img/1057063_thumb_G_1491983947970.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–'),
(125, 'http://s.handu.com/images/201704/thumb_img/1056951_thumb_G_1491984011819.jpg', '86.00', '158.00', 'éŸ©éƒ½è¡£èˆ2017éŸ©ç‰ˆå¥³è£…å¤è£…æ–°æ¬¾åœ†é¢†é“†é’‰å°èŠ±å®½æ¾çŸ­è¢–');

-- --------------------------------------------------------

--
-- 表的结构 `oumei`
--

CREATE TABLE IF NOT EXISTS `oumei` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(199) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `oumei`
--

INSERT INTO `oumei` (`id`, `url`) VALUES
(1, 'http://s.handu.com/images/afficheimg/1493262443941205748.png'),
(2, 'http://s.handu.com/images/afficheimg/1495177367758188008.jpg'),
(3, 'http://s.handu.com/images/afficheimg/1493263944186703128.png'),
(4, 'http://s.handu.com/images/201703/thumb_img/1490349050925763322.jpg'),
(5, 'http://s.handu.com/images/201703/thumb_img/1490348889664271318.jpg'),
(6, 'http://s.handu.com/images/201703/thumb_img/1490348583255915863.jpg'),
(7, 'http://s.handu.com/images/201703/thumb_img/1056971_thumb_G_1490348343996.jpg'),
(8, 'http://s.handu.com/images/201703/thumb_img/1056548_thumb_G_1490348476491.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `shaonv`
--

CREATE TABLE IF NOT EXISTS `shaonv` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `url` varchar(199) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `shaonv`
--

INSERT INTO `shaonv` (`id`, `url`) VALUES
(1, 'http://s.handu.com/images/afficheimg/1493262730454672398.png'),
(2, 'http://s.handu.com/images/afficheimg/1495178472428855691.jpg'),
(3, 'http://s.handu.com/images/afficheimg/1493262580868128418.png'),
(4, 'http://s.handu.com/images/afficheimg/1493263899266862676.png'),
(5, 'http://s.handu.com/images/afficheimg/1493263602807980248.png'),
(6, 'http://s.handu.com/images/201703/thumb_img/1489038188820016982.jpg'),
(7, 'http://s.handu.com/images/201703/thumb_img/1055750_thumb_G_1490259139501.jpg'),
(8, 'http://s.handu.com/images/201703/thumb_img/1055746_thumb_G_1490258996149.jpg'),
(9, 'http://s.handu.com/images/201703/thumb_img/1055335_thumb_G_1490258925173.jpg'),
(10, 'http://s.handu.com/images/201612/thumb_img/1482955832070666387.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `table2`
--

CREATE TABLE IF NOT EXISTS `table2` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `pnumber` varchar(11) NOT NULL,
  `password` char(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- 转存表中的数据 `table2`
--

INSERT INTO `table2` (`id`, `pnumber`, `password`) VALUES
(21, '13095713738', '0874aa4039469ce7f214c27b24db9966'),
(22, '13777877403', '0874aa4039469ce7f214c27b24db9966');
