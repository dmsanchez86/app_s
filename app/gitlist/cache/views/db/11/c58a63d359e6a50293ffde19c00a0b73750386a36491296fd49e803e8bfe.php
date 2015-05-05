<?php

/* network.twig */
class __TwigTemplate_db11c58a63d359e6a50293ffde19c00a0b73750386a36491296fd49e803e8bfe extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("layout_page.twig");

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "layout_page.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 3
        $context["page"] = "network";
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        echo "GitList";
    }

    // line 7
    public function block_content($context, array $blocks = array())
    {
        // line 8
        echo "    ";
        $this->env->loadTemplate("breadcrumb.twig")->display(array_merge($context, array("breadcrumbs" => array(0 => array("dir" => "Network", "path" => "")))));
        // line 9
        echo "\t<div class=\"network-view\">
\t\t<div class=\"network-header\">
\t\t\t<div class=\"meta\">Network Graph of ";
        // line 11
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        echo twig_escape_filter($this->env, $_repo_, "html", null, true);
        echo " / ";
        if (isset($context["commitishPath"])) { $_commitishPath_ = $context["commitishPath"]; } else { $_commitishPath_ = null; }
        echo twig_escape_filter($this->env, $_commitishPath_, "html", null, true);
        echo "</div>
\t\t</div>

\t\t<div class=\"network-graph\" data-source=\"";
        // line 14
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        if (isset($context["commitishPath"])) { $_commitishPath_ = $context["commitishPath"]; } else { $_commitishPath_ = null; }
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("networkData", array("repo" => $_repo_, "commitishPath" => $_commitishPath_)), "html", null, true);
        echo "\">
\t\t";
        // line 16
        echo "
\t\t</div>
\t</div>

\t

    <hr />
";
    }

    public function getTemplateName()
    {
        return "network.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  63 => 16,  57 => 14,  47 => 11,  43 => 9,  40 => 8,  37 => 7,  31 => 5,  26 => 3,);
    }
}
