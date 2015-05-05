<?php

/* layout.twig */
class __TwigTemplate_54fef2d99fe956a622bb64dd49149ca1f50797c00a2fda9d7b6fcfc8a3ff96a5 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\" />
        <title>";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
        <link rel=\"stylesheet\" type=\"text/css\" href=\"";
        // line 6
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/css/style.css\">
        <link rel=\"shortcut icon\" type=\"image/png\" href=\"";
        // line 7
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/img/favicon.png\" />
        <!--[if lt IE 9]>
        <script src=\"";
        // line 9
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/html5.js\"></script>
        <![endif]-->
    </head>

    <body>
        ";
        // line 14
        $this->displayBlock('body', $context, $blocks);
        // line 15
        echo "        <script src=\"";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/jquery.js\"></script>
        <script src=\"";
        // line 16
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/raphael.js\"></script>
        <script src=\"";
        // line 17
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/bootstrap.js\"></script>
        <script src=\"";
        // line 18
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/codemirror.js\"></script>
        <script src=\"";
        // line 19
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/showdown.js\"></script>
        <script src=\"";
        // line 20
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/table.js\"></script>
        <script src=\"";
        // line 21
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/list.min.js\"></script>
        <script src=\"";
        // line 22
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/main.js\"></script>
        <script src=\"";
        // line 23
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
        echo "/themes/";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_app_, "theme"), "html", null, true);
        echo "/js/networkGraph.js\"></script>
    </body>
</html>
";
    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        echo "Welcome!";
    }

    // line 14
    public function block_body($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  145 => 14,  139 => 5,  127 => 23,  119 => 22,  111 => 21,  79 => 17,  71 => 16,  62 => 15,  60 => 14,  48 => 9,  39 => 7,  31 => 6,  27 => 5,  21 => 1,  103 => 20,  101 => 32,  95 => 19,  87 => 18,  83 => 23,  76 => 21,  73 => 20,  66 => 17,  58 => 16,  54 => 14,  49 => 13,  40 => 6,  38 => 5,  35 => 4,  29 => 2,);
    }
}
