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

/* server/status/status/index.twig */
class __TwigTemplate_43f8ef96f1e3826d69774876a647695c extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "server/status/base.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 2
        $context["active"] = "status";
        // line 1
        $this->parent = $this->loadTemplate("server/status/base.twig", "server/status/status/index.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 4
        echo "
";
        // line 5
        if (($context["is_data_loaded"] ?? null)) {
            // line 6
            echo "  <div class=\"row\"><h3>";
            echo twig_escape_filter($this->env, twig_sprintf(_gettext("Network traffic since startup: %s"), ($context["network_traffic"] ?? null)), "html", null, true);
            echo "</h3></div>
  <div class=\"row\"><p>";
            // line 7
            echo twig_escape_filter($this->env, twig_sprintf(_gettext("This MySQL server has been running for %1\$s. It started up on %2\$s."), ($context["uptime"] ?? null), ($context["start_time"] ?? null)), "html", null, true);
            echo "</p></div>

<div class=\"row align-items-start\">
  <table class=\"table table-striped table-hover col-12 col-md-5 w-auto\">
    <thead>
      <tr>
        <th scope=\"col\">
          ";
echo _gettext("Traffic");
            // line 15
            echo "          ";
            echo PhpMyAdmin\Html\Generator::showHint(_gettext("On a busy server, the byte counters may overrun, so those statistics as reported by the MySQL server may be incorrect."));
            echo "
        </th>
        <th class=\"text-end\" scope=\"col\">#</th>
        <th class=\"text-end\" scope=\"col\">";
echo _gettext("ø per hour");
            // line 18
            echo "</th>
      </tr>
    </thead>

    <tbody>
      ";
            // line 23
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["traffic"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["each_traffic"]) {
                // line 24
                echo "        <tr>
          <th scope=\"row\">";
                // line 25
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["each_traffic"], "name", [], "any", false, false, false, 25), "html", null, true);
                echo "</th>
          <td class=\"font-monospace text-end\">";
                // line 26
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["each_traffic"], "number", [], "any", false, false, false, 26), "html", null, true);
                echo "</td>
          <td class=\"font-monospace text-end\">";
                // line 27
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["each_traffic"], "per_hour", [], "any", false, false, false, 27), "html", null, true);
                echo "</td>
        </tr>
      ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['each_traffic'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 30
            echo "    </tbody>
  </table>

  <table class=\"table table-striped table-hover col-12 col-md-6 w-auto\">
    <thead>
      <tr>
        <th scope=\"col\">";
echo _gettext("Connections");
            // line 36
            echo "</th>
        <th class=\"text-end\" scope=\"col\">#</th>
        <th class=\"text-end\" scope=\"col\">";
echo _gettext("ø per hour");
            // line 38
            echo "</th>
        <th class=\"text-end\" scope=\"col\">%</th>
      </tr>
    </thead>

    <tbody>
      ";
            // line 44
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["connections"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["connection"]) {
                // line 45
                echo "        <tr>
          <th>";
                // line 46
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["connection"], "name", [], "any", false, false, false, 46), "html", null, true);
                echo "</th>
          <td class=\"font-monospace text-end\">";
                // line 47
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["connection"], "number", [], "any", false, false, false, 47), "html", null, true);
                echo "</td>
          <td class=\"font-monospace text-end\">";
                // line 48
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["connection"], "per_hour", [], "any", false, false, false, 48), "html", null, true);
                echo "</td>
          <td class=\"font-monospace text-end\">";
                // line 49
                echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["connection"], "percentage", [], "any", false, false, false, 49), "html", null, true);
                echo "</td>
        </tr>
      ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['connection'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 52
            echo "    </tbody>
  </table>
</div>

  ";
            // line 56
            if ((($context["is_primary"] ?? null) || ($context["is_replica"] ?? null))) {
                // line 57
                echo "    <p class=\"alert alert-primary clearfloat\" role=\"alert\">
      ";
                // line 58
                if ((($context["is_primary"] ?? null) && ($context["is_replica"] ?? null))) {
                    // line 59
                    echo "        ";
echo _gettext("This MySQL server works as <b>primary</b> and <b>replica</b> in <b>replication</b> process.");
                    // line 60
                    echo "      ";
                } elseif (($context["is_primary"] ?? null)) {
                    // line 61
                    echo "        ";
echo _gettext("This MySQL server works as <b>primary</b> in <b>replication</b> process.");
                    // line 62
                    echo "      ";
                } elseif (($context["is_replica"] ?? null)) {
                    // line 63
                    echo "        ";
echo _gettext("This MySQL server works as <b>replica</b> in <b>replication</b> process.");
                    // line 64
                    echo "      ";
                }
                // line 65
                echo "    </p>

    <hr class=\"clearfloat\">

    <h3>";
echo _gettext("Replication status");
                // line 69
                echo "</h3>

    ";
                // line 71
                echo ($context["replication"] ?? null);
                echo "
  ";
            }
            // line 73
            echo "
";
        } else {
            // line 75
            echo "  ";
            echo $this->env->getFilter('error')->getCallable()(_gettext("Not enough privilege to view server status."));
            echo "
";
        }
        // line 77
        echo "
";
    }

    public function getTemplateName()
    {
        return "server/status/status/index.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  220 => 77,  214 => 75,  210 => 73,  205 => 71,  201 => 69,  194 => 65,  191 => 64,  188 => 63,  185 => 62,  182 => 61,  179 => 60,  176 => 59,  174 => 58,  171 => 57,  169 => 56,  163 => 52,  154 => 49,  150 => 48,  146 => 47,  142 => 46,  139 => 45,  135 => 44,  127 => 38,  122 => 36,  113 => 30,  104 => 27,  100 => 26,  96 => 25,  93 => 24,  89 => 23,  82 => 18,  74 => 15,  63 => 7,  58 => 6,  56 => 5,  53 => 4,  49 => 3,  44 => 1,  42 => 2,  35 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/status/status/index.twig", "C:\\Users\\Idriss Boukmouche\\Desktop\\electron-php-mysql\\phpmyadmin\\templates\\server\\status\\status\\index.twig");
    }
}
