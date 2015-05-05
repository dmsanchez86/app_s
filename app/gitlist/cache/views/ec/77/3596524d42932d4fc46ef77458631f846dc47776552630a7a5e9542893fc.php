<?php

/* branch_menu.twig */
class __TwigTemplate_ec773596524d42932d4fc46ef77458631f846dc47776552630a7a5e9542893fc extends Twig_Template
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
        echo "<div class=\"btn-group pull-left space-right\" id=\"branchList\">
    <button class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">browsing: <strong>";
        // line 2
        if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
        echo twig_escape_filter($this->env, $_branch_, "html", null, true);
        echo "</strong> <span class=\"caret\"></span></button>

    <div class=\"dropdown-menu\">
        <div class=\"search\">
            <input class=\"search\" placeholder=\"Filter branch/tags\" autofocus>
        </div>
    <ul class=\"unstyled list\">
    <li class=\"dropdown-header\">Branches</li>
    ";
        // line 10
        if (isset($context["branches"])) { $_branches_ = $context["branches"]; } else { $_branches_ = null; }
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($_branches_);
        foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
            // line 11
            echo "        <li><a href=\"";
            if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
            if (isset($context["item"])) { $_item_ = $context["item"]; } else { $_item_ = null; }
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("branch", array("repo" => $_repo_, "branch" => $_item_)), "html", null, true);
            echo "\"><span class=\"item\">";
            if (isset($context["item"])) { $_item_ = $context["item"]; } else { $_item_ = null; }
            echo twig_escape_filter($this->env, $_item_, "html", null, true);
            echo "</span></a></li>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 13
        echo "    ";
        if (isset($context["tags"])) { $_tags_ = $context["tags"]; } else { $_tags_ = null; }
        if ($_tags_) {
            // line 14
            echo "    <li class=\"dropdown-header\">Tags</li>
    ";
            // line 15
            if (isset($context["tags"])) { $_tags_ = $context["tags"]; } else { $_tags_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($_tags_);
            foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                // line 16
                echo "        <li><a href=\"";
                if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
                if (isset($context["item"])) { $_item_ = $context["item"]; } else { $_item_ = null; }
                echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("branch", array("repo" => $_repo_, "branch" => $_item_)), "html", null, true);
                echo "\"><span class=\"item\">";
                if (isset($context["item"])) { $_item_ = $context["item"]; } else { $_item_ = null; }
                echo twig_escape_filter($this->env, $_item_, "html", null, true);
                echo "</span></a></li>
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 18
            echo "    ";
        }
        // line 19
        echo "    </ul>
    </div>
</div>";
    }

    public function getTemplateName()
    {
        return "branch_menu.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  65 => 16,  60 => 15,  57 => 14,  53 => 13,  39 => 11,  34 => 10,  22 => 2,  19 => 1,  115 => 27,  110 => 30,  105 => 28,  103 => 27,  98 => 24,  96 => 23,  93 => 22,  90 => 21,  87 => 20,  85 => 19,  82 => 19,  75 => 15,  63 => 14,  56 => 11,  41 => 9,  35 => 5,  32 => 4,  29 => 3,  253 => 15,  243 => 13,  234 => 12,  230 => 10,  227 => 9,  180 => 69,  173 => 66,  167 => 64,  163 => 62,  159 => 61,  155 => 59,  150 => 56,  136 => 53,  131 => 52,  125 => 51,  118 => 49,  111 => 47,  108 => 29,  104 => 45,  101 => 44,  95 => 43,  88 => 38,  79 => 18,  71 => 34,  68 => 33,  64 => 31,  61 => 30,  50 => 21,  47 => 20,  44 => 10,  40 => 8,  37 => 7,  31 => 5,  26 => 3,);
    }
}
