<?php

/* stats.twig */
class __TwigTemplate_0c739304a982a9ecc96430509a9f586e6d103b67725c0a820930987b4ee3a627 extends Twig_Template
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
        $context["page"] = "stats";
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
        $this->env->loadTemplate("breadcrumb.twig")->display(array_merge($context, array("breadcrumbs" => array(0 => array("dir" => "Statistics", "path" => "")))));
        // line 9
        echo "
    <table class=\"table table-striped table-bordered\">
        <thead>
            <tr>
                <th width=\"30%\">File extensions (";
        // line 13
        if (isset($context["stats"])) { $_stats_ = $context["stats"]; } else { $_stats_ = null; }
        echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute($_stats_, "extensions")), "html", null, true);
        echo ")</th>
                <th width=\"40%\">Authors (";
        // line 14
        if (isset($context["authors"])) { $_authors_ = $context["authors"]; } else { $_authors_ = null; }
        echo twig_escape_filter($this->env, twig_length_filter($this->env, $_authors_), "html", null, true);
        echo ")</th>
                <th width=\"30%\">Other</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <ul>
                    ";
        // line 22
        if (isset($context["stats"])) { $_stats_ = $context["stats"]; } else { $_stats_ = null; }
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute($_stats_, "extensions"));
        foreach ($context['_seq'] as $context["ext"] => $context["amount"]) {
            // line 23
            echo "                        <li><strong>";
            if (isset($context["ext"])) { $_ext_ = $context["ext"]; } else { $_ext_ = null; }
            echo twig_escape_filter($this->env, $_ext_, "html", null, true);
            echo "</strong>: ";
            if (isset($context["amount"])) { $_amount_ = $context["amount"]; } else { $_amount_ = null; }
            echo twig_escape_filter($this->env, $_amount_, "html", null, true);
            echo " files</li>
                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['ext'], $context['amount'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 25
        echo "                    </ul>
                </td>
                <td>
                    <ul>
                    ";
        // line 29
        if (isset($context["authors"])) { $_authors_ = $context["authors"]; } else { $_authors_ = null; }
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($_authors_);
        foreach ($context['_seq'] as $context["_key"] => $context["author"]) {
            // line 30
            echo "                        <li><strong><a href=\"mailto:";
            if (isset($context["author"])) { $_author_ = $context["author"]; } else { $_author_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_author_, "email"), "html", null, true);
            echo "\">";
            if (isset($context["author"])) { $_author_ = $context["author"]; } else { $_author_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_author_, "name"), "html", null, true);
            echo "</a></strong>: ";
            if (isset($context["author"])) { $_author_ = $context["author"]; } else { $_author_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_author_, "commits"), "html", null, true);
            echo " commits</li>
                    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['author'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 32
        echo "                    </ul>
                </td>
                <td>
                    <p>
                        <strong>Total files:</strong> ";
        // line 36
        if (isset($context["stats"])) { $_stats_ = $context["stats"]; } else { $_stats_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_stats_, "files"), "html", null, true);
        echo "
                    </p>

                    <p>
                        <strong>Total bytes:</strong> ";
        // line 40
        if (isset($context["stats"])) { $_stats_ = $context["stats"]; } else { $_stats_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($_stats_, "size"), "html", null, true);
        echo " bytes (";
        if (isset($context["stats"])) { $_stats_ = $context["stats"]; } else { $_stats_ = null; }
        echo twig_escape_filter($this->env, twig_number_format_filter($this->env, (($this->getAttribute($_stats_, "size") / 1024) / 1024)), "html", null, true);
        echo " MB)
                    </p>
                </td>
            </tr>
        </tbody>
    </table>

    <hr />
";
    }

    public function getTemplateName()
    {
        return "stats.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  125 => 40,  117 => 36,  111 => 32,  95 => 30,  90 => 29,  84 => 25,  71 => 23,  66 => 22,  54 => 14,  49 => 13,  43 => 9,  40 => 8,  37 => 7,  31 => 5,  26 => 3,);
    }
}
