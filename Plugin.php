<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
/**
 * WordStyle是一款即插即用的typecho后台美化插件
 * 
 * @package WordStyle
 * @author 小王先森
 * @version 1.0.6
 * @link https://xwsir.cn
 */
class WordStyle_Plugin implements Typecho_Plugin_Interface
{
    /**
     * 激活插件方法
     * 
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function activate()
    {
        Typecho_Plugin::factory('admin/header.php')->header = array('WordStyle_Plugin', 'render');

        if (file_exists("admin/index.php")) {
            rename("admin/index.php", "admin/index.bak");
            copy("usr/plugins/WordStyle/assets/index.php", "admin/index.php");
        }
    }

    /**
     * 禁用插件方法
     * 
     * @static
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function deactivate()
    {
        if (file_exists("admin/index.bak")) {
            unlink("admin/index.php");
            rename("admin/index.bak", "admin/index.php");
        }
    }

    /**
     * 获取插件配置面板
     * 
     * @access public
     * @param Typecho_Widget_Helper_Form $form 配置面板
     * @return void
     */
    public static function config(Typecho_Widget_Helper_Form $form)
    {
        $form->addInput(new Typecho_Widget_Helper_Form_Element_Text('myText', NULL, 'cdn.helingqi.com/avatar', '用户头像', '默认源为禾令奇：cdn.helingqi.com/avatar <br /><b>注意：</b>不需要输入 http(s)://'));
    }

    /**
     * 个人用户的配置面板
     * 
     * @access public
     * @param Typecho_Widget_Helper_Form $form
     * @return void
     */
    public static function personalConfig(Typecho_Widget_Helper_Form $form)
    {
    }

    /* 获取插件版本号 */
    public static function getVersion()
    {
        $pinfo = Typecho_Plugin::parseInfo(__FILE__);
        return $pinfo['version'];
    }
    /**
     * 插件实现方法
     * 
     * @access public
     * @return void
     */
    public static function render($head)
    {
        $url = Helper::options()->pluginUrl . '/WordStyle/assets/';

        if (Typecho_Widget::widget('Widget_User')->hasLogin()) {
            $myText = Helper::options()->plugin('WordStyle')->myText;
            define('__TYPECHO_GRAVATAR_PREFIX__', '//' . $myText . '/');
            $user = Typecho_Widget::widget('Widget_User');
            $menu = Typecho_Widget::widget('Widget_Menu')->to($menu);
            $email = $user->mail;
            if ($email) {
                $lowercase = strtolower($email);
                $format = str_replace('@qq.com', '', $lowercase);
                if (strstr($lowercase, "qq.com") && is_numeric($format) && strlen($format) < 11 && strlen($format) > 4) {
                    $qqImage = '//q1.qlogo.cn/g?b=qq&nk=' . $format . '&';
                } else {
                    $decode = md5($lowercase);
                    $qqImage = '//' . $myText . '/' . $decode . '?';
                }
            } else {
                $qqImage = $url . 'assets/img/user.png';
            }

            $version = WordStyle_Plugin::getVersion();
            $head = $head . '<link rel="stylesheet" href="' . $url . 'css/admin.css?v=' . $version . '">
                <link rel="stylesheet" href="//at.alicdn.com/t/c/font_1159885_9dcir2kfagv.css">
                <script src="' . $url . 'js/admin.js?v=' . $version . '"></script>
                <script>
                    var UserLink="' . Helper::options()->adminUrl . '/profile.php";
                    var UserPic="' . $qqImage . '";
                    var AdminLink="' . Helper::options()->adminUrl . '";
                    var SiteLink="' . Helper::options()->siteUrl . '";
                    var UserName="' . $user->screenName . '";
                    var UserGroup="' . $user->group . '";
                    var SiteName="' . Helper::options()->title . '";
                    var MenuTitle="' . strip_tags($menu->title) . '";
                </script>';
        } else {
            $head = $head . '<link rel="stylesheet" href="' . $url . 'css/login.css">';
        }
        return $head;
    }
}
