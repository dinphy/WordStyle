document.addEventListener('DOMContentLoaded', () => {
	$(function () {
		/* 初始化菜单 */
		$('#typecho-nav-list .child li:eq(0)').remove();
		var one = $('#typecho-nav-list .child:eq(0)').html();
		var two = $('#typecho-nav-list .child:eq(1)').html();
		var three = $('#typecho-nav-list .child:eq(2)').html();
		var four = $('#typecho-nav-list .child:eq(3)').html();
		var UserInfo = '<div class="user-info"><a href="' + UserLink + '"><img src="' + UserPic + 's=100" /></a><p>Hi，' + UserName + '</p></div>';
		if ('administrator' == UserGroup) var HtmlText = '<div class="user-nav"><ul><li><a href="' + AdminLink + 'index.php"><i class="zm zm-zu"></i>主页<i></i></a></li><li class="menu-li"><a href="javascript:;"><i class="zm zm-quanjushuxing"></i>全局<i class="zm zm-jiantou_liebiaozhankai"></i></a><ul class="menu-ul">' + one + '</ul></li><li class="menu-li"><a href="javascript:;"><i class="zm zm-pingjia"></i>撰写<i class="zm zm-jiantou_liebiaozhankai"></i></a><ul class="menu-ul">' + two + '</li></ul></li><li class="menu-li"><a href="javascript:;"><i class="zm zm-leibie"></i>管理<i class="zm zm-jiantou_liebiaozhankai"></i></a><ul class="menu-ul">' + three + '</ul></li><li class="menu-li"><a href="javascript:;"><i class="zm zm-shezhi"></i>设置<i class="zm zm-jiantou_liebiaozhankai"></i></a><ul class="menu-ul">' + four + '</li></ul></div>';
		else if ('editor' == UserGroup || 'contributor' == UserGroup) HtmlText = '<div class="user-nav"><ul><li><a href="' + AdminLink + 'index.php"><i class="zm zm-zu"></i>主页</a></li><li><a href="' + AdminLink + 'profile.php"><i class="zm zm-shezhi"></i>个人设置</a></li><li><a href="' + AdminLink + 'write-post.php"><i class="zm zm-bianji"></i>撰写文章</a></li><li><a href="' + AdminLink + 'manage-posts.php"><i class="zm zm-leibie"></i>我的文章</a></li><li><a href="' + AdminLink + '/manage-comments.php"><i class="zm zm-quanjushuxing"></i>评论管理</a></li></ul></div>';
		else HtmlText = '<div class="user-nav"><ul><li><a href="' + AdminLink + 'index.php"><i class="zm zm-zu"></i>主页</a></li><li><a href="' + AdminLink + 'profile.php"><i class="zm zm-shezhi"></i>个人设置</a></li></ul></div>';
		var Nav = document.getElementById('typecho-nav-list');
		if (UserGroup != '') {
			$('#typecho-nav-list').html(UserInfo + HtmlText);
			$('.typecho-head-nav .operate').eq(0).prepend('<a id="dark-mode" href="javascript:;"><i class="zm zm-heiye"></i></a>');
			$('.typecho-head-nav .operate').eq(0).prepend('<a id="tonav" href="javascript:;"><i class="zm zm-gfcaidan"></i></a>');
			$('.typecho-head-nav .operate').eq(0).prepend('<a id="user-more" href="javascript:;"><i class="zm zm-wo"></i></a>');
			$('#typecho-nav-list').before('<div class="proup"></div>');
			$('#tonav').click(function (event) {
				if ($(window).width() > 1000) {
					if ($('#typecho-nav-list').css('display') == 'block') {
						$('#typecho-nav-list').css('display', 'none');
						$('.typecho-head-nav .operate').eq(0).css('width', 'calc(100% - 15px)');
						$('.main').eq(0).css('width', '100%');
					} else if ($('#typecho-nav-list').css('display') == 'none') {
						$('#typecho-nav-list').css('display', 'block');
						$('.typecho-head-nav .operate').eq(0).css('width', 'calc(100% - 215px)');
						$('.main').eq(0).css('width', 'calc(100% - 200px)');
					} else {
						$('#typecho-nav-list').css('display', 'none');
						$('.typecho-head-nav .operate').eq(0).css('width', 'calc(100% - 15px)');
						$('.main').eq(0).css('width', '100%');
					}
				} else {
					if ($('#typecho-nav-list').css('display') == 'block') {
						$('#typecho-nav-list').css('display', 'none');
						$('.typecho-head-nav .operate').eq(0).css('width', '100%');
						$('.main').eq(0).css('width', '100%');
					} else if ($('#typecho-nav-list').css('display') == 'none') {
						$('#typecho-nav-list').css('display', 'block');
						$('.typecho-head-nav .operate').eq(0).css('width', '100%');
						$('.main').eq(0).css('width', '100%');
					} else {
						$('#typecho-nav-list').css('display', 'none');
						$('.typecho-head-nav .operate').eq(0).css('width', '100%');
						$('.main').eq(0).css('width', '100%');
					}
					event.stopPropagation();
					$('.proup').toggle();
					$(document).click(function (event) {
						var _con = $('#typecho-nav-list');
						if (!_con.is(event.target) && _con.has(event.target).length == 0) {
							if ($(window).width() < 1000) {
								$('#typecho-nav-list').hide();
							}
							$('.proup').hide();
						}
					});
				}
			});
			if (MenuTitle == '个人设置') {
				$('.profile-avatar:eq(0)').attr('src', UserPic + 's=640');
				$('.typecho-page-main div:eq(0)').attr('style', 'text-align:center');
			}
		}
		$('#typecho-nav-list li.focus').parent('.menu-ul').show();
		$('body').on('click', '.menu-li', function () {
			$(this).find('.menu-ul').is(':hidden') && $('.menu-ul').hide(200), $(this).find('.menu-ul').slideToggle(200);
		});
		/* 全屏按钮 */
		$('body').on('click', '#wmd-fullscreen-button', function () {
			$('.main').addClass('main-in');
		});
		$('body').on('click', '#wmd-exit-fullscreen-button', function () {
			$('.main').removeClass('main-in');
		});
		/* 页面调整 */
		$('.typecho-list-table colgroup').remove();
		if ('网站概要' == MenuTitle) {
			$('.typecho-page-title h2').hide();
		}
		if ($(window).width() < 575) {
			if ('插件管理' == MenuTitle) {
				$('.typecho-table-wrap tr').find('td:eq(0)').css({ float: 'none', padding: '10px' });
				$('.typecho-list-table tr').find('td:eq(1)').attr('data-label', '描述：');
				$('.typecho-list-table tr').find('td:eq(2)').hide();
				$('.typecho-list-table tr').find('td:eq(4)').css({ display: 'block', 'font-size': '1rem' });
			}
			if ('管理文章' == MenuTitle || '管理独立页面' == MenuTitle) {
				$('.typecho-list-table tr').find('td:eq(1)').attr('data-label', '评论：');
			}
			if ('管理评论' == MenuTitle) {
				$('.typecho-list-table td').find('td:eq(2)').css('display', 'block').attr('data-label', '评论者：');
				$('.typecho-list-table tr').find('td:eq(3)').css('display', 'block').attr('data-label', '发表于：');
			}
			if ('管理分类' == MenuTitle) {
				$('.typecho-list-table tr').find('td:eq(5)').attr('data-label', '文章数：');
			}
			if ('管理用户' == MenuTitle) {
				$('.typecho-list-table tr').find('td:eq(1)').attr('data-label', '文章数：');
				$('.typecho-list-table tr').find('td:eq(4)').css('display', 'block');
			}
			let isTrue = $('.typecho-head-nav .operate a:not(#dark-mode,#tonav,#user-more)').hide();
			$('#user-more').on('click', function () {
				isTrue.toggle();
			});
		}
		/* 显示canvas 图片 */
		$('tbody tr .comment-content p').each(function (i, item) {
			let str = $(item).html();
			if (!/\{!\{.*\}!\}/.test(str)) return;
			str = str.replace(/{!{/, '').replace(/}!}/, '');
			$(item).html('<img src="' + str + '" />');
		});
		/* 暗色模式 */
		if (localStorage.getItem('dark-mode')) {
			$('html').attr('dark-mode', 'dark-mode');
			$('#dark-mode').html('<i class="zm zm-baitian"></i>');
		} else {
			$('html').removeAttr('dark-mode', 'dark-mode');
			$('#dark-mode').html('<i class="zm zm-heiye"></i>');
		}
		$('#dark-mode').on('click', function () {
			if ($('html').attr('dark-mode')) {
				$('html').removeAttr('dark-mode');
				localStorage.removeItem('dark-mode');
				$('#dark-mode').html('<i class="zm zm-heiye"></i>');
			} else {
				$('html').attr('dark-mode', 'dark-mode');
				localStorage.setItem('dark-mode', 'dark-mode');
				$('#dark-mode').html('<i class="zm zm-baitian"></i>');
			}
		});
	});
});
