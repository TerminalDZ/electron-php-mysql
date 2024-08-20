<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* server/replication/status_table.twig */
class __TwigTemplate_64d9157111870d4d9ea2c327bd113449 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<div id=\"replication_";
        echo twig_escape_filter($this->env, ($context["type"] ?? null), "html", null, true);
        echo "_section\"";
        echo ((($context["is_hidden"] ?? null)) ? (" style=\"display: none;\"") : (""));
        echo ">
  ";
        // line 2
        if (($context["has_title"] ?? null)) {
            // line 3
            echo "    <h4>
      <a id=\"replication_";
            // line 4
            echo twig_escape_filter($this->env, ($context["type"] ?? null), "html", null, true);
            echo "\"></a>
      ";
            // line 5
            if ((($context["type"] ?? null) == "primary")) {
                // line 6
                echo "        ";
echo _gettext("Primary status");
                // line 7
                echo "      ";
            } else {
                // line 8
                echo "        ";
echo _gettext("Replica status");
                // line 9
                echo "      ";
            }
            // line 10
            echo "    </h4>
  ";
        }
        // line 12
        echo "
  <table id=\"server";
        // line 13
        echo twig_escape_filter($this->env, ($context["type"] ?? null), "html", null, true);
        echo "replicationsummary\" class=\"table w-auto\">
    <thead>
      <tr>
        <th>";
echo _gettext("Variable");
        // line 16
        echo "</th>
        <th>";
echo _gettext("Value");
        // line 17
        echo "</th>
      </tr>
    </thead>

    <tbody>
      ";
        // line 22
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["variables"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["variable"]) {
            // line 23
            echo "        <tr>
          <td>";
            // line 24
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["variable"], "name", [], "any", false, false, false, 24), "html", null, true);
            echo "</td>
          <td class=\"text-end font-monospace\">
            <span";
            // line 26
            if ((twig_get_attribute($this->env, $this->source, $context["variable"], "status", [], "any", false, false, false, 26) == "text-danger")) {
                echo " class=\"text-danger\"";
            } elseif ((twig_get_attribute($this->env, $this->source, $context["variable"], "status", [], "any", false, false, false, 26) == "text-success")) {
                echo " class=\"text-success\"";
            }
            echo ">
              ";
            // line 27
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["variable"], "value", [], "any", false, false, false, 27), "html", null, true);
            echo "
            </span>
          </td>
        </tr>
      ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['variable'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 32
        echo "    </tbody>
  </table>
</div>
";
    }

    public function getTemplateName()
    {
        return "server/replication/status_table.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  123 => 32,  112 => 27,  104 => 26,  99 => 24,  96 => 23,  92 => 22,  85 => 17,  81 => 16,  74 => 13,  71 => 12,  67 => 10,  64 => 9,  61 => 8,  58 => 7,  55 => 6,  53 => 5,  49 => 4,  46 => 3,  44 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/replication/status_table.twig", "C:\\Users\\Idriss Boukmouche\\Desktop\\electron-php-mysql\\phpmyadmin\\templates\\server\\replication\\status_table.twig");
    }
}
