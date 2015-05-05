<?php

/* layout_page.twig */
class __TwigTemplate_96372844575291908df58ab429886ff5eed3a1a252f910219fb7e4b8bbb481d2 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("layout.twig");

        $this->blocks = array(
            'body' => array($this, 'block_body'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "layout.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_body($context, array $blocks = array())
    {
        // line 4
        echo "    ";
        $this->env->loadTemplate("navigation.twig")->display($context);
        // line 5
        echo "
    <div class=\"container\">
        <div class=\"row\">
            <div class=\"span12\">
                ";
        // line 9
        if (isset($context["page"])) { $_page_ = $context["page"]; } else { $_page_ = null; }
        if (twig_in_filter($_page_, array(0 => "commits", 1 => "searchcommits"))) {
            // line 10
            echo "                <form class=\"form-search pull-right\" action=\"";
            if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
            echo "/";
            if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
            echo twig_escape_filter($this->env, $_repo_, "html", null, true);
            echo "/commits/";
            if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
            echo twig_escape_filter($this->env, $_branch_, "html", null, true);
            echo "/search\" method=\"POST\">
                    <input type=\"text\" name=\"query\" class=\"input-medium search-query\" placeholder=\"Search commits...\" value=\"";
            // line 11
            if (isset($context["query"])) { $_query_ = $context["query"]; } else { $_query_ = null; }
            echo twig_escape_filter($this->env, ((array_key_exists("query", $context)) ? (_twig_default_filter($_query_, "")) : ("")), "html", null, true);
            echo "\">
                </form>
                ";
        } else {
            // line 14
            echo "                <form class=\"form-search pull-right\" action=\"";
            if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "request"), "basepath"), "html", null, true);
            echo "/";
            if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
            echo twig_escape_filter($this->env, $_repo_, "html", null, true);
            echo "/tree/";
            if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
            echo twig_escape_filter($this->env, $_branch_, "html", null, true);
            echo "/search\" method=\"POST\">
                    <input type=\"text\" name=\"query\" class=\"input-medium search-query\" placeholder=\"Search tree...\" value=\"";
            // line 15
            if (isset($context["query"])) { $_query_ = $context["query"]; } else { $_query_ = null; }
            echo twig_escape_filter($this->env, ((array_key_exists("query", $context)) ? (_twig_default_filter($_query_, "")) : ("")), "html", null, true);
            echo "\">
                </form>
                ";
        }
        // line 18
        echo "
                ";
        // line 19
        if (array_key_exists("branches", $context)) {
            // line 20
            echo "                    ";
            $this->env->loadTemplate("branch_menu.twig")->display($context);
            // line 21
            echo "                ";
        }
        // line 22
        echo "
                ";
        // line 23
        $this->env->loadTemplate("menu.twig")->display($context);
        // line 24
        echo "            </div>
        </div>

        ";
        // line 27
        $this->displayBlock('content', $context, $blocks);
        // line 28
        echo "
        ";
        // line 29
        $this->env->loadTemplate("footer.twig")->display($context);
        // line 30
        echo "    </div>
";
    }

    // line 27
    public function block_content($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout_page.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  115 => 27,  110 => 30,  105 => 28,  103 => 27,  98 => 24,  96 => 23,  93 => 22,  90 => 21,  87 => 20,  85 => 19,  82 => 18,  75 => 15,  63 => 14,  56 => 11,  41 => 9,  35 => 5,  32 => 4,  29 => 3,  253 => 15,  243 => 13,  234 => 12,  230 => 10,  227 => 9,  180 => 69,  173 => 66,  167 => 64,  163 => 62,  159 => 61,  155 => 59,  150 => 56,  136 => 53,  131 => 52,  125 => 51,  118 => 49,  111 => 47,  108 => 29,  104 => 45,  101 => 44,  95 => 43,  88 => 38,  79 => 36,  71 => 34,  68 => 33,  64 => 31,  61 => 30,  50 => 21,  47 => 20,  44 => 10,  40 => 8,  37 => 7,  31 => 5,  26 => 3,);
    }
}
