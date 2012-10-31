@main[]
	<!DOCTYPE html>
	<html>
		<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
			<title>Фонд Егора Гайдара</title>
			<link rel="stylesheet" type="text/css" href="/css/main.css" media="screen"/>
			<!--[if lte IE 7]>
				<link rel="stylesheet" type="text/css" href="/css/ie7.css"/>
			<![endif]-->
			^additionalCSS[]
			<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
			<script type="text/javascript" src="/js/jquery.slideshow.js"></script>
			<script type="text/javascript" src="/js/jquery.masonry.min.js"></script>
			<script type="text/javascript" src="/js/jquery.hints.js"></script>
			<script type="text/javascript" src="/js/main.js"></script>
		</head>
		<body^if(def $bodyClass){ class="$bodyClass"}>
			<div class="l-container">
				<div class="l-header">
					^header[]
				</div>
				<div class="l-content l-wrapper">
					^content[]
				</div>
				^partners[]
			</div>
			<div class="l-footer">
				^footer[]
			</div>
		</body>
	</html>

@header[]
	<a class="b-logo" href="/">
		<img class="image" src="/img/logo.png" alt="Фонд Егора Гайдара"/>
	</a>
	^mainMenu[]

@mainMenu[]
	<ul class="b-main-menu">
		<li class="item about">
			<a class="link^if(in '/about/'){ selected}" href="/about/">О Фонде^if(in '/about/'){ <b class="b-graphics b-graphics-down-arrow"><b></b></b>}</a>
		</li>
		<li class="item gaidar">
			<a class="link^if(in '/gaidar/'){ selected}" href="/gaidar/">О Егоре Гайдаре^if(in '/gaidar/'){ <b class="b-graphics b-graphics-down-arrow"><b></b></b>}</a>
		</li>
		<li class="item articles">
			<a class="link^if(in '/publications/'){ selected}" href="/publications/">Публикации^if(in '/publications/'){ <b class="b-graphics b-graphics-down-arrow"><b></b></b>}</a>
		</li>
		<li class="item projects">
			<a class="link^if(in '/projects/'){ selected}" href="/projects/">Проекты^if(in '/projects/'){ <b class="b-graphics b-graphics-down-arrow"><b></b></b>}</a>
		</li>
		<li class="item news">
			<a class="link^if(in '/news/'){ selected}" href="/news/">Новости^if(in '/news/'){ <b class="b-graphics b-graphics-down-arrow"><b></b></b>}</a>
		</li>
	</ul>

@navigationPart[]
	<form class="b-search-form" method="get" action="?">
		^searchFieldset[]
	</form>
	^projectsNavigation[]

@searchFieldset[]
	<fieldset>
		<label class="b-hint-label" for="f-query">Поиск по сайтам Фонда</label>
		<input id="f-query" class="b-input" type="text" name="query"/>
	</fieldset>

@projectsNavigation[]
	<h2 class="b-navigation-title">Проекты <br/>Фонда</h2>
	<div class="l-shift-20">
		<ul class="b-menu">
			<li class="item">
				<a class="link c-project-link" href="?menu-1">О проектах Фонда</a>
			</li>
			<li class="item">
				<a class="link c-project-link" href="?menu-2">Стипендии</a>
			</li>
			<li class="item">
				<a class="link c-project-link" href="?menu-3">Гайдаровские чтения</a>
			</li>
			<li class="item">
				<a class="link c-project-link" href="?menu-4">Гайдаровский клуб</a>
			</li>
			<li class="item">
				<a class="link c-project-link" href="?menu-5">Гайдаровский форум</a>
			</li>
			<li class="item">
				<a class="link c-project-link" href="?menu-6">Гранты USRF</a>
			</li>
			<li class="item">
				<a class="link c-project-link" href="?menu-7"><em>Все проекты</em></a>
			</li>
		</ul>
	</div>

@social[]
	<h2>Оставайтесь на&nbsp;связи</h2>
	<ul class="b-social-links">
		<li class="item">
			<a class="link" href="http://facebook.com/" title="Группа Фонда в Facebook" rel="nofollow">
				<b class="b-icon b-icon-fb"><b>Группа Фонда в&nbsp;Facebook</b></b>
			</a>
		</li>
		<li class="item">
			<a class="link" href="http://www.twitter.com/Gaidar_fund" title="Лента новостей в Twitter" rel="nofollow">
				<b class="b-icon b-icon-twitter"><b>Лента новостей в&nbsp;Twitter</b></b>
			</a>
		</li>
		<li class="item">
			<a class="link" href="http://vkontakte.ru/gaidarfund" title="Группа Фонда Вконтакте" rel="nofollow">
				<b class="b-icon b-icon-vk"><b>Группа Фонда Вконтакте</b></b>
			</a>
		</li>
		<li class="item">
			<a class="link" href="http://youtube.com/" title="Видео-канал Фонда" rel="nofollow">
				<b class="b-icon b-icon-youtube"><b>Видео-канал Фонда</b></b>
			</a>
		</li>
		<li class="item">
			<a class="link" href="http://gaidar-fund.livejournal.com/" title="Дискуссии в ЖЖ" rel="nofollow">
				<b class="b-icon b-icon-lj"><b>Дискуссии в&nbsp;ЖЖ</b></b>
			</a>
		</li>
	</ul>
	<div>
		<img src="/img/tmp/social-links.png" alt=""/>
	</div>

@footer[]
	<div class="l-inner l-wrapper">
		<div class="l-column-210 l-intercolumn-30 l-shift-10">
			<ul class="b-featured-menu">
				<li class="item">
					<a class="link c-about-link" href="?footer-1">О Фонде</a>
				</li>
				<li class="item">
					<a class="link c-news-link" href="?footer-2">Новости</a>
				</li>
				<li class="item">
					<a class="link c-article-link" href="?footer-3">Публикации</a>
				</li>
				<li class="item">
					<a class="link c-news-link" href="?footer-4">Анонсы мероприятий</a>
				</li>
				<li class="item">
					<a class="link c-news-link" href="?footer-5">Дискуссии</a>
				</li>
				<li class="item">
					<a class="link c-news-link" href="?footer-6">Блоги</a>
				</li>
			</ul>
		</div>
		<div class="l-column-210 l-intercolumn-30">
			<ul class="b-featured-menu b-featured-menu-untitled">
				<li class="item">
					<a class="link c-project-link" href="?footer-11">Премия</a>
				</li>
				<li class="item">
					<a class="link c-project-link" href="?footer-12">Стипендии</a>
				</li>
				<li class="item">
					<a class="link c-project-link" href="?footer-13">Гранты USBF</a>
				</li>
				<li class="item">
					<a class="link c-about-link" href="?footer-14">Контакты</a>
				</li>
				<li class="item">
					<a class="link c-gaidar-link" href="?footer-15">Как помочь Фонду</a>
				</li>
			</ul>
		</div>
		<div class="l-column-230 l-intercolumn-30">
			<h2 class="b-featured-title">
				<a class="link" href="?footer-21">Проекты</a>
			</h2>
			<div class="l-shift-20">
				<ul class="b-featured-menu">
					<li class="item">
						<a class="link c-project-link" href="?footer-22">Гайдаровские чтения</a>
					</li>
					<li class="item">
						<a class="link c-project-link" href="?footer-23">Гайдаровский клуб</a>
					</li>
					<li class="item">
						<a class="link c-project-link" href="?footer-24">Гайдаровский форум</a>
					</li>
					<li class="item">
						<a class="link c-project-link" href="?footer-25">Лекция в Политехническом музее</a>
					</li>
					<li class="item">
						<a class="link c-project-link" href="?footer-26">Повышение квалификации</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="l-column-210">
			<ul class="b-featured-menu b-featured-menu-untitled">
				<li class="item">
					<a class="link c-project-link" href="?footer-31">Летний лагерь</a>
				</li>
				<li class="item">
					<a class="link c-project-link" href="?footer-32">Конкурс теоретического наследия</a>
				</li>
				<li class="item">
					<a class="link c-gaidar-link" href="?footer-33">Архив Гайдара</a>
				</li>
				<li class="item">
					<a class="link c-project-link" href="?footer-34">День за днём</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="l-wrapper">
		<div class="l-column-50p">
			<div class="b-bricks">
				<span class="line line-1"><span class="brick brick-1-1"></span></span>
				<span class="line line-2"></span>
				<span class="line line-3"><span class="brick brick-3-1"></span></span>
				<span class="line line-4"><span class="brick brick-4-1"></span></span>
				<span class="line line-5"></span>
			</div>
		</div>
		<div class="l-column-50p">
			<div class="l-shift-10">
				<div class="b-copyright">2010&ndash;2012&nbsp;&copy; <a class="link" href="/">Фонд Егора Гайдара</a></div>
			</div>
		</div>
	</div>

@additionalCSS[]

@content[]

@partners[]
