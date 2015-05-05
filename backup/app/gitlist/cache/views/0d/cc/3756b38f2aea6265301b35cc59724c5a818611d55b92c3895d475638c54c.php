<?php

/* navigation.twig */
class __TwigTemplate_0dcc3756b38f2aea6265301b35cc59724c5a818611d55b92c3895d475638c54c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div class=\"navbar navbar-scroll-top\">
    <div class=\"navbar-inner\">
        <div class=\"container\">
            <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
            </a>
            <a class=\"brand\" href=\"";
        // line 9
        echo $this->env->getExtension('routing')->getPath("homepage");
        echo "\">GitList</a>
            <div class=\"nav-collapse\">
                <ul class=\"nav pull-right\">
                    <li><a href=\"http://gitlist.org/\">About</a></li>
                    <li><a href=\"";
        // line 13
        echo $this->env->getExtension('routing')->getPath("homepage");
        echo "refresh\">Refresh</a></li>
                    <li><a href=\"https://github.com/klaussilveira/gitlist/issues/new\">Report bug</a></li>
                    <li><a href=\"https://github.com/klaussilveira/gitlist/wiki\">Help</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "navigation.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  36 => 13,  19 => 1,  145 => 14,  139 => 5,  127 => 23,  119 => 22,  111 => 21,  79 => 17,  71 => 16,  62 => 15,  60 => 14,  48 => 9,  39 => 7,  31 => 6,  27 => 5,  21 => 1,  103 => 20,  101 => 32,  95 => 19,  87 => 18,  83 => 23,  76 => 21,  73 => 20,  66 => 17,  58 => 16,  54 => 14,  49 => 13,  40 => 6,  38 => 5,  35 => 4,  29 => 9,);
    }
}
