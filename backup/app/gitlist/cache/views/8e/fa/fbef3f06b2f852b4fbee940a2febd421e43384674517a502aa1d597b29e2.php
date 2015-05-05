<?php

/* breadcrumb.twig */
class __TwigTemplate_8efafbef3f06b2f852b4fbee940a2febd421e43384674517a502aa1d597b29e2 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'extra' => array($this, 'block_extra'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<ul class=\"breadcrumb\">
    <li><a href=\"";
        // line 2
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("tree", array("repo" => $_repo_, "commitishPath" => $_branch_)), "html", null, true);
        echo "\">";
        if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
        echo twig_escape_filter($this->env, $_repo_, "html", null, true);
        echo "</a></li>
    ";
        // line 3
        if (isset($context["breadcrumbs"])) { $_breadcrumbs_ = $context["breadcrumbs"]; } else { $_breadcrumbs_ = null; }
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($_breadcrumbs_);
        $context['loop'] = array(
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        );
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["breadcrumb"]) {
            // line 4
            echo "        <span class=\"divider\">/</span>
        <li";
            // line 5
            if (isset($context["loop"])) { $_loop_ = $context["loop"]; } else { $_loop_ = null; }
            if ($this->getAttribute($_loop_, "last")) {
                echo " class=\"active\"";
            }
            echo ">";
            if (isset($context["loop"])) { $_loop_ = $context["loop"]; } else { $_loop_ = null; }
            if ((!$this->getAttribute($_loop_, "last"))) {
                echo "<a href=\"";
                if (isset($context["repo"])) { $_repo_ = $context["repo"]; } else { $_repo_ = null; }
                if (isset($context["branch"])) { $_branch_ = $context["branch"]; } else { $_branch_ = null; }
                if (isset($context["breadcrumb"])) { $_breadcrumb_ = $context["breadcrumb"]; } else { $_breadcrumb_ = null; }
                echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("tree", array("repo" => $_repo_, "commitishPath" => (($_branch_ . "/") . $this->getAttribute($_breadcrumb_, "path")))), "html", null, true);
                echo "\">";
                if (isset($context["breadcrumb"])) { $_breadcrumb_ = $context["breadcrumb"]; } else { $_breadcrumb_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_breadcrumb_, "dir"), "html", null, true);
                echo "</a>";
            }
            if (isset($context["loop"])) { $_loop_ = $context["loop"]; } else { $_loop_ = null; }
            if ($this->getAttribute($_loop_, "last")) {
                if (isset($context["breadcrumb"])) { $_breadcrumb_ = $context["breadcrumb"]; } else { $_breadcrumb_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_breadcrumb_, "dir"), "html", null, true);
            }
            echo "</li>
    ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['length'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['breadcrumb'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 7
        echo "
    ";
        // line 8
        $this->displayBlock('extra', $context, $blocks);
        // line 9
        echo "</ul>
";
    }

    // line 8
    public function block_extra($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "breadcrumb.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  100 => 8,  23 => 2,  20 => 1,  55 => 5,  33 => 3,  65 => 16,  60 => 15,  57 => 14,  53 => 5,  39 => 11,  34 => 10,  22 => 2,  19 => 1,  115 => 27,  110 => 30,  105 => 28,  103 => 27,  98 => 24,  96 => 23,  93 => 8,  90 => 7,  87 => 20,  85 => 19,  82 => 19,  75 => 15,  63 => 14,  56 => 11,  41 => 9,  35 => 5,  32 => 3,  29 => 3,  253 => 15,  243 => 13,  234 => 12,  230 => 10,  227 => 9,  180 => 69,  173 => 66,  167 => 64,  163 => 62,  159 => 61,  155 => 59,  150 => 56,  136 => 53,  131 => 52,  125 => 51,  118 => 49,  111 => 47,  108 => 29,  104 => 45,  101 => 44,  95 => 9,  88 => 38,  79 => 18,  71 => 34,  68 => 33,  64 => 31,  61 => 30,  50 => 4,  47 => 20,  44 => 4,  40 => 8,  37 => 7,  31 => 5,  26 => 3,);
    }
}
