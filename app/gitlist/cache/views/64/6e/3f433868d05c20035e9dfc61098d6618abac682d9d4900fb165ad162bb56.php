<?php

/* menu.twig */
class __TwigTemplate_646e3f433868d05c20035e9dfc61098d6618abac682d9d4900fb165ad162bb56 extends Twig_Template
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
        echo "<ul class=\"nav nav-tabs\">
    <li";
        // line 2
        if (isset($context["page"])) { $_page_ = $context["page"]; } else { $_page_ = null; }
        if (($_page_ == "files")) {
            echo " class=\"active\"";
        }
        echo "><a href=\"";
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("branch", array("repo" => $_repo_, "branch" => $_branch_)), "html", null, true);
        echo "\">Files</a></li>
    <li";
        // line 3
        if (isset($context["page"])) { $_page_ = $context["page"]; } else { $_page_ = null; }
        if (twig_in_filter($_page_, array(0 => "commits", 1 => "searchcommits"))) {
            echo " class=\"active\"";
        }
        echo "><a href=\"";
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("commits", array("repo" => $_repo_, "commitishPath" => $_branch_)), "html", null, true);
        echo "\">Commits</a></li>
    <li";
        // line 4
        if (isset($context["page"])) { $_page_ = $context["page"]; } else { $_page_ = null; }
        if (($_page_ == "stats")) {
            echo " class=\"active\"";
        }
        echo "><a href=\"";
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("stats", array("repo" => $_repo_, "branch" => $_branch_)), "html", null, true);
        echo "\">Stats</a></li>
  \t<li";
        // line 5
        if (isset($context["page"])) { $_page_ = $context["page"]; } else { $_page_ = null; }
        if (($_page_ == "network")) {
            echo " class=\"active\"";
        }
        echo "><a href=\"";
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("network", array("repo" => $_repo_, "branch" => $_branch_)), "html", null, true);
        echo "\">Network</a></li>
</ul>
";
    }

    public function getTemplateName()
    {
        return "menu.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  55 => 5,  33 => 3,  65 => 16,  60 => 15,  57 => 14,  53 => 13,  39 => 11,  34 => 10,  22 => 2,  19 => 1,  115 => 27,  110 => 30,  105 => 28,  103 => 27,  98 => 24,  96 => 23,  93 => 22,  90 => 21,  87 => 20,  85 => 19,  82 => 19,  75 => 15,  63 => 14,  56 => 11,  41 => 9,  35 => 5,  32 => 4,  29 => 3,  253 => 15,  243 => 13,  234 => 12,  230 => 10,  227 => 9,  180 => 69,  173 => 66,  167 => 64,  163 => 62,  159 => 61,  155 => 59,  150 => 56,  136 => 53,  131 => 52,  125 => 51,  118 => 49,  111 => 47,  108 => 29,  104 => 45,  101 => 44,  95 => 43,  88 => 38,  79 => 18,  71 => 34,  68 => 33,  64 => 31,  61 => 30,  50 => 21,  47 => 20,  44 => 4,  40 => 8,  37 => 7,  31 => 5,  26 => 3,);
    }
}
