-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-14 13:00:15
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interviewapp`
--

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `say` text,
  `praise` int(11) NOT NULL DEFAULT '0',
  `cid` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_angular`
--

CREATE TABLE `iv_angular` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_bootstrap`
--

CREATE TABLE `iv_bootstrap` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_css`
--

CREATE TABLE `iv_css` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_html`
--

CREATE TABLE `iv_html` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `iv_html`
--

INSERT INTO `iv_html` (`id`, `qid`, `question`, `answer`, `type`, `trueAnswer`, `comment`, `praise`) VALUES
(69, '1489496240290', '你都使用哪些工具来测试代码的性能？', 'Profiler,JSPerf,Dromaeo。', '简答题', 'null', 0, 0),
(70, '1489496252574', '如果今年你打算熟练掌握一项新技术，那会是什么？', 'nodejs，html5，css3，less等。', '简答题', 'null', 0, 0),
(71, '1489496263206', '请谈一下你对网页标准和标准制定机构重要性的理解。', 'w3c存在的意义就是让浏览器兼容性问题尽量小，首先是他们对浏览器开发者的约束，然后是对开发者的约束。', '简答题', 'null', 0, 0),
(72, '1489496274591', '什么是FOUC（无样式内容闪烁）？你如何来避免FOUC？', 'FOUC(Flash Of Unstyled Content)–文档样式闪烁style type=”text/css”media=”all”>@import”../fouc.css”;< /style>而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文 件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。解决方法简单的出奇，只要在之间加入一个link或者script元素就可以了。', '简答题', 'null', 0, 0),
(73, '1489496307830', '请描述一下cookies，sessionStorage和localStorage的区别？', 'essionStorage和localStorage是HTML5 Web Storage API提供的，可以方便的在web请求之间保存数 据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。sessionStorage、localStorage、cookie都是在浏 览器端存储的数据，其中sessionStorage的概念很特别，引入了一个“浏览器窗口”的概念。sessionStorage是在同源的同窗口（或 tab）中，始终存在的数据。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口 后，sessionStorage即被销毁。同时“独立”打开的不同窗口，即使是同一页面，sessionStorage对象也是不同的cookies会 发送到服务器端。其余两个不会。Microsoft指出InternetExplorer8增加cookie限制为每个域名50个，但IE7似乎也允许每 个域名50个cookie。Firefox每个域名cookie限制为50个。Opera每个域名cookie限制为30个。Firefox和Safari允许cookie多达4097个字节，包括名（name）、值（value）和等号。Opera允许cookie多达4096个字节，包括：名（name）、值（value）和等号。InternetExplorer允许cookie多达4095个字节，包括：名（name）、值（value）和等号。', '简答题', 'null', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `iv_jq`
--

CREATE TABLE `iv_jq` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_js`
--

CREATE TABLE `iv_js` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `iv_js`
--

INSERT INTO `iv_js` (`id`, `qid`, `question`, `answer`, `type`, `trueAnswer`, `comment`, `praise`) VALUES
(1, 'js1', '在js中如何判断当前浏览器正在以何种方式解析？', 'document对象有个属性compatMode,它有两个值：BackCompat对应quirks mode，CSS1Compat对应strict mode。', '简答题', '', 17, 1),
(2, 'js2', '什么是闭包，如何使用它，为什么要使用它？', '包就是能够读取其他函数内部变量的函数。由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。\r\n\r\n所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。\r\n\r\n使用闭包的注意点：\r\n\r\n由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。\r\n闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。', '简答题', '', 1, 7),
(3, 'js3', '解释“JavaScript模块模式”以及你在何时使用它。', '如果有提到无污染的命名空间，可以考虑加分。\r\n\r\n如果你的模块没有自己的命名空间会怎么样？', '简答题', '', 1, 3),
(4, 'js4', '请指出JavaScript宿主对象和原生对象的区别？', '原生对象\r\n\r\nECMA-262 把本地对象（native object）定义为“独立于宿主环境的 ECMAScript 实现提供的对象”。\r\n\r\n“本地对象”包含哪些内容：Object、Function、Array、String、Boolean、Number、Date、RegExp、 Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、 URIError。\r\n\r\n由此可以看出，简单来说，本地对象就是 ECMA-262 定义的类（引用类型）。\r\n\r\n内置对象\r\n\r\nECMA-262 把内置对象（built-in object）定义为“由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已被实例化了。\r\n\r\n同样是“独立于宿主环境”。根据定义我们似乎很难分清“内置对象”与“本地对象”的区别。而 ECMA-262 只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。如此就可以理解了。内置对象是本地对象的一种。\r\n\r\n宿主对象\r\n\r\n何为“宿主对象”？主要在这个“宿主”的概念上，ECMAScript中的“宿主”当然就是我们网页的运行环境，即“操作系统”和“浏览器”。\r\n\r\n所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。所有的BOM和DOM都是宿主对象。因为其对于不同的“宿主”环境所展示的内容不同。其实说白了就是，ECMAScript官方未定义的对象都属于宿主对象，因为其未定义的对象大多数是自己通过ECMAScript程序创建的对象。', '简答题', '', 0, 2),
(5, 'js5', '在什么时候你会使用document.write()？', '大多数生成的广告代码依旧使用document.write()，虽然这种用法会让人很不爽。', '简答题', '', 0, 4),
(6, 'js6', '“attribute”和”property”的区别是什么？', '定义\r\nProperty：属性，所有的HTML元素都由HTMLElement类型表示，HTMLElement类型 直接继承自Element并添加了一些属性，添加的这些属性分别对应于每个HTML元素都有下面的这5个标准特性: id,title,lang,dir,className。DOM节点是一个对象，因此，他可以和其他的JavaScript对象一样添加自定义的属性以 及方法。property的值可以是任何的数据类型，对大小写敏感，自定义的property不会出现在html代码中，只存在js中。\r\n\r\nAttribute：特性，区别于property，attribute只能是字符串，大小写不敏感，出现在innerHTML中，通过类数组attributes可以罗列所有的attribute。\r\n\r\n相同之处\r\n标准的 DOM properties 与 attributes 是同步的。公认的（非自定义的）特性会被以属性的形式添加到DOM对象中。如，id，align，style等，这时候操作property或者使用操作 特性的DOM方法如getAttribute()都可以操作属性。不过传递给getAttribute()的特性名与实际的特性名相同。因此对于 class的特性值获取的时候要传入“class”。\r\n\r\n不同之处\r\n1).对于有些标准的特性的操作，getAttribute与点号(.)获取的值存在差异性。如href，src，value，style，onclick等事件处理程序。\r\n2).href：getAttribute获取的是href的实际值，而点号获取的是完整的url，存在浏览器差异。', '简答题', '', 0, 11);

-- --------------------------------------------------------

--
-- 表的结构 `iv_other`
--

CREATE TABLE `iv_other` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_react`
--

CREATE TABLE `iv_react` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `iv_vue`
--

CREATE TABLE `iv_vue` (
  `id` int(11) NOT NULL,
  `qid` varchar(20) NOT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` text,
  `type` text NOT NULL,
  `trueAnswer` text NOT NULL,
  `comment` int(11) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_angular`
--
ALTER TABLE `iv_angular`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_bootstrap`
--
ALTER TABLE `iv_bootstrap`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_css`
--
ALTER TABLE `iv_css`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_html`
--
ALTER TABLE `iv_html`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_jq`
--
ALTER TABLE `iv_jq`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_js`
--
ALTER TABLE `iv_js`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_other`
--
ALTER TABLE `iv_other`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_react`
--
ALTER TABLE `iv_react`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- Indexes for table `iv_vue`
--
ALTER TABLE `iv_vue`
  ADD PRIMARY KEY (`id`,`qid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
--
-- 使用表AUTO_INCREMENT `iv_angular`
--
ALTER TABLE `iv_angular`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `iv_bootstrap`
--
ALTER TABLE `iv_bootstrap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `iv_css`
--
ALTER TABLE `iv_css`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `iv_html`
--
ALTER TABLE `iv_html`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- 使用表AUTO_INCREMENT `iv_jq`
--
ALTER TABLE `iv_jq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `iv_js`
--
ALTER TABLE `iv_js`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `iv_other`
--
ALTER TABLE `iv_other`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `iv_react`
--
ALTER TABLE `iv_react`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `iv_vue`
--
ALTER TABLE `iv_vue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
